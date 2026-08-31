"use client";
import { Button } from "@mui/material";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { BsBagCheck } from "react-icons/bs";
import {
  FaCloudUploadAlt,
  FaMapPin,
  FaRegHeart,
  FaRegUser,
} from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import { MyContext } from "@/components/context/ThemeContext";
import { fetchDatafromApi } from "@/utils/api";
import Cookies from "js-cookie";

const AccountSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const context = useContext(MyContext);
  const [active, setActive] = useState("profile");

  const handleLogout = async () => {
    try {
      const res = await fetchDatafromApi("/api/user/logout");
      if (res?.success) {
        context?.setIsLogin?.(false);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        Cookies.remove("userEmail");
        Cookies.remove("userName");
        context?.setUser?.({ name: "", email: "" });
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const currentActive = pathname?.includes("/address")
    ? "address"
    : pathname?.includes("/my-list")
      ? "my list"
      : pathname?.includes("/my-orders")
        ? "my order"
        : "profile";

  const profileName = context?.user?.name || "Guest User";
  const profileEmail = context?.user?.email || "guest@example.com";

  return (
    <aside className="accountSidebar w-full bg-white shadow-md rounded-md mt-5">
      <div className="profileSection py-5 pb-0">
        <div className="profileImage w-[100px] h-[100px] rounded-full overflow-hidden m-auto relative group">
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
          <h4 className="text-[18px] font-semibold text-gray-700">
            {profileName}
          </h4>
          <p className="text-[14px] text-gray-700">{profileEmail}</p>
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
                color: currentActive === "profile" ? "#fff" : "#4b5563",
                fontWeight: 600,
                backgroundColor:
                  currentActive === "profile" ? "#059669" : "transparent",
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
                color: currentActive === "address" ? "#fff" : "#4b5563",
                fontWeight: 600,
                backgroundColor:
                  currentActive === "address" ? "#059669" : "transparent",
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
                color: currentActive === "my list" ? "#fff" : "#4b5563",
                fontWeight: 600,
                backgroundColor:
                  currentActive === "my list" ? "#059669" : "transparent",
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
                color: currentActive === "my order" ? "#fff" : "#4b5563",
                fontWeight: 600,
                backgroundColor:
                  currentActive === "my order" ? "#059669" : "transparent",
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
