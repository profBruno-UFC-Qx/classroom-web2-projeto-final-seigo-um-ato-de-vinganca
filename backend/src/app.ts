import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { userRoutes } from "./modules/users/user.routes";
import { notasRoutes } from "./modules/notas/notas.routes";
import { capCoverRoutes } from "./modules/cap_cover/cap_cover.routes";
import { actCoverRoutes } from "./modules/act_cover/act_cover.routes";
import { mangaPictureRoutes } from "./modules/manga_picture/manga_picture.routes";
import { favoriteRoutes } from "./modules/favorite/favorite.routes";
import { CommentRoutes } from "./modules/comment/comment.routes";
import { generateOpenAPIDocument } from "./config/swagger";
import "./modules/users/user.docs";
import "./modules/notas/notas.docs";
import "./modules/manga_picture/manga_picture.docs";
import "./modules/cap_cover/cap_cover.docs"
import "./modules/act_cover/act_cover.docs";
import "./modules/favorite/favorite.docs";
import "./modules/comment/comment.docs";

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
app.use("/api", capCoverRoutes);
app.use("/api", actCoverRoutes)
app.use("/api", mangaPictureRoutes);
app.use("/api", favoriteRoutes);
app.use("/api", CommentRoutes);

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