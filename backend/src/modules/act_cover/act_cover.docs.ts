import { registry } from "../../config/swagger";
import { actCoverCreateSchema, actCoverUpdateSchema, actCoverResponseSchema, actCoverGetOneSchema } from "./act_cover.schema";
import { z } from "zod";

registry.registerPath({
  method: "post",
  path: "/act-cover",
    tags: ["ActCover"],
    summary: "Criar um novo ActCover",
    security: [{ bearerAuth: [] }],
    request: {
      body: {
        content: {
          "application/json": { schema: actCoverCreateSchema },
        },
      },
    },
    responses: {
      201: {
        description: "ActCover criada com sucesso",
        content: {
          "application/json": { schema: actCoverResponseSchema },
        },
      },
    },
});

registry.registerPath({
  method: "put",
  path: "/act-cover/{id}",
  tags: ["ActCover"],
  summary: "Atualizar um ActCover existente",
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      id: z.number().openapi({ example: 1 }),
    }),
    body: {
      content: {
        "application/json": { schema: actCoverUpdateSchema },
      },
    },
  },
  responses: {
    200: {
      description: "ActCover atualizada com sucesso",
      content: {
        "application/json": { schema: actCoverResponseSchema },
      },
    },
  },
});

registry.registerPath({
  method: "delete",
  path: "/act-cover/{id}",
  tags: ["ActCover"],
  summary: "Deletar um ActCover existente",
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      id: z.number().openapi({ example: 1 }),
    }),
  },
  responses: {
    200: {
      description: "ActCover deletada com sucesso",
      content: {
        "application/json": { schema: actCoverResponseSchema },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/act-cover/{id}",
  tags: ["ActCover"],
  summary: "Obter um ActCover existente por ID",
  request: {
    params: z.object({
      id: z.number().openapi({ example: 1 }),
    }),
  },
  responses: {
    200: {
      description: "ActCover obtida com sucesso",
      content: {
        "application/json": { schema: actCoverResponseSchema },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/act-cover",
  tags: ["ActCover"],
  summary: "Obter todos ActCover existentes",
  responses: {
    200: {
      description: "ActCover obtida com sucesso",
      content: {
        "application/json": { schema: actCoverResponseSchema },
      },
    },
  },
});