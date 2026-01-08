import { registry } from "../../config/swagger";
import { favoriteCreateSchema, favoriteResponseSchema } from "./favorite.schema";
import { z } from "zod";

registry.registerPath({
  method: "post",
  path: "/favorite",
    tags: ["Favorite"],
    summary: "Adicionar um favorito",
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
    },
});

registry.registerPath({
  method: "get",
  path: "/favorite/{idCapCover}",
    tags: ["Favorite"],
    summary: "Obter favoritos por ID do CapCover",
    request: {
      params: z.object({
        idCapCover: z.coerce.number().openapi({ example: 2 }),
      }),
    },
    responses: {
      200: {
        description: "Favoritos obtidos com sucesso",
        content: {
          "application/json": { schema: z.array(favoriteResponseSchema) },
        },
      },
    },
});

registry.registerPath({
  method: "put",
  path: "/favorite",
    tags: ["Favorite"],
    summary: "Atualizar um favorito",
    request: {
      body: {
        content: {
          "application/json": { schema: favoriteCreateSchema },
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
    },
});