import { AppDataSource } from "./config/data-source";
import { app } from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 1337;

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("📦 Banco de dados conectado com sucesso!");

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
};

startServer();