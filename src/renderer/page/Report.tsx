import React, { useEffect, useState } from "react";

import {
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Order } from "renderer/types/order.type";
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";
import { useOrders } from "renderer/context/OrderContextProvider";

interface ChartData {
  date: string;
  orderCount: number;
  revenue: number;
}

const Report = () => {
  const { orders } = useOrders();
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [chartType, setChartType] = useState<string>("weeklyOrderCount");

  const convertTimestampToDate = (timestamp: number): Date => new Date(timestamp);

  const filterOrders = (order: Order, startDate: Date, endDate: Date): boolean => {
    const orderDate = convertTimestampToDate(order?.orderTime || 0);
    return orderDate >= startDate && orderDate <= endDate && order?.paymentStatus !== "canceled";
  };

  const getChartData = (startDate: Date, endDate: Date, type: string): ChartData[] => {
    const data: ChartData[] = [];
    let currentDate = new Date(startDate);
    let dateLabel;

    if (type === "daily") {
      // For daily, calculate only for the selected day
      dateLabel = currentDate.toISOString().split("T")[0];

      data.push({
        date: dateLabel,
        orderCount: calculateData(currentDate, "orderCount"),
        revenue: calculateData(currentDate, "revenue"),
      });
    } else {
      // For other types, calculate for the date range
      while (currentDate <= endDate) {
        dateLabel = currentDate.toISOString().split("T")[0];

        data.push({
          date: dateLabel,
          orderCount: calculateData(currentDate, "orderCount"),
          revenue: calculateData(currentDate, "revenue"),
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    return data;
  };

  // ... (other code)


  const calculateData = (date: Date, dataType: string): number => {
    const filteredOrders = orders.filter((o: Order) =>
      filterOrders(o, startOfDay(date), endOfDay(date))
    );

    if (dataType === "orderCount") {
      return filteredOrders.length;
    } else {
      return filteredOrders.reduce((total, order) => total + (order?.netPayable || 0), 0);
    }
  };

  useEffect(() => {
    handleChartTypeChange(chartType);
  }, [chartType, orders]);

  const handleChartTypeChange = (type: string) => {
    let startDate, endDate;

    switch (type) {
      case "daily":
        startDate = endOfDay(new Date());
        endDate = new Date();
        break;
      case "weekly":
        startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
        endDate = new Date();
        break;
      case "monthly":
        startDate = startOfMonth(new Date());
        endDate = endOfMonth(new Date());
        break;
      case "yearly":
        startDate = startOfYear(new Date());
        endDate = endOfYear(new Date());
        break;
      default:
        startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
        endDate = new Date();
        break;
    }

    const newData = getChartData(startDate, endDate, type);
    setChartData(newData);
  };

  return (
    <section>

      <Grid container  spacing={2} className="p-4">
        <Grid item sm={12} className="flex justify-end w-full">
          <Paper className="flex flex-col gap-2 min-w-[120px] mr-6">
            <FormControl>
              <InputLabel>Time Period</InputLabel>
              <Select value={chartType} onChange={(e) => setChartType(e.target.value as string)}>
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>

        {/* Weekly Charts */}
        <Grid item  sm={6}>
          <Paper>
            <Typography variant="h6" gutterBottom>
              {chartType === "daily" ? "Daily" : chartType.charAt(0).toUpperCase() + chartType.slice(1)} Order Count Chart
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="orderCount" name="Order Count" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item  sm={6}>
          <Paper>
            <Typography variant="h6" gutterBottom>
              {chartType === "daily" ? "Daily" : chartType.charAt(0).toUpperCase() + chartType.slice(1)} Revenue Chart
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </section>
  );
};

export default Report;
