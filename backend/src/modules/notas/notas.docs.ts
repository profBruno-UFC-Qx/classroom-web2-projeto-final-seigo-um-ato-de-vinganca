import { registry } from "../../config/swagger";
import { notaCreateSchema, notaMediaSchema, notaUpdateSchema, notaResponseSchema } from "./notas.schema";
import { z } from "zod";

registry.registerPath({
  method: "post",
  path: "/notas",
    tags: ["Notas"],
    summary: "Criar uma nova nota",
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

registry.registerPath({
  method: "put",
  path: "/notas/{id}",
  tags: ["Notas"],
  summary: "Atualizar uma nota existente",
  request: {
    body: {
      content: {
        "application/json": { schema: notaUpdateSchema },
      },
    },
  },
  responses: {
    200: {
      description: "Nota atualizada com sucesso",
      content: {
        "application/json": { schema: notaResponseSchema },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/notas/media",
  tags: ["Notas"],
  summary: "Obter a média da nota",
  request: {
    body: {
      content: {
        "application/json": { schema: notaMediaSchema },
      },
    },
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