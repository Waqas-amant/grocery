"use client";
import { MyContext } from "@/components/context/ThemeProvider";
import { Button, Link, Radio } from "@mui/material";
import Image from "next/image";
import React, { useContext } from "react";
import { FiPlus } from "react-icons/fi";

const CheckOut = () => {
  const context = useContext(MyContext);
  return (
    <section className="bg-gray-100 py-8">
      <div className="w-[70%] m-auto flex gap-5">
        <div className="bg-white rounded-md shadow-md p-10">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] font-medium text-gray-800">
              Select Delivery Address
            </h2>
            <Button
              onClick={() => context.isOpenAddressPanel(true)}
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
            <label className="address flex items-start justify-between border border-gray-300 p-4 rounded-md bg-[#f4f4f4] cursor-pointer">
              {/* LEFT SIDE */}
              <div className="flex items-start gap-3">
                <Radio
                  sx={{
                    color: "#9ca3af", // unchecked (gray)
                    "&.Mui-checked": {
                      color: "#059669", // emerald
                    },
                  }}
                />

                <div className="info flex flex-col gap-1">
                  <span className="text-gray-600 text-[14px]">Home</span>
                  <span className="text-gray-800 text-[15px] font-medium">
                    Waqas Ali
                  </span>
                  <span className="text-gray-600 text-[15px]">
                    H No 22 Street No 6 Address Mollana Shokat Ali Road Lahore
                  </span>
                  <span className="text-gray-600 text-[15px]">
                    +923271137219
                  </span>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div>
                <Button
                  variant="text"
                  sx={{
                    color: "#059669",
                    textTransform: "capitalize",
                    fontWeight: 600,
                  }}
                >
                  Edit
                </Button>
              </div>
            </label>
            <label className="address flex items-start justify-between border border-gray-300 p-4 rounded-md bg-[#f4f4f4] cursor-pointer">
              {/* LEFT SIDE */}
              <div className="flex items-start gap-3">
                <Radio
                  sx={{
                    color: "#9ca3af", // unchecked (gray)
                    "&.Mui-checked": {
                      color: "#059669", // emerald
                    },
                  }}
                />

                <div className="info flex flex-col gap-1">
                  <span className="text-gray-600 text-[14px]">Home</span>
                  <span className="text-gray-800 text-[15px] font-medium">
                    Waqas Ali
                  </span>
                  <span className="text-gray-600 text-[15px]">
                    H No 22 Street No 6 Address Mollana Shokat Ali Road Lahore
                  </span>
                  <span className="text-gray-600 text-[15px]">
                    +923271137219
                  </span>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div>
                <Button
                  variant="text"
                  sx={{
                    color: "#059669",
                    textTransform: "capitalize",
                    fontWeight: 600,
                  }}
                >
                  Edit
                </Button>
              </div>
            </label>
          </div>
        </div>

        <div className="col  w-[35%]">
          <div className="bg-white rounded-md shadow-md w-full">
            <div className="p-5 border-b border-[rgba(0,0,0,0.1)]">
              <h2 className="text-[18px]  text-gray-700 font-medium">
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

            <div className="flex flex-col gap-1 py-4 pt-1 max-h-[300px] overflow-y-scroll scroll">
              <div className="productRow flex items-center gap-3 py-2 px-2">
                <div className="image">
                  <Image
                    src={"/image1.png"}
                    alt="image"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div className="info">
                  <h4 className="text-[12px] font-medium text-gray-600">
                    Fortune Sunlite Refi...
                  </h4>
                  <span className="text-[14px] font-medium text-gray-600">
                    Qty:1
                  </span>
                </div>
                <span className="text-[12px] font-medium text-gray-600 ml-auto">
                  $99.9
                </span>
              </div>
              <div className="productRow flex items-center gap-3 py-1 px-2">
                <div className="image">
                  <Image
                    src={"/image1.png"}
                    alt="image"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div className="info">
                  <h4 className="text-[14px] font-medium text-gray-600">
                    Fortune Sunlite Refi...
                  </h4>
                  <span className="text-[14px] font-medium text-gray-600">
                    Qty:1
                  </span>
                </div>
                <span className="text-[14px] font-medium text-gray-600 ml-auto">
                  $99.9
                </span>
              </div>
              <div className="productRow flex items-center gap-3 py-1 px-2">
                <div className="image">
                  <Image
                    src={"/image1.png"}
                    alt="image"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div className="info">
                  <h4 className="text-[14px] font-medium text-gray-600">
                    Fortune Sunlite Refi...
                  </h4>
                  <span className="text-[14px] font-medium text-gray-600">
                    Qty:1
                  </span>
                </div>
                <span className="text-[14px] font-medium text-gray-600 ml-auto">
                  $99.9
                </span>
              </div>
              <div className="productRow flex items-center gap-3 py-1 px-2">
                <div className="image">
                  <Image
                    src={"/image1.png"}
                    alt="image"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div className="info">
                  <h4 className="text-[14px] font-medium text-gray-600">
                    Fortune Sunlite Refi...
                  </h4>
                  <span className="text-[14px] font-medium text-gray-600">
                    Qty:1
                  </span>
                </div>
                <span className="text-[14px] font-medium text-gray-600 ml-auto">
                  $99.9
                </span>
              </div>
              <div className="productRow flex items-center gap-3 py-1 px-2">
                <div className="image">
                  <Image
                    src={"/image1.png"}
                    alt="image"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div className="info">
                  <h4 className="text-[14px] font-medium text-gray-600">
                    Fortune Sunlite Refi...
                  </h4>
                  <span className="text-[14px] font-medium text-gray-600">
                    Qty:1
                  </span>
                </div>
                <span className="text-[14px] font-medium text-gray-600 ml-auto">
                  $99.9
                </span>
              </div>
            </div>

            <div className="flex w-full pb-5 pt-2">
              <Button className="btn-g w-full">CheckOut</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckOut;
