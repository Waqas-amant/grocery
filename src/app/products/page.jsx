"use client";
import Sidebar from "@/components/Sidebar";
import { Button } from "@mui/material";
import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ProductItem from "@/components/ProductItem";
import Pagination from "@mui/material/Pagination";
const ProductPage = () => {
  const [sortBy, setSortBy] = useState("Name,A to Z");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="py-5  bg-white">
      <div className="container flex gap-4">
        <div className="sidebarWrapper w-[18%]">
          <Sidebar />
        </div>
        <div className="rightContent w-[82%] pl-5">
          <div className="top-strip w-full bg-[#f1f1f1] p-2 rounded-md h-12 flex items-center justify-between px-4 sticky-top[140px] z-49">
            <span className="text-[15px] text-gray-700 font-medium">
              There are 25 Products
            </span>
            <div className="flex items-center gap-3">
              <span className="text-[15px] text-gray-700 font-medium">
                Sort By
              </span>
              <div className="relative">
                <Button
                  className="bg-white! capitalize! text-gray-900! py-1! px-0.75!"
                  onClick={handleClick}
                >
                  {sortBy}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{
                    list: {
                      "aria-labelledby": "basic-button",
                    },
                  }}
                >
                  <MenuItem onClick={handleClose}>Z To A</MenuItem>
                  <MenuItem onClick={handleClose}>A To Z</MenuItem>
                  <MenuItem onClick={handleClose}>Price Low To High</MenuItem>
                  <MenuItem onClick={handleClose}>Price High To Low</MenuItem>
                </Menu>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-5 py-5">
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
          </div>
          <div className="flex items-center justify-center mt-5">
            <Pagination count={10} showFirstButton showLastButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
