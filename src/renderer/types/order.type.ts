import { CartItem } from './product';

export interface Order {
  id?: number;
  items: CartItem[];
  orderTime: number;
  paymentStatus: string;
  subTotal: number;
  discount?: number | undefined;
  discountAmount?: number | undefined;
  vat?: number | undefined;
  vatAmount?: number | undefined;
  netPayable: number;
  cashPaid?: number | undefined;
  changeAmount?: number | undefined;
  paymentMethod?: string | undefined;
  customerId?: number | undefined;
}
export interface OrderItem {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
}
