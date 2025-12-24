import { registry } from "../../config/swagger";
import { registerSchema, loginSchema, authResponseSchema } from "./user.schema";
import { z } from "zod";

registry.registerPath({
  method: "post",
  path: "/auth/local/register",
  tags: ["Auth"],
  summary: "Registrar novo usuário",
  request: {
    body: {
      content: {
        "application/json": { schema: registerSchema },
      },
    },
  },
  responses: {
    201: {
      description: "Usuário criado com sucesso",
      content: {
        "application/json": { schema: authResponseSchema },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/auth/local",
  tags: ["Auth"],
  summary: "Autenticação de usuário",
  request: {
    body: {
      content: {
        "application/json": { schema: loginSchema },
      },
    },
  },
  responses: {
    200: {
      description: "Login realizado com sucesso",
      content: {
        "application/json": { schema: authResponseSchema },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/users/me",
  tags: ["Users"],
  summary: "Dados do usuário logado",
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: "Perfil do usuário",
      content: {
        "application/json": {
           schema: authResponseSchema.shape.user 
        },
      },
    },
    401: { description: "Não autorizado" },
  },
});