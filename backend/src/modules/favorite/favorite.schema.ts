import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const favoriteCreateSchema = z.object({
  capCover: z.coerce.number().openapi({ example: 2 }),
  isFavorite: z.boolean().openapi({ example: true }),
}).openapi('FavoriteCreateRequest');

export const favoriteUpdateSchema = z.object({
  isFavorite: z.boolean().openapi({ example: true }),
}).openapi('FavoriteUpdateRequest');

export const favoriteResponseSchema = z.object({
    favorite_id: z.coerce.number(),
    capCover: z.coerce.number(),
    isFavorite: z.boolean(),
}).openapi('FavoriteResponse');
  