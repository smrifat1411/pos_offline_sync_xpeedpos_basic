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
            <img style="width: 200px; height:100px; border-radius: 8px;" src="data:image/png;base64,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" alt="icon??">
        </div>
        <div style="display: flex; flex-direction:column">
            <p style="margin: 0; padding: 10px 0px 0px 0px; font-size:25px; font-weight:bold">Electro electro-world</p>
            <p style="margin: 0; padding: 10px 0px 0px 0px;">Shopping Mall, 4/b </p>
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
  <div style="display: flex; flex-direction:column; gap:15px; align-items: flex-end; padding: 30px 100px; background-color:#f2f2f2; width: 20%;">
  <!-- Total Calculation Row -->
    <!-- <table>
    <tr style="background-color:#ffffff;">
        <td colspan="8" style="padding: 30px 110px 0px 20px;">
            <div style="display: flex; justify-content: flex-end; flex-wrap: wrap;">
                <div style="flex: 0 0 100%; text-align: right; padding: 20px 0px 20px 0px;">
                    <span>Sub Total : ৳1450</span><br>
                    <span>Shipping Charge : ৳14</span><br>
                    <span>Total : ৳1450</span><br>
                    <span>Amount Paid : ৳1450</span><br>
                    <span>Due Balance : ৳0</span><br>
                </div>
            </div>
        </td>
      </tr>
  </table> -->

  <div style="display: flex; gap:10px; align-items:center; font-size:18px;">
    <p style="margin: 0px;">Sub Total :</p>
    <p style="margin: 0px; width: 50px; text-align:right;">৳${
      order.netPayable
    }</p>
  </div>
  <div style="display: flex; gap:10px; align-items:center; font-size:18px;">
    <p style="margin: 0px; ">Amount Paid :</p>
    <p style="margin: 0px; width: 50px; text-align:right;">${
      order.paymentStatus === 'payment done' ? order.netPayable : 'due'
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
