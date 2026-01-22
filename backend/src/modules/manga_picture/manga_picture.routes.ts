import { Router } from "express";
import { MangaPictureController } from "./manga_picture.controller";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { validate } from "../../shared/middlewares/validate";
import { mangaPictureUploadSchema } from "./manga_picture.schema";
import { uploadChapterPages } from "../../shared/middlewares/uploadPages.middleware";

const router = Router();
const mangaPictureController = new MangaPictureController();

router.post("/manga-picture", authMiddleware(["admin"]), uploadChapterPages.array("pages", 200), validate(mangaPictureUploadSchema), mangaPictureController.uploadMangaPicture);
router.get("/manga-picture/cap-cover/:id", mangaPictureController.getMangaPictureByIdCapCover);
router.delete("/manga-picture/:mangaPicture_id", authMiddleware(["admin"]), mangaPictureController.deleteMangaPicture);


export { router as mangaPictureRoutes };