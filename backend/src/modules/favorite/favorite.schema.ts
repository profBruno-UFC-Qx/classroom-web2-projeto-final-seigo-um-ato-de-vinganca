import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const favoriteCreateSchema = z.object({
  user_id: z.coerce.number().openapi({ example: 1 }),
  capCover_id: z.coerce.number().openapi({ example: 2 }),
  isFavorite: z.boolean().openapi({ example: true }),
}).openapi('FavoriteCreateRequest');

export const favoriteResponseSchema = z.object({
    favorite_id: z.coerce.number(),
    user_id: z.coerce.number(),
    capCover_id: z.coerce.number(),
    isFavorite: z.boolean(),
}).openapi('FavoriteResponse');
  