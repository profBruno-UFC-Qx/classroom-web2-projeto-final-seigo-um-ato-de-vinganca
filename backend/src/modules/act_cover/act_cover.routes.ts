import { Router } from "express";
import { ActCoverController } from "./act_cover.controller";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { validate } from "../../shared/middlewares/validate";
import { actCoverCreateSchema, actCoverUpdateSchema } from "./act_cover.schema";
import { uploadSinglePicture } from "../../shared/middlewares/uploadPicture.middleware";

const router = Router();
const actCoverController = new ActCoverController();

router.post("/act-cover", authMiddleware(["admin"]), uploadSinglePicture.single("actCoverPicture"), validate(actCoverCreateSchema), actCoverController.createActCover);
router.put("/act-cover/:id", authMiddleware(["admin"]), uploadSinglePicture.single("actCoverPicture"), validate(actCoverUpdateSchema), actCoverController.updateActCover);
router.get("/act-cover/:id", actCoverController.getActCoverById);
router.get("/act-cover", actCoverController.getAllActCover);
router.delete("/act-cover/:id", authMiddleware(["admin"]), actCoverController.deleteActCover);

export { router as actCoverRoutes };