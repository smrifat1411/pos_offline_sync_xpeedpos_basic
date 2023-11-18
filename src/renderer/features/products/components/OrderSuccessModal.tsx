// Import necessary dependencies
import { Button, Modal, Box } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Order } from 'renderer/types/order.type';
import logo from '../../../assets/images/logo.png';
import { PrintTwoTone } from '@mui/icons-material';
import OrderPaymentModal from 'renderer/features/orders/components/OrderPaymentModal';

type Props = {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  newOrder: Order;
};

const OrderSuccessModal = ({
  isOpenModal,
  setIsOpenModal,
  newOrder,
}: Props) => {
  const [isOpenPaymentModal, setIsOpenPaymentModal] = useState(false);

  // HTML content to be printed
  const printContent = `
  <section style="margin: 0; padding: 0">
  &emsp;&emsp;&emsp;&ensp;<img decoding='async' fetchPriority='high'  src="file://${logo}"alt='logo' width='100' height='130' style='margin:0 auto; text-align:center' />
  <h3 style='text-align:center; margin: 0; padding: 0'>Electro Tech World</h3>
  <p style='text-align:center; margin-top: 0; padding: 0'>SA Tower, On the north side of Supriyo Pump, Panchagarh Road, Thakurgaon</p>
  <p style='text-align:center; margin: 0; padding: 0; border-bottom: 1px dotted black'>Customer Slip:</p>
  <p style='text-align:start; margin: 0; padding: 0'>ORDER #: ${
    newOrder.kot
  }</p>
  <p style='text-align:start; margin: 0; padding: 0'>Time: ${new Date(
    newOrder.orderTime,
  ).toLocaleString('en-BD', { hour12: true })}</p>
  <table style="width:100%; font-size:12px; text-decoration:none; font-weight:normal; border-collapse: collapse; ; margin: 0; padding: 0">
    <tr>
      <th>Name</th>
      <th>Quantity</th>
      <th>Price</th>
      <th>Sub-total</th>
    </tr>
    ${newOrder.items?.map(
      (o) => `<tr>
      <td style="text-align: center; border-top: 1px dotted black">${
        o.name
      }</td>

      <td style="text-align: center; border-top: 1px dotted black">${
        o.quantity
      }</td>
      <td style="text-align: center; border-top: 1px dotted black">${o.sellingPrice.toFixed(
        2,
      )}</td>
      <td style="text-align: center; border-top: 1px dotted black">${(
        o.sellingPrice * o.quantity
      ).toFixed(2)}</td>
    </tr>`,
    )}
    <tr>
      <td></td>
      <td></td>
      <td style="text-align: center; border-top: 1px dotted black">Sub Total </td>
      <td style="text-align: center; border-top: 1px dotted black">${newOrder.subTotal.toFixed(
        2,
      )}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td style="text-align: center; border-top: 1px dotted black">Discount(${
        newOrder.discount
      }%) </td>
      <td style="text-align: center; border-top: 1px dotted black">-${newOrder.discountAmount.toFixed(
        2,
      )}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td style="text-align: center">VAT(${newOrder.vat}%) </td>
      <td style="text-align: center">+${newOrder.vatAmount.toFixed(2)}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td style="text-align: center; border-top: 1px dotted black">Net Payable </td>
      <td style="text-align: center; border-top: 1px dotted black">${newOrder.netPayable.toFixed(
        2,
      )}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td style="text-align: center; border-top: 1px dotted black">Cash Paid </td>

    </tr>
    <tr>
      <td></td>
      <td></td>
      <td style="text-align: center; border-top: 1px dotted black">Change Amount </td>

    </tr>
    <tr>
      <td></td>
      <td></td>
      <td style="text-align: center;">Pay with </td>
      <td style="text-align: center;">${newOrder.paymentMethod}</td>
    </tr>
  </table>
  <h5 style="padding: 0; margin-bottom: 0; text-align: center" >Thank You for Coming</h5>
  </section>`;

  // Function to handle the print action
  const handlePrint = async () => {
    const dataUrl = `data:text/html;charset=UTF-8,${encodeURIComponent(
      printContent,
    )}`;

    const img = new Image();
    img.onload = () => {
      // Call printOrPreviewComponent with the data URL after the image is loaded
      window.electron.printOrPreviewComponent(dataUrl, true);
    };
    img.src = logo;
  };
  return (
    <div>
      <Modal
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="rounded border-gray-300 w-11/12 sm:w-3/4 lg:w-2/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl p-4 text-center">
          <FontAwesomeIcon
            icon={faCheck}
            className="text-center mx-auto text-[#21e321] w-20 h-20"
          />
          <h4 className="text-3xl text-green-600">
            Order Created Successfully
          </h4>
          <div className="text-start w-3/4 mx-auto mt-3" id="slipArea">
            {/* ... Other content ... */}
          </div>

          <div className="w-full flex justify-between gap-2 mt-2">
            <Button
              onClick={() => {
                setIsOpenModal(false);
              }}
              component="label"
              variant="contained"
              color="warning"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                setIsOpenPaymentModal(true);
              }}
              component="label"
              variant="contained"
              color="success"
            >
              Make Payment
            </Button>

            <Button
              onClick={() => {
                // window.electron.printComponent(printContent)
                handlePrint();
              }}
              component="label"
              variant="contained"
              color="info"
            >
              <PrintTwoTone></PrintTwoTone> Without Payment
            </Button>
          </div>
        </Box>
      </Modal>
      <OrderPaymentModal
        isOpenPaymentModal={isOpenPaymentModal}
        setIsOpenPaymentModal={setIsOpenPaymentModal}
        order={newOrder}
      />
    </div>
  );
};

export default OrderSuccessModal;
