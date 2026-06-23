"use client";
import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import "./styles.css";

import Image from "next/image";

import { Navigation, Autoplay } from "swiper/modules";
const HomeSlider = () => {
  return (
    <div className="homeSlier">
      <div className="container">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="item">
              <Image
                src={"/slider1.png"}
                alt="img"
                width={1344}
                height={514}
                className="w-full"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item">
              <Image
                src={"/slider1.png"}
                alt="img"
                width={1344}
                height={514}
                className="w-full"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item">
              <Image
                src={"/slider1.png"}
                alt="img"
                width={1344}
                height={514}
                className="w-full"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeSlider;
