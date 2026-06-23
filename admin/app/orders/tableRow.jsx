"use client";
import { Button } from "@mui/material";
import React, { useState, useContext } from "react";
import { FaAngleDown } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { editData } from "../utils/api";
import { MyContext } from "../components/context/ThemeProvider";

const OrderRow = ({ order, onStatusUpdate }) => {
  const context = useContext(MyContext);
  const [orderStatus, setOrderStatus] = useState(order.order_status || "Pending");
  const [expandIndex, setExpandIndex] = useState(false);

  const handleChangeOrderStatus = (event) => {
    const status = event.target.value;
    setOrderStatus(status);

    editData(`/api/order/updateOrderStatus/${order._id}`, { orderStatus: status }).then((res) => {
      if (res?.error === false) {
        context.alertBox("success", "Order status updated");
        if (onStatusUpdate) onStatusUpdate();
      } else {
        context.alertBox("error", res?.message || "Failed to update order status");
      }
    });
  };

  const orderDate = order.createdAt 
    ? new Date(order.createdAt).toISOString().split('T')[0]
    : "N/A";

  const customerName = order.userId?.name || "Anonymous";
  const customerEmail = order.userId?.email || "No Email";
  const customerAvatar = order.userId?.avatar || "";

  const addressLine = order.delivery_address 
    ? `${order.delivery_address.address_line1 || ""}, ${order.delivery_address.landmark || ""}, ${order.delivery_address.city || ""}, ${order.delivery_address.state || ""}, ${order.delivery_address.country || ""}`
    : "No address provided";

  const pincode = order.delivery_address?.pincode || "N/A";
  const phone = order.delivery_address?.mobile || order.userId?.mobile || "N/A";

  return (
    <>
      <tr className="border-b-[1px] border-[rgba(0,0,0,0.1)] hover:bg-gray-50 transition-colors">
        <td className="text-[13px] text-gray-700 font-[500] px-4 py-3">
          <Button
            className="min-h-[35px]! h-[35px]! w-[35px]! rounded-full! text-gray-500! bg-gray-100! hover:bg-gray-200!"
            onClick={() => setExpandIndex(!expandIndex)}
          >
            <FaAngleDown
              size={18}
              className={`transition-all ${expandIndex === true && "rotate-180"}`}
            />
          </Button>
        </td>
        <td className="text-[13px] text-gray-700 font-[600] px-4 py-3 font-mono text-emerald-600">
          #{order._id ? order._id.substring(order._id.length - 6) : "N/A"}
        </td>
        <td className="text-[13px] text-gray-700 font-[600] px-4 py-3">
          <div className="flex items-center gap-3 w-[220px]">
            <div className="rounded-full w-[40px] h-[40px] overflow-hidden border border-gray-200 flex-shrink-0 flex items-center justify-center bg-gray-50">
              {customerAvatar ? (
                <img src={customerAvatar} alt={customerName} className="w-full h-full object-cover" />
              ) : (
                <div className="text-gray-400 font-bold text-sm">
                  {customerName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="info flex flex-col gap-0 overflow-hidden">
              <span className="text-gray-800 text-[13px] font-[600] truncate">
                {customerName}
              </span>
              <span className="text-gray-500 text-[11px] truncate">
                {customerEmail}
              </span>
            </div>
          </div>
        </td>
        <td className="text-[13px] text-gray-700 font-[500] px-4 py-3 font-mono truncate max-w-[120px]">
          {order.paymentId || "COD / N/A"}
        </td>
        <td className="text-[13px] text-gray-700 font-[500] px-4 py-3 whitespace-nowrap">
          {phone}
        </td>
        <td className="text-[13px] text-gray-700 font-[500] px-4 py-3">
          <p className="w-[250px] line-clamp-2 text-[12px] text-gray-600">
            {addressLine}
          </p>
        </td>
        <td className="text-[13px] text-gray-700 font-[500] px-4 py-3">
          {pincode}
        </td>
        <td className="text-[13px] text-gray-700 font-[600] px-4 py-3 text-red-600">
          ${order.totalAmt || 0}
        </td>
        <td className="text-[12px] text-gray-400 font-mono px-4 py-3 truncate max-w-[100px]">
          {order.userId?._id || order.userId || "N/A"}
        </td>
        <td className="text-[13px] text-gray-700 font-[600] px-4 py-3">
          <Select
            value={orderStatus}
            onChange={handleChangeOrderStatus}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            size="small"
            sx={{
              fontSize: "13px",
              height: "32px",
              minWidth: "110px",
              "& .MuiSelect-select": {
                paddingY: "4px"
              }
            }}
          >
            <MenuItem value={"confirm"}>Confirm</MenuItem>
            <MenuItem value={"Pending"}>Pending</MenuItem>
            <MenuItem value={"Deliver"}>Deliver</MenuItem>
          </Select>
        </td>
        <td className="text-[13px] text-gray-700 font-[500] px-4 py-3 whitespace-nowrap">
          <div className="flex items-center gap-1 text-gray-500">
            <MdDateRange size={16} />
            {orderDate}
          </div>
        </td>
      </tr>

      {expandIndex === true && (
        <tr className="bg-gray-50">
          <td colSpan={11} className="p-4 border-b border-[rgba(0,0,0,0.05)]">
            <div className="pl-12">
              <h4 className="text-[14px] font-[600] text-gray-700 mb-3">Order Items</h4>
              <div className="flex flex-col gap-3">
                {order.products && order.products.length !== 0 ? (
                  order.products.map((item, idx) => (
                    <div key={item._id || idx} className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <div className="img rounded-md overflow-hidden w-[50px] h-[55px] border border-gray-200 bg-white flex items-center justify-center flex-shrink-0">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.productTitle}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-[10px] text-gray-400">No Image</span>
                          )}
                        </div>
                        <div className="info flex flex-col">
                          <h5 className="text-gray-800 text-[13px] font-[600]">
                            {item.productTitle}
                          </h5>
                          <span className="text-gray-500 text-[11px]">
                            Unit Price: ${item.price}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-12">
                        <span className="text-gray-600 text-[13px] font-[500]">
                          Qty: {item.quality || item.quantity || 1}
                        </span>
                        <span className="text-gray-900 text-[13px] font-[600] w-[60px] text-right">
                          ${item.subTotal || ((item.price || 0) * (item.quality || 1))}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[12px] text-gray-400">No items in this order.</p>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default OrderRow;
