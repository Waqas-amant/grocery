"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";

const ProductZoom = ({ images = [] }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const zoomSliderBig = useRef(null);
  const zoomSliderSmall = useRef(null);

  useEffect(() => {
    setSlideIndex(0);
  }, [images]);

  const goToSlider = (index) => {
    setSlideIndex(index);
    zoomSliderSmall.current?.swiper?.slideTo(index);
    zoomSliderBig.current?.swiper?.slideTo(index);
  };

  const safeImages = images.length ? images : ["/pro1.png"];

  return (
    <div className="imageWrapper w-full lg:w-[30%] mt-3">
      <div className="isSliderWrapper border border-[rgba(0,0,0,0.2)] rounded-lg overflow-hidden">
        <Swiper className="bigSwiper" ref={zoomSliderBig}>
          {safeImages.map((img, index) => (
            <SwiperSlide key={`${img}-${index}`}>
              <div className="item">
                <InnerImageZoom zoomType="hover" zoomScale={1} src={img} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="smlSlider pt-4">
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          className="bigSwiper"
          ref={zoomSliderSmall}
        >
          {safeImages.map((img, index) => (
            <SwiperSlide key={`${img}-thumb-${index}`}>
              <div
                className={`item border ${
                  slideIndex === index
                    ? "border-[rgba(0,0,0,0.4)]"
                    : "border-[rgba(0,0,0,0.1)]"
                } p-3 cursor-pointer rounded-md`}
                onClick={() => goToSlider(index)}
              >
                <img
                  src={img}
                  alt="product image"
                  className="w-full h-[80px] object-cover"
                  width={80}
                  height={80}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductZoom;
