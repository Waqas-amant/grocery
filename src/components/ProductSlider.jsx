"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// import "./styles.css";

// import required modules
import { Navigation } from "swiper/modules";
import ProductItem from "./ProductItem";
const ProductSlider = () => {
  return (
    <div className="productSlider">
      <Swiper
        slidesPerView={6}
        spaceBetween={5}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="py-3 px-2">
          <ProductItem />
        </SwiperSlide>
        <SwiperSlide className="py-3 px-2">
          <ProductItem />
        </SwiperSlide>
        <SwiperSlide className="py-3 px-2">
          <ProductItem />
        </SwiperSlide>
        <SwiperSlide className="py-3 px-2">
          <ProductItem />
        </SwiperSlide>
        <SwiperSlide className="py-3 px-2">
          <ProductItem />
        </SwiperSlide>
        <SwiperSlide className="py-3 px-2">
          <ProductItem />
        </SwiperSlide>
        <SwiperSlide className="py-3 px-2">
          <ProductItem />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ProductSlider;
