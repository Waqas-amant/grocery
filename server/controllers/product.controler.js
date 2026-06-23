import ProductModel from "../models/product.model.js";
import RatingModel from "../models/rating.model.js";
import mongoose from "mongoose";
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

//Create Prouct

export async function createProduct(request, response) {
  try {
    let product = new ProductModel({
      name: request.body.name,
      description: request.body.description,
      images: request.body.images,
      brand: request.body.brand,
      price: request.body.price,
      oldPrice: request.body.oldPrice,
      catName: request.body.catName,
      catId: request.body.catId,
      categroy: request.body.categroy,
      stock: request.body.stock,
      rating: request.body.rating,
      isFeatured: request.body.isFeatured,
      discount: request.body.discount,
    });
    product = await product.save();
    if (!product) {
      response.status(500).json({
        message: "Product is not created",
        error: true,
        success: false,
      });
    }
    //imgesArr = [];
    return response.status(200).json({
      message: "Product is created successfully",
      error: false,
      success: true,
      product: product,
    });
  } catch (error) {
    console.error("Error:", error);
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

//Get Products

export async function getAllProducts(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 10;
    
    const filter = {};
    
    // Category filter
    if (request.query.catId) {
      filter.catId = request.query.catId;
    } else if (request.query.category) {
      if (mongoose.Types.ObjectId.isValid(request.query.category)) {
        filter.categroy = request.query.category;
      } else {
        filter.catId = request.query.category;
      }
    }
    if (request.query.catName) {
      filter.catName = request.query.catName;
    }

    // Price range filter
    if (request.query.minPrice || request.query.maxPrice) {
      filter.price = {};
      if (request.query.minPrice) filter.price.$gte = Number(request.query.minPrice);
      if (request.query.maxPrice) filter.price.$lte = Number(request.query.maxPrice);
    }

    // Minimum rating filter
    if (request.query.minRating) {
      filter.rating = { $gte: Number(request.query.minRating) };
    }

    // Sorting logic
    let sortOption = { createdAt: -1 };
    const { sort, sortBy, order } = request.query;
    
    if (sort) {
      if (sort === "price_asc" || sort === "priceLowToHigh" || sort === "price") {
        sortOption = { price: 1 };
      } else if (sort === "price_desc" || sort === "priceHighToLow" || sort === "-price") {
        sortOption = { price: -1 };
      } else if (sort === "rating_asc" || sort === "rating") {
        sortOption = { rating: 1 };
      } else if (sort === "rating_desc" || sort === "-rating") {
        sortOption = { rating: -1 };
      } else if (sort === "newest" || sort === "createdAt" || sort === "-createdAt") {
        sortOption = { createdAt: -1 };
      }
    } else if (sortBy) {
      const sortOrder = (order === "desc" || order === "-1") ? -1 : 1;
      if (sortBy === "price") sortOption = { price: sortOrder };
      else if (sortBy === "rating") sortOption = { rating: sortOrder };
      else if (sortBy === "newest" || sortBy === "createdAt") sortOption = { createdAt: -1 };
    }

    const totalProducts = await ProductModel.find(filter);
    const products = await ProductModel.find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await ProductModel.countDocuments(filter);
    
    if (!products) {
      return response.status(400).json({
        error: true,
        success: false,
      });
    }
    
    return response.status(200).json({
      error: false,
      success: true,
      products: products,
      total: total,
      page: page,
      totalPages: Math.ceil(total / limit),
      totalCount: totalProducts?.length,
      totalProducts: totalProducts,
    });
  } catch (error) {
    console.error("Error:", error);
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

//get all products by categroy name

export async function getAllProductByCatName(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 1000;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);
    if (page > totalPages) {
      return response.status(404).json({
        message: "Page not found",
        error: true,
        success: false,
      });
    }

    const products = await ProductModel.find({
      catName: request.query.catName,
    })
      .populate("categroy")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!products) {
      return response.status(500).json({
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: true,
      success: false,
      products: products,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}
//get all product by id
export async function getAllProductByCatId(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 1000;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);
    if (page > totalPages) {
      return response.status(404).json({
        message: "Page not found",
        error: true,
        success: false,
      });
    }

    const products = await ProductModel.find({
      catName: request.query.catName,
    })
      .populate("categroy")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!products) {
      return response.status(500).json({
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: true,
      success: false,
      products: products,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

//get all products by Price

export async function getAllProductsByPrice(request, response) {
  try {
    let productList = [];
    if (request.query.catId !== "" && request.query.catId !== undefined) {
      const productListArr = await ProductModel.find({
        catId: request.query.catId,
      }).populate("categroy");

      productList = productListArr;
    }

    const filterProducts = productList.filter((product) => {
      if (
        request.query.minPrice &&
        product.price < parseInt(+request.query.minPrice)
      ) {
        return false;
      }
      if (
        request.query.maxPrice &&
        product.price > parseInt(+request.query.maxPrice)
      ) {
        return false;
      }
      return true;
    });
    return response.status(200).json({
      error: false,
      success: true,
      products: filterProducts,
      totalPages: 0,
      page: 0,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

//get all Product By rating

export async function getAllProductByRating(request, response) {
  try {
    const page = parseInt(request.query.page);
    const perPage = parseInt(request.query.perPage) || 1000;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);
    if (page > totalPages) {
      return response.status(404).json({
        message: "Page not found",
        error: true,
        success: false,
      });
    }

    let products = [];

    if (request.query.catId !== undefined) {
      products = await ProductModel.find({
        rating: request.query.rating,
        catId: request.query.catId,
      })
        .populate("categroy")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();
    }

    if (!products) {
      response.status(500).json({
        error: false,
        success: true,
      });
    }
    return response.status(200).json({
      error: false,
      success: true,
      products: products,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

//get all product count

export async function getAllProductsCount(request, response) {
  try {
    const productCount = await ProductModel.countDocuments();
    if (!productCount) {
      response.status(500).json({
        error: false,
        success: true,
      });
    }
    return response.status(200).json({
      error: false,
      success: true,
      products: productCount,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

//get all featured products

export async function featuredProduct(request, response) {
  try {
    const products = await ProductModel.find({
      isFeatured: true,
    }).populate("categroy");

    if (!products) {
      response.status(500).json({
        error: false,
        success: true,
      });
    }
    return response.status(200).json({
      error: false,
      success: true,
      products: products,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

//delete Products

export async function deleteProduct(request, response) {
  try {
    const products = await ProductModel.findById(request.params.id).populate(
      "categroy",
    );
    if (!products) {
      return response.status(404).json({
        message: "Product Not Found",
        error: true,
        success: false,
      });
    }
    const images = products.images;
    let img = "";
    for (img of images) {
      const imgUrl = img;
      const urlArr = imgUrl.split("/");
      const image = urlArr[urlArr.length - 1];
      const imageNme = image.split(".")[0];
      if (imageNme) {
        cloudinary.uploader.destroy(imageNme, (error, result) => {
          console.log(error);
        });
      }
    }
    const deleteProducts = await ProductModel.findByIdAndDelete(
      request.params.id,
    );
    return response.status(200).json({
      message: "Product deleted",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Error:", error);
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

// deleted multiple products

export async function deleteMultipleProducts(request, response) {
  const { ids } = request.body;
  if (!ids || !Array.isArray(ids)) {
    return response.status(500).json({
      message: "Invalid Inputs",
      error: true,
      success: false,
    });
  }
  for (let i = 0; i < ids.length; i++) {
    const product = await ProductModel.findById(ids[i]);
    const images = product.images;
    let img = "";
    for (img of images) {
      const imgUrl = img;
      const urlArr = imgUrl.split("/");
      const image = urlArr[urlArr.length - 1];
      const imageNme = image.split(".")[0];
      if (imageNme) {
        cloudinary.uploader.destroy(imageNme, (error, result) => {
          console.log(error);
        });
      }
    }
  }

  try {
    await ProductModel.deleteMany({
      _id: { $in: ids },
    });
    return response.status(200).json({
      message: "Product is deleted successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}
//get single product
export async function getProduct(request, response) {
  try {
    const product = await ProductModel.findById(request.params.id).populate(
      "categroy",
    );

    if (!product) {
      response.status(404).json({
        message: "Product is not deleted",
        error: false,
        success: true,
      });
    }
    return response.status(200).json({
      message: "The Product is deleted successfully",
      error: false,
      success: true,
      product: product,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

//delete image from cloudinary

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

export async function updateProduct(request, response) {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      request.params.id,
      {
        name: request.body.name,
        description: request.body.description,
        images: request.body.images || request.body.imgesArr,
        brand: request.body.brand,
        price: request.body.price,
        oldPrice: request.body.oldPrice,
        catName: request.body.catName,
        catId: request.body.catId,
        categroy: request.body.categroy,
        stock: request.body.stock,
        rating: request.body.rating,
        isFeatured: request.body.isFeatured,
        discount: request.body.discount,
      },
      { new: true },
    );
    if (!product) {
      return response.status(404).json({
        message: "Product is not updated",
        error: true,
        success: false,
      });
    }
    return response.status(200).json({
      message: "Product is updated",
      error: false,
      success: true,
      product: product,
    });
  } catch (error) {
    console.log("UPDATE ERROR:", error);
    return response.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

//filter products

export async function filterProducts(request, response) {
  const { catId, minPrice, maxPrice, rating, page, limit } = request.body;
  const filters = {};
  if (catId?.length) {
    filters.catId = { $in: catId };
  }
  if (minPrice || maxPrice) {
    filters.price = { $gte: +minPrice || 0, $lte: +maxPrice || Infinity };
  }
  if (rating?.length) {
    filters.rating = { $in: rating };
  }
  try {
    const products = await ProductModel.find(filters)
      .populate("categroy")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await ProductModel.countDocuments();
    return response.status(200).json({
      error: false,
      success: true,
      products: products,
      toatl: total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.log("DELETE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

///sort product function
const sortItems = (products, sortBy, order) => {
  return products.sort((a, b) => {
    if (sortBy === "name") {
      return order === "asc"
        ? a.name.localCampare(b.name)
        : b.name.localCampare(a.name);
    }
    if (sortBy === "price") {
      return order === "asc" ? a.price - b.price : b.price - a.price;
    }
    return 0; //default
  });
};

export async function sortBy(request, response) {
  const { products, sortBy, order } = request.body;
  const sortedItems = sortedItems([...products?.products], sortBy, order);
  return response.status(200).json({
    error: false,
    success: true,
    products: sortedItems,
    page: 0,
    totalPages: 0,
  });
}

//search products
export async function searchProductControler(request, response) {
  try {
    const { query, page, limit } = request.body;
    if (!query) {
      response.status(400).json({
        message: "Query is required",
        error: true,
        success: false,
      });
    }
    const products = await ProductModel.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
        { catName: { $regex: query, $options: "i" } },
      ],
    }).populate("categroy");
    const total = await products?.length;
    return response.status(200).json({
      error: false,
      success: true,
      products: products,
      toatl: total,
      page: parseInt(page),
      totalPages: 1,
    });
  } catch (error) {
    console.log("DELETE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// Submit product rating
export async function submitProductRating(request, response) {
  try {
    const userId = request.userId;
    const { productId, rating } = request.body;

    if (!productId || rating === undefined) {
      return response.status(400).json({
        error: true,
        success: false,
        message: "Product ID and rating are required",
      });
    }

    const numRating = Number(rating);
    if (numRating < 1 || numRating > 5) {
      return response.status(400).json({
        error: true,
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Check if product exists
    const product = await ProductModel.findById(productId);
    if (!product) {
      return response.status(404).json({
        error: true,
        success: false,
        message: "Product not found",
      });
    }

    // Update or create rating using upsert
    await RatingModel.findOneAndUpdate(
      { productId, userId },
      { rating: numRating },
      { upsert: true, new: true }
    );

    // Recalculate average rating
    const allRatings = await RatingModel.find({ productId });
    const totalRatingSum = allRatings.reduce((sum, item) => sum + item.rating, 0);
    const avgRating = allRatings.length > 0 ? (totalRatingSum / allRatings.length).toFixed(1) : 0;

    // Update product with new average
    product.rating = Number(avgRating);
    await product.save();

    return response.status(200).json({
      error: false,
      success: true,
      message: "Rating submitted successfully",
      averageRating: product.rating,
      totalRatings: allRatings.length,
    });

  } catch (error) {
    console.log("SUBMIT RATING ERROR:", error);
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

