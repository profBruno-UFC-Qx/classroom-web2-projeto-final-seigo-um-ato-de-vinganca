import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { userRoutes } from "./modules/users/user.routes";
import { notasRoutes } from "./modules/notas/notas.routes";
import { generateOpenAPIDocument } from "./config/swagger";
import "./modules/users/user.docs";
import "./modules/notas/notas.docs";

const app = express();


// Middlewares
app.use(cors());
app.use(express.json());

// Swagger
const openApiDocument = generateOpenAPIDocument();
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

// Rotas
app.use("/api", userRoutes);
app.use("/api", notasRoutes); 

app.get("/", (req, res) => {
  res.json({ message: "API Leitor de Mangá rodando" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

export { app };