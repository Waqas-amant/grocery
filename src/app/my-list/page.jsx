"use client";
import AccountSidebar from "@/components/AccountSidebar";
import { MyContext } from "@/components/context/ThemeProvider";
import { Button, Rating } from "@mui/material";

import React, { useContext } from "react";
import { IoClose } from "react-icons/io5";

const MyList = () => {
  const context = useContext(MyContext);
  return (
    <section className="bg-gray-100 py-8">
      <div className="container flex gap-10">
        <div className="w-[20%]">
          <AccountSidebar />
        </div>
        <div className="wrapper w-[60%] mt-5">
          <div className="bg-white shadow-md rounded-md mb-5">
            <div className="p-4 flex items-center justify-between border-b-[1px] border-[rgba(0,0,0,0.1)]">
              <div className="info">
                <h4 className="text-[20px] text-gray-700">My List</h4>
                <p className="text-[16px] text-gray-500">
                  There are{" "}
                  <span className="text-emerald-600! font-bold">4</span>{" "}
                  products in my list
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-3">
              <div className="myListBox flex items-center gap-3 border-b-[1px] border-[rgba(0,0,0,0.1)]">
                <div className="img w-[80px] h-[100px] group">
                  <img
                    src={"/image1.png"}
                    alt="image"
                    className="w-full h-full object-cover transition-all group-hover:scale-105 cursor-pointer"
                  />
                </div>
                <div className="info flex flex-col gap-[5px]">
                  <span className="text-[13px] text-gray-600">Lay's</span>
                  <h3 className="text-[16px] text-gray-800 font-[500]">
                    Lay's American Style Cream & Onion Potato Chips 82 g
                  </h3>
                  <Rating name="read-only" value={5} readOnly size="small" />
                  <div className="flex items-center gap-3 border-b-[1px] border-[rgba(0,0,0,0.1)] py-3">
                    <span className="text-red-600 text-[16px] font-[600]">
                      $25.99
                    </span>
                    <span className="text-gray-300 text-[16px] font-[600] line-through">
                      $38.10
                    </span>
                    <span className="text-emerald-600 text-[16px] font-bold">
                      14% OFF
                    </span>
                  </div>
                </div>
                <Button className="w-[50px]! h-[50px]! min-h-[50px]! rounded-full! p-0! text-gray-700! ml-auto!">
                  <IoClose size={20} />
                </Button>
              </div>
              <div className="myListBox flex items-center gap-3 border-b-[1px] border-[rgba(0,0,0,0.1)]">
                <div className="img w-[80px] h-[100px] group">
                  <img
                    src={"/image1.png"}
                    alt="image"
                    className="w-full h-full object-cover transition-all group-hover:scale-105 cursor-pointer"
                  />
                </div>
                <div className="info flex flex-col gap-[5px]">
                  <span className="text-[13px] text-gray-600">Lay's</span>
                  <h3 className="text-[16px] text-gray-800 font-[500]">
                    Lay's American Style Cream & Onion Potato Chips 82 g
                  </h3>
                  <Rating name="read-only" value={5} readOnly size="small" />
                  <div className="flex items-center gap-3 border-b-[1px] border-[rgba(0,0,0,0.1)] py-3">
                    <span className="text-red-600 text-[16px] font-[600]">
                      $25.99
                    </span>
                    <span className="text-gray-300 text-[16px] font-[600] line-through">
                      $38.10
                    </span>
                    <span className="text-emerald-600 text-[16px] font-bold">
                      14% OFF
                    </span>
                  </div>
                </div>
                <Button className="w-[50px]! h-[50px]! min-h-[50px]! rounded-full! p-0! text-gray-700! ml-auto!">
                  <IoClose size={20} />
                </Button>
              </div>
              <div className="myListBox flex items-center gap-3 border-b-[1px] border-[rgba(0,0,0,0.1)]">
                <div className="img w-[80px] h-[100px] group">
                  <img
                    src={"/image1.png"}
                    alt="image"
                    className="w-full h-full object-cover transition-all group-hover:scale-105 cursor-pointer"
                  />
                </div>
                <div className="info flex flex-col gap-[5px]">
                  <span className="text-[13px] text-gray-600">Lay's</span>
                  <h3 className="text-[16px] text-gray-800 font-[500]">
                    Lay's American Style Cream & Onion Potato Chips 82 g
                  </h3>
                  <Rating name="read-only" value={5} readOnly size="small" />
                  <div className="flex items-center gap-3 border-b-[1px] border-[rgba(0,0,0,0.1)] py-3">
                    <span className="text-red-600 text-[16px] font-[600]">
                      $25.99
                    </span>
                    <span className="text-gray-300 text-[16px] font-[600] line-through">
                      $38.10
                    </span>
                    <span className="text-emerald-600 text-[16px] font-bold">
                      14% OFF
                    </span>
                  </div>
                </div>
                <Button className="w-[50px]! h-[50px]! min-h-[50px]! rounded-full! p-0! text-gray-700! ml-auto!">
                  <IoClose size={20} />
                </Button>
              </div>
              <div className="myListBox flex items-center gap-3 border-b-[1px] border-[rgba(0,0,0,0.1)]">
                <div className="img w-[80px] h-[100px] group">
                  <img
                    src={"/image1.png"}
                    alt="image"
                    className="w-full h-full object-cover transition-all group-hover:scale-105 cursor-pointer"
                  />
                </div>
                <div className="info flex flex-col gap-[5px]">
                  <span className="text-[13px] text-gray-600">Lay's</span>
                  <h3 className="text-[16px] text-gray-800 font-[500]">
                    Lay's American Style Cream & Onion Potato Chips 82 g
                  </h3>
                  <Rating name="read-only" value={5} readOnly size="small" />
                  <div className="flex items-center gap-3 border-b-[1px] border-[rgba(0,0,0,0.1)] py-3">
                    <span className="text-red-600 text-[16px] font-[600]">
                      $25.99
                    </span>
                    <span className="text-gray-300 text-[16px] font-[600] line-through">
                      $38.10
                    </span>
                    <span className="text-emerald-600 text-[16px] font-bold">
                      14% OFF
                    </span>
                  </div>
                </div>
                <Button className="w-[50px]! h-[50px]! min-h-[50px]! rounded-full! p-0! text-gray-700! ml-auto!">
                  <IoClose size={20} />
                </Button>
              </div>
              <div className="myListBox flex items-center gap-3 border-b-[1px] border-[rgba(0,0,0,0.1)]">
                <div className="img w-[80px] h-[100px] group">
                  <img
                    src={"/image1.png"}
                    alt="image"
                    className="w-full h-full object-cover transition-all group-hover:scale-105 cursor-pointer"
                  />
                </div>
                <div className="info flex flex-col gap-[5px]">
                  <span className="text-[13px] text-gray-600">Lay's</span>
                  <h3 className="text-[16px] text-gray-800 font-[500]">
                    Lay's American Style Cream & Onion Potato Chips 82 g
                  </h3>
                  <Rating name="read-only" value={5} readOnly size="small" />
                  <div className="flex items-center gap-3 border-b-[1px] border-[rgba(0,0,0,0.1)] py-3">
                    <span className="text-red-600 text-[16px] font-[600]">
                      $25.99
                    </span>
                    <span className="text-gray-300 text-[16px] font-[600] line-through">
                      $38.10
                    </span>
                    <span className="text-emerald-600 text-[16px] font-bold">
                      14% OFF
                    </span>
                  </div>
                </div>
                <Button className="w-[50px]! h-[50px]! min-h-[50px]! rounded-full! p-0! text-gray-700! ml-auto!">
                  <IoClose size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyList;
