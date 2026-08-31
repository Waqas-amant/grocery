"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import Link from "next/link";

const banners = [
  {
    title: "Weekend treats",
    subtitle: "Save big on snacks and beverages",
    image: "/banner2.jpg",
  },
  {
    title: "Fresh arrivals",
    subtitle: "New stocks every day",
    image: "/banner2.jpg",
  },
  {
    title: "Healthy essentials",
    subtitle: "A smarter pantry starts here",
    image: "/banner2.jpg",
  },
];

const Banner = () => {
  return (
    <div className="py-5 pt-0">
      <div className="container">
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={`${banner.title}-${index}`}>
              <Link
                href={"/products"}
                className="group overflow-hidden rounded-2xl block relative"
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-[180px] md:h-[220px] object-cover transition group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20 flex items-end p-5">
                  <div className="text-white">
                    <h3 className="text-lg font-semibold">{banner.title}</h3>
                    <p className="text-sm text-gray-200">{banner.subtitle}</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
