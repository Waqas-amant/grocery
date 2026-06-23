"use client";
import { Button } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { BsBagCheck } from "react-icons/bs";
import {
  FaCloudUploadAlt,
  FaMapPin,
  FaRegHeart,
  FaRegUser,
} from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MyContext } from "../context/ThemeContext";
import { fetchDatafromApi } from "@/utils/api";
import Cookies from "js-cookie";
import { useContext } from "react";

const AccountSidebar = () => {
  const router = useRouter();
  const context = useContext(MyContext);
  const handleLogout = async () => {
    try {
      const res = await fetchDatafromApi("/api/user/logout");
      if (res?.success) {
        context.setIsLogin(false);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        Cookies.remove("userEmail");
        Cookies.remove("userName");
        context.setUser(null);
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [active, setActive] = useState("profile");
  return (
    <aside className="accountSidebar  w-[100%]  bg-white shadow-md rounded-md mt-5">
      <div className="profileSection py-5 pb-0 ">
        <div className="profileImage w-[100px] h-[100px] rounded-full overflow-hidden m-auto  relative group">
          <img
            src={"/logo1.png"}
            alt="profileImage"
            className="w-full h-full object-cover cursor-pointer"
          />
          <div className="overlay w-full h-full rounded-full bg-[rgba(0,0,0,0.7)] z-50 absolute top-0 left-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
            <FaCloudUploadAlt size={30} className="text-white" />
            <input
              type="file"
              className="w-full h-full absolute top-0 left-0 z-50 opacity-0"
            />
          </div>
        </div>
        <div className="text-center mt-3">
          <h4 className="text-[18px] font-semibold text-gray-700">Waqas Ali</h4>
          <p className="text-[14px]  text-gray-700">waqas@gmail.com</p>
        </div>
        <div className="flex flex-col gap-[2px] bg-[#f1f1f1] mt-4 py-2 myAcc">
          <Link href={"/my-account"}>
            <Button
              onClick={() => setActive("profile")}
              fullWidth
              sx={{
                justifyContent: "flex-start",
                textTransform: "capitalize",
                px: 2,
                py: 1.2,
                color: "#4b5563",
                fontWeight: 600,
                backgroundColor:
                  active === "profile" ? "#059669" : "transparent",
                color: active === "profile" ? "#fff" : "#4b5563",
              }}
            >
              <FaRegUser size={20} style={{ marginRight: "8px" }} />
              My Profile
            </Button>
          </Link>
          <Link href={"/address"}>
            <Button
              onClick={() => setActive("address")}
              fullWidth
              sx={{
                justifyContent: "flex-start",
                textTransform: "capitalize",
                px: 2,
                py: 1.2,
                color: "#4b5563",
                fontWeight: 600,
                backgroundColor:
                  active === "address" ? "#059669" : "transparent",
                color: active === "address" ? "#fff" : "#4b5563",
              }}
            >
              <FaMapPin size={20} style={{ marginRight: "8px" }} />
              Address
            </Button>
          </Link>
          <Link href={"/my-list"}>
            <Button
              onClick={() => setActive("my list")}
              fullWidth
              sx={{
                justifyContent: "flex-start",
                textTransform: "capitalize",
                px: 2,
                py: 1.2,
                color: "#4b5563",
                fontWeight: 600,
                backgroundColor:
                  active === "my list" ? "#059669" : "transparent",
                color: active === "my list" ? "#fff" : "#4b5563",
              }}
            >
              <FaRegHeart size={20} style={{ marginRight: "8px" }} />
              My List
            </Button>
          </Link>
          <Link href={"/my-orders"}>
            <Button
              onClick={() => setActive("my order")}
              fullWidth
              sx={{
                justifyContent: "flex-start",
                textTransform: "capitalize",
                px: 2,
                py: 1.2,
                color: "#4b5563",
                fontWeight: 600,
                backgroundColor:
                  active === "my order" ? "#059669" : "transparent",
                color: active === "my order" ? "#fff" : "#4b5563",
              }}
            >
              <BsBagCheck size={20} style={{ marginRight: "8px" }} />
              My Order
            </Button>
          </Link>

          <Button
            onClick={() => {
              setActive("logout");
              handleLogout();
            }}
            fullWidth
            sx={{
              justifyContent: "flex-start",
              textTransform: "capitalize",
              px: 2,
              py: 1.2,
              color: "#4b5563",
              fontWeight: 600,
              backgroundColor: "transparent",
            }}
          >
            <IoMdLogOut size={20} style={{ marginRight: "8px" }} />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default AccountSidebar;
