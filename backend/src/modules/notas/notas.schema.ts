import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const notaCreateSchema = z.object({
  user_id: z.number().openapi({ example: 1 }),
  capCover_id: z.number().openapi({ example: 2 }),
  nota: z.number().min(0).max(10).openapi({ example: 8.5 }),
}).openapi("NotaCreateRequest");

export const notaResponseSchema = z.object({
  id: z.number(),
  capCover_id: z.number(),
  nota: z.number(),
}).openapi("NotaResponse");

export const notaUpdateSchema = z.object({
    user_id: z.number().openapi({ example: 1 }),
    capCover_id: z.number().openapi({ example: 2 }),
    nota: z.number().min(0).max(10).openapi({ example: 9.0 }),
}).openapi("NotaUpdateRequest");

export const notaMediaSchema = z.number().openapi("NotaMediaResponse");
