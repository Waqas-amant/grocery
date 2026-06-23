"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import Search from "./Search";

import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import NavBar from "./NavBar";
import { MyContext } from "./context/ThemeContext";
import { Button } from "@mui/material";
import { FaCircleUser, FaRegUser } from "react-icons/fa6";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MdOutlineLocationOn } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { fetchDatafromApi } from "@/utils/api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
const Header = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const context = useContext(MyContext);
  const logout = () => {
    setAnchorEl(null);

    fetchDatafromApi("/api/user/logout").then((res) => {
      if (res?.success) {
        context.setIsLogin(false);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        Cookies.remove("userEmail");
        Cookies.remove("userName");
        context.setUser(null);
        router.push("/");
      }
    });
  };
  return (
    <>
      <div className="header-wrapper sticky top-0 z-50 bg-white">
        <header className="py-3 border-b-[1px] border-[rgba(0,0,0,0.1)]">
          <div className="container flex items-center justify-between">
            <div className="logo">
              <Link href={"/"}>
                <Image
                  src={"/logo (1).png"}
                  width={230}
                  height={61}
                  alt="Logo"
                ></Image>
              </Link>
            </div>
            <Search placeholder="Search for products..." width="500" />
            <div className="flex items-center gap-5">
              {context?.isLogin === false ? (
                <div className="flex items-center gap-3">
                  <Link href={"/login"} className=" hover:text-emerald-600">
                    Login
                  </Link>
                  <span>|</span>
                  <Link href={"/register"} className=" hover:text-emerald-600">
                    Register
                  </Link>
                </div>
              ) : (
                <div className="flex items-center relative">
                  <Button
                    className="!normal-case !text-gray-800 !bg-gray-100 hover:!bg-gray-200 !rounded-full !px-4 !py-2 !shadow-sm flex items-center gap-3"
                    onClick={handleClick}
                  >
                    <FaCircleUser size={38} className="text-emerald-600" />

                    <div className="flex flex-col items-start leading-tight">
                      <span className="text-[13px] text-gray-500">
                        {context?.user?.email}
                      </span>

                      <span className="text-[15px] font-semibold capitalize text-gray-800">
                        {context?.user?.name || "Guest"}
                      </span>
                    </div>
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    slotProps={{
                      paper: {
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={handleClose}>
                      <div className="flex items-center gap-1">
                        <span className="w-5">
                          <FaRegUser size={17} />
                        </span>{" "}
                        My Profile
                      </div>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <div className="flex items-center gap-1">
                        <span className="w-5">
                          <FaRegHeart size={17} />
                        </span>{" "}
                        My List
                      </div>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <div className="flex items-center gap-1">
                        <span className="w-5">
                          <MdOutlineLocationOn size={24} />
                        </span>{" "}
                        Address
                      </div>
                    </MenuItem>
                    <MenuItem onClick={logout}>
                      <div className="flex items-center gap-1">
                        <span className="w-5">
                          <IoMdLogOut size={20} />
                        </span>{" "}
                        Logout
                      </div>
                    </MenuItem>
                  </Menu>
                </div>
              )}

              <div className="flex items-center gap-8">
                <Link href={"/my-list"} className="relative flex group">
                  <span className="bg-red-600 w-6 h-6 text-white rounded-full flex items-center justify-center absolute -top-[10px] -right-[17px] z-50">
                    3
                  </span>
                  <FaRegHeart
                    size={25}
                    className="text-gray-500 group-hover:text-emerald-600"
                  />
                </Link>
                <Link href={"/cart"} className="relative flex group">
                  <span className="bg-red-600 w-6 h-6 text-white rounded-full flex items-center justify-center absolute -top-[10px] -right-[17px] z-50">
                    {context.cartItems?.length || 0}
                  </span>
                  <HiOutlineShoppingBag
                    size={30}
                    className="text-gray-500 group-hover:text-emerald-600"
                  />
                </Link>
              </div>
            </div>
          </div>
        </header>
        <NavBar />
      </div>
    </>
  );
};

export default Header;
