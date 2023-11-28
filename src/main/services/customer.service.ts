import { connect } from './Database.service';

interface Customer {
  id?: number;
  name: string;
  mobile: string;
  discount: number;
}

interface Result<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function createCustomer(customer: Customer): Promise<Result<Customer | null>> {
  try {
    const db = connect();

    // Check if a customer with the same name and mobile number already exists
    const existingCustomer: unknown = db.prepare(
      'SELECT * FROM customers WHERE name = @name AND mobile = @mobile',
    ).get({ name: customer.name, mobile: customer.mobile });

    if (existingCustomer) {
      console.log('Customer already exists. Returning existing customer details.');
      const typedExistingCustomer = existingCustomer as Customer;
      return { success: true, data: typedExistingCustomer };
    }

    const insertCustomerStatement = db.prepare(`
      INSERT INTO customers (name, mobile, discount)
      VALUES (@name, @mobile, @discount)
    `);

    // Insert the customer into the database
    const { lastInsertRowid: customerId } = insertCustomerStatement.run(customer);

    // Retrieve the customer details from the database
    const customerDetailsResult = await getCustomerDetails(Number(customerId));

    if (customerDetailsResult.success) {
      console.log('Customer created successfully.');
      return { success: true, data: customerDetailsResult.data };
    } else {
      console.error('Error creating customer:', customerDetailsResult.error);
      return { success: false, error: 'Error creating customer.' };
    }
  } catch (error) {
    console.error('Error creating customer:', error);
    return { success: false, error: 'Error creating customer.' };
  }
}


export async function getCustomerDetails(customerId: number): Promise<Result<Customer>> {
  try {
    const db = connect();

    const customerStatement = db.prepare(
      'SELECT * FROM customers WHERE id = @customerId',
    );

    const customer: unknown = customerStatement.get({ customerId });

    if (!customer) {
      console.log(`Customer with id ${customerId} not found.`);
      return { success: false, error: 'Customer not found' };
    }

    const typedCustomer = customer as Customer;

    return { success: true, data: typedCustomer };
  } catch (error) {
    console.error('Error getting customer details:', error);
    return { success: false, error: 'Error getting customer details' };
  }
}

export async function updateCustomerById(
  customerId: number,
  updateData: Partial<Customer>,
): Promise<Result<Customer | null>> {
  try {
    const db = connect();

    const { data: existingCustomerData } = await getCustomerDetails(customerId);

    if (!existingCustomerData) {
      console.log(`Customer with id ${customerId} not found.`);
      return { success: false, error: 'Customer not found' };
    }

    const updatedCustomerData = { ...existingCustomerData, ...updateData, id: customerId };

    const updateCustomerStatement = db.prepare(`
      UPDATE customers
      SET
        name = @name,
        mobile = @mobile,
        discount = @discount
      WHERE id = @customerId
    `);

    updateCustomerStatement.run(updatedCustomerData);

    const updatedCustomerDetailsResult = await getCustomerDetails(customerId);

    if (updatedCustomerDetailsResult.success) {
      console.log('Customer updated successfully.');
      return { success: true, data: updatedCustomerDetailsResult.data };
    } else {
      console.error('Error updating customer:', updatedCustomerDetailsResult.error);
      return { success: false, error: 'Error updating customer.' };
    }
  } catch (error) {
    console.error('Error updating customer:', error);
    return { success: false, error: 'Error updating customer.' };
  }
}
