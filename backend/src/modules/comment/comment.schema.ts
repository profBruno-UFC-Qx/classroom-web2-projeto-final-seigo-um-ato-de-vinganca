import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { id } from "zod/v4/locales";

extendZodWithOpenApi(z);

export const commentCreateSchema = z.object({
  capCover: z.number().openapi({ example: 10 }),
  text: z.string().min(1).max(500).openapi({ example: "This is a comment." }),
}).openapi("CommentCreateRequest");

export const commentResponseSchema = z.object({
  comment_id: z.number(),
  capCover: z.number(),
  text: z.string(),
}).openapi("CommentResponse");

export const commentUpdateSchema = z.object({
  text: z.string().min(1).max(500).openapi({ example: "This is an updated comment." }),
}).openapi("CommentUpdateRequest");

// export const commentDeleteSchema = z.object({
//   comment_id: z.number().openapi({ example: 1 }),
// }).openapi("CommentDeleteRequest");

