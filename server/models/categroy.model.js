import mongoose from "mongoose";

const categroySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String], // ✅ FIX
      default: [],
    },
  },
  { timestamps: true },
);

const categroyModel = mongoose.model("Categroy", categroySchema);

export default categroyModel;
