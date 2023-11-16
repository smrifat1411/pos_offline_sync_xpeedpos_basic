"use client"
import React, { createContext, useState, useContext, useEffect } from "react";
import { CartItem, Product } from "../types/product";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  getTotalPrice: () => number;
  getItemTotalPrice: (item: CartItem) => number;
  clearCart: () => void;
  updateQuantity: (itemId: number, newQuantity: number) => void;
}

interface Props {
  children: React.ReactNode;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  getTotalPrice: () => 0,
  getItemTotalPrice: () => 0,
  clearCart: () => {},
  updateQuantity: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<Props> = ({ children }): React.ReactNode => {
  const [cart, setCart] = useState<CartItem[]>([]);

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
    setCart((prevCart:any) => {
      const existingCartItem = prevCart.find((item:Product) => item.id === product.id);
      if (existingCartItem) {
        return prevCart.map((item:any) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const increaseQuantity = (productId: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId) {
          const newQuantity = Math.max(item.quantity - 1, 0);
          if (newQuantity === 0) {
            removeFromCart(item.id);
          }
          return { ...item, quantity: newQuantity };
        } else {
          return item;
        }
      })
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getItemTotalPrice = (item: CartItem) => {
    return item.price * item.quantity;
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        getTotalPrice,
        getItemTotalPrice,
        clearCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
