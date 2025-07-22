import { Router } from "express";
import { tagsController } from "../controllers/tagsController.js";
import { isAuth } from "../middleware/isAuth.js";
import { isAdmin } from "../middleware/isAdmin.js";

export const tagsRouter = Router();

tagsRouter.post("/", isAuth, isAdmin, tagsController.createTag);
