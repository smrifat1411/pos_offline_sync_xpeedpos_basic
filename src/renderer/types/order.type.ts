import { CartItem } from "./product";

export interface Order {
    items: CartItem[];
    kot: number;
    orderTime: number;
    tables: string[];
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
    isOnline?: boolean;
}