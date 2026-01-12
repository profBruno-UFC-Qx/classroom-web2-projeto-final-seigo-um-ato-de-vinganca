import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const createCapCoverSchema = z.object({
  capCoverTitle: z.string().min(1, "Título (capCover) é obrigatório").openapi({ example: "One Piece" }),
  capCoverNumber: z.coerce.number().int().positive().optional(),
  description: z.string().optional().openapi({ example: "O rei dos piratas..." }),
  // capCoverPicture: z.string().url().optional().openapi({ example: "https://img.com/op.jpg" }),
  actCover: z.coerce.number().int().positive().openapi({ example: 1 }),
}).openapi("CreateCapCoverRequest");

export const updateCapCoverSchema = z.object({
  capCoverTitle: z.string().min(1, "Título (capCover) é obrigatório").openapi({ example: "One Piece" }),
  description: z.string().optional().openapi({ example: "O rei dos piratas..." }),
})

export const CapCoverResponseSchema = z.object({
  capCover_id: z.number().int().positive(),
  capCoverTitle: z.string().min(1, "Título (capCover) é obrigatório").openapi({ example: "One Piece" }),
  capCoverNumber: z.number().int().positive().optional(),
  description: z.string().optional().openapi({ example: "O rei dos piratas..." }),
  coverUrl: z.string().url().optional().openapi({ example: "https://img.com/op.jpg" }),
  actCover: z.number().int().positive().openapi({ example: 1 }),
}).openapi("CapCoverResponse");