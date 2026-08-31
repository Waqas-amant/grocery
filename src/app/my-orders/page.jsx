"use client";
import AccountSidebar from "@/components/AccountSidebar";
import OrderRow from "./TableRow";
import { Pagination } from "@mui/material";
import Search from "@/components/Search";

const Orders = () => {
  const orders = [
    {
      orderId: "#3413",
      customer: "Dr. Arsalan Ahmad Khan",
      email: "august45hot@gmail.com",
      paymentId: "Pay_xzjbdbuexmcbnxcb",
      phone: "+92 324555557",
      addressLabel: "Home",
      address: "H No 222 Street No 999 Mulana Shokat Ali Road Lahore Pakistan",
      pincode: "11005",
      total: "$540",
      userId: "67nckbdls7398nckkdfdauwxa88jj",
      status: "Delivered",
      date: "25-4-2026",
    },
    {
      orderId: "#3414",
      customer: "Sana Ali",
      email: "sana@example.com",
      paymentId: "Pay_abc123",
      phone: "+92 311222333",
      addressLabel: "Office",
      address: "Suit 5, Gulberg III, Lahore, Pakistan",
      pincode: "54000",
      total: "$280",
      userId: "u12345",
      status: "Pending",
      date: "28-4-2026",
    },
  ];

  return (
    <section className="bg-gray-100 py-8 mt-5">
      <div className="container flex gap-5 flex-wrap">
        <div className="w-full lg:w-[20%]">
          <AccountSidebar />
        </div>
        <div className="wrapper w-full lg:w-[80%] mt-5">
          <div className="bg-white rounded-md shadow-md mb-5 p-5">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="info">
                <h1 className="text-[20px] font-[600] text-gray-600">Orders</h1>
                <p>
                  There are{" "}
                  <span className="text-emerald-600 font-bold">
                    {orders.length}
                  </span>{" "}
                  orders
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
                    </th>
                    <th className="text-[14px] text-gray-600 font-[600] px-4 py-3 whitespace-nowrap text-left">
                      Address
                    </th>
                    <th className="text-[14px] text-gray-600 font-[600] px-4 py-3 whitespace-nowrap text-left">
                      Pincode
                    </th>
                    <th className="text-[14px] text-gray-600 font-[600] px-4 py-3 whitespace-nowrap text-left">
                      Total Amount
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
                  {orders.map((order, index) => (
                    <OrderRow key={`${order.orderId}-${index}`} order={order} />
                  ))}
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
