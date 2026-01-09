import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const createCapCoverSchema = z.object({
  capCover: z.string().min(1, "Título (capCover) é obrigatório").openapi({ example: "One Piece" }),
  capCoverNumber: z.number().int().positive().optional(),
  description: z.string().optional().openapi({ example: "O rei dos piratas..." }),
  coverUrl: z.string().url().optional().openapi({ example: "https://img.com/op.jpg" }),
  actCover: z.number().int().positive().openapi({ example: 1 }),
}).openapi("CreateCapCoverRequest");

export const CapCoverResponseSchema = z.object({
  id: z.number().int().positive(),
  capCover: z.string(),
  idCapCover: z.number().int().positive(),
  coverUrl: z.string().nullable(),
}).openapi("CapCoverResponse");