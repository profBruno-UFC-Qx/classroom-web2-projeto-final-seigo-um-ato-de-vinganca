import { Router } from "express";
import { NotasController } from "./notas.controller";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { validate } from "../../shared/middlewares/validate";
import { notaCreateSchema, notaUpdateSchema } from "./notas.schema";

const router = Router();
const notasController = new NotasController();

router.post("/notas", authMiddleware(), validate(notaCreateSchema), notasController.createNota);
router.get("/notas/media/:id", notasController.getMediaNota);
router.get("/notas/user/:capCover_id", authMiddleware(), notasController.getNotaByUserAndCapCoverId)


export { router as notasRoutes };