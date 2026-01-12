import { registry } from "../../config/swagger"
import { mangaPictureUploadSchema, mangaPictureResponseSchema, mangaPictureDeleteSchema } from "./manga_picture.schema";
import { z } from "zod";

registry.registerPath({
  method: "post",
  path: "/manga-picture",
  tags: ["MangaPicture"],
  summary: "Fazer upload das páginas de um capítulo",
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            properties: {
              capCover_id: {
                type: "number",
                example: 1
              },
              pages: {
                type: "array",
                items: {
                  type: "string",
                  format: "binary"
                }
              }
            },
            required: ["capCover_id", "pages"]
          }
        }
      }
    }
  },
  responses: {
    201: {
      description: "Páginas do capítulo enviadas com sucesso",
      content: {
        "application/json": {
          schema: mangaPictureResponseSchema
        }
      }
    }
  }
});


registry.registerPath({
  method: "get",
  path: "/manga-picture/cap-cover/{id}",
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

registry.registerPath({
  method: "delete",
  path: "/manga-picture/{mangaPicture_id}",
  tags: ["MangaPicture"],
  summary: "Excluir uma Manga Picture",
  security: [{ bearerAuth: [] }],
  request: {
    params: mangaPictureDeleteSchema,
  },
  responses: {
    200: {
      description: "Manga Picture excluída com sucesso",
    },
  },
})