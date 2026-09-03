"use client";
import { Button } from "@mui/material";
import { Collapse } from "react-collapse";
import Link from "next/link";
import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { MyContext } from "./context/ThemeProvider";
import { IoIosLogOut } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";
import { LiaAngleDownSolid, LiaImageSolid } from "react-icons/lia";
import { MdOutlineCategory } from "react-icons/md";
import { PiImageSquare } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { TbBrandProducthunt, TbUser } from "react-icons/tb";

const SideBar = () => {
  const [isOpenTab, setIsOpenTab] = useState(null);
  const router = useRouter();
  const context = useContext(MyContext);

  const handleLogout = () => {
    Cookies.remove("accessToken", { path: "/" });
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken", { path: "/" });
    Cookies.remove("refreshToken");
    Cookies.remove("userName", { path: "/" });
    Cookies.remove("userName");
    Cookies.remove("userEmail", { path: "/" });
    Cookies.remove("userEmail");
    if (context?.setIsLogin) {
      context.setIsLogin(false);
    }
    if (context?.setUser) {
      context.setUser({ name: "", email: "" });
    }
    if (context?.alertBox) {
      context.alertBox("success", "Logged out successfully!");
    }
    router.push("/login");
  };
  const sidebarTab = [
    {
      name: "Dashboard",
      icon: <RxDashboard size={20} className="group-hover:text-emerald-600" />,
      href: "/",
    },
    {
      name: "Home Slides",
      icon: (
        <LiaImageSolid size={22} className="group-hover:text-emerald-600" />
      ),
      href: null,
      children: [
        {
          name: "Home Slides Lists",
          href: "/home-slides",
        },
        {
          name: "Add Home Slide",
          href: "/home-slides/add-home-slide",
        },
      ],
    },
    {
      name: "Categroy",
      icon: (
        <MdOutlineCategory
          size={22}
          className="group-hover:text-emerald-600 "
        />
      ),
      href: null,
      children: [
        {
          name: "Categroy List",
          href: "/categroy-list",
        },
        {
          name: "Add New Categroy",
          href: "/categroy-list/add-categroy",
        },
      ],
    },
    {
      name: "Products",
      icon: (
        <TbBrandProducthunt
          size={22}
          className="group-hover:text-emerald-600"
        />
      ),
      href: null,
      children: [
        {
          name: "Products List",
          href: "/products-list",
        },
        {
          name: "Add New Product",
          href: "/products-list/add-product",
        },
      ],
    },
    {
      name: "Users",
      icon: <TbUser size={20} className="group-hover:text-emerald-600" />,
      href: "/users",
    },
    {
      name: "Orders",
      icon: (
        <IoBagCheckOutline size={20} className="group-hover:text-emerald-600" />
      ),
      href: "/orders",
    },
    {
      name: "Banners",
      icon: (
        <PiImageSquare size={20} className="group-hover:text-emerald-600" />
      ),
      href: null,
      children: [
        {
          name: "Banner-List",
          href: "/banners",
        },
        {
          name: "Add New Banner",
          href: "/banners/add-banner",
        },
      ],
    },
    {
      name: "Logout",
      icon: <IoIosLogOut size={20} className="group-hover:text-emerald-600" />,
      href: null,
    },
  ];

  return (
    <div>
      <aside className="w-full px-2">
        <div className="p-4">
          <Link href={"/"}>
            <img src="/logo (1).png" alt="logo" className="w-[200px]" />
          </Link>
        </div>

        <div className="scrolling">
          {sidebarTab &&
            sidebarTab.map((item, index) => (
              <div key={index}>
                {item?.href !== null ? (
                  <Link href={item?.href}>
                    <Button className="w-full! text-left! justify-start! capitalize! text-gray-800! text-[16px]! hover:bg-gray-200! px-4! py-[8px]! gap-3! group">
                      {item?.icon}
                      {item?.name}

                      {item?.children && (
                        <LiaAngleDownSolid size={15} className="ml-auto" />
                      )}
                    </Button>
                  </Link>
                ) : (
                  <Button
                    className="w-full! text-left! justify-start! capitalize! text-gray-800! text-[16px]! hover:bg-gray-200! px-4! py-[8px]! gap-3! group"
                    key={index}
                    onClick={() => {
                      if (item?.name === "Logout") {
                        handleLogout();
                      } else {
                        setIsOpenTab(isOpenTab === index ? null : index);
                      }
                    }}
                  >
                    {item?.icon}
                    {item?.name}

                    {item?.children && (
                      <LiaAngleDownSolid
                        size={15}
                        className={`ml-auto transition-all ${isOpenTab === index && "rotate-180"}`}
                      />
                    )}
                  </Button>
                )}
                {item?.children && (
                  <Collapse isOpened={isOpenTab === index ? true : false}>
                    <div className="dropdown flex flex-col gap-3 pl-12 py-1">
                      {item.children.map((tab, index_) => (
                        <Link
                          href={tab?.href}
                          key={index_}
                          className="text-[14px] flex items-center gap-3 hover:text-emerald-600 text-gray-600"
                        >
                          {tab?.name}
                        </Link>
                      ))}
                    </div>
                  </Collapse>
                )}
              </div>
            ))}
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
