import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const mangaPictureUploadSchema = z.object({
  idCapCover: z.number().int().positive(),
  pictures: z.array(z.string()).nonempty(),
}).openapi('MangaPictureUploadRequest');

export const mangaPictureResponseSchema = z.object({
	id: z.number(),
  idCapCover: z.number().int().positive(),
  pictures: z.array(z.string()).nonempty()
}).openapi('MangaPictureResponse');