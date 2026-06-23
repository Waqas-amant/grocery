"use client";
import React, { useState, useEffect } from "react";
import { TablePagination } from "@mui/material";
import Search from "../components/Search";
import OrderRow from "./tableRow";
import { fetchDatafromApi } from "../utils/api";

const Orders = () => {
  const [ordersList, setOrdersList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalOrders, setTotalOrders] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getOrders();
  }, [page, rowsPerPage]);

  const getOrders = () => {
    fetchDatafromApi(`/api/order/getAllOrders?page=${page + 1}&limit=${rowsPerPage}`).then((res) => {
      if (res && res.orders) {
        setOrdersList(res.orders);
        setTotalOrders(res.total || 0);
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Simple client-side search filtering
  const filteredOrders = ordersList.filter((order) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const orderId = order._id || "";
    const paymentId = order.paymentId || "";
    const phone = order.userId?.mobile || "";
    const name = order.userId?.name || "";
    return (
      orderId.toLowerCase().includes(query) ||
      paymentId.toLowerCase().includes(query) ||
      phone.toString().includes(query) ||
      name.toLowerCase().includes(query)
    );
  });

  return (
    <div className="wrapper w-full p-4 mt-5">
      <div className="bg-white rounded-md shadow-md mb-5 p-5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="info">
            <h1 className="text-[20px] font-[600] text-gray-600">Orders</h1>
            <p className="text-[13px] text-gray-500">
              There are <span className="text-emerald-600! font-bold">{totalOrders}</span> orders in total
            </p>
          </div>
          <Search 
            placeholder="Search Order..." 
            width="300px" 
            onChange={(e) => setSearchQuery(e.target.value)} 
            value={searchQuery}
          />
        </div>
        <div className="overflow-x-auto w-full mt-5 scroll">
          <table className="w-full">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="text-[13px] text-gray-600 font-[600] px-4 py-3 whitespace-nowrap text-left"></th>
                <th className="text-[13px] text-gray-600 font-[600] px-4 py-3 whitespace-nowrap text-left">
                  Order ID
                </th>
                <th className="text-[13px] text-gray-600 font-[600] px-4 py-3 whitespace-nowrap text-left">
                  Customer
                </th>
                <th className="text-[13px] text-gray-600 font-[600] px-4 py-3 whitespace-nowrap text-left">
                  Payment Id
                </th>
                <th className="text-[13px] text-gray-600 font-[600] px-4 py-3 whitespace-nowrap text-left">
                  Phone number
                </th>
                <th className="text-[13px] text-gray-600 font-[600] px-4 py-3 whitespace-nowrap text-left">
                  Address
                </th>
                <th className="text-[13px] text-gray-600 font-[600] px-4 py-3 whitespace-nowrap text-left">
                  Pincode
                </th>
                <th className="text-[13px] text-gray-600 font-[600] px-4 py-3 whitespace-nowrap text-left">
                  Total Amount
                </th>
                <th className="text-[13px] text-gray-600 font-[600] px-4 py-3 whitespace-nowrap text-left">
                  User Id
                </th>
                <th className="text-[13px] text-gray-600 font-[600] px-4 py-3 whitespace-nowrap text-left">
                  Order Status
                </th>
                <th className="text-[13px] text-gray-600 font-[600] px-4 py-3 whitespace-nowrap text-left">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders && filteredOrders.length !== 0 ? (
                filteredOrders.map((order, index) => (
                  <OrderRow key={order._id || index} order={order} onStatusUpdate={getOrders} />
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="text-center text-gray-500 py-8">
                    No Orders Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-end mt-4">
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={totalOrders}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
