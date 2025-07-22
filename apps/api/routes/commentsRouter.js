import { Router } from "express";
import { commentsController } from "../controllers/commentsController.js";
import { isAuth } from "../middleware/isAuth.js";

export const commentsRouter = Router();

commentsRouter.get("/", isAuth, commentsController.getAllComments);
commentsRouter.get("/:postId", isAuth, commentsController.getCommentsById);
commentsRouter.post("/", isAuth, commentsController.createComment);
