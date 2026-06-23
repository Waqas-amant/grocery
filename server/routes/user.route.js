import { Router } from "express";
import {
  authWithGoogle,
  changePasswordController,
  forgetPasswordController,
  loginUserController,
  logOutController,
  registerUserController,
  resendOtpController,
  verifyEmailController,
  verifyForgotPasswordOtp,
  getAllUsers,
  deleteUser,
} from "../controllers/user.controler.js";
import auth from "../middlewares/auth.js";
const userRouter = Router();
userRouter.post("/register", registerUserController);
userRouter.post("/verifyEmail", verifyEmailController);
userRouter.post("/login", loginUserController);
userRouter.get("/logout", auth, logOutController);
userRouter.post("/forgot-password", forgetPasswordController);
userRouter.post("/verify-forgot-password-otp", verifyForgotPasswordOtp);
userRouter.post("/forget-password/change-password", changePasswordController);
userRouter.post("/resend-otp", resendOtpController);
userRouter.post("/authWithGoogle", authWithGoogle);

userRouter.get("/all", auth, getAllUsers);
userRouter.delete("/:id", auth, deleteUser);

export default userRouter;
