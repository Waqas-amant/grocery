"use client";

import { usePathname } from "next/navigation";
import SideBar from "./components/SideBar";
import Header from "./components/Header";

const validRoutes = [
  "/",
  "/home-slides",
  "/home-slides/add-home-slide",
  "/categroy-list",
  "/categroy-list/add-categroy",
  "/products-list",
  "/products-list/add-product",
  "/users",
  "/orders",
  "/banners",
  "/banners/add-banner",
];

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const hideLayout = !validRoutes.includes(pathname);

  return hideLayout ? (
    <>{children}</>
  ) : (
    <div className="mainWrapper flex">
      <div className="sidebarWrapper w-[18%] sticky top-0 h-screen bg-white border-r border-[rgba(0,0,0,0.2)] shadow-md">
        <SideBar />
      </div>

      <div className="mainContent w-[82%]">
        <Header />
        {children}
      </div>
    </div>
  );
}
