// types/product.ts
export interface Product {
  id?: number;
  name: string;
  category: string
  price: number;
  discountable?: boolean;
  discount?: number;
}

export interface resProduct {
  name: 'string';
  category: 'string';
  description: 'string';
  // "img": "string",
  price: 0;
}

export interface CartItem extends Product {
  discountedPrice: number;
  quantity: number;
}

export interface finalProduct extends Product {
  isOnline: boolean;
}
