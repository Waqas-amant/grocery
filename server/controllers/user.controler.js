import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmailFun from "../config/sendEmail.js";
import VerificationEmail from "../utils/verifyEmailTemplate.js";
import UserModel from "../models/user.model.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import { FaBullseye } from "react-icons/fa6";
import sendEmail from "../config/emailService.js";

export async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Provide name, email, password",
        error: true,
        success: false,
      });
    }

    // ✅ FIXED
    let user = await UserModel.findOne({ email: email });

    if (user) {
      return res.json({
        message: "Already registered with this email",
        error: true,
        success: false,
      });
    }

    // ✅ FIXED (6 digit OTP)
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    // ✅ FIXED bcrypt
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    // ✅ FIXED model
    user = new User({
      email,
      password: hashPassword,
      name,
      otp: verifyCode,
      otpExpires: Date.now() + 600000,
    });

    await user.save();

    // ✅ FIXED email call
    await sendEmailFun(
      email,
      "Verify Email from BroBazar",
      "",
      VerificationEmail(user.name, verifyCode),
    );

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JSON_WEB_TOKEN_SECRET_KEY,
    );

    return res.status(200).json({
      success: true,
      error: false,
      message: "User registered successfully! Please verify your email",
      token,
    });
  } catch (error) {
    console.log("🔥 REGISTER ERROR:", error);
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
}

export async function verifyEmailController(req, res) {
  try {
    const { email, otp } = req.body;

    // ✅ DECLARE FIRST
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
        error: true,
        success: false,
      });
    }

    const otpInput = String(otp).trim();
    const otpDb = String(user.otp).trim();

    const isCodeValid = otpDb === otpInput;
    const isNotExpired = (user.otpExpires = Date.now() + 24 * 60 * 60 * 1000); // 1 day

    // console.log("NOW:", new Date());
    // console.log("EXPIRES:", user.otpExpires);
    // console.log("OTP INPUT:", otpInput);
    // console.log("OTP DB:", otpDb);
    // console.log("MATCH:", isCodeValid);
    // console.log("EXPIRE:", isNotExpired);

    if (!isCodeValid) {
      return res.status(400).json({
        message: "Invalid OTP",
        success: false,
        error: true,
      });
    }

    if (!isNotExpired) {
      return res.status(400).json({
        message: "OTP Expired",
        success: false,
        error: true,
      });
    }

    // ✅ SUCCESS
    user.verify_Email = true;
    user.otp = null;
    user.otpExpires = null;

    await user.save();

    return res.status(200).json({
      message: "Email Verified Successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    // console.log("🔥 VERIFY ERROR:", error);
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
}

export async function loginUserController(req, res) {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.verify_Email) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY_REFRESH_TOKEN,
      { expiresIn: "7d" },
    );

    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY_ACCESS_TOKEN,
      { expiresIn: "1d" },
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });

    return res.json({
      success: true,
      message: "Login successful",
      data: {
        accessToken: token,
        refreshToken: refreshToken,
        user: {
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function logOutController(req, res) {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User not found in request",
      });
    }

    const cookieOptions = {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    };

    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);

    await UserModel.findByIdAndUpdate(userId, {
      refreshToken: "",
    });

    return res.json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function forgetPasswordController(req, res) {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "User not Avilable",
      });
    } else {
      const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
      user.otp = verifyCode;
      user.otpExpires = Date.now() + 600000;
      await user.save();

      await sendEmailFun(
        email,
        "Verify OTP from BroBazar",
        "",
        VerificationEmail(user.name, verifyCode),
        console.log("Sending email to:", email),
      );

      return res.json({
        message: "Check Your Email",
        error: false,
        success: true,
      });
    }
  } catch (error) {
    console.log("EMAIL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Email send failed",
    });
  }
}

export async function verifyForgotPasswordOtp(req, res) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "Provide required field email, otp",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "User not found with this email",
      });
    }

    // ✅ FIX 1: Safe OTP compare
    const otpInput = String(otp).trim();
    const otpDb = String(user.otp).trim();

    if (otpInput !== otpDb) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "Invalid OTP",
      });
    }

    // ✅ FIX 2: Correct expiry check
    if (!user.otpExpires || user.otpExpires < Date.now()) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "OTP is Expired",
      });
    }

    // ✅ clear OTP
    user.otp = null;
    user.otpExpires = null;

    await user.save(); // ✅ FIX 3

    return res.status(200).json({
      error: false, // ✅ FIX 4
      success: true,
      message: "Verify OTP Successfully",
    });
  } catch (error) {
    console.log("VERIFY OTP ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function changePasswordController(req, res) {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    // ✅ required fields check
    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        error: true,
        success: false,
        message:
          "Provide all required fields: email, newPassword, confirmPassword",
      });
    }

    // ✅ find user
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "User not found with this email",
      });
    }

    // ✅ password match check
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "newPassword and confirmPassword must be same",
      });
    }

    // ✅ hash password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(newPassword, salt);

    user.password = hashPassword;
    user.signUpWithGoogle = false;

    await user.save();

    return res.status(200).json({
      error: false,
      success: true,
      message: "Password Updated Successfully",
    });
  } catch (error) {
    console.log("CHANGE PASSWORD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
// Resend OTP
export async function resendOtpController(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "Email is required",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "User is not registered with this email",
      });
    }

    // generate OTP
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    // update user
    user.otp = verifyCode;
    user.otpExpires = Date.now() + 120000;

    // ✅ FIXED email call
    await sendEmailFun(
      email,
      "Verify Email from BroBazar",
      "",
      VerificationEmail(name, verifyCode),
    );

    await user.save();

    // TODO: send email here (important)
    // await sendEmailFun(...)

    return res.status(200).json({
      error: false,
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

export async function authWithGoogle(req, res) {
  console.log("AUTH WITH GOOGLE REQ:", req.body);
  const { name, email, password, avatar, mobile, role } = req.body;

  try {
    const existsUser = await UserModel.findOne({ email: email });
    if (!existsUser) {
      const user = await UserModel.create({
        name: name,
        email: email,
        mobile: mobile,
        password: null,
        avatar: avatar,
        role: role,
        verify_Email: true,
        signUpWithGoogle: true,
      });
      await user.save();

      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.SECRET_KEY_REFRESH_TOKEN,
        { expiresIn: "7d" },
      );

      const token = jwt.sign(
        { id: user._id },
        process.env.SECRET_KEY_ACCESS_TOKEN,
        { expiresIn: "1d" },
      );

      await UserModel.findByIdAndUpdate(user?._id, {
        last_login_date: new Date(),
      });

      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      });

      return res.json({
        success: true,
        message: "Login successful",
        data: {
          accessToken: token,
          refreshToken: refreshToken,
          user: {
            name: user.name,
            email: user.email,
          },
        },
      });
    } else {
      const refreshToken = jwt.sign(
        { id: existsUser._id },
        process.env.SECRET_KEY_REFRESH_TOKEN,
        { expiresIn: "7d" },
      );

      const token = jwt.sign(
        { id: existsUser._id },
        process.env.SECRET_KEY_ACCESS_TOKEN,
        { expiresIn: "1d" },
      );

      await UserModel.findByIdAndUpdate(existsUser?._id, {
        last_login_date: new Date(),
      });

      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      });

      return res.json({
        success: true,
        message: "Login successful",
        data: {
          accessToken: token,
          refreshToken: refreshToken,
          user: {
            name: existsUser.name,
            email: existsUser.email,
          },
        },
      });
    }
  } catch (error) {
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

export async function getAllUsers(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 10;
    const search = request.query.search || "";
    
    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }
    
    const totalUsers = await UserModel.countDocuments(filter);
    const users = await UserModel.find(filter)
      .select("-password -accessToken -refreshToken -otp -otpExpires")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
      
    return response.status(200).json({
      error: false,
      success: true,
      users: users,
      total: totalUsers,
      page: page,
      totalPages: Math.ceil(totalUsers / limit),
    });
  } catch (error) {
    console.log("GET ALL USERS ERROR:", error);
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

export async function deleteUser(request, response) {
  try {
    const { id } = request.params;
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return response.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }
    return response.status(200).json({
      message: "User deleted successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.log("DELETE USER ERROR:", error);
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}
