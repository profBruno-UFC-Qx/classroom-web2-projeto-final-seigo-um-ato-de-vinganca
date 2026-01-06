import { registry } from "../../config/swagger"
import { mangaPictureUploadSchema, mangaPictureResponseSchema } from "./manga_picture.schema";
import { z } from "zod";

registry.registerPath({
  method: "post",
  path: "/manga-picture",
    tags: ["MangaPicture"],
    summary: "Fazer upload de um capitulo de fotos do Manga",
    request: {
      body: {
        content: {
          "application/json": { schema: mangaPictureUploadSchema },
        },
      },
    },
    responses: {
      201: {
        description: "Manga Picture criada com sucesso",
        content: {
          "application/json": { schema: mangaPictureResponseSchema },
        },
      },
    },
});

registry.registerPath({
  method: "get",
  path: "/manga-picture/{id}",
  tags: ["MangaPicture"],
  summary: "Obter as fotos do Manga por ID do capítulo",
  request: {
    params: z.object({
      id: z.number().openapi({ example: 1 }),
    }),
  },
  responses: {
    200: {
      description: "Manga Picture encontrada com sucesso",
      content: {
        "application/json": { schema: mangaPictureResponseSchema },
      },
    },
  },
});