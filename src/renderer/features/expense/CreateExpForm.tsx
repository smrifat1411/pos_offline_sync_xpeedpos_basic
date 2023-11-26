import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { TextField, MenuItem, Card } from '@material-ui/core';
import { useAuth } from 'renderer/context/AuthContextProvider';
import { Expense } from 'renderer/types/expense.type';
import { useExpenseContext } from 'renderer/context/ExpenseContext';
type Props = {
  setRows: any;
  closeModal: any;
};

const CreateExpForm = ({ setRows, closeModal }: Props) => {
  const { userDetails } = useAuth();
  const { createExpense } = useExpenseContext();

  const onFinish = async (values: any) => {
    const payLoad: Expense = {
      amount: values.amount,
      details: values.details,
      username: userDetails?.name || '',
    };
    if (payLoad.username !== '') {
      const data = await createExpense(payLoad);

      setRows((prev: any) => [...prev, data]);

      data !== undefined && closeModal();
    }
  };

  const [form] = Form.useForm();
  return (
    <Card className="max-w-[260px]">
      <Form
        layout="vertical"
        form={form}
        className="flex flex-col gap-2 p-4"
        onFinish={onFinish}
      >
        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: 'Please input the amount!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Details"
          name="details"
          rules={[{ required: true, message: 'Please input the details!' }]}
        >
          {/* <TextField
          multiline
          label="Cause of Expense"
          variant="outlined"
          fullWidth
          name="expense"
        /> */}
          <Input.TextArea />
        </Form.Item>
        {/* <Form.Item
        label="Expenser"
        name="expenser"
        rules={[{ required: true, message: 'Please select an expenser!' }]}
      >
        {users && (
          <Select value={selectedExpenser} onChange={handleExpenserChange}>
            {users.map((user) => (
              <Option key={user.username} value={user.username}>
                {user.name}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item> */}

        <Form.Item wrapperCol={{}} className="flex items-center">
          <Button type="default" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateExpForm;
