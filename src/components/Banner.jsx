"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// import "./styles.css";

// import required modules
import { Navigation } from "swiper/modules";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="py-5 pt-0">
      <div className="container">
        <Swiper
          slidesPerView={3}
          spaceBetween={25}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Link href={"/"} className="item group overflow-hidden rounded-md">
              <img
                src={"/banner2.jpg"}
                alt="banner"
                className="w-full transition group-hover:scale-105 rounded-md"
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href={"/"} className="item group overflow-hidden rounded-md">
              <img
                src={"/banner2.jpg"}
                alt="banner"
                className="w-full transition group-hover:scale-105 rounded-md"
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href={"/"} className="item group overflow-hidden rounded-md">
              <img
                src={"/banner2.jpg"}
                alt="banner"
                className="w-full transition group-hover:scale-105 rounded-md"
              />
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
