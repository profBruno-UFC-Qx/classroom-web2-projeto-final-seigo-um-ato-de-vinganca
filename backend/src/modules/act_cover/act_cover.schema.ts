import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const actCoverCreateSchema = z.object({
  actNumber: z.coerce.number().openapi({ example: 1 }),
  actDetails: z.string().max(1000).openapi({ example: 'Descrição do ato' }),
  isReady: z.coerce.boolean().openapi({ example: true }),
  actCover: z.string().openapi({ example: 'act_cover.jpg as BASE64' }),
  capCovers: z.coerce.number().openapi({ example: 1 }),
}).openapi('ActCoverCreateRequest');

export const actCoverResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  userId: z.number(),
}).openapi('ActCoverResponse');

export const actCoverUpdateSchema = z.object({
  actDetails: z.string().max(1000).openapi({ example: 'Descrição do ato' }).optional(),
  actCover: z.string().openapi({ example: 'act_cover.jpg as BASE64' }).optional(),
}).openapi('ActCoverUpdateRequest');

export const actCoverGetOneSchema = z.object({
  id: z.number().openapi({ example: 1 }),
}).openapi('ActCoverGetOneResponse');