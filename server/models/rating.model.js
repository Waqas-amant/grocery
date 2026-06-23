import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

// Ensure a user can only rate a specific product once
ratingSchema.index({ productId: 1, userId: 1 }, { unique: true });

const RatingModel = mongoose.model("Rating", ratingSchema);
export default RatingModel;
