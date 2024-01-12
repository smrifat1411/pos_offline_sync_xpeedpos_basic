import { Order } from 'renderer/types/order.type';
import { CartItem } from 'renderer/types/product';
import { connect } from './Database.service';
import { getProductById, updateProductById } from './product.service';

interface Result<T> {
  success: boolean;
  data?: T;
  error?: string;
  totalItems?: number;
}

export async function createOrder(order: Order): Promise<Result<Order | null>> {
  try {
    const db = connect();

    const insertOrderStatement = db.prepare(`
    INSERT INTO orders
    (isDeleted, orderTime, paymentStatus, subTotal, discount, discountAmount, vat, vatAmount, netPayable, cashPaid, changeAmount, payment_method, customerId)
    VALUES
    (false, @orderTime, @paymentStatus, @subTotal, @discount, @discountAmount, @vat, @vatAmount, @netPayable, @cashPaid, @changeAmount, @paymentMethod, @customerId)
  `);

    const { lastInsertRowid: orderId } = insertOrderStatement.run(order);

    // Insert order items into the 'order_items' table
    for (const item of order.items) {
      if (item.id) {
        const { data } = await getProductById(item.id);

        if (data) {
          await updateProductById(item.id, {
            stockAmount: data.stockAmount - item.quantity,
          });

          const insertOrderItemStatement = db.prepare(`
            INSERT INTO order_items (order_id, product_id, quantity, price)
            VALUES (@orderId, @productId, @quantity, @price)
          `);

          insertOrderItemStatement.run({
            orderId,
            productId: item.id,
            quantity: item.quantity,
            price: item.sellingPrice,
          });
        }
      }
    }

    const orderDetailsResult = await getOrderDetails(Number(orderId));

    if (orderDetailsResult.success) {
      console.log('Order created successfully.');
      return { success: true, data: orderDetailsResult.data };
    } else {
      console.error('Error creating order:', orderDetailsResult.error);
      return { success: false, error: 'Error creating order.' };
    }
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error: 'Error creating order.' };
  }
}

export async function getOrderDetails(orderId: number): Promise<Result<Order>> {
  try {
    const db = connect();

    // Retrieve order details from the 'orders' table
    const orderStatement = db.prepare(
      'SELECT * FROM orders WHERE id = @orderId',
    );

    const order: unknown = orderStatement.get({ orderId });

    if (!order) {
      console.log(`Order with id ${orderId} not found.`);
      return { success: false, error: 'Order not found' };
    }

    // Explicitly cast the result to the Order type
    const typedOrder = order as Order;

    // Retrieve order items from the 'order_items' table
    const items: CartItem[] = await getOrderItems(db, orderId);

    // Add items to the order object
    typedOrder.items = items;

    return { success: true, data: typedOrder };
  } catch (error) {
    console.error('Error getting order details:', error);
    return { success: false, error: 'Error getting order details' };
  }
}

async function getOrderItems(db: any, orderId: number): Promise<CartItem[]> {
  const itemsStatement = db.prepare(`
    SELECT oi.*, p.name, p.buyingPrice, p.sellingPrice, p.discount, p.discountable
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id = @orderId
  `);

  return itemsStatement.all({ orderId }) as CartItem[];
}



export async function getAllOrders(
  page?: number,
  pageSize?: number,
  sortBy?: string,
  sortOrder?: 'asc' | 'desc',
): Promise<Result<Order[]>> {
  try {
    const db = connect();

    let query = 'SELECT * FROM orders WHERE isDeleted != 1';

    // If pagination and sorting parameters are provided, adjust the query
    if (
      page !== undefined &&
      pageSize !== undefined &&
      sortBy !== undefined &&
      sortOrder !== undefined
    ) {
      // Calculate the offset based on pagination parameters
      const offset = (page - 1) * pageSize;

      query += `
        ORDER BY ${sortBy} ${sortOrder}
        LIMIT ${pageSize} OFFSET ${offset}
      `;
    }

    const stm = db.prepare(query);
    const orders = stm.all() as any;

    for (const order of orders) {
      // Retrieve order items from the 'order_items' table and join with 'products' table
      const itemsStm = db.prepare(`
        SELECT oi.*, p.name, p.buyingPrice, p.sellingPrice, p.discount, p.discountable
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = @orderId
      `);

      const items = itemsStm.all({ orderId: order.id }) as CartItem[];
      order.items = items;
    }

    return { success: true, data: orders };
  } catch (error) {
    console.error('Error getting all orders:', error);
    return { success: false, error: 'Error getting all orders.' };
  }
}

export async function getOrdersByPeriod(
  period: string,
): Promise<Result<Order[]>> {
  try {
    const db = connect();

    let query = 'SELECT * FROM orders';

    // Adjust the query based on the specified time period
    switch (period) {
      case 'daily':
        query +=
          " WHERE orderTime >= strftime('%s', 'now', 'start of day') * 1000";
        break;

      case 'weekly':
        query += " WHERE orderTime >= strftime('%s', 'now', '-7 days') * 1000";
        break;
      case 'monthly':
        query +=
          " WHERE orderTime >= strftime('%s', 'now', 'start of month') * 1000 AND orderTime < strftime('%s', 'now', 'start of month', '+1 month') * 1000";
        break;
      case 'yearly':
        query +=
          " WHERE orderTime >= strftime('%s', 'now', 'start of year') * 1000 AND orderTime < strftime('%s', 'now', 'start of year', '+1 year') * 1000";
        break;
      default:
        break;
    }

    const stm = db.prepare(query);
    const orders = stm.all() as any;

    for (const order of orders) {
      // Retrieve order items from the 'order_items' table and join with 'products' table
      const itemsStm = db.prepare(`
        SELECT oi.*, p.name, p.buyingPrice, p.sellingPrice, p.discount, p.discountable
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = @orderId
      `);

      const items = itemsStm.all({ orderId: order.id }) as CartItem[];
      order.items = items;
    }

    console.log('orders found:', orders.length);
    return { success: true, data: orders as Order[] };
  } catch (error) {
    console.error(`Error getting ${period} orders:`, error);
    return { success: false, error: `Error getting ${period} orders.` };
  }
}

// Update order By Id
export async function updateOrderById(
  orderId: number,
  updateData: Partial<Order>,
): Promise<Result<Order | null>> {
  try {
    const db = connect();

    // Ensure the order exists
    const { data: existingOrderData } = await getOrderDetails(orderId);

    if (!existingOrderData) {
      console.log(`Order with id ${orderId} not found.`);
      return { success: false, error: 'Order not found' };
    }

    // Merge existing order data with updateData
    const updatedOrderData = { ...existingOrderData, ...updateData, orderId };
    console.log(updatedOrderData);

    // Update order in the 'orders' table
    const updateOrderStatement = db.prepare(`
    UPDATE orders
    SET
      isDeleted = false,  -- Resetting to false in case it was previously deleted
      orderTime = @orderTime,
      paymentStatus = @paymentStatus,
      subTotal = @subTotal,
      discount = @discount,
      discountAmount = @discountAmount,
      vat = @vat,
      vatAmount = @vatAmount,
      netPayable = @netPayable,
      cashPaid = @cashPaid,
      changeAmount = @changeAmount,
      payment_method = @paymentMethod,
      customerId = @customerId
    WHERE id = @orderId
  `);
  

    updateOrderStatement.run(updatedOrderData);

    // If there are updated items, update them in the 'order_items' table
    if (updateData.items && updateData.items.length > 0) {
      const updatedItems = updateData.items as CartItem[];

      for (const updatedItem of updatedItems) {
        const { product_id, quantity, sellingPrice } = updatedItem;

        // Update order item in the 'order_items' table
        const updateOrderItemStatement = db.prepare(`
          UPDATE order_items
          SET
            quantity = @quantity,
            price = @price
          WHERE order_id = @orderId AND product_id = @productId
        `);

        updateOrderItemStatement.run({
          orderId,
          productId: product_id,
          quantity,
          price: sellingPrice,
        });
      }
    }

    // Retrieve and return updated order details
    const updatedOrderDetailsResult = await getOrderDetails(orderId);

    if (updatedOrderDetailsResult.success) {
      console.log('Order updated successfully.');
      return { success: true, data: updatedOrderDetailsResult.data };
    } else {
      console.error('Error updating order:', updatedOrderDetailsResult.error);
      return { success: false, error: 'Error updating order.' };
    }
  } catch (error) {
    console.error('Error updating order:', error);
    return { success: false, error: 'Error updating order.' };
  }
}

// No time to do in another file,cause on rushh
export async function getTotalItemsCount(
  tableName: string,
  includeDeleted: boolean = false,
): Promise<Result<number>> {
  try {
    const db = connect();

    let query = `SELECT COUNT(*) as totalItems FROM ${tableName}`;

    // Add condition to exclude deleted items if includeDeleted is false
    if (!includeDeleted) {
      query += ` WHERE isDeleted != 1`;
    }

    const countStatement = db.prepare(query);
    const result = countStatement.get() as { totalItems: number } | undefined;

    if (result) {
      const totalItems = result.totalItems;
      console.log(`Total items in '${tableName}': ${totalItems}`);
      return { success: true, data: totalItems };
    } else {
      console.error(`Error getting total items count for '${tableName}'.`);
      return {
        success: false,
        error: `Error getting total items count for '${tableName}'.`,
      };
    }
  } catch (error) {
    console.error(`Error getting total items count for '${tableName}':`, error);
    return {
      success: false,
      error: `Error getting total items count for '${tableName}'.`,
    };
  }
}


export async function deleteOrderById(
  orderId: number,
): Promise<Result<boolean>> {
  try {
    const db = connect();

    // Update isDeleted to true (soft delete)
    const updateOrderStatement = db.prepare(
      'UPDATE orders SET isDeleted = true WHERE id = @orderId',
    );

    updateOrderStatement.run({ orderId });

    console.log(`Order with id ${orderId} deleted successfully.`);
    return { success: true, data: true };
  } catch (error) {
    console.error('Error deleting order:', error);
    return { success: false, error: 'Error deleting order.' };
  }
}
