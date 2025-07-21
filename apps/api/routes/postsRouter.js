import { Router } from "express";
import { postsController } from "../controllers/postsController.js";
import { isAuth } from "../middleware/isAuth.js";

export const postsRouter = Router();

postsRouter.get("/", isAuth, postsController.getAllPosts);
postsRouter.get("/:postId", isAuth, postsController.getPostById);
postsRouter.post("/", isAuth, postsController.createPost);