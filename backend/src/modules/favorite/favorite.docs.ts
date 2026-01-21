import { registry } from "../../config/swagger";
import { favoriteCreateSchema, favoriteResponseSchema, favoriteUpdateSchema } from "./favorite.schema";
import { z } from "zod";

registry.registerPath({
  method: "post",
  path: "/favorite",
    tags: ["Favorite"],
    summary: "Adicionar um favorito",
    security: [{ bearerAuth: [] }],
    request: {
      body: {
        content: {
          "application/json": { schema: favoriteCreateSchema },
        },
      },
    },
    responses: {
      201: {
        description: "Favorito adicionado com sucesso",
        content: {
          "application/json": { schema: favoriteResponseSchema },
        },
      },
      401: { description: "Não autorizado" },
    },
});

registry.registerPath({
  method: "get",
  path: "/favoritesByUser",
  tags: ["Favorite"],
  summary: "Obter favoritos por usuario",
    security: [{ bearerAuth: [] }],

  responses: {
    200: {
      description: "Favoritos obtidos com sucesso",
      content: {
        "application/json": { schema: z.array(favoriteResponseSchema) },
      },
    },
    401: { description: "Não autorizado" },
  },
});

registry.registerPath({
  method: "put",
  path: "/favorite/{favorite_id}",
  tags: ["Favorite"],
  summary: "Atualizar um favorito",
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      favorite_id: z.number().openapi({ example: 1 }),
    }),
    body: {
      content: {
        "application/json": { schema: favoriteUpdateSchema },
      },
    },
  },
  responses: {
    200: {
      description: "Favorito atualizado com sucesso",
      content: {
        "application/json": { schema: favoriteResponseSchema },
      },
    },
    401: { description: "Não autorizado" },
  },
});

registry.registerPath({
  method: "get",
  path: "/favorites/cap-covers/{id}",
  tags: ["Favorite"],
  summary: "Obter favoritos pelo usuario e capCover_id",
  security: [{ bearerAuth: [] }],
  request: {
    params : z.object({
      id : z.coerce.number()
    })
  },
  responses: {
    200: {
      description: "Favoritos obtidos com sucesso",
      content: {
        "application/json": { schema: z.array(favoriteResponseSchema) },
      },
    },
    401: { description: "Não autorizado" },
  },
});