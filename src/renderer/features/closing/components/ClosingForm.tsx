import { Form, Input, Radio, Button } from 'antd';
import { electron } from 'process';
import { useEffect, useState } from 'react';
import { Toast } from 'react-toastify/dist/components';
import { TOAST_TYPE } from 'renderer/constants/AppConstants';
import { Expense } from 'renderer/types/expense.type';
import { Order } from 'renderer/types/order.type';
import { CommonUtils } from 'renderer/utils/CommonUtils';

const ClosingForm = () => {
  const [form] = Form.useForm();
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [existingCash, setExistingCash] = useState(0);

  const currentDateObj = new Date();

  // Extract the date part
  const currentDate = new Date(
    currentDateObj.getFullYear(),
    currentDateObj.getMonth(),
    currentDateObj.getDate(),
  ).getTime();
  const fetchExistingCash = async () => {
    const cashEntry = await window.electron.getDailyCashEntryByDate(Date.now());
    if (cashEntry.data !== undefined && cashEntry.success) {
      setExistingCash(cashEntry.data.closing_balance);
    }
  };

  const fetchExpenseData = async () => {
    const { data, success } = await window.electron.getAllExpensesByPeriod(
      'daily',
    );

    if (success) {
      const expensesTotal = data.reduce(
        (total: number, expense: Expense) => total + expense.amount,
        0,
      );
      setTotalCost(expensesTotal);
    }
  };

  const fetchOrdersData = async () => {
    const { data, success } = await window.electron.getOrderByPeriod('daily');

    if (success) {
      const incomeTotal = data.reduce(
        (sum: number, dataPoint: Order) =>
          dataPoint.paymentStatus === 'payment done'
            ? sum + dataPoint.netPayable
            : sum,
        0,
      );
      setTotalIncome(incomeTotal);
    }
  };

  useEffect(() => {
    fetchExistingCash();
    fetchExpenseData();
    fetchOrdersData();
  }, []);

  const handleSubmit = async (values: any) => {
    // Handle the form submission logic here

    // Determine the withdrawal amount based on the selected option
    // let withdrawnAmount = 0;
    // if (values.withdrawalOption === 'partial') {
    //   withdrawnAmount = parseFloat(values.withdrawalAmount) || 0;
    // } else {
    //   withdrawnAmount = totalIncome;
    // }

    // // Create the DailyCashEntry object
    // const dailyCashEntry = {
    //   date: currentDate,
    //   closingBalance: existingCash - withdrawnAmount,
    //   withdrawnAmount: withdrawnAmount,
    // };

    // totalIncome > withdrawnAmount
    //   ? await window.electron.createDailyCashEntry(dailyCashEntry)
    //   : CommonUtils().showToast(
    //       TOAST_TYPE.ERROR,
    //       'Not Enough Balance On your Cash',
    //     );

    CommonUtils().showToast(
      TOAST_TYPE.INFO,
      'This Feature is coming please wait',
    );
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Form
        form={form}
        className="p-4 bg-white shadow-lg rounded-lg"
        onFinish={handleSubmit}
        initialValues={{ withdrawalOption: 'full' }}
      >
        <h1 className="text-2xl">This Feature is coming soon...</h1>
        <Form.Item>
          <p className="font-bold mb-4">
            You have {existingCash + totalIncome - totalCost}tk in your cash
          </p>
        </Form.Item>

        <Form.Item
          name="withdrawalOption"
          rules={[
            { required: true, message: 'Please select withdrawal option' },
          ]}
        >
          <Radio.Group>
            <Radio value="partial">Withdraw Certain Amount</Radio>
            <Radio value="full">Withdraw Full Amount</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.withdrawalOption !== currentValues.withdrawalOption
          }
        >
          {({ getFieldValue }) =>
            getFieldValue('withdrawalOption') === 'partial' ? (
              <Form.Item
                name="withdrawalAmount"
                rules={[
                  {
                    required: true,
                    message: 'Please enter withdrawal amount',
                  },
                ]}
              >
                <Input placeholder="Enter withdrawal amount" />
              </Form.Item>
            ) : null
          }
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ClosingForm;
