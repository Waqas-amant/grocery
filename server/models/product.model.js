import mongoose from "mongoose";
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    brand: {
      type: String,
      required: true,
      default: "",
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    oldPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    catName: {
      type: String,

      default: "",
    },
    catId: {
      type: String,

      default: "",
    },
    categroy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categry",
    },
    stock: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
