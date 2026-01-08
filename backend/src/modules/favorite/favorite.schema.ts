import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const favoriteCreateSchema = z.object({
  userId: z.coerce.number().openapi({ example: 1 }),
  idCapCover: z.coerce.number().openapi({ example: 2 }),
  isFavorite: z.boolean().openapi({ example: true }),
}).openapi('FavoriteCreateRequest');

export const favoriteResponseSchema = z.object({
    id: z.coerce.number(),
    userId: z.coerce.number(),
    idCapCover: z.coerce.number(),
    isFavorite: z.boolean(),
}).openapi('FavoriteResponse');
  