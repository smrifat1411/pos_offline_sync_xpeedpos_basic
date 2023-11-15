import { Order } from "../types/order.type";

export const printChefSlip = (order: { _data: Order }) => {
  const newWin = window.open("", "", "width=220, resizable=yes");

  newWin?.document?.write("<title>3PM Restaurant</title>");
  newWin?.document?.write(`
    <section style="width: 50mm; margin: 0; padding: 0">
    &emsp;&emsp;&emsp;&ensp;<img src='/images/printed-logo.png' alt='logo' fetchPriority='high' decoding='async' width='70' height='100' style='margin:0 auto' />
    <p>Chef's Job Slip: <br>
    ----------------------------------<br/>
    KOT: ${order?._data?.kot}<br/>
    TABLES: ${order?._data?.tables?.toString()}<br/>
    ITEMS:<br/>
    ${"  "}${order?._data?.items
    ?.map((item, index) => `&emsp;${index + 1}.${item.name} - ${item.quantity}`)
    .join("<br/>")}<br/>
    ORDER TIME: ${new Date(order?._data?.orderTime).toLocaleString("en-BD", {
      hour12: true,
    })}
    <section/>
    `);
  newWin.document.body.style.fontSize = "16px";
  newWin.document.body.style.margin = "0px";
  newWin.document.body.style.padding = "0px";
  newWin?.document?.close();
  newWin?.print();
};

export const printCustomerSlip = (order: { _data: Order }) => {
  const newWin = window.open("", "", "width=220, resizable=yes");

  newWin?.document?.write("<head><title>3PM Restaurant</title><head>");
  newWin?.document?.write(`
      <section style="width: 50mm; margin: 0; padding: 0">
      &emsp;&emsp;&emsp;&ensp;<img decoding='async' fetchPriority='high' src='/images/printed-logo.png' alt='logo' width='100' height='130' style='margin:0 auto; text-align:center' />
      <h3 style='text-align:center; margin: 0; padding: 0'>3PM Restaurant</h3>
      <p style='text-align:center; margin-top: 0; padding: 0'>SA Tower, On the north side of Supriyo Pump, Panchagarh Road, Thakurgaon</p>
      <p style='text-align:center; margin: 0; padding: 0; border-bottom: 1px dotted black'>Customer Slip:</p>
      <p style='text-align:start; margin: 0; padding: 0'>ORDER #: ${
        order._data.kot
      }</p>
      <p style='text-align:start; margin: 0; padding: 0'>Tables: ${order._data.tables.toString()}</p>
      <p style='text-align:start; margin: 0; padding: 0'>Time: ${new Date(
        order._data.orderTime
      ).toLocaleString("en-BD", { hour12: true })}</p>
      <table style="width:100%; font-size:12px; text-decoration:none; font-weight:normal; border-collapse: collapse; ; margin: 0; padding: 0">
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Sub-total</th>
        </tr>
        ${order?._data?.items?.map(
          (o) => `<tr>
          <td style="text-align: center; border-top: 1px dotted black">${
            o.name
          }</td>
          <td style="text-align: center; border-top: 1px dotted black">
            ${
              o.discountable
                ? `<p style="text-decoration-line: line-through; margin: 0; padding: 0">${o.price.toFixed(
                    2
                  )}</p>
            <p style="margin: 0;padding: 0"> - ${o.discount}%</p>`
                : ""
            }
            <p style="margin: 0;padding: 0">${o.discountedPrice.toFixed(2)}</p>
          </td>
          <td style="text-align: center; border-top: 1px dotted black">${
            o.quantity
          }</td>
          <td style="text-align: center; border-top: 1px dotted black">${(
            o.discountedPrice * o.quantity
          ).toFixed(2)}</td>
        </tr>`
        )}
        <tr>
          <td></td>
          <td></td>
          <td style="text-align: center; border-top: 1px dotted black">Sub Total </td>
          <td style="text-align: center; border-top: 1px dotted black">${order?._data?.subTotal.toFixed(
            2
          )}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td style="text-align: center; border-top: 1px dotted black">Discount(${order?._data?.discount}%) </td>
          <td style="text-align: center; border-top: 1px dotted black">-${order?._data?.discountAmount.toFixed(
            2
          )}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td style="text-align: center">VAT(${order?._data?.vat}%) </td>
          <td style="text-align: center">+${order?._data?.vatAmount.toFixed(2)}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td style="text-align: center; border-top: 1px dotted black">Net Payable </td>
          <td style="text-align: center; border-top: 1px dotted black">${order?._data?.netPayable.toFixed(
            2
          )}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td style="text-align: center; border-top: 1px dotted black">Cash Paid </td>
          <td style="text-align: center; border-top: 1px dotted black">${order?._data?.cashPaid.toFixed(
            2
          )}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td style="text-align: center; border-top: 1px dotted black">Change Amount </td>
          <td style="text-align: center; border-top: 1px dotted black">${order?._data?.changeAmount.toFixed(
            2
          )}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td style="text-align: center;">Pay with </td>
          <td style="text-align: center;">${order?._data?.paymentMethod}</td>
        </tr>
      </table>
      <h5 style="padding: 0; margin-bottom: 0; text-align: center" >Thank You for Coming</h5>
      </section>`);
  newWin.document.body.style.fontSize = "12px";
  newWin.document.body.style.margin = "0px";
  newWin.document.body.style.padding = "0px";
  newWin?.document?.close();
  newWin?.print();
};
