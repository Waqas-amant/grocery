"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import ProductItem from "./ProductItem";
import { getProducts } from "@/utils/api";

const ProductSlider = ({ limit = 8 }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const res = await getProducts({ page: 1, limit });
      if (res?.success) {
        setProducts(res.products || []);
      }
      setLoading(false);
    };

    loadProducts();
  }, [limit]);

  if (loading) {
    return <div className="py-4 text-gray-500">Loading products...</div>;
  }

  return (
    <div className="productSlider">
      <Swiper
        slidesPerView={1}
        spaceBetween={5}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product._id} className="py-3 px-2">
            <ProductItem product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
