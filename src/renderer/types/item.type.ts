export interface Item {
  _id?: number;
  itemName?: string;
  quantity?: string;
  totalPrice?: number;
  purchasedDate?: string;
  isOnline?: boolean;
}

export interface RxItem {
  _data: Item;
}
