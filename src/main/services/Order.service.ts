import { CartItem } from 'renderer/types/product';
import { connect } from './Database.service';

export interface Order {
  items: CartItem[];
  kot: number;
  orderTime: number;
  paymentStatus: string;
  subTotal: number;
  discount: number;
  discountAmount: number;
  vat: number;
  vatAmount: number;
  netPayable: number;
  cashPaid?: number;
  changeAmount?: number;
  paymentMethod?: string;
}

export function createOrder(order: Order): Order | null {
  try {
    const db = connect();

    // Insert order details into the 'orders' table
    const insertOrder = {
      kot: order.kot,
      orderTime: order.orderTime,
      paymentStatus: order.paymentStatus,
      subTotal: order.subTotal,
      discount: order.discount,
      discountAmount: order.discountAmount,
      vat: order.vat,
      vatAmount: order.vatAmount,
      netPayable: order.netPayable,
      cashPaid: order.cashPaid,
      changeAmount: order.changeAmount,
      paymentMethod: order.paymentMethod,
    };

    const insertOrderStatement = db.prepare(
      `INSERT INTO orders
        (kot, orderTime, paymentStatus, subTotal, discount, discountAmount, vat, vatAmount, netPayable, cashPaid, changeAmount, paymentMethod)
        VALUES
        (@kot, @orderTime, @paymentStatus, @subTotal, @discount, @discountAmount, @vat, @vatAmount, @netPayable, @cashPaid, @changeAmount, @paymentMethod)`,
    );

    const { lastInsertRowid: orderId } = insertOrderStatement.run(insertOrder);

    // Insert order items into the 'order_items' table
    for (const item of order.items) {
      const insertOrderItem = {
        orderId,
        productId: item.id,
        quantity: item.quantity,
        price: item.sellingPrice,
      };

      const insertOrderItemStatement = db.prepare(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES (@orderId, @productId, @quantity, @price)`,
      );

      insertOrderItemStatement.run(insertOrderItem);
    }

    // Retrieve the created order and its items using the orderId
    const selectOrderStatement = db.prepare(
      `SELECT * FROM orders WHERE order_id = @orderId`
    );

    const orderData:any = selectOrderStatement.get({ orderId });

    const selectOrderItemsStatement = db.prepare(
      `SELECT * FROM order_items WHERE order_id = @orderId`
    );

    const orderItems = selectOrderItemsStatement.all({ orderId });

    // Combine order data and order items and return
    const completeOrder = { ...orderData, items: orderItems };

    console.log('Order created successfully.');
    return completeOrder;
  } catch (error) {
    console.error('Error creating order:', error);
    return null;
  }
}

export function updateOrder(orderId: number, updatedOrder: Order): boolean {
  try {
    const db = connect();

    // Update order details in the 'orders' table
    const updateOrder = {
      kot: updatedOrder.kot,
      orderTime: updatedOrder.orderTime,
      paymentStatus: updatedOrder.paymentStatus,
      subTotal: updatedOrder.subTotal,
      discount: updatedOrder.discount,
      discountAmount: updatedOrder.discountAmount,
      vat: updatedOrder.vat,
      vatAmount: updatedOrder.vatAmount,
      netPayable: updatedOrder.netPayable,
      cashPaid: updatedOrder.cashPaid,
      changeAmount: updatedOrder.changeAmount,
      paymentMethod: updatedOrder.paymentMethod,
    };

    const updateOrderStatement = db.prepare(
      `UPDATE orders
        SET
          kot = @kot,
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
          paymentMethod = @paymentMethod
        WHERE order_id = @orderId`,
    );

    updateOrderStatement.run({ orderId, ...updateOrder });

    // Delete existing order items in the 'order_items' table
    const deleteOrderItemsStatement = db.prepare(
      'DELETE FROM order_items WHERE order_id = @orderId',
    );
    deleteOrderItemsStatement.run({ orderId });

    // Insert updated order items into the 'order_items' table
    for (const item of updatedOrder.items) {
      const insertOrderItem = {
        orderId,
        productId: item.id,
        quantity: item.quantity,
        price: item.sellingPrice,
      };

      const insertOrderItemStatement = db.prepare(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES (@orderId, @productId, @quantity, @price)`,
      );

      insertOrderItemStatement.run(insertOrderItem);
    }

    console.log('Order updated successfully.');
    return true;
  } catch (error) {
    console.error('Error updating order:', error);
    return false;
  }
}

export function deleteOrder(orderId: number): boolean {
  try {
    const db = connect();

    // Delete order and related items
    const deleteOrderStatement = db.prepare(
      'DELETE FROM orders WHERE order_id = @orderId',
    );
    const deleteOrderItemsStatement = db.prepare(
      'DELETE FROM order_items WHERE order_id = @orderId',
    );

    db.transaction(() => {
      deleteOrderStatement.run({ orderId });
      deleteOrderItemsStatement.run({ orderId });
    })();

    console.log('Order deleted successfully.');
    return true;
  } catch (error) {
    console.error('Error deleting order:', error);
    return false;
  }
}
export function getAllOrders(): Order[] {
  try {
    const db = connect();

    const stm = db.prepare('SELECT * FROM orders');
    const orders: any = stm.all();

    for (const order of orders) {
      const itemsStm = db.prepare(
        `SELECT * FROM order_items WHERE order_id = ${order.order_id}`,
      );
      const items = itemsStm.all({ orderId: order.orderId }) as CartItem[];
      order.items = items;
    }

    return orders;
  } catch (error) {
    console.error('Error getting all orders:', error);
    return [];
  }
}

export function getOrderDetails(orderId: number): Order | null {
  try {
    const db = connect();

    // Retrieve order details from the 'orders' table
    const orderStatement = db.prepare(
      'SELECT * FROM orders WHERE order_id = @orderId',
    );
    const order: unknown = orderStatement.get({ orderId });

    if (!order) {
      console.log(`Order with order_id ${orderId} not found.`);
      return null;
    }

    // Explicitly cast the result to the Order type
    const typedOrder = order as Order;

    // Retrieve order items from the 'order_items' table and join with 'products' table
    const itemsStatement = db.prepare(`
    SELECT oi.*, p.name, p.buyingPrice,p.sellingPrice,p.discount,p.discountable
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id = @orderId
    `);

    const items: CartItem[] = itemsStatement.all({ orderId }) as CartItem[];

    // Add items to the order object
    typedOrder.items = items;

    return typedOrder;
  } catch (error) {
    console.error('Error getting order details:', error);
    return null;
  }
}
