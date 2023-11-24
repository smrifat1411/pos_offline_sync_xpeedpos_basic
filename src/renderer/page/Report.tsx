import { useOrders } from "renderer/context/OrderContextProvider";
import ReportCard from "renderer/features/report/components/ReportCard";
import ReportChart from "renderer/features/report/components/ReportChart";
import { Order } from "renderer/types/order.type";

type Props = {};

const Report = (props: Props) => {
  const { orders } = useOrders();
  console.log(orders);

  const currentDate = new Date();
  const filterOrders = (order: Order, filterType: string, filterDate: Date) => {
    const orderDate = new Date(order?.orderTime);
    switch (filterType) {
      case "daily":
        return (
          orderDate.getDate() === filterDate.getDate() &&
          order?.paymentStatus !== "canceled"
        );
      case "weekly":
        const sevenDaysAgo = new Date(filterDate);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
        return (
          orderDate >= sevenDaysAgo &&
          orderDate <= filterDate &&
          order?.paymentStatus !== "canceled"
        );
      case "monthly":
        const firstDayOfMonth = new Date(filterDate.getFullYear(), filterDate.getMonth(), 1);
        const lastDayOfMonth = new Date(filterDate.getFullYear(), filterDate.getMonth() + 1, 0);
        return (
          orderDate >= firstDayOfMonth &&
          orderDate <= lastDayOfMonth &&
          order?.paymentStatus !== "canceled"
        );
      default:
        return false;
    }
  };

  const dailyOrders = orders.filter((order: Order) => filterOrders(order, "daily", currentDate));
  const weeklyOrders = orders.filter((order: Order) => filterOrders(order, "weekly", currentDate));
  const monthlyOrders = orders.filter((order: Order) => filterOrders(order, "monthly", currentDate));

  const calculateTotalRevenue = (orderArray: Order[]) =>
    orderArray.reduce((total, order) => total + (order?.netPayable || 0), 0);

  const dailyRevenue = calculateTotalRevenue(dailyOrders);
  const weeklyRevenue = calculateTotalRevenue(weeklyOrders);
  const monthlyRevenue = calculateTotalRevenue(monthlyOrders);


  const lastSevenDaysOrdersByDate: Array<Array<Order>> = [];
  for (let i = 6; i >= 0; i--) {
    const currentDate = new Date(); // Use a new instance for each day
    currentDate.setDate(currentDate.getDate() - i);

    const ordersInADay = orders.filter(
      (o: Order) =>
        new Date(o?.orderTime).getDate() === currentDate.getDate() &&
        new Date(o?.orderTime) <= currentDate &&
        o?.paymentStatus !== "canceled"
    );

    lastSevenDaysOrdersByDate.push(ordersInADay || []);
  }

  const lastSevenDaysOrders: Order[] = lastSevenDaysOrdersByDate.flat();
  const lastSevenDaysRevenue = calculateTotalRevenue(lastSevenDaysOrders);

  const monthlyChartLabels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];



  const getMonthlyData = (monthIndex: number) => {
    const filterDate = new Date(currentDate.getFullYear(), monthIndex, 1);

    const ordersInAMonth = orders.filter((o: Order) =>
      filterOrders(o, "monthly", filterDate) && new Date(o?.orderTime).getMonth() === monthIndex
    );

    return {
      amount: calculateTotalRevenue(ordersInAMonth),
      ordersCount: ordersInAMonth.length,
    };
  };

  const monthlyChartAmountData = monthlyChartLabels.map((_, index) => getMonthlyData(index).amount);
  const monthlyChartOrdersData = monthlyChartLabels.map((_, index) => getMonthlyData(index).ordersCount);

  const weeklyChartLabels = lastSevenDaysOrdersByDate?.map((eachDay) =>
    eachDay[0]?.orderTime
      ? `${new Date(eachDay[0]?.orderTime).getDate()} ${
        monthlyChartLabels[new Date(eachDay[0]?.orderTime).getMonth()]
      }`
      : "0"
  );

  const weeklyChartAmountData = lastSevenDaysOrdersByDate?.map((eachDay) =>
    calculateTotalRevenue(eachDay)
  );

  const weeklyChartOrdersData = lastSevenDaysOrdersByDate?.map(
    (eachDay) => eachDay.length
  );
  return (
    <>
      <section className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 p-4 justify-items-center">
          <ReportCard
            title="Daily Revenue"
            revenue={dailyRevenue.toString()}
            totalOrders={dailyOrders.length}
          />
          <ReportCard
            title="Last 7 Days Revenue"
            revenue={lastSevenDaysRevenue.toString()}
            totalOrders={lastSevenDaysOrders.length}
          />
          <ReportCard
            title={`In This Month(${
              monthlyChartLabels[new Date().getMonth()]
            })`}
            revenue={monthlyRevenue.toString()}
            totalOrders={monthlyOrders.length}
          />
        </div>
        <div className="p-4">
          <h3 className="text-2xl font-semibold">Weekly</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 justify-items-center">
            <ReportChart
              title="Amounts"
              labels={weeklyChartLabels}
              labelsData={weeklyChartAmountData}
              chartLineTitle="Revenue"
              borderColor="rgb(255, 99, 132)"
              backgroundColor="rgba(255, 99, 132, 0.5)"
            />
            <ReportChart
              title="Orders"
              labels={weeklyChartLabels}
              labelsData={weeklyChartOrdersData}
              chartLineTitle="Number of Orders"
              borderColor="rgb(53, 162, 235)"
              backgroundColor="rgba(53, 162, 235, 0.5)"
            />
          </div>
        </div>
        <div className="p-4 grid grid-cols-1">
          <h3 className="text-2xl font-semibold">
            Monthly({new Date().getFullYear()})
          </h3>
          <ReportChart
            title="Amounts"
            labels={monthlyChartLabels}
            labelsData={monthlyChartAmountData}
            chartLineTitle="Revenue"
            borderColor="rgb(53, 162, 235)"
            backgroundColor="rgba(53, 162, 235, 0.5)"
          />
          <ReportChart
            title="Orders"
            labels={monthlyChartLabels}
            labelsData={monthlyChartOrdersData}
            chartLineTitle="Number of Orders"
            borderColor="rgb(255, 99, 132)"
            backgroundColor="rgba(255, 99, 132, 0.5)"
          />
        </div>
      </section>
    </>
  );
};

export default Report;
