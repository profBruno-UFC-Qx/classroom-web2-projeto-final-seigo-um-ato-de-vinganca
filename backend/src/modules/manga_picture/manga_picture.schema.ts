import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const mangaPictureUploadSchema = z.object({
  capCover: z.number().int().positive(),
  pictures: z.array(z.string()).nonempty(),
}).openapi('MangaPictureUploadRequest');

export const mangaPictureResponseSchema = z.object({
	mangaPicture_id: z.number(),
  capCover: z.number().int().positive(),
  pictures: z.array(z.string()).nonempty()
}).openapi('MangaPictureResponse');

export const mangaPictureDeleteSchema = z.object({
  mangaPicture_id: z.number().int().positive(),
}).openapi('MangaPictureDeleteRequest');