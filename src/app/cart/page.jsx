import React from "react";
import CartItem from "./CartItem";
import { Button } from "@mui/material";
import Link from "next/link";

const Cart = () => {
  return (
    <div className="bg-gray-100 py-8">
      <div className="container">
        <div className="flex w-[80%] m-auto gap-10">
          <div className="col1 bg-white rounded-md shadow-md  w-[70%]">
            <div className="p-5 border-b border-[rgba(0,0,0,0.1)]">
              <h2 className="text-[20px]  text-gray-700 font-medium">
                Your Cart
              </h2>
              <p className="text-[15px]  text-gray-700 font-normal">
                There are ,<span className="text-emerald-600 font-bold">7</span>
                products in your cart
              </p>
            </div>

            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
          </div>
          <div className="col  w-[30%]">
            <div className="bg-white rounded-md shadow-md w-full">
              <div className="p-5 border-b border-[rgba(0,0,0,0.1)]">
                <h2 className="text-[20px]  text-gray-700 font-medium">
                  Cart Totals
                </h2>
              </div>

              <div className="info p-5 mb-4">
                <div className="flex items-center justify-between text-[17px] font-medium text-gray-700 py-2">
                  <span>Subtitle</span>
                  <span className="text-red-600">$2,133</span>
                </div>
                <div className="flex items-center justify-between text-[17px] font-medium text-gray-700 py-2">
                  <span>Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="flex items-center justify-between text-[17px] font-medium text-gray-700 py-2">
                  <span>Estimate For</span>
                  <span className="font-semibold">Pak</span>
                </div>
                <div className="flex items-center justify-between text-[17px] font-medium text-gray-700 py-2">
                  <span>Total</span>
                  <span className="text-red-600">$2,133</span>
                </div>
              </div>
              <div className="px-5 flex  w-full pb-5">
                <Link href={"/checkout"} className="w-full">
                  <Button className="btn-g w-full">Next</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
