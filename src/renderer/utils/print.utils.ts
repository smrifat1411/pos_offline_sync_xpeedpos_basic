import { Customer } from 'renderer/types/customer.type';
import { Order, OrderItem } from '../types/order.type';
import { CartItem } from 'renderer/types/product';

// export const printChefSlip = async (order: Order) => {
//   try {
//     const newWin = window.open('', '', 'width=220, resizable=yes');

//     if (!newWin) {
//       throw new Error('Failed to open a new window for printing.');
//     }

//     newWin.document.write('<title>Electro Tech World</title>');
//     newWin.document.write(`
//       <section style="width: 50mm; margin: 0; padding: 0">
//       &emsp;&emsp;&emsp;&ensp;<img src='/images/printed-logo.png' alt='logo' fetchPriority='high' decoding='async' width='70' height='100' style='margin:0 auto'/>
//       <p>Customer Invoice: <br>
//       ----------------------------------<br/>
//       KOT: ${order?.kot}<br/>
//       ITEMS:<br/>
//       ${'  '}${order?.items
//         ?.map(
//           (item, index) => `&emsp;${index + 1}.${item.name} - ${item.quantity}`,
//         )
//         .join('<br/>')}<br/>
//       ORDER TIME: ${new Date(order?.orderTime).toLocaleString('en-BD', {
//         hour12: true,
//       })}
//       <section/>
//       `);
//     if (newWin.document.body) {
//       (newWin.document.body as HTMLElement).style.fontSize = '16px';
//       (newWin.document.body as HTMLElement).style.margin = '0px';
//       (newWin.document.body as HTMLElement).style.padding = '0px';
//     }
//     newWin.document.close();

//     // Wait for a short time before printing
//     await new Promise(resolve => setTimeout(resolve, 500));

//     newWin.print();
//   } catch (error) {
//     console.error('Error during printing:', error);
//   }
// };

// export const printCustomerSlip = (order: { _data: Order }) => {
//   const newWin = window.open('', '', 'width=220, resizable=yes');

//   newWin?.document?.write('<head><title>3PM Restaurant</title><head>');
//   newWin?.document?.write(`
//       <section style="width: 50mm; margin: 0; padding: 0">
//       &emsp;&emsp;&emsp;&ensp;<img decoding='async' fetchPriority='high' src='/images/printed-logo.png' alt='logo' width='100' height='130' style='margin:0 auto; text-align:center' />
//       <h3 style='text-align:center; margin: 0; padding: 0'>3PM Restaurant</h3>
//       <p style='text-align:center; margin-top: 0; padding: 0'>SA Tower, On the north side of Supriyo Pump, Panchagarh Road, Thakurgaon</p>
//       <p style='text-align:center; margin: 0; padding: 0; border-bottom: 1px dotted black'>Customer Slip:</p>
//       <p style='text-align:start; margin: 0; padding: 0'>ORDER #: ${
//         order._data.kot
//       }</p>
//       <p style='text-align:start; margin: 0; padding: 0'>Time: ${new Date(
//         order._data.orderTime,
//       ).toLocaleString('en-BD', { hour12: true })}</p>
//       <table style="width:100%; font-size:12px; text-decoration:none; font-weight:normal; border-collapse: collapse; ; margin: 0; padding: 0">
//         <tr>
//           <th>Name</th>
//           <th>Price</th>
//           <th>Quantity</th>
//           <th>Sub-total</th>
//         </tr>
//         ${order?._data?.items?.map(
//           (o) => `<tr>
//           <td style="text-align: center; border-top: 1px dotted black">${
//             o.name
//           }</td>
//           <td style="text-align: center; border-top: 1px dotted black">
//             ${
//               o.discountable
//                 ? `<p style="text-decoration-line: line-through; margin: 0; padding: 0">${o.price.toFixed(
//                     2,
//                   )}</p>
//             <p style="margin: 0;padding: 0"> - ${o.discount}%</p>`
//                 : ''
//             }
//             <p style="margin: 0;padding: 0">${o.discountedPrice.toFixed(2)}</p>
//           </td>
//           <td style="text-align: center; border-top: 1px dotted black">${
//             o.quantity
//           }</td>
//           <td style="text-align: center; border-top: 1px dotted black">${(
//             o.discountedPrice * o.quantity
//           ).toFixed(2)}</td>
//         </tr>`,
//         )}
//         <tr>
//           <td></td>
//           <td></td>
//           <td style="text-align: center; border-top: 1px dotted black">Sub Total </td>
//           <td style="text-align: center; border-top: 1px dotted black">${order?._data?.subTotal.toFixed(
//             2,
//           )}</td>
//         </tr>
//         <tr>
//           <td></td>
//           <td></td>
//           <td style="text-align: center; border-top: 1px dotted black">Discount(${order
//             ?._data?.discount}%) </td>
//           <td style="text-align: center; border-top: 1px dotted black">-${order?._data?.discountAmount.toFixed(
//             2,
//           )}</td>
//         </tr>
//         <tr>
//           <td></td>
//           <td></td>
//           <td style="text-align: center">VAT(${order?._data?.vat}%) </td>
//           <td style="text-align: center">+${order?._data?.vatAmount.toFixed(
//             2,
//           )}</td>
//         </tr>
//         <tr>
//           <td></td>
//           <td></td>
//           <td style="text-align: center; border-top: 1px dotted black">Net Payable </td>
//           <td style="text-align: center; border-top: 1px dotted black">${order?._data?.netPayable.toFixed(
//             2,
//           )}</td>
//         </tr>
//         <tr>
//           <td></td>
//           <td></td>
//           <td style="text-align: center; border-top: 1px dotted black">Cash Paid </td>

//         </tr>
//         <tr>
//           <td></td>
//           <td></td>
//           <td style="text-align: center; border-top: 1px dotted black">Change Amount </td>

//         </tr>
//         <tr>
//           <td></td>
//           <td></td>
//           <td style="text-align: center;">Pay with </td>
//           <td style="text-align: center;">${order?._data?.paymentMethod}</td>
//         </tr>
//       </table>
//       <h5 style="padding: 0; margin-bottom: 0; text-align: center" >Thank You for Coming</h5>
//       </section>`);
//   if (newWin?.document?.body) {
//     (newWin.document.body as HTMLElement).style.fontSize = '12px';
//     (newWin.document.body as HTMLElement).style.margin = '0px';
//     (newWin.document.body as HTMLElement).style.padding = '0px';
//   }
//   newWin?.document?.close();
//   newWin?.print();
// };

export function printContent(order: Order, customer: Customer): string {
  return `<body style="padding:10px 20px 20px 10px; width: 90%; margin:30px auto auto auto; border:0.8px solid #101e46;border-radius: 8px; font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">
<section>
<!-- top heading -->
    <div style="display: flex; align-items:center; justify-content:space-between; position:relative">
        <div>
            <img style="width: 200px; height:200px; border-radius: 8px;" src="data:image/png;base64,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" alt="icon??">
        </div>
        <div style="display: flex; flex-direction:column">
            <p style="margin: 0; padding: 10px 0px 0px 0px; font-size:25px; font-weight:bold">Electro Tech world</p>
            <p style="margin: 0; padding: 10px 0px 0px 0px;">3/2 Sultangonj Rd,Rayer Bazar</p>
            <div style="display: flex; flex-direction:column; gap:5px; margin: 0; padding: 10px 0px 0px 0px;">
                <div style="display: flex; align-items:center; gap:5px;">
                    <svg height="25px" width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 512 512" xml:space="preserve">
        <g>
        <path style="fill:#211E48;" d="M256.001,469.018c-7.951,0-14.396-6.445-14.396-14.396s6.445-14.396,14.396-14.396
        c45.477,0,88.314-17.904,120.618-50.413c5.603-5.639,14.719-5.669,20.358-0.063c5.639,5.604,5.669,14.718,0.063,20.358
        C359.29,448.097,309.202,469.018,256.001,469.018z"/>
        <path style="fill:#211E48;" d="M440.651,284.367c-7.951,0-14.396-6.445-14.396-14.396v-55.905
        c0-93.878-76.376-170.255-170.255-170.255S85.744,120.187,85.744,214.066c0,7.951-6.445,14.396-14.396,14.396
        s-14.396-6.445-14.396-14.396c0-109.755,89.291-199.046,199.046-199.046s199.046,89.291,199.046,199.046v55.905
        C455.047,277.922,448.602,284.367,440.651,284.367z"/>
        </g>
        <path style="fill:#B0DACC;" d="M266.851,482.584h-21.7c-15.166,0-27.575-12.409-27.575-27.575l0,0
        c0-15.166,12.409-27.575,27.575-27.575h21.7c15.166,0,27.575,12.409,27.575,27.575l0,0
        C294.424,470.177,282.016,482.584,266.851,482.584z"/>
        <path style="fill:#211E48;" d="M266.851,496.98h-21.7c-23.142,0-41.97-18.828-41.97-41.97s18.828-41.97,41.97-41.97h21.7
        c23.142,0,41.97,18.828,41.97,41.97S289.993,496.98,266.851,496.98z M245.149,441.83c-7.267,0-13.179,5.912-13.179,13.179
        s5.912,13.179,13.179,13.179h21.7c7.267,0,13.179-5.912,13.179-13.179s-5.912-13.179-13.179-13.179H245.149z"/>
        <path style="fill:#B0DACC;" d="M95.443,318.621H51.68c-20.591,0-37.285-16.693-37.285-37.285v-41.471
        c0-20.591,16.693-37.285,37.285-37.285h43.763V318.621z"/>
        <path style="fill:#211E48;" d="M95.443,333.017H51.68c-28.497,0-51.68-23.184-51.68-51.68v-41.472
        c0-28.496,23.183-51.679,51.679-51.679h43.763c7.951,0,14.396,6.445,14.396,14.396V318.62
        C109.838,326.571,103.393,333.017,95.443,333.017z M51.679,216.977c-12.621,0-22.888,10.267-22.888,22.888v41.472
        c0,12.621,10.267,22.888,22.888,22.888h29.367v-87.247L51.679,216.977L51.679,216.977z"/>
        <path style="fill:#B0DACC;" d="M103.339,337.278L103.339,337.278c-16.588,0-30.16-13.572-30.16-30.16v-93.034
c0-16.588,13.572-30.16,30.16-30.16l0,0c16.588,0,30.16,13.572,30.16,30.16v93.034C133.499,323.706,119.927,337.278,103.339,337.278
        z"/>
        <path style="fill:#211E48;" d="M103.339,351.674c-24.567,0-44.556-19.987-44.556-44.556v-93.034
        c0-24.567,19.987-44.556,44.556-44.556s44.556,19.987,44.556,44.556v93.034C147.894,331.687,127.908,351.674,103.339,351.674z
                   M103.339,198.321c-8.692,0-15.765,7.073-15.765,15.765v93.034c0,8.692,7.073,15.765,15.765,15.765s15.765-7.073,15.765-15.765
                  v-93.034C119.103,205.392,112.031,198.321,103.339,198.321z"/>
                    <path style="fill:#B0DACC;" d="M416.557,318.621h43.763c20.591,0,37.285-16.693,37.285-37.285v-41.471
                  c0-20.591-16.693-37.285-37.285-37.285h-43.763V318.621z"/>
                    <path style="fill:#211E48;" d="M460.321,333.017h-43.763c-7.951,0-14.396-6.445-14.396-14.396V202.583
                  c0-7.951,6.445-14.396,14.396-14.396h43.763c28.496,0,51.679,23.183,51.679,51.679v41.472
                  C512,309.833,488.817,333.017,460.321,333.017z M430.953,304.226h29.367c12.621,0,22.888-10.267,22.888-22.888v-41.472
                  c0-12.621-10.267-22.888-22.888-22.888h-29.367V304.226z"/>
                    <path style="fill:#B0DACC;" d="M408.661,337.278L408.661,337.278c16.588,0,30.16-13.572,30.16-30.16v-93.034
                  c0-16.588-13.572-30.16-30.16-30.16l0,0c-16.588,0-30.16,13.572-30.16,30.16v93.034
                  C378.501,323.706,392.073,337.278,408.661,337.278z"/>
                    <path style="fill:#211E48;" d="M408.661,351.674c-24.568,0-44.556-19.987-44.556-44.556v-93.034
                  c0-24.567,19.987-44.556,44.556-44.556s44.556,19.987,44.556,44.556v93.034C453.217,331.687,433.229,351.674,408.661,351.674z
                  M408.661,198.321c-8.692,0-15.765,7.073-15.765,15.765v93.034c0,8.692,7.073,15.765,15.765,15.765
                  c8.692,0,15.765-7.073,15.765-15.765v-93.034C424.426,205.392,417.353,198.321,408.661,198.321z"/>
                    </svg>
                    <p style="margin: 0;">
                        019299272387
                    </p>
                </div>

                <div style="display: flex; align-items:center; gap:5px;">
                    <svg height="25px" width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 512 512" xml:space="preserve">
                    <path style="fill:#211E48;" d="M468.481,451.494h-59.412c-7.906,0-14.317-6.41-14.317-14.317s6.411-14.317,14.317-14.317h59.412
                  c8.208,0,14.886-6.679,14.886-14.886V104.027c0-8.209-6.679-14.886-14.886-14.886H43.519c-8.208-0.001-14.886,6.677-14.886,14.886
                  v303.948c0,8.209,6.679,14.886,14.886,14.886h299.562c7.906,0,14.317,6.41,14.317,14.317s-6.411,14.317-14.317,14.317H43.519
                  C19.523,451.494,0,431.97,0,407.975V104.027C0,80.03,19.523,60.506,43.519,60.506h424.961c23.997,0,43.52,19.523,43.52,43.519
                  v303.948C512,431.97,492.478,451.494,468.481,451.494z"/>
                    <path style="fill:#B0DACC;" d="M480.552,125.359L271.485,284.769c-9.145,6.974-21.823,6.974-30.968,0L31.448,125.359
                  c-19.435-14.819-8.955-45.846,15.483-45.846h418.136C489.507,79.513,499.987,110.54,480.552,125.359z"/>
                    <path style="fill:#211E48;" d="M256,304.316c-8.68,0-17.263-2.898-24.165-8.162L22.766,136.743
                  C8.948,126.206,3.612,108.761,9.174,92.297c5.561-16.464,20.381-27.101,37.758-27.101h418.136c17.377,0,32.198,10.637,37.758,27.101
                  c5.561,16.464,0.225,33.91-13.594,44.446L280.165,296.154C273.263,301.416,264.68,304.316,256,304.316z M46.931,93.829
                  c-7.473,0-10.026,5.841-10.63,7.631c-0.604,1.79-2.116,7.983,3.827,12.514l209.069,159.411c1.971,1.503,4.324,2.298,6.803,2.298
                  c2.478,0,4.832-0.795,6.803-2.298l209.067-159.411c5.943-4.531,4.434-10.723,3.828-12.514c-0.604-1.79-3.158-7.631-10.631-7.631
                  H46.931z"/>
                    <path style="fill:#B0DACC;" d="M162.942,277.697c0-15.648,17.539-26.735,24.849-39.371c7.542-13.037,8.631-33.687,21.668-41.229
                  c12.636-7.311,30.892,1.858,46.54,1.858s33.904-9.17,46.54-1.86c13.037,7.542,14.126,28.194,21.668,41.229
                  c7.311,12.636,24.849,23.723,24.849,39.371s-17.539,26.735-24.849,39.371c-7.542,13.037-8.631,33.687-21.668,41.229
                  c-12.636,7.311-30.892-1.858-46.54-1.858s-33.904,9.17-46.54,1.86c-13.037-7.542-14.126-28.194-21.668-41.  229
                  C180.482,304.432,162.942,293.345,162.942,277.697z"/>
                    <path style="fill:#211E48;" d="M290.559,375.442c-6.795,0-13.412-1.317-19.813-2.593c-5.409-1.078-10.52-2.096-14.746-2.096
                  c-4.226,0-9.336,1.018-14.746,2.096c-6.4,1.274-13.017,2.593-19.81,2.593c-7.36,0-13.625-1.555-19.153-4.753
                  c-13.1-7.579-17.846-21.808-21.66-33.243c-1.686-5.059-3.281-9.837-5.231-13.208c-1.805-3.121-5.045-6.72-8.474-10.53
                  c-8.153-9.061-18.301-20.337-18.301-36.01s10.146-26.949,18.299-36.01c3.43-3.811,6.669-7.41,8.474-10.53
                  c1.951-3.372,3.545-8.15,5.231-13.21c3.814-11.433,8.56-25.664,21.658-33.243c5.528-3.198,11.793-4.753,19.153-4.753
                  c6.793,0,13.41,1.317,19.81,2.593c5.41,1.077,10.521,2.094,14.747,2.094c4.226,0,9.336-1.018,14.747-2.094
                  c6.4-1.274,13.017-2.593,19.81-2.593c7.36,0,13.625,1.555,19.153,4.753c13.1,7.579,17.847,21.81,21.66,33.244
                  c1.688,5.058,3.281,9.837,5.231,13.208c1.804,3.12,5.042,6.719,8.473,10.528c8.153,9.061,18.301,20.335,18.301,36.01
                  s-10.148,26.949-18.301,36.01c-3.43,3.811-6.669,7.41-8.474,10.53c-1.948,3.37-3.543,8.148-5.228,13.207
                  c-3.814,11.435-8.56,25.667-21.661,33.246C304.181,373.887,297.917,375.442,290.559,375.442z M256,342.121
                  c7.049,0,13.807,1.346,20.34,2.647c5.27,1.049,10.246,2.04,14.218,2.04c2.188,0,3.762-0.296,4.813-0.903
                  c3.711-2.147,6.434-10.314,8.838-17.519c2.064-6.193,4.201-12.596,7.606-18.487c3.304-5.711,7.712-10.609,11.974-15.346
                  c5.384-5.983,10.951-12.169,10.951-16.856c0-4.687-5.568-10.873-10.951-16.856c-4.263-4.737-8.672-9.635-11.973-15.344
                  c-3.409-5.891-5.543-12.294-7.609-18.487c-2.402-7.206-5.127-15.373-8.836-17.519c-1.051-0.608-2.626-0.903-4.813-0.903
                  c-3.97,0-8.948,0.991-14.218,2.04c-6.533,1.301-13.29,2.647-20.34,2.647s-13.805-1.346-20.34-2.647
                  c-5.27-1.049-10.248-2.04-14.218-2.04c-2.188,0-3.762,0.296-4.815,0.903c-3.708,2.146-6.432,10.312-8.835,17.516
                  c-2.066,6.195-4.202,12.599-7.611,18.491c-3.303,5.709-7.711,10.607-11.973,15.344c-5.383,5.983-10.951,12.169-10.951,16.856
                  c0,4.689,5.568,10.875,10.951,16.858c4.263,4.737,8.67,9.634,11.974,15.345c3.409,5.891,5.545,12.295,7.609,18.49
                  c2.404,7.206,5.127,15.372,8.836,17.518c1.051,0.608,2.626,0.903,4.813,0.903c3.969,0,8.948-0.991,14.218-2.042
                  C242.195,343.466,248.951,342.121,256,342.121z"/>
                    </svg>
                    <p style="margin: 0;">email_address@email.com</p>
                </div>
            </div>
        </div>
  <!-- <div style="position:absolute">
    <img style="width: 80%;" src="bg.png" alt="bg?">
  </div> -->
    </div>
<!-- hr tag {invoice} -->
<div style="display: flex; align-items: center; justify-content: center; margin-bottom: 20px;  width:65%; margin:auto; padding:30px 0px 20px 0px; font-weight:bold;">
    <span style="flex: 1; height: 1px; background-color: #434141; margin: 0 10px;"></span>
    <span style="font-size: 30px; font-weight: bold;">INVOICE</span>
    <span style="flex: 1; height: 1px; background-color: #3d3c3c; margin: 0 10px;"></span>
</div>

<!-- bill to and invoice no. -->
<div style="display: flex; align-items:center; justify-content:space-between">
  <div>
    <p style="margin: 0; padding:10px 0px 0px 0px; font-size:18px;">Bill/Ship To : ${
      customer.name
    }</p>
    <p style="margin: 0; padding:10px 0px 0px 0px;">Mobile : ${
      customer.mobile
    }</p>
  </div>
  <div>
    <p style="margin: 0; padding:10px 0px 0px 0px; font-family: 'Inter', sans-serif; font-size:18px;">invoice# : ${
      order.orderTime
    }</p>
    <p style="margin: 0; padding:10px 0px 0px 0px; font-family: 'Inter', sans-serif;">Billing Date: ${new Date(
      order.orderTime,
    ).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    })}</p>
    <p style="margin: 0; padding:10px 0px 0px 0px;">${
      order.paymentMethod !== null ? `Paid by : ${order.paymentMethod}` : ''
    }</p>

  </div>
</div>
<!-- items table -->
<div>
  <table style="width:100%; border-collapse: collapse; margin:15px 0px 20px 0px">
    <!-- Header Row -->
    <tr style="background-color:darkgreen; color:white;">
        <th style="padding: 10px; text-align:left;">#</th>
        <th style="padding: 10px; text-align:left;">Items</th>
        <th style="padding: 10px; text-align:left;">Quantity</th>
        <th style="padding: 10px; text-align:left;">Rate</th>
        <th style="padding: 10px; text-align:left;">Discounts %</th>
        <th style="padding: 10px; text-align:left;">Amount</th>
    </tr>

    <!-- First Item Row -->
    ${order.items.map((item: CartItem, i: number) => {
      const discountedAmount: number =
        item.discount !== undefined
          ? (item.discount * item.sellingPrice) / 100
          : 0;
      return `<tr style="background-color:${i % 2 === 0 ? '#fff' : '#f2f2f2'};">

        <td style="padding: 10px;">${i + 1}</td>
        <td style="padding: 10px;">${item.name}</td>
        <td style="padding: 10px;">${item.quantity}</td>
        <td style="padding: 10px;">৳${item.sellingPrice}</td>
        <td style="padding: 10px;">${item.discount}%</td>
        <td style="padding: 10px;">${item.sellingPrice - discountedAmount}</td>
    </tr>
        `;
    })}


  </table>
</div>
  <!-- calculation div should placed bellow amount row -->
<div style="display: flex; justify-content:flex-end; padding:10px 0px 0px 0px;">
  <div style="display: flex; flex-direction:column; gap:15px; align-items: flex-end; padding: 20px 40px; background-color:#f2f2f2;">

  <div style="display: flex; gap:10px; align-items:center; font-size:18px; font-weight:bold;">
    <p style="margin: 0px;">Sub Total :</p>
    <p style="margin: 0px; text-align:right; font-weight:bold;">৳${
      order.netPayable
    }</p>
  </div>
  <div style="display: flex; gap:10px; align-items:center; font-size:18px; font-weight:bold;">
    <p style="margin: 0px; ">Amount Paid :</p>
    <p style="margin: 0px; text-align:right; font-weight:bold;">৳${
      order.paymentStatus === 'payment done' ? order.cashPaid : 'due'
    }</p>
  </div>
  <div style="display: flex; gap:10px; align-items:center; font-size:18px; font-weight:bold;">
    <p style="margin: 0px; ">Change Amount :</p>
    <p style="margin: 0px; text-align:right; font-weight:bold;">৳${
      order.paymentStatus === 'payment done' ? order.changeAmount : 'due'
    }</p>
  </div>

</div>
</div>
<div style="font-family: monospace; font-size:15px;">
  <p>Terms & Conditions :</p>
  <p>All services provided are subject to the terms and conditions outlined in the contract agreement letter.</p>
</div>
</section>
</body>`;
}
