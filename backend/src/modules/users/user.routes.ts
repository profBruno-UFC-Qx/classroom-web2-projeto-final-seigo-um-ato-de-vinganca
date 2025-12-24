import { Router } from "express";
import { UserController } from "./user.controller";
import { validate } from "../../shared/middlewares/validate";
import { registerSchema, loginSchema } from "./user.schema";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";

const router = Router();
const userController = new UserController();

router.post("/auth/local/register", validate(registerSchema), userController.register);
router.post("/auth/local", validate(loginSchema), userController.login);

router.get("/users/me", authMiddleware(), userController.getMe);

export { router as userRoutes };