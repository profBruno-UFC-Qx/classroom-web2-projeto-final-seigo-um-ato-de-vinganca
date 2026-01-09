import { request } from "express";
import { registry } from "../../config/swagger";
import { notaCreateSchema, notaMediaSchema, notaUpdateSchema, notaResponseSchema } from "./notas.schema";
import { z } from "zod";

registry.registerPath({
  method: "post",
  path: "/notas",
  tags: ["Notas"],
  summary: "Criar ou atualizar uma nota",
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": { schema: notaCreateSchema },
      },
    },
  },
  responses: {
    201: {
      description: "Nota criada com sucesso",
      content: {
        "application/json": { schema: notaResponseSchema },
      },
    },
  },
});

// registry.registerPath({
//   method: "put",
//   path: "/notas/{id}",
//   tags: ["Notas"],
//   security: [{ bearerAuth: [] }],
//   summary: "Atualizar uma nota existente",
//   request: {
//     params: z.object({
//       id: z.number().openapi({ example: 1 }),
//     }),
//     body: {
//       content: {
//         "application/json": { schema: notaUpdateSchema },
//       },
//     },
//   },
//   responses: {
//     200: {
//       description: "Nota atualizada com sucesso",
//       content: {
//         "application/json": { schema: notaResponseSchema },
//       },
//     },
//   },
// });

registry.registerPath({
  method: "get",
  path: "/notas/media/{id}",
  tags: ["Notas"],
  summary: "Obter a média das notas do capítulo pelo id do capítulo",
  request: {
    params: z.object({
      id: z.number().openapi({ example: 1 }),
    }),
  },
  responses: {
    200: {
      description: "Média da nota obtida com sucesso",
      content: {
        "application/json": { schema: notaMediaSchema },
      },
    },
  },
});