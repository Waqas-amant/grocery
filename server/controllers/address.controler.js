import AddressModel from "../models/address.model.js";

// Add a new address
export async function addAddress(request, response) {
  try {
    const userId = request.userId;
    const {
      address_line1,
      city,
      state,
      pincode,
      country,
      mobile,
      landmark,
      addressType,
    } = request.body;

    if (!address_line1 || !city || !state || !pincode || !country) {
      return response.status(400).json({
        error: true,
        success: false,
        message: "All address fields (line 1, city, state, pincode, country) are required.",
      });
    }

    // Count existing user addresses
    const existingAddressesCount = await AddressModel.countDocuments({ userId });
    
    // Set current address selection value
    const selectedVal = existingAddressesCount === 0 ? "true" : (request.body.selected === "true" ? "true" : "false");

    if (selectedVal === "true") {
      // De-select all other addresses
      await AddressModel.updateMany({ userId }, { selected: "false" });
    }

    const address = new AddressModel({
      userId,
      address_line1,
      city,
      state,
      pincode,
      country,
      mobile,
      landmark,
      addressType: addressType || "Home",
      selected: selectedVal,
    });

    await address.save();

    return response.status(201).json({
      error: false,
      success: true,
      message: "Address added successfully",
      address,
    });
  } catch (error) {
    console.log("ADD ADDRESS ERROR:", error);
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

// Get all user addresses
export async function getAddresses(request, response) {
  try {
    const userId = request.userId;
    const addresses = await AddressModel.find({ userId }).sort({ createdAt: -1 });

    return response.status(200).json({
      error: false,
      success: true,
      addresses,
    });
  } catch (error) {
    console.log("GET ADDRESSES ERROR:", error);
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

// Update address
export async function updateAddress(request, response) {
  try {
    const userId = request.userId;
    const { id } = request.params;
    const {
      address_line1,
      city,
      state,
      pincode,
      country,
      mobile,
      landmark,
      addressType,
      selected,
    } = request.body;

    const address = await AddressModel.findOne({ _id: id, userId });
    if (!address) {
      return response.status(404).json({
        error: true,
        success: false,
        message: "Address not found or unauthorized",
      });
    }

    // If setting selected to true, set all other addresses to selected: "false"
    if (selected === "true") {
      await AddressModel.updateMany({ userId }, { selected: "false" });
      address.selected = "true";
    } else if (selected === "false") {
      address.selected = "false";
    }

    if (address_line1 !== undefined) address.address_line1 = address_line1;
    if (city !== undefined) address.city = city;
    if (state !== undefined) address.state = state;
    if (pincode !== undefined) address.pincode = pincode;
    if (country !== undefined) address.country = country;
    if (mobile !== undefined) address.mobile = mobile;
    if (landmark !== undefined) address.landmark = landmark;
    if (addressType !== undefined) address.addressType = addressType;

    await address.save();

    return response.status(200).json({
      error: false,
      success: true,
      message: "Address updated successfully",
      address,
    });
  } catch (error) {
    console.log("UPDATE ADDRESS ERROR:", error);
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

// Delete address
export async function deleteAddress(request, response) {
  try {
    const userId = request.userId;
    const { id } = request.params;

    const address = await AddressModel.findOneAndDelete({ _id: id, userId });
    if (!address) {
      return response.status(404).json({
        error: true,
        success: false,
        message: "Address not found or unauthorized",
      });
    }

    // If the deleted address was selected, set another address to selected if any exist
    if (address.selected === "true") {
      const remainingAddress = await AddressModel.findOne({ userId });
      if (remainingAddress) {
        remainingAddress.selected = "true";
        await remainingAddress.save();
      }
    }

    return response.status(200).json({
      error: false,
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.log("DELETE ADDRESS ERROR:", error);
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}
