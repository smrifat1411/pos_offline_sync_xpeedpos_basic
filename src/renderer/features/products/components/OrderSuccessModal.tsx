// Import necessary dependencies
import { Button, Modal, Box } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Order } from 'renderer/types/order.type';
import logo from '../../../assets/images/logo.png';
import { PrintTwoTone } from '@mui/icons-material';
import OrderPaymentModal from 'renderer/features/orders/components/OrderPaymentModal';
import { printContent } from 'renderer/utils/print.utils';

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

  // Function to handle the print action
  // const handlePrint = async () => {
  //   window.electron.printOrPreviewComponent(printContent, true);
  // };
  return (
    <div>
      <Modal
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="rounded border-gray-300 w-[420px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl p-4 text-center">
          <FontAwesomeIcon
            icon={faCheck}
            className="text-center mx-auto text-[#21e321] w-20 h-20"
          />
          <h4 className="text-3xl text-green-600">
            Order Created Successfully
          </h4>

          <div className="w-full flex justify-evenly gap-2 mt-2">
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
                setIsOpenModal(false);
              }}
              component="label"
              variant="contained"
              color="success"
            >
              Make Payment
            </Button>
            {/*
            <Button
              onClick={() => {
                handlePrint();
              }}
              component="label"
              variant="contained"
              color="info"
            >
              <PrintTwoTone></PrintTwoTone> Without Payment
            </Button> */}
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
