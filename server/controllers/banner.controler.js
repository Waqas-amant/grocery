import BannerModel from "../models/banner.model.js";
import UserModel from "../models/user.model.js";

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
