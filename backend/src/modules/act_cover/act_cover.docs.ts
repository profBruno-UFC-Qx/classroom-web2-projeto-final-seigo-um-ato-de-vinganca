import { registry } from "../../config/swagger";
import { actCoverCreateSchema, actCoverUpdateSchema, actCoverResponseSchema, actCoverGetOneSchema, deleteActCoverScheme } from "./act_cover.schema";
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
        "multipart/form-data": {
          schema: {
            type: "object",
            properties: {
              actNumber: { type: "number" },
              actDetails: { type: "string" },
              isReady: { type: "boolean" },
              actCoverPicture: {
                type: "string",
                format: "binary"   // arquivo
              }
            },
            required: ["actNumber", "actDetails", "isReady", "actCoverPicture"]
          }
        }
      }
    }
  },
  responses: {
    201: {
      description: "ActCover criada com sucesso",
      content: {
        "application/json": { schema: actCoverResponseSchema }
      }
    },
    400: { description: "Erro na requisição" }
  }
})


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
        "multipart/form-data": {
          schema: {
            type: "object",
            properties: {
              actDetails: { type: "string" },
              actCoverPicture: {
                type: "string",
                format: "binary"   // 👈 arquivo
              }
            },
            required: ["actDetails"]
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: "ActCover atualizada com sucesso",
      content: {
        "application/json": { schema: actCoverResponseSchema },
      },
    },
    400: { description: "Erro na requisição" }
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
    401: { description: "Não autorizado" },
    404: { description: "ActCover não encontrado"},
    400: { description: "Erro na requisição" }
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
    400: { description: "Erro na requisição" }
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
    400: { description: "Erro na requisição" }
  },
});