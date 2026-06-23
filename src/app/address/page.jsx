"use client";
import AccountSidebar from "@/components/AccountSidebar";
import { MyContext } from "@/components/context/ThemeProvider";
import { Button } from "@mui/material";
import React, { useContext } from "react";
import { FiPlus } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import AddressBox from "./AddressBox";

const Address = () => {
  const context = useContext(MyContext);
  return (
    <section className="bg-gray-100 py-8">
      <div className="container flex gap-10">
        <div className="w-[20%]">
          <AccountSidebar />
        </div>
        <div className="wrapper w-[50%] mt-5">
          <div className="bg-white shadow-md rounded-md mb-5">
            <div className="p-4 flex items-center justify-between border-b-[1px] border-[rgba(0,0,0,0.1)]">
              <div className="info">
                <h4 className="text-[20px] text-gray-700">Address</h4>
                <p className="text-[16px] text-gray-500">Manage Your Address</p>
              </div>
              <Button
                className="text-emerald-600! border-emerald-600! capitalize! font-[600]! px-5!"
                onClick={() => context.isOpenAddressPanel(true)}
              >
                <FiPlus size={20} />
                Add Address
              </Button>
            </div>
            <div className="flex flex-col gap-3 p-5">
              <AddressBox />
              <AddressBox />
              <AddressBox />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Address;
