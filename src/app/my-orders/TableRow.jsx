"use client";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
const OrderRow = () => {
  const [expandIndex, setExpandIndex] = useState(false);
  return (
    <>
      <tr className="border-b-[1px] border-[rgba(0,0,0,0.1)] hover:bg-gray-100">
        <td className="text-[14px] text-gray-700 font-[500] px-4 py-2">
          <Button
            className="min-h-[40px]! h-[40px]! w-[40px]! rounded-full! text-gray-500! bg-gray-100! hover:bg-gray-200!"
            onClick={() => setExpandIndex(!expandIndex)}
          >
            <FaAngleDown
              size={20}
              className={`transition-all ${expandIndex === true && "rotate-180"}`}
            />
          </Button>
        </td>
        <td className="text-[14px] text-gray-700 font-[500] px-4 py-2 font-bold">
          #3413
        </td>
        <td className="text-[14px] text-gray-700 font-[600] px-4 py-2">
          <div className="flex items-center gap-3 w-[200px]">
            <div className="rounded-full w-[50px] h-[50px] overflow-hidden">
              <img src={"/profile1.jpg"} alt="image" />
            </div>
            <div className="info flex flex-col gap-0">
              <span className="text-gray-800 text-[14px]">
                Dr.Arsalan Ahmad Khan
              </span>
              <span className="text-gray-500 text-[14px]">
                august45hot@gmail.com
              </span>
            </div>
          </div>
        </td>
        <td className="text-[14px] text-gray-700 font-[600] px-4 py-2 whitespace-nowrap">
          Pay_xzjbdbuexmcbnxcb
        </td>
        <td className="text-[14px] text-gray-700 font-[600] px-4 py- whitespace-nowrap">
          +92 324555557
        </td>
        <td className="text-[14px] text-gray-700 font-[600] px-4 py-2">
          <div className="w-[350px] py-3 ">
            <span className="bg-gray-100 rounded-md px-2 py-1 border border-[rgba(0,0,0,0.1)]">
              Home
            </span>
            <p className="pt-2">
              H No 222 Street No 999 Mulana Shokat Ali Road Lahore Pakistan
            </p>
          </div>
        </td>
        <td className="text-[14px] text-gray-700 font-[600] px-4 py-2">
          11005
        </td>
        <td className="text-[14px] text-gray-700 font-[500] px-4 py-2">$540</td>
        <td className="text-[14px] text-gray-700 font-[700] px-4 py23 whitespace-nowrap text-emerald-600! font-bold">
          67nckbdls7398nckkdfdauwxa88jj
        </td>
        <td className="text-[14px] text-gray-700 font-[600] px-4 py-2">
          <span className="px-4 py-1 rounded-full bg-emerald-600 text-white">
            confirm
          </span>
        </td>
        <td className="text-[14px] text-gray-700 font-[600] px-4 py-2 whitespace-nowrap">
          <div className="flex items-center gap-1">
            <MdDateRange size={20} />
            25-4-2026
          </div>
        </td>
      </tr>

      {expandIndex === true && (
        <tr className="bg-gray-100">
          <td colSpan={3} className="p-5">
            <div className="flex items-center gap-3">
              <div className="img rounded-md overflow-hidden w-[80px] h-[80px]">
                <img
                  src={
                    "https://static.vecteezy.com/system/resources/thumbnails/036/107/987/small/ai-generated-handsome-attractive-european-man-on-isolated-background-photo.jpg"
                  }
                  alt="image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="info flex flex-col">
                <h3 className="text-gray-900 text-[15px] font-[500]">
                  Tasty Metal shirt
                </h3>
                <span className="text-gray-600 text-[13px] font-[500]">
                  Shoes
                </span>
                <span className="text-gray-600 text-[13px] font-[500]">
                  Unit price: $410.00
                </span>
              </div>
            </div>
          </td>
          <td colSpan={1} className="p-5">
            X2
          </td>
          <td colSpan={1} className="p-5">
            <span className="text-gray-950 font-[500]">$820</span>
          </td>
          <td colSpan={1} className="p-5"></td>
          <td colSpan={1} className="p-5"></td>
          <td colSpan={1} className="p-5"></td>
          <td colSpan={1} className="p-5"></td>
          <td colSpan={1} className="p-5"></td>
          <td colSpan={1} className="p-5"></td>
        </tr>
      )}
    </>
  );
};

export default OrderRow;
