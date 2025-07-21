import { Router } from "express";
import { authController } from "../controllers/authController.js";
import { isAuth } from "../middleware/isAuth.js";

export const authRouter = Router();

authRouter.get("/verify", isAuth, authController.verify)
authRouter.post("/register", authController.register);
authRouter.post("/log-in", authController.logIn);