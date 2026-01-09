import { Router } from "express";
import { CapCoverController } from "./cap_cover.controller";
import { validate } from "../../shared/middlewares/validate";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { createCapCoverSchema } from "./cap_cover.schema";

const router = Router();
const capCoverController = new CapCoverController();

router.get("/cap-covers", capCoverController.getAll);
router.get("/cap-covers/:id", capCoverController.getByActCoverId)

router.post("/cap-covers", authMiddleware(["admin"]),validate(createCapCoverSchema), capCoverController.create);

router.put("/cap-covers/:id", authMiddleware(["admin"]), validate(createCapCoverSchema), capCoverController.update)

router.delete("/cap-covers/:id", authMiddleware(["admin"]), capCoverController.delete)

export { router as capCoverRoutes };