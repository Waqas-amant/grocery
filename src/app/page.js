import Banner from "@/components/Banner";
import CartSlider from "@/components/CartSlider";
import HomeSlider from "@/components/HomeSlider";
import PopularProduct from "@/components/PopularProduct";
import ProductRow from "@/components/ProductRow";

import React from "react";

const Home = () => {
  return (
    <div className="sliderWrapper bg-[#F1F1F1] py-5 pb-0">
      <HomeSlider />
      <CartSlider />
      <PopularProduct />
      <Banner />
      <ProductRow title={"Latest Product"} />
      <ProductRow title={"Feature Product"} />
      <ProductRow title={"Breakfast & Dairy"} />
    </div>
  );
};

export default Home;
