"use client";
import { Button, Link } from "@mui/material";
import React, { useContext, useState } from "react";
import Rating from "@mui/material/Rating";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoMdArrowDropdown, IoMdClose } from "react-icons/io";
import { MyContext } from "@/components/context/ThemeContext";

const CartItem = ({ item }) => {
  const context = useContext(MyContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleQtyChange = (qty) => {
    context?.updateCartQty?.(item._id, qty);
    handleClose();
  };

  const price = Number(item?.price || 0);
  const oldPrice = Number(item?.oldPrice || price);
  const image = item?.images?.[0] || "/pro1.png";

  return (
    <div className="productRow flex items-center gap-5 p-5 border-b border-gray-400">
      <Link
        href={`/product/${item._id}`}
        className="img w-[10%] min-w-[80px] group"
      >
        <img
          src={image}
          alt={item?.name}
          className="w-full transition group-hover:scale-105"
        />
      </Link>
      <div className="info flex flex-col gap-2 w-[80%]">
        <span className="text-[15px] text-gray-600">
          {item?.brand || "Generic"}
        </span>
        <Link
          href={`/product/${item._id}`}
          className="text-[18px] text-gray-700 font-medium hover:text-emerald-600"
        >
          {item?.name}
        </Link>
        <Rating
          name="read-only"
          value={Number(item?.rating || 0)}
          size="small"
          readOnly
        />

        <div className="flex items-center gap-5 flex-wrap">
          <div className="relative">
            <Button
              className="bg-gray-200! border! border-gray-400! text-gray-700! py-[3px]! px-2! capitalize!"
              onClick={handleClick}
            >
              Qty: {item?.quantity || 1} <IoMdArrowDropdown size={18} />
            </Button>
            <Menu
              id="qtyDrop"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{ list: { "aria-labelledby": "basic-button" } }}
            >
              {Array.from({ length: 10 }).map((_, index) => (
                <MenuItem
                  key={index + 1}
                  onClick={() => handleQtyChange(index + 1)}
                >
                  {index + 1}
                </MenuItem>
              ))}
            </Menu>
          </div>
          <div className="flex items-center justify-between gap-5">
            <span className="text-red-600 text-[18px] font-[600]">
              ${(price * (item?.quantity || 1)).toFixed(2)}
            </span>
            {oldPrice > price && (
              <span className="text-gray-300 text-[18px] font-[600] line-through">
                ${(oldPrice * (item?.quantity || 1)).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
      <IoMdClose
        size={25}
        className="cursor-pointer hover:text-emerald-600"
        onClick={() => context?.removeFromCart?.(item._id)}
      />
    </div>
  );
};

export default CartItem;
