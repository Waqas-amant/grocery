"use client";
import { MyContext } from "@/components/context/ThemeContext";
import { Button, Radio } from "@mui/material";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { FiPlus } from "react-icons/fi";

const CheckOut = () => {
  const context = useContext(MyContext);
  const cartItems = context?.cartItems || [];
  const [selectedAddress, setSelectedAddress] = useState("home");

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
    0,
  );

  return (
    <section className="bg-gray-100 py-8">
      <div className="w-full lg:w-[70%] m-auto flex flex-col lg:flex-row gap-5">
        <div className="bg-white rounded-md shadow-md p-5 lg:p-10 w-full lg:w-[65%]">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-[20px] font-medium text-gray-800">
              Select Delivery Address
            </h2>
            <Button
              onClick={() => context?.isOpenAddressPanel?.(true)}
              variant="outlined"
              sx={{
                color: "#059669",
                borderColor: "#059669",
                textTransform: "capitalize",
                fontWeight: 600,
                px: 2,
              }}
            >
              <FiPlus size={20} /> Add new address
            </Button>
          </div>

          <div className="addressSec w-full flex flex-col gap-2 p-5">
            {[
              {
                id: "home",
                title: "Home",
                details:
                  "Waqas Ali • H No 22 Street No 6 • Lahore • +923271137219",
              },
              {
                id: "office",
                title: "Office",
                details: "Ali Khan • 10-B Gulberg • Islamabad • +923001112233",
              },
            ].map((address) => (
              <label
                key={address.id}
                className="address flex items-start justify-between border border-gray-300 p-4 rounded-md bg-[#f4f4f4] cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <Radio
                    checked={selectedAddress === address.id}
                    onChange={() => setSelectedAddress(address.id)}
                    sx={{
                      color: "#9ca3af",
                      "&.Mui-checked": { color: "#059669" },
                    }}
                  />
                  <div className="info flex flex-col gap-1">
                    <span className="text-gray-600 text-[14px]">
                      {address.title}
                    </span>
                    <span className="text-gray-800 text-[15px] font-medium">
                      {address.details}
                    </span>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="col w-full lg:w-[35%]">
          <div className="bg-white rounded-md shadow-md w-full">
            <div className="p-5 border-b border-[rgba(0,0,0,0.1)]">
              <h2 className="text-[18px] text-gray-700 font-medium">
                Cart Totals
              </h2>
            </div>

            <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.1)] px-5 py-3">
              <span className="text-[15px] font-medium text-gray-700">
                Product
              </span>
              <span className="text-[15px] font-medium text-gray-700">
                Subtotal
              </span>
            </div>

            <div className="flex flex-col gap-1 py-4 pt-1 max-h-[300px] overflow-y-scroll">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="productRow flex items-center gap-3 py-2 px-2"
                >
                  <div className="image">
                    <Image
                      src={item?.images?.[0] || "/image1.png"}
                      alt="image"
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div className="info">
                    <h4 className="text-[12px] font-medium text-gray-600">
                      {item?.name}
                    </h4>
                    <span className="text-[14px] font-medium text-gray-600">
                      Qty:{item?.quantity || 1}
                    </span>
                  </div>
                  <span className="text-[12px] font-medium text-gray-600 ml-auto">
                    $
                    {(
                      Number(item?.price || 0) * Number(item?.quantity || 1)
                    ).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex w-full pb-5 pt-2 px-5">
              <Button className="btn-g w-full">Checkout</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckOut;
