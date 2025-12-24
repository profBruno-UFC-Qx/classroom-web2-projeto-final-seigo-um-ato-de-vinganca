import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const registerSchema = z.object({
  username: z.string().min(3).openapi({ example: "Seigo" }),
  email: z.string().email().openapi({ example: "seigo@email.com" }),
  password: z.string().min(6).openapi({ example: "123456" }),
}).openapi("UserRegisterRequest");

export const loginSchema = z.object({
  identifier: z.string().openapi({ example: "seigo@email.com" }),
  password: z.string().openapi({ example: "123456" }),
}).openapi("LoginRequest");



const userResponseSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  role: z.string(),
  confirmed: z.boolean(),
  blocked: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
}).openapi("UserResponse");

export const authResponseSchema = z.object({
  jwt: z.string(),
  user: userResponseSchema,
}).openapi("AuthResponse");