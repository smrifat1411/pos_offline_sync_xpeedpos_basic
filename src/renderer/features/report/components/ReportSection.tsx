import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useExpenseContext } from 'renderer/context/ExpenseContext';
import { useProductContext } from 'renderer/context/ProductContext';
import SummaryCard from 'renderer/features/report/components/SummaryCard';
import { Order } from 'renderer/types/order.type';

const ReportSection = () => {
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState('daily');
  const { totalAmount: totalExpense, getExpensesByPeriod } =
    useExpenseContext();
  const { allProducts } = useProductContext();

  const handleChartTypeChange = async (type: any) => {
    setChartType(String(type));

    const { data } = await window.electron.getOrderByPeriod(type);
    getExpensesByPeriod(String(type));
    setChartData(data);
  };
  useEffect(() => {
    handleChartTypeChange('daily');
  }, []);

  const totalOrders = chartData.length;
  const totalRevenue = chartData.reduce(
    (sum, dataPoint: Order) =>
      dataPoint.paymentStatus === 'payment done'
        ? sum + dataPoint.netPayable
        : sum,
    0,
  );

  const totalDueOrders = chartData.filter(
    (order: Order) => order.paymentStatus === 'Pending',
  ).length;
  const totalStockItems = allProducts.reduce(
    (sum, product) => sum + product.stockAmount,
    0,
  );

  return (
    <section>
      <Grid container spacing={2} className="p-4">
        <Grid item sm={12} className="flex justify-end w-full">
          <Paper className="flex flex-col gap-2 min-w-[120px] mr-6">
            <FormControl>
              <InputLabel>Time Period</InputLabel>
              <Select
                value={chartType}
                onChange={(e) => handleChartTypeChange(e.target.value)}
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>

        <Grid container item sm={12} spacing={2}>
          <Grid item sm={4}>
            <SummaryCard title="Total Orders" value={totalOrders} />
          </Grid>
          <Grid item sm={4}>
            <SummaryCard title="Total Sell" value={totalRevenue} />
          </Grid>
          <Grid item sm={4}>
            <SummaryCard title="Total Due Orders" value={totalDueOrders} />
          </Grid>
          <Grid item sm={4}>
            <SummaryCard title="Total Expense" value={totalExpense} />
          </Grid>
          {chartType === 'daily' && (
            <>
              <Grid item sm={4}>
                <SummaryCard
                  title="In Cash"
                  value={totalRevenue - totalExpense}
                />
              </Grid>
            </>
          )}
          <Grid item sm={4}>
            <SummaryCard title="Total Stock Items" value={totalStockItems} />
          </Grid>
        </Grid>

        <Grid item sm={6}>
          <Paper>
            <Typography variant="h6" gutterBottom>
              {chartType === 'daily'
                ? 'Daily'
                : chartType.charAt(0).toUpperCase() + chartType.slice(1)}{' '}
              Revinue Chart
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <XAxis dataKey="order" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="bumpX"
                  dataKey="netPayable"
                  name="Net Payable"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </section>
  );
};

export default ReportSection;
