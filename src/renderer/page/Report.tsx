import { useOrders } from "renderer/context/OrderContextProvider";
import ReportCard from "renderer/features/report/components/ReportCard";
import ReportChart from "renderer/features/report/components/ReportChart";
import { Order } from "renderer/types/order.type";

type Props = {};

const Report = (props: Props) => {
  const { orders } = useOrders();
  console.log(orders);

  const dailyOrders = orders.filter(
    (order: Order) =>
      new Date(order?.orderTime).getDate() == new Date().getDate() &&
      order?.paymentStatus !== "canceled"
  );

  const monthlyOrders = orders.filter(
    (order: Order) =>
      new Date(order?.orderTime).getMonth() == new Date().getMonth() &&
      new Date(order?.orderTime).getFullYear() == new Date().getFullYear() &&
      order?.paymentStatus !== "canceled"
  );

  const dailyRevenue = dailyOrders.reduce(
    (prevAmount, order) => prevAmount + order?.netPayable,
    0
  );

  const monthlyRevenue = monthlyOrders.reduce(
    (prevAmount, order) => prevAmount + order?.netPayable,
    0
  );

  let lastSevenDaysOrdersByDate: Array<Array<Order>> = [];

  for (let i = 6; i >= 0; i--) {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - i);
    const ordersInADay = orders.filter(
      (o: Order) =>
        new Date(o?.orderTime).getDate() == currentDate.getDate() &&
        o?.orderTime <= Date.now() &&
        o?.paymentStatus !== "canceled"
    );
    lastSevenDaysOrdersByDate.push(ordersInADay || []);
  }

  let lastSevenDaysOrders: Order[] = [];
  lastSevenDaysOrders = lastSevenDaysOrders.concat(
    ...lastSevenDaysOrdersByDate
  );

  const lastSevenDaysRevenue = lastSevenDaysOrders.reduce(
    (prevAmount, order) => prevAmount + order?.netPayable,
    0
  );

  const monthlyChartLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const weeklyChartLabels = lastSevenDaysOrdersByDate?.map((eachDay) =>
    eachDay[0]?.orderTime
      ? `${new Date(eachDay[0]?.orderTime).getDate()} ${
          monthlyChartLabels[new Date(eachDay[0]?.orderTime).getMonth()]
        }`
      : "0"
  );

  const weeklyChartAmountData = lastSevenDaysOrdersByDate?.map((eachDay) =>
    eachDay.reduce(
      (prevAmount, currOrder) => prevAmount + currOrder?.netPayable,
      0
    )
  );

  const weeklyChartOrdersData = lastSevenDaysOrdersByDate?.map(
    (eachDay) => eachDay.length
  );

  let ordersByMonths: Array<Array<Order>> = [];
  for (let i = 0; i <= 11; i++) {
    const ordersInAMonth = orders.filter(
      (o: Order) =>
        new Date(o?.orderTime).getMonth() == i &&
        new Date(o?.orderTime).getFullYear() == new Date().getFullYear() &&
        o?.paymentStatus !== "canceled"
    );
    ordersByMonths.push(ordersInAMonth || []);
  }

  const monthlyChartAmountData = ordersByMonths?.map((eachMonth) =>
    eachMonth.reduce(
      (prevAmount, currOrder) => prevAmount + currOrder?.netPayable,
      0
    )
  );

  const monthlyChartOrdersData = ordersByMonths?.map(
    (eachMonth) => eachMonth.length
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
