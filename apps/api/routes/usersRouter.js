import { Router } from "express" 
import { usersController } from "../controllers/usersController.js"

export const usersRouter = Router() 


usersRouter.get("/", usersController.getAllUsers)