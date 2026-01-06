import { Router } from "express";
import { CapCoverController } from "./cap_cover.controller";
import { validate } from "../../shared/middlewares/validate";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { createCapCoverSchema } from "./cap_cover.schema";

const router = Router();
const capCoverController = new CapCoverController();

router.get("/cap-covers", capCoverController.getAll);
router.get("/cap-covers/:id", capCoverController.getById)

router.post("/cap-covers", authMiddleware(), validate(createCapCoverSchema), capCoverController.create);

router.put("/cap-covers/:id", authMiddleware(), validate(createCapCoverSchema), capCoverController.update)

router.delete("/cap-covers/:id", authMiddleware(), capCoverController.delete)


export { router as capCoverRoutes };