import { Router } from "express";
import { CapCoverController } from "./cap_cover.controller";
import { validate } from "../../shared/middlewares/validate";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { createCapCoverSchema, updateCapCoverSchema } from "./cap_cover.schema";
import { uploadSinglePicture } from "../../shared/middlewares/uploadPicture.middleware";

const router = Router();
const capCoverController = new CapCoverController();

router.get("/cap-covers", capCoverController.getAll);
router.get("/cap-covers/:id", capCoverController.getById)
router.get("/cap-covers/act-cover/:id", capCoverController.getByActCoverId)

router.post("/cap-covers", authMiddleware(["admin"]), uploadSinglePicture.single("capCoverPicture"), validate(createCapCoverSchema), capCoverController.create);

router.put("/cap-covers/:id", authMiddleware(["admin"]), uploadSinglePicture.single("capCoverPicture"), validate(updateCapCoverSchema), capCoverController.update)

router.delete("/cap-covers/:id", authMiddleware(["admin"]), capCoverController.delete)

export { router as capCoverRoutes };