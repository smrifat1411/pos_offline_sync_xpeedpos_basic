import { Order } from "../../../types/order.type";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Modal } from "@mui/material";

import { Dispatch, SetStateAction } from "react";
import PrintTwoToneIcon from '@mui/icons-material/PrintTwoTone';
import DoDisturbOnTwoToneIcon from '@mui/icons-material/DoDisturbOnTwoTone';
import { printChefSlip } from "../../../utils/print.utils";

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


  return (
    <Modal
      open={isOpenModal}
      onClose={() => setIsOpenModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="rounded border-gray-300 w-11/12 sm:w-3/4 lg:w-2/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl p-4 text-center">
        <FontAwesomeIcon icon={faCheck} className="text-center mx-auto text-[#21e321] w-20 h-20" />
        <h4 className="text-3xl text-green-600">Order Created Successfully</h4>
        <div className="text-start w-3/4 mx-auto mt-3" id="slipArea">
          <p className="text-xl">
            <span className="font-semibold">KOT:</span> {newOrder?.kot}
          </p>
          <p className="text-xl">
            <span className="font-semibold">TABLES:</span>{" "}
            {newOrder?.tables?.toString()}
          </p>
          <p className="text-xl">
            <span className="font-semibold">ITEMS:</span>{" "}
            {newOrder?.items?.map((i) => `${i.name}(${i.quantity})`).toString()}
          </p>
          <p className="text-xl">
            <span className="font-semibold">ORDER TIME:</span>{" "}
            {new Date(newOrder.orderTime).toLocaleString("en-BD", {
              hour12: true,
            })}
          </p>
        </div>
        <div className="w-full flex justify-center gap-2 mt-2">
          <Button
            onClick={() => {
              setIsOpenModal(false);
              // router.push("/orders");
            }}
            component="label"
            variant="contained"
            color="warning"
            startIcon={<DoDisturbOnTwoToneIcon />}
          >Close</Button>

          <Button
            onClick={() => printChefSlip({_data: newOrder})}
            component="label"
            variant="contained"
            color="success"
            startIcon={<PrintTwoToneIcon />}
          >Print Slip for Chef</Button>
        </div>
      </Box>
    </Modal>
  );
};

export default OrderSuccessModal;
