"use client";
import AccountSidebar from "@/components/AccountSidebar";

import OrderRow from "./TableRow";
import { Pagination } from "@mui/material";
import Search from "@/components/Search";

const Orders = () => {
  return (
    <section className="bg-gray-100 py8 mt-5">
      <div className="container flex gap-5">
        <div className="w-[20%]">
          <AccountSidebar />
        </div>
        <div className="wrapper w-[80%] mt-5">
          <div className="bg-white rounded-md shadow-md mb-5 p-5">
            <div className="flex items-center justify-between">
              <div className="info">
                <h1 className="text-[20px] font-[600] text-gray-600">Orders</h1>
                <p>
                  Thare are{" "}
                  <span className="text-emerald-600! font-bold">5</span>
                  {""} orders
                </p>
              </div>
              <Search placeholder="Search Order..." width="300" />
            </div>
            <div className="overflow-x-auto w-full mt-5 scroll">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="text-[14px] text-gray-600 font-[600] px-4 py-3 whitespace-nowrap text-left"></th>
                    <th className="text-[14px] text-gray-600 font-[600] px-4 py-3 whitespace-nowrap text-left">
                      Order ID
                    </th>
                    <th className="text-[14px] text-gray-600 font-[600] px-4 py-3 whitespace-nowrap text-left">
                      Customer
                    </th>
                    <th className="text-[14px] text-gray-600 font-[600] px-4 py-3 whitespace-nowrap text-left">
                      Payment Id
                    </th>
                    <th className="text-[14px] text-gray-600 font-[600] px-4 py-3 whitespace-nowrap text-left">
                      Phone number
                    </th>{" "}
                    <th className="text-[14px] text-gray-600 font-[600] px-4 py-3 whitespace-nowrap text-left">
                      Address
                    </th>
                    <th className="text-[14px] text-gray-600 font-[600] px-4 py-3 whitespace-nowrap text-left">
                      Pincode
                    </th>
                    <th className="text-[14px] text-gray-600 font-[600] px-4 py-3 whitespace-nowrap text-left">
                      Total Amout
                    </th>
                    <th className="text-[14px] text-gray-600 font-[600] px-4 py-3 whitespace-nowrap text-left">
                      User Id
                    </th>
                    <th className="text-[14px] text-gray-600 font-[600] px-4 py-3 whitespace-nowrap text-left">
                      Order Status
                    </th>
                    <th className="text-[14px] text-gray-600 font-[600] px-4 py-3 whitespace-nowrap text-left">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <OrderRow />
                  <OrderRow />
                  <OrderRow />
                  <OrderRow />
                  <OrderRow />
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-center mt-5 py-10">
              <Pagination count={10} showFirstButton showLastButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orders;
