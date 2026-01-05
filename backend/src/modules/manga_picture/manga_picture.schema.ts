import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const mangaPictureUploadSchema = z.object({
  idCapCover: z.number().int().positive(),
  idMangaPicture: z.number().int().positive(),
  picturesUrl: z.array(z.string().url()).nonempty(),
}).openapi('MangaPictureUploadRequest');

export const mangaPictureResponseSchema = z.object({
	id: z.number(),
  idCapCover: z.number().int().positive(),
  idMangaPicture: z.number().int().positive(),
  picturesUrl: z.array(z.string().url()).nonempty(),
}).openapi('MangaPictureResponse');