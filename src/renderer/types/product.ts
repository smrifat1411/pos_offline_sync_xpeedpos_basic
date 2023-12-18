// types/product.ts

export interface resProduct {
  name: 'string';
  category: 'string';
  description: 'string';
  // "img": "string",
  price: 0;
}

export interface Product {

  id?: number;
  name: string;
  category: string;
  sellingPrice: number;
  discountable?: number;
  discount?: number;
  buyingPrice: number;
  stockAmount: number;
  company?: string;
  isDeleted?: boolean;
}
export interface CartItem extends Product {
  discountedPrice: number;
  quantity: number;
  product_id?: number;
}

export interface finalProduct extends Product {
  isOnline: boolean;
}
