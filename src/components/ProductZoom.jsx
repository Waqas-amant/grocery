"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
const ProductZoom = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const zoomSliderBig = useRef();
  const zoomSliderSmall = useRef();

  const goToSlider = (index) => {
    setSlideIndex(index);
    zoomSliderSmall.current.swiper.slideTo(index);
    zoomSliderBig.current.swiper.slideTo(index);
  };
  return (
    <div className="imageWrapper w-[30%] mt-3">
      <div className="isSliderWrapper  border border-[rgba(0,0,0,0.2)]  rounded-lg overflow-hidden">
        <Swiper className="bigSwiper" ref={zoomSliderBig}>
          {" "}
          <SwiperSlide>
            {" "}
            <div className="item">
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src={"/chipspak.jpg"}
              />{" "}
            </div>{" "}
          </SwiperSlide>{" "}
          <SwiperSlide>
            {" "}
            <div className="item">
              {" "}
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src={"/backchi.jpg"}
              />{" "}
            </div>{" "}
          </SwiperSlide>{" "}
          <SwiperSlide>
            {" "}
            <div className="item">
              {" "}
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src={"/back1.jpg"}
              />{" "}
            </div>
          </SwiperSlide>{" "}
        </Swiper>
      </div>
      <div className="smlSlider pt-4">
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          className="bigSwiper"
          ref={zoomSliderSmall}
        >
          {" "}
          <SwiperSlide>
            {" "}
            <div
              className={`item border ${
                slideIndex === 0
                  ? "border-[rgba(0,0,0,0.4)]"
                  : "border-[rgba(0,0,0,0.1)]"
              } p-3 cursor-pointer rounded-md`}
              onClick={() => goToSlider(0)}
            >
              <img
                src="/chipspak.jpg"
                alt="product image"
                className="w-full"
                width={80}
                height={80}
              />
            </div>
          </SwiperSlide>{" "}
          <SwiperSlide>
            {" "}
            <div
              className={`item border ${
                slideIndex === 1
                  ? "border-[rgba(0,0,0,0.4)]"
                  : "border-[rgba(0,0,0,0.1)]"
              } p-3 cursor-pointer rounded-md`}
              onClick={() => goToSlider(1)}
            >
              {" "}
              <img
                src={"/backchi.jpg"}
                alt="product image"
                className="w-full"
                width={80}
                height={80}
              />{" "}
            </div>{" "}
          </SwiperSlide>{" "}
          <SwiperSlide>
            {" "}
            <div
              className={`item border ${
                slideIndex === 2
                  ? "border-[rgba(0,0,0,0.4)]"
                  : "border-[rgba(0,0,0,0.1)]"
              } p-3 cursor-pointer rounded-md`}
              onClick={() => goToSlider(2)}
            >
              {" "}
              <img
                src={"/back1.jpg"}
                alt="product image"
                className="w-full"
                width={80}
                height={80}
              />{" "}
            </div>{" "}
          </SwiperSlide>{" "}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductZoom;
