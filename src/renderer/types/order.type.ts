import { CartItem } from './product';

export interface Order {
  order_id?:string
  items: CartItem[];
  kot: number;
  orderTime: number;
  paymentStatus: string;
  subTotal: number;
  discount: number;
  discountAmount: number;
  vat: number;
  vatAmount: number;
  netPayable: number;
  cashPaid?: number;
  changeAmount?: number;
  paymentMethod?: string;
}
