import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const actCoverCreateSchema = z.object({
  actNumber: z.coerce.number().openapi({ example: 1 }),
  actDetails: z.string().max(1000).openapi({ example: 'Descrição do ato' }),
  isReady: z.coerce.boolean().openapi({ example: true }),
  actCoverPicture: z.string().openapi({ example: 'act_cover.jpg as BASE64' }),
}).openapi('ActCoverCreateRequest');

export const actCoverResponseSchema = z.object({
  actCover_id: z.number(),
  actDetails: z.string(),
  isReady: z.string().nullable(),
  actNumber: z.number(),
  actCoverPicture: z.string(),
  capCovers : z.array(z.object({
    capCover_id: z.number(),
    capCoverPicture: z.string(),
    capDetails: z.string(),
    isReady: z.boolean(),
    capNumber: z.number(),
  })).optional(),
}).openapi('ActCoverResponse');

export const actCoverUpdateSchema = z.object({
  actDetails: z.string().max(1000).openapi({ example: 'Descrição do ato' }).optional(),
  actCoverPicture: z.string().openapi({ example: 'act_cover.jpg as BASE64' }).optional(),
}).openapi('ActCoverUpdateRequest');

export const actCoverGetOneSchema = actCoverResponseSchema.openapi('ActCoverGetOneResponse');