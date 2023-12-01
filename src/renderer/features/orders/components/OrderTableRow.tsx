import { Order } from '../../../types/order.type';
import {
  faBangladeshiTakaSign,
  faEye,
  faMoneyCheckAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Chip,
  TableCell,
  TableRow,
  styled,
  tableCellClasses,
} from '@mui/material';
import { useEffect, useState } from 'react';
import OrderViewModal from './OrderViewModal';
import OrderPaymentModal from './OrderPaymentModal';

type Props = { order: Order };

const OrderTableRow = ({ order }: Props) => {
  const [isOpenViewModal, setIsOpenViewModal] = useState(false);
  const [isOpenPaymentModal, setIsOpenPaymentModal] = useState(false);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <StyledTableRow key={order?.id}>
      <StyledTableCell component="th" scope="row">
        <div className="flex justify-center items-start flex-col w-full h-full">
          <p className="capitalize text-lg">{order?.id}</p>
          <p className="capitalize text-gray-400 text-xs">
            Time:{' '}
            {new Date(order?.orderTime).toLocaleString('en-BD', {
              hour12: true,
            })}
          </p>
        </div>
      </StyledTableCell>
      <StyledTableCell className="" align="left">
        <div className="flex flex-col w-full h-full">
          <p className="text-lg">
            <FontAwesomeIcon
              icon={faBangladeshiTakaSign}
              className="mr-0.5 w-3"
            />
            {order?.netPayable.toFixed(2)}
          </p>
          <p className="capitalize text-gray-400 text-xs">
            {/* Tables: {order?._data?.tables.toString()} */}
          </p>
        </div>
      </StyledTableCell>
      <StyledTableCell className="" align="right">
        <div className="flex flex-col gap-1 max-w-[140px] mx-auto h-full">
          <Chip
            label={order?.paymentStatus}
            color={
              order?.paymentStatus === 'Pending'
                ? 'warning'
                : order?.paymentStatus === 'payment done'
                ? 'success'
                : 'error'
            }
            variant={
              order?.paymentStatus === 'canceled' ? 'outlined' : 'filled'
            }
          />
          <p className="capitalize text-blue-600 text-xs font-bold text-center">
            Pay With: {order?.paymentMethod}
          </p>
        </div>
      </StyledTableCell>
      <StyledTableCell align="right">
        <div className="flex gap-2 justify-end items-center w-full h-full">
          <button
            className="p-2 flex gap-1 justify-center items-center bg-lime-400 hover:bg-slate-600 hover:text-slate-50 hover:shadow hover:scale-110 transition-all shadow-sm rounded-sm"
            onClick={() => setIsOpenPaymentModal(true)}
          >
            <FontAwesomeIcon icon={faEye} />
            View
          </button>
          {/* <button
            className={`p-2 flex gap-1 justify-center items-center bg-blue-950 hover:bg-blue-200 hover:text-black text-slate-50 hover:shadow hover:scale-110 transition-all shadow-sm rounded-sm`}
            onClick={() => setIsOpenPaymentModal(true)}
          >
            <FontAwesomeIcon icon={faMoneyCheckAlt} />
            Pay
          </button> */}
        </div>
      </StyledTableCell>
      <OrderViewModal
        isOpenViewModal={isOpenViewModal}
        setIsOpenViewModal={setIsOpenViewModal}
        order={order}
      />
      {
        <OrderPaymentModal
          isOpenPaymentModal={isOpenPaymentModal}
          setIsOpenPaymentModal={setIsOpenPaymentModal}
          order={order}
        />
      }
    </StyledTableRow>
  );
};

export default OrderTableRow;
