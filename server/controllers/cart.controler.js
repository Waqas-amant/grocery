import CartModel from "../models/cart.model.js";

// Get user's cart
export async function getCart(request, response) {
  try {
    const userId = request.userId;
    let cart = await CartModel.findOne({ userId }).populate("items.product");

    if (!cart) {
      cart = await CartModel.create({ userId, items: [] });
    }

    return response.status(200).json({
      error: false,
      success: true,
      cart: cart,
    });
  } catch (error) {
    console.log("GET CART ERROR:", error);
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

// Add item to cart or update quantity if it already exists
export async function addToCart(request, response) {
  try {
    const userId = request.userId;
    const { productId, quantity = 1 } = request.body;

    if (!productId) {
      return response.status(400).json({
        error: true,
        success: false,
        message: "Product ID is required",
      });
    }

    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      cart = new CartModel({
        userId,
        items: [{ product: productId, quantity: Number(quantity) }],
      });
    } else {
      // Check if item already exists
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        // Item exists, update quantity
        cart.items[itemIndex].quantity += Number(quantity);
      } else {
        // Item does not exist, add it
        cart.items.push({ product: productId, quantity: Number(quantity) });
      }
    }

    await cart.save();
    
    // Return populated cart
    cart = await cart.populate("items.product");

    return response.status(200).json({
      error: false,
      success: true,
      message: "Product added to cart",
      cart: cart,
    });
  } catch (error) {
    console.log("ADD TO CART ERROR:", error);
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

// Remove item from cart
export async function removeFromCart(request, response) {
  try {
    const userId = request.userId;
    const { productId } = request.params;

    let cart = await CartModel.findOne({ userId });
    
    if (!cart) {
      return response.status(404).json({
        error: true,
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    cart = await cart.populate("items.product");

    return response.status(200).json({
      error: false,
      success: true,
      message: "Product removed from cart",
      cart: cart,
    });
  } catch (error) {
    console.log("REMOVE FROM CART ERROR:", error);
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

// Update item quantity
export async function updateCartQuantity(request, response) {
  try {
    const userId = request.userId;
    const { productId, quantity } = request.body;

    if (!productId || quantity === undefined) {
      return response.status(400).json({
        error: true,
        success: false,
        message: "Product ID and quantity are required",
      });
    }

    if (quantity < 1) {
      return response.status(400).json({
        error: true,
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      return response.status(404).json({
        error: true,
        success: false,
        message: "Cart not found",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = Number(quantity);
      await cart.save();
      cart = await cart.populate("items.product");

      return response.status(200).json({
        error: false,
        success: true,
        message: "Cart quantity updated",
        cart: cart,
      });
    } else {
      return response.status(404).json({
        error: true,
        success: false,
        message: "Product not found in cart",
      });
    }
  } catch (error) {
    console.log("UPDATE CART QUANTITY ERROR:", error);
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}
