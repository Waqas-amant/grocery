"use client";
import { Button } from "@mui/material";
import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const AddressBox = ({
  label = "Home",
  contact = "WAQAS ALI +92 32444444",
  address = "H No 222 Street No 999 Mulana Shokat Ali Road Lahore Pakistan",
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="addressBox w-full p-4 bg-[#fafafa] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center justify-between gap-3 flex-wrap">
      <div className="info w-full md:w-[80%]">
        <span className="inline-block bg-gray-200 text-[14px] p-2 py-1 rounded-md">
          {label}
        </span>
        <h3 className="text-[18px] text-gray-700 py-1 font-[500]">{contact}</h3>
        <p className="text-[14px] text-gray-600">{address}</p>
      </div>
      <div className="action relative">
        <Button
          className="w-[50px]! h-[50px]! min-h-[50px]! rounded-full! p-0! text-gray-700!"
          onClick={handleClick}
        >
          <HiOutlineDotsVertical size={25} />
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
          <MenuItem onClick={handleClose}>Edit</MenuItem>
          <MenuItem onClick={handleClose}>Delete</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default AddressBox;
