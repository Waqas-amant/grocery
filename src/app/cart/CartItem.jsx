"use client";
import { Button, Link } from "@mui/material";
import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoMdArrowDropdown, IoMdClose } from "react-icons/io";
const CartItem = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="productRow flex items-center gap-5 p-5 border-b border-gray-400">
      <Link href="/product" className="img w-[10%] group">
        <img
          src={"/chipspak.jpg"}
          alt="product image"
          className="w-full transition group-hover:scale-105"
        />
      </Link>
      <div className="info flex flex-col gap-2 w-[80%]">
        <span className="text-[15px] text-gray-600">Fortune</span>
        <Link
          href="/product"
          className="text-[18px] text-gray-700 font-medium hover:text-emerald-600"
        >
          Fortune Sunlite Refine Sunflowers Oil 1 L
        </Link>
        <Rating name="read-only" value={5} size="small" readOnly />

        <div className="flex items-center gap-5">
          <div className="relative">
            <Button
              className="bg-gray-200! border! border-gray-400! text-gray-700! py-[3px]! px-2! capitalize!"
              onClick={handleClick}
            >
              Qty: 1 <IoMdArrowDropdown size={18} />{" "}
            </Button>
            <Menu
              id="qtyDrop"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                list: {
                  "aria-labelledby": "basic-button",
                },
              }}
            >
              {Array.from({ length: 15 }).map((_, index) => (
                <MenuItem key={index} onClick={handleClose(index + 1)}>
                  {index + 1}
                </MenuItem>
              ))}
            </Menu>
          </div>
          <div className="flex items-center justify-between gap-5">
            <span className="text-red-600 text-[18px] font-[600]">$25.99</span>
            <span className="text-gray-300 text-[18px] font-[600] line-through">
              $38.10
            </span>
          </div>
          <span className="text-emerald-600 font-bold text-[16px]">
            14% 0FF
          </span>
        </div>
      </div>
      <IoMdClose size={25} className="cursor-pointer hover:text-emerald-600" />
    </div>
  );
};

export default CartItem;
