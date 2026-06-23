import HomeSliderModel from "../models/homeSlider.model.js";
import { v2 as cloudinary } from "cloudinary";
import { error } from "console";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImages(req, res) {
  const images = req.files || [];
  const imgesArr = [];

  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i].path, options);
      imgesArr.push(result.secure_url);
    }

    return res.status(200).json({
      images: imgesArr,
    });
  } catch (error) {
    console.error("🔥 Upload Error:", error);
    return res.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  } finally {
    // Safely remove all temporary uploads from local storage
    for (let i = 0; i < images.length; i++) {
      try {
        if (fs.existsSync(images[i].path)) {
          fs.unlinkSync(images[i].path);
        }
      } catch (unlinkError) {
        console.error(
          "Failed to delete temp file:",
          images[i].path,
          unlinkError,
        );
      }
    }
  }
}

export const removeImageFromCloudry = async (req, res) => {
  try {
    const imgUrl = req.query.img;

    if (!imgUrl) {
      return res.status(400).json({
        success: false,
        message: "Image URL missing",
      });
    }

    const urlArr = imgUrl.split("/");
    const image = urlArr[urlArr.length - 1];
    const imageName = image.split(".")[0];

    const result = await cloudinary.uploader.destroy(imageName);

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      result,
    });
  } catch (error) {
    console.log("DELETE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export async function addHomeSlide(req, res) {
//   try {
//     let slide = new HomeSliderModel({
//       images: imgesArr,
//     });
//     if (!slide) {
//       return res.status(500).json({
//         message: "Slide Not Created",
//         error: true,
//         success: false,
//       });
//     }
//     slide = await slide.save();
//     imgesArr = [];
//     return res.status(200).json({
//       error: false,
//       success: true,
//       message: "Slide has created",
//       slide: slide,
//     });
//   } catch (error) {
//     console.error("🔥 Upload Error:", error);
//     return res.status(500).json({
//       error: true,
//       success: false,
//       message: error.message,
//     });
//   }
// }

export async function addHomeSlide(req, res) {
  // console.log("ADD API HIT");
  // console.log(req.body);
  try {
    let slide = new HomeSliderModel({
      images: req.body.images,
    });

    slide = await slide.save();

    return res.status(200).json({
      error: false,
      success: true,
      message: "Slide has created",
      slide,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

export async function deleteSlide(request, response) {
  try {
    const slide = await HomeSliderModel.findById(request.params.id);
    const images = slide.images;
    let img = "";
    for (const img of images) {
      const urlArr = img.split("/");
      const image = urlArr[urlArr.length - 1];
      const imageName = image.split(".")[0];

      if (imageName) {
        await cloudinary.uploader.destroy(imageName);
      }
    }
    const deleteSlide = await HomeSliderModel.findByIdAndDelete(
      request.params.id,
    );
    if (!deleteSlide) {
      return response.status(404).json({
        message: "Slide not found",
        error: true,
        success: false,
      });
    }
    return response.status(200).json({
      message: "Slide Deleted",
      error: false,
      success: true,
    });
  } catch (error) {
    console.log("DELETE ERROR:", error);

    return response.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function updateSlide(request, response) {
  try {
    const slide = await HomeSliderModel.findByIdAndUpdate(
      request.params.id,
      {
        images: request.body.images,
      },
      { new: true },
    );

    if (!slide) {
      return response.status(404).json({
        message: "Slide cannot be updated",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      message: "Slide updated successfully",
      error: false,
      success: true,
      slide,
    });
  } catch (error) {
    console.log("UPDATE ERROR:", error);

    return response.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getHomeSlide(request, response) {
  try {
    const slide = await HomeSliderModel.find();
    if (!slide) {
      return response.status(404).json({
        message: "Slide Not Found",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      slide: slide,
    });
  } catch (error) {
    console.log("ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getSlide(request, response) {
  try {
    const slide = await HomeSliderModel.findById(request.params.id);
    if (!slide) {
      return response.status(500).json({
        message: "The slide was given id was Not Found",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      slide: slide,
    });
  } catch (error) {
    console.log("ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
