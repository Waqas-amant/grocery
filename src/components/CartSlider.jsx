"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Link from "next/link";

const categories = [
  { name: "Frozen Foods", img: "/cart1.png" },
  { name: "Biscuits & Snacks", img: "/cart2.png" },
  { name: "Grocery & Staples", img: "/cart3.png" },
  { name: "Baby & Pregnancy", img: "/cart4.png" },
  { name: "Healthcare", img: "/cart5.png" },
  { name: "Fruits & Vegetables", img: "/cart6.png" },
  { name: "Meats & Seafood", img: "/cart7.png" },
  { name: "Breakfast & Dairy", img: "/cart8.png" },
  { name: "Breads & Bakery", img: "/cart9.png" },
  { name: "Beverage", img: "/cart10.png" },
];

const CartSlider = () => {
  return (
    <div className="py-5">
      <div className="container mx-auto">
        <Swiper
          spaceBetween={20}
          navigation={true}
          loop={true}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
            1280: { slidesPerView: 8 },
          }}
        >
          {categories.map((item, index) => (
            <SwiperSlide key={index}>
              <Link
                href="/products"
                className="group bg-white rounded-md shadow-md flex flex-col items-center justify-between p-3 h-[160px] hover:shadow-lg hover:-translate-y-1 transition group-hover:bg-gray-400"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-[60px] object-contain transition group-hover:scale-105   "
                />

                <h4 className="text-[14px] font-[400] text-center mt-2 text-gray-700 leading-tight line-clamp-2 group-hover:text-emerald-600">
                  {item.name}
                </h4>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CartSlider;
