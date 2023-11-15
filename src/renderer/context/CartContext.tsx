"use client";
import React, { createContext, useState, useContext, useEffect, SetStateAction, Dispatch } from "react";
import { CartItem, Product } from "../types/product";

interface CartContextType {
  cart: CartItem[];
  setCart: Dispatch<SetStateAction<CartItem[]>>;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  getTotalPrice: () => number;
  getItemTotalPrice: (item: CartItem) => number;
}
interface Props {
  children: React.ReactNode;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  getTotalPrice: () => 0,
  getItemTotalPrice: () => 0,
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<Props> = ({ children }): any => {
  const [cart, setCart] = useState<CartItem[] | any>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart: any[]) => {
      const existingCartItem = prevCart.find((item: { id: number; }) => item.id === product.id);
      const discountedPrice = product.discountable ? product.price - (product.price * product.discount) / 100 : product.price;
      if (existingCartItem) {
        return prevCart.map((item: { id: number; quantity: number; }) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, discountedPrice }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1, discountedPrice }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart: any[]) => prevCart.filter((item: { id: number; }) => item.id !== productId));
  };

  const increaseQuantity = (productId: number) => {
    setCart((prevCart: any[]) =>
      prevCart.map((item: { id: number; quantity: number; }) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCart((prevCart: any[]) =>
      prevCart.map((item: { id: number; quantity: number; }) => {
        return item.id === productId
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item;
      })
    );
  };

  const getTotalPrice = () => {
    return cart.length && cart.reduce((total: number, item: CartItem) => total + item.discountedPrice * item.quantity, 0);
  };

  const getItemTotalPrice = (item: CartItem) => {
    return item.discountedPrice * item.quantity;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        getTotalPrice,
        getItemTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
