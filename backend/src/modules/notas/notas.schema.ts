import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const notaCreateSchema = z.object({
  userId: z.number().openapi({ example: 1 }),
  idCapCover: z.number().openapi({ example: 2 }),
  nota: z.number().min(0).max(10).openapi({ example: 8.5 }),
}).openapi("NotaCreateRequest");

export const notaResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  idCapCover: z.number(),
  nota: z.number(),
}).openapi("NotaResponse");

export const notaUpdateSchema = z.object({
    userId: z.number().openapi({ example: 1 }),
    idCapCover: z.number().openapi({ example: 2 }),
    nota: z.number().min(0).max(10).openapi({ example: 9.0 }),
}).openapi("NotaUpdateRequest");

export const notaMediaSchema = z.number().openapi("NotaMediaResponse");
