import Link from "next/link";
import React from "react";
import { FaAngleDown } from "react-icons/fa6";
const NavBar = () => {
  return (
    <nav className="py-4">
      <div className="container flex items-center justify-between gap-5 ">
        <Link
          className="text-[14px] text-gray-800 font-[400] hover:text-emerald-600"
          href={"/"}
        >
          Home
        </Link>
        <Link
          className="text-[14px] text-gray-800 font-[400] hover:text-emerald-600"
          href={"/products"}
        >
          Fruits & Vegetables
        </Link>
        <Link
          className="text-[14px] text-gray-800 font-[400] hover:text-emerald-600"
          href={"/products"}
        >
          Meats & Seafood
        </Link>
        <Link
          className="text-[14px] text-gray-800 font-[400] hover:text-emerald-600"
          href={"/products"}
        >
          Breaksfast & Dairy
        </Link>
        <Link
          className="text-[16px] text-gray-800 font-[400] hover:text-emerald-600"
          href={"/products"}
        >
          Breads & Bakery
        </Link>
        <Link
          className="text-[14px] text-gray-800 font-[400] hover:text-emerald-600"
          href={"/products"}
        >
          Beverages
        </Link>
        <Link
          className="text-[14px] text-gray-800 font-[400] hover:text-emerald-600"
          href={"/products"}
        >
          Frozen Foods
        </Link>
        <Link
          className="text-[14px] text-gray-800 font-[500] hover:text-emerald-600"
          href={"/products"}
        >
          Biscuits & Snacks
        </Link>
        <Link
          className="text-[14px] text-gray-800 font-[400]  hover:text-emerald-600"
          href={"/products"}
        >
          Grocery & Staples
        </Link>
        <Link
          className="text-[14px] text-gray-800 font-[400] hover:text-emerald-600"
          href={"/products"}
        >
          Beverages
        </Link>
        <div className="relative group">
          <span className="text-[14px] text-gray-800 font-[400] hover:text-emerald-600 flex items-center gap-1 cursor-pointer">
            More <FaAngleDown size={18} />
          </span>

          <div className="absolute top-full right-0 mt-1 w-[200px] bg-white shadow-md rounded-md overflow-hidden opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200">
            <Link
              className="text-[14px] text-gray-800 font-[400] hover:text-emerald-600 block py-2 px-4"
              href="/products"
            >
              Grocery & Staples
            </Link>

            <Link
              className="text-[14px] text-gray-800 font-[400] hover:text-emerald-600 block py-2 px-4"
              href="/products"
            >
              Beverages
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
