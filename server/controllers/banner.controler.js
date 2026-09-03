import BannerModel from "../models/banner.model.js";
import UserModel from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Add a new banner (Admin Only)
export async function addBanner(request, response) {
  try {
    const userId = request.userId;
    const user = await UserModel.findById(userId);

    if (!user || user.role !== "ADMIN") {
      return response.status(403).json({
        error: true,
        success: false,
        message: "Access denied. Admin access required.",
      });
    }

    const { title, imageUrl, link, isActive } = request.body;

    if (!title || !imageUrl) {
      return response.status(400).json({
        error: true,
        success: false,
        message: "Title and Image URL are required.",
      });
    }

    const banner = new BannerModel({
      title,
      imageUrl,
      link: link || "",
      isActive: isActive !== undefined ? isActive : true,
    });

    await banner.save();

    return response.status(201).json({
      error: false,
      success: true,
      message: "Banner created successfully",
      banner: banner,
    });
  } catch (error) {
    console.log("ADD BANNER ERROR:", error);
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

// List all active banners (Public)
export async function listActiveBanners(request, response) {
  try {
    const banners = await BannerModel.find({ isActive: true }).sort({ createdAt: -1 });

    return response.status(200).json({
      error: false,
      success: true,
      banners: banners,
    });
  } catch (error) {
    console.log("LIST ACTIVE BANNERS ERROR:", error);
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

// Get all banners (Admin / All)
export async function getAllBanners(request, response) {
  try {
    const banners = await BannerModel.find().sort({ createdAt: -1 });

    return response.status(200).json({
      error: false,
      success: true,
      banners: banners,
    });
  } catch (error) {
    console.log("GET ALL BANNERS ERROR:", error);
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

// Delete banner (Admin Only)
export async function deleteBanner(request, response) {
  try {
    const userId = request.userId;
    const user = await UserModel.findById(userId);

    if (!user || user.role !== "ADMIN") {
      return response.status(403).json({
        error: true,
        success: false,
        message: "Access denied. Admin access required.",
      });
    }

    const { id } = request.params;
    const banner = await BannerModel.findById(id);

    if (!banner) {
      return response.status(404).json({
        error: true,
        success: false,
        message: "Banner not found",
      });
    }

    if (banner.imageUrl && banner.imageUrl.includes("cloudinary.com")) {
      const urlArr = banner.imageUrl.split("/");
      const image = urlArr[urlArr.length - 1];
      const imageName = image.split(".")[0];
      if (imageName) {
        try {
          await cloudinary.uploader.destroy(imageName);
        } catch (err) {
          console.log("Cloudinary image delete error:", err);
        }
      }
    }

    await BannerModel.findByIdAndDelete(id);

    return response.status(200).json({
      error: false,
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    console.log("DELETE BANNER ERROR:", error);
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}
