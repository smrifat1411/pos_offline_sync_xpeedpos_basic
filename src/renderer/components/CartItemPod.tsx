import { Add, Cancel, Clear, Remove } from "@mui/icons-material";
import { useCart } from "../context/CartContext";
import React from "react";

const CartItemPod: React.FC = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getItemTotalPrice,
  } = useCart();

  return (
    <>
      { cart.map((item, i) => (
        <div key={i} className="relative border-b p-2">
          <div className="flex justify-between items-end text-base sm:text-lg md:text-xl 2xl:text-2xl">
            <p className="font-semibold text-gray-900">{item.name}</p>
            <div className="text-end">
              {item.discountable ? (
                <p className="text-xs text-gray-600">
                  <span className="line-through">{item.price}</span> -{" "}
                  {item.discount}% = {item.discountedPrice}{" "}
                  <span className="font-thin">tk</span>
                </p>
              ) : (
                <p className="text-xs text-gray-600">
                  {item.discountedPrice} <span className="font-thin">tk</span>
                </p>
              )}
              <div className="font-semibold text-gray-900">
                <p>
                  {getItemTotalPrice(item)}{" "}
                  <span className="text-xs font-normal text-gray-400">TK</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-stretch items-stretch text-xl">
            <button
              className="flex items-center justify-center grow rounded-l-md bg-gray-200 p-1 transition hover:bg-black hover:text-white"
              onClick={ () => item.id && decreaseQuantity( item.id)}
            >
              <Remove fontSize="large" />
            </button>
            <div className="flex items-center justify-center grow bg-gray-100 p-1 uppercase transition">
              {item.quantity}
            </div>
            <button
              className="flex items-center justify-center grow rounded-r-md bg-gray-200 p-1 transition hover:bg-black hover:text-white"
              onClick={() =>item.id &&  increaseQuantity( item.id)}
            >
              <Add fontSize="large" />
            </button>
            <button
              type="button"
              className="flex items-center justify-center grow rounded p-1 ml-2 text-center text-white transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900 bg-orange-400"
              onClick={() => item.id &&  removeFromCart(item.id)}
            >
              <Clear fontSize="large" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartItemPod;
