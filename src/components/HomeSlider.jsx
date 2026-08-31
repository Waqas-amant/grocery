"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { Navigation, Autoplay } from "swiper/modules";

const slides = [
  {
    title: "Fresh groceries delivered fast",
    subtitle: "Daily essentials and pantry favorites at great prices.",
    image: "/slider1.png",
  },
  {
    title: "Healthy choices for every meal",
    subtitle: "Discover fresh produce, dairy, and snacks for your table.",
    image: "/banner2.jpg",
  },
  {
    title: "Special offers this week",
    subtitle: "Save more on top-selling products and everyday staples.",
    image: "/slider1.png",
  },
];

const HomeSlider = () => {
  return (
    <div className="homeSlider">
      <div className="container">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={`${slide.title}-${index}`}>
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  width={1344}
                  height={514}
                  className="w-full h-[320px] md:h-[460px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent flex items-center">
                  <div className="max-w-xl px-6 md:px-12 py-6 text-white">
                    <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">
                      Fresh picks
                    </p>
                    <h2 className="text-2xl md:text-4xl font-bold mt-2">
                      {slide.title}
                    </h2>
                    <p className="text-sm md:text-lg mt-3 text-gray-200">
                      {slide.subtitle}
                    </p>
                    <button className="mt-5 rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold hover:bg-emerald-700">
                      Shop now
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeSlider;
