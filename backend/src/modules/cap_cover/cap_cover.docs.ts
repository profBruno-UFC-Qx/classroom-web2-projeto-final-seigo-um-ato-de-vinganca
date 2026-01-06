import { registry } from "../../config/swagger"
import { CapCoverResponseSchema, createCapCoverSchema } from "./cap_cover.schema";
import { z } from "zod";

registry.registerPath({
  method: "get",
  path: "/cap-covers",
  tags: ["CapCover"],
  summary: "Listar capítulos com paginação e filtro",
  request: {
    query: z.object({
      page: z.string().optional().openapi({ example: "1", description: "Número da página" }),
      limit: z.string().optional().openapi({ example: "10", description: "Itens por página" }),
      search: z.string().optional().openapi({ example: "One", description: "Filtro por título" }),
    }),
  },
  responses: {
    200: {
      description: "Lista de capítulos retornada com sucesso",
      content: {
        "application/json": {
          schema: z.object({
            data: z.array(CapCoverResponseSchema),
            meta: z.object({
              total: z.number(),
              page: z.number(),
              limit: z.number(),
              totalPages: z.number(),
            }),
          }),
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/cap-covers/{id}",
  tags: ["CapCover"],
  summary: "Obter capitulo por id",
  request: {
    params: z.object({
      id: z.number().int().positive(),
    }),
  },
  responses: {
    200: {
      description: "Capítulo encontrado com sucesso",
      content: {
        "application/json": { schema: CapCoverResponseSchema },
      },
    },
    404: { description: "Capítulo não existe"}
  },
});

registry.registerPath({
  method: "post",
  path: "/cap-covers",
  tags: ["CapCover"],
  summary: "Fazer upload de um capítulo do Manga",
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": { schema: createCapCoverSchema },
      },
    },
  },
  responses: {
    201: {
      description: "Capítulo criada com sucesso",
      content: {
        "application/json": { schema: CapCoverResponseSchema },
      },
    },
    400: { description: "Erro de validação ou idCapCover duplicado" },
    401: { description: "Não autorizado" },
  },
});

registry.registerPath({
  method: "put",
  path: "/cap-covers/{id}",
  tags: ["CapCover"],
  summary: "Fazer update de um capitulo",
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      id: z.number().int().positive(),
    }),
    body: {
      content: {
        "application/json": { schema: createCapCoverSchema },
      },
    },
  },
  responses: {
    201: {
      description: "Capítulo atualizado com sucesso",
      content: {
        "application/json": { schema: CapCoverResponseSchema },
      },
    },
    400: { description: "Erro de validação" },
    401: { description: "Não autorizado" },
    404: { description: "Capítulo não existe"}
  },
});

registry.registerPath({
  method: "delete",
  path: "/cap-covers/{id}",
  tags: ["CapCover"],
  summary: "Deletar um capitulo de Manga",
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      id: z.number().int().positive(),
    }),
  },
  responses: {
    204: {
      description: "Capítulo deletado com sucesso",
      content: {
        "application/json": { schema: CapCoverResponseSchema },
      },
    },
    401: { description: "Não autorizado" },
    404: { description: "Capítulo não existe"}
  },
});