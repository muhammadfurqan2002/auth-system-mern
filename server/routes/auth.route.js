import express from "express";
import authController from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const authRouter = express.Router();


authRouter.get('/check-auth',verifyToken,authController.checkAuth);

authRouter.post("/signup", authController.signUp);

authRouter.post("/login", authController.signIn);
authRouter.post("/logout", authController.logOut);
authRouter.post("/verify-email",authController.verifyEmail);
authRouter.post("/forget-password",authController.forgetPassword);
authRouter.post("/reset-password/:token",authController.resetPassword);
export default authRouter;
