"use client";
import AccountSidebar from "@/components/AccountSidebar";
import { Button, Rating } from "@mui/material";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const MyList = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      brand: "Lay's",
      name: "Lay's American Style Cream & Onion Potato Chips 82 g",
      rating: 5,
      price: "$25.99",
      oldPrice: "$38.10",
      image: "/image1.png",
    },
    {
      id: 2,
      brand: "Pepsi",
      name: "Pepsi Can 330ml",
      rating: 4,
      price: "$2.50",
      oldPrice: "$3.20",
      image: "/image1.png",
    },
  ]);

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <section className="bg-gray-100 py-8">
      <div className="container flex gap-10 flex-wrap">
        <div className="w-full lg:w-[20%]">
          <AccountSidebar />
        </div>
        <div className="wrapper w-full lg:w-[60%] mt-5">
          <div className="bg-white shadow-md rounded-md mb-5">
            <div className="p-4 flex items-center justify-between border-b-[1px] border-[rgba(0,0,0,0.1)]">
              <div className="info">
                <h4 className="text-[20px] text-gray-700">My List</h4>
                <p className="text-[16px] text-gray-500">
                  There are{" "}
                  <span className="text-emerald-600 font-bold">
                    {items.length}
                  </span>{" "}
                  products in my list
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="myListBox flex items-center gap-3 border-b-[1px] border-[rgba(0,0,0,0.1)] py-3 flex-wrap"
                >
                  <div className="img w-[80px] h-[100px] group">
                    <img
                      src={item.image}
                      alt="image"
                      className="w-full h-full object-cover transition-all group-hover:scale-105 cursor-pointer"
                    />
                  </div>
                  <div className="info flex flex-col gap-[5px] flex-1 min-w-[220px]">
                    <span className="text-[13px] text-gray-600">
                      {item.brand}
                    </span>
                    <h3 className="text-[16px] text-gray-800 font-[500]">
                      {item.name}
                    </h3>
                    <Rating
                      name="read-only"
                      value={item.rating}
                      readOnly
                      size="small"
                    />
                    <div className="flex items-center gap-3 py-3 flex-wrap">
                      <span className="text-red-600 text-[16px] font-[600]">
                        {item.price}
                      </span>
                      <span className="text-gray-300 text-[16px] font-[600] line-through">
                        {item.oldPrice}
                      </span>
                      <span className="text-emerald-600 text-[16px] font-bold">
                        14% OFF
                      </span>
                    </div>
                  </div>
                  <Button
                    className="w-[50px]! h-[50px]! min-h-[50px]! rounded-full! p-0! text-gray-700! ml-auto!"
                    onClick={() => removeItem(item.id)}
                  >
                    <IoClose size={20} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyList;
