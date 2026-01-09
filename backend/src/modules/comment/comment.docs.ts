import { registry } from "../../config/swagger";
import { commentCreateSchema, commentUpdateSchema, commentResponseSchema } from "./comment.schema";
import { z } from "zod";

registry.registerPath({
  method: "post",
  path: "/comments",
    tags: ["Comments"],
    summary: "Criar um novo comentario",
    security: [{ bearerAuth: [] }],
    request: {
        body: {
            content: {
                "application/json": { schema: commentCreateSchema },
            },
        },
    },
    responses: {
        201: {
            description: "Comentario criado com sucesso",
            content: {
                "application/json": { schema: commentResponseSchema },
            },
        },
    },
});

registry.registerPath({
    method: "put",
    path: "/comments/{id}",
    tags: ["Comments"],
    summary: "Atualizar um comentario existente",
    security: [{ bearerAuth: [] }],
    request: {
        params: z.object({
            id: z.number().openapi({ example: 1 }),
        }),
        body: {
            content: {
                "application/json": { schema: commentUpdateSchema },
            },
        },
    },
    responses: {
        200: {
            description: "Comentario atualizado com sucesso",
            content: {
                "application/json": { schema: commentResponseSchema },
            },
        },
    },
});

registry.registerPath({
    method: "delete",
    path: "/comments/{id}",
    tags: ["Comments"],
    summary: "Deletar um comentario existente",
    security: [{ bearerAuth: [] }],
    request: {
        params: z.object({
            id: z.number().openapi({ example: 1 }),
        }),
    },
    responses: {
        200: {
            description: "Comentario deletado com sucesso",
        },
    },
});

registry.registerPath({
    method: "get",
    path: "/comments/{idCapCover}",
    tags: ["Comments"],
    summary: "Obter todos os comentarios existentes de um capítulo pelo id do capítulo",
    request: {
        params: z.object({
            idCapCover: z.number().openapi({ example: 1 }),
        }),
    },
    responses: {
        200: {
            description: "Comentario obtido com sucesso",
            content: {
                "application/json": { schema: commentResponseSchema },
            },
        },
    },
});