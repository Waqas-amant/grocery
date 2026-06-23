import categroyModel from "../models/categroy.model.js";
import { v2 as cloudinary } from "cloudinary";
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

// export async function createCategroy(request, response) {
//   try {
//     let categroy = new categroyModel({
//       name: request.body.name,
//       images: request.body.images,
//     });
//     if (!categroy) {
//       response.status(500).json({
//         message: "Categroy not created",
//         error: true,
//         success: false,
//       });
//     }
//     categroy = await categroy.save();
//     images = [];
//     response.status(200).json({
//       message: "Categroy created",
//       error: false,
//       success: true,
//       categroy: categroy,
//     });
//   } catch (error) {
//     return response.status(500).json({
//       error: true,
//       success: false,
//       message: error.message,
//     });
//   }
// }

export async function createCategroy(request, response) {
  try {
    console.log("BODY:", request.body); // 🔍 debug

    let categroy = new categroyModel({
      name: request.body.name || "",
      images: request.body.images || [], // ✅ SAFE
    });

    await categroy.save();

    return response.status(200).json({
      message: "Categroy created",
      error: false,
      success: true,
      categroy: categroy,
    });
  } catch (error) {
    console.log("CREATE ERROR:", error); // 🔥 IMPORTANT

    return response.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

export async function getCategories(request, response) {
  try {
    const categories = await categroyModel.find();
    return response.status(200).json({
      error: false,
      success: true,
      categories: categories,
    });
  } catch (error) {
    console.log("ERROR:", error);
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

export async function deleteCategroy(request, response) {
  try {
    const categroy = await categroyModel.findById(request.params.id);
    const images = categroy.images;
    let img = "";
    for (const img of images) {
      const urlArr = img.split("/");
      const image = urlArr[urlArr.length - 1];
      const imageName = image.split(".")[0];

      if (imageName) {
        await cloudinary.uploader.destroy(imageName);
      }
    }
    const deleteCategroy = await categroyModel.findByIdAndDelete(
      request.params.id,
    );
    if (!deleteCategroy) {
      return response.status(404).json({
        message: "Categroy not found",
        error: true,
        success: false,
      });
    }
    return response.status(200).json({
      message: "Categroy Deleted",
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

export async function updateCategroy(request, response) {
  try {
    const categroy = await categroyModel.findByIdAndUpdate(
      request.params.id,
      {
        name: request.body.name,
        images: request.body.images,
      },
      { returnDocument: "after" },
    );

    if (!categroy) {
      return response.status(404).json({
        message: "Categry cannot be updated",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      message: "Categroy updated successfully",
      error: false,
      success: true,
      categroy,
    });
  } catch (error) {
    console.log("UPDATE ERROR:", error);

    return response.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getCategroy(request, response) {
  try {
    const categroy = await categroyModel.findById(request.params.id);
    if (!categroy) {
      return response.status(500).json({
        message: "The categroy was given id was Not Found",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      categroy: categroy,
    });
  } catch (error) {
    console.log("ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
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
