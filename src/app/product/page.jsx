import React from "react";

import ProductDetailsComponent from "@/components/ProductsDetails";
import ProductRow from "@/components/ProductRow";
const ProductDetails = () => {
  return (
    <section>
      <div className="container pb-5">
        <ProductDetailsComponent />
        <ProductRow title="related products" />
      </div>
    </section>
  );
};

export default ProductDetails;
