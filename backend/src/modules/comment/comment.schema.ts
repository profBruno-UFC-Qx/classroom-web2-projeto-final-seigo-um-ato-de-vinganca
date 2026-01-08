import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { id } from "zod/v4/locales";

extendZodWithOpenApi(z);

export const commentCreateSchema = z.object({
  userId: z.number().openapi({ example: 1 }),
  idCapCover: z.number().openapi({ example: 10 }),
  text: z.string().min(1).max(500).openapi({ example: "This is a comment." }),
}).openapi("CommentCreateRequest");

export const commentResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  idCapCover: z.number(),
  text: z.string(),
}).openapi("CommentResponse");

export const commentUpdateSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  text: z.string().min(1).max(500).openapi({ example: "This is an updated comment." }),
}).openapi("CommentUpdateRequest");

export const commentDeleteSchema = z.object({
  id: z.number().openapi({ example: 1 }),
}).openapi("CommentDeleteRequest");

