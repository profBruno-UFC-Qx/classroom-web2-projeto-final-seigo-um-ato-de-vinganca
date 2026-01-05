import { Router } from "express";
import { MangaPictureController } from "./manga_picture.controller";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { validate } from "../../shared/middlewares/validate";
import { mangaPictureUploadSchema } from "./manga_picture.schema";

const router = Router();
const mangaPictureController = new MangaPictureController();

router.post("/manga-picture", authMiddleware(), validate(mangaPictureUploadSchema), mangaPictureController.uploadMangaPicture);
router.get("/manga-picture/:id", authMiddleware(), mangaPictureController.getMangaPictureByIdCapCover);