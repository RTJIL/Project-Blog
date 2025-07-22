import { Router } from "express";
import { postsController } from "../controllers/postsController.js";
import { isAuth } from "../middleware/isAuth.js";
import { isAdmin } from "../middleware/isAdmin.js";

export const postsRouter = Router();

postsRouter.get("/", isAuth, postsController.getAllPosts);
postsRouter.post("/", isAuth, isAdmin, postsController.createPost);
postsRouter.get("/search", isAuth, postsController.getPostsByQuery);
postsRouter.get("/:postId", isAuth, postsController.getPostById);
