import { Router } from "express";
import { NotasController } from "./notas.controller";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { validate } from "../../shared/middlewares/validate";
import { notaCreateSchema, notaUpdateSchema } from "./notas.schema";

const router = Router();
const notasController = new NotasController();

router.post("/notas", validate(notaCreateSchema), notasController.createNota);
router.put("/notas/:id", validate(notaUpdateSchema), notasController.updateNota);
router.get("/notas/media/:id", notasController.getMediaNota);


export { router as notasRoutes };