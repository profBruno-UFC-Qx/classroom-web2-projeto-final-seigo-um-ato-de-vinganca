import { AppDataSource } from "./config/data-source";
import { app } from "./app";
import dotenv from "dotenv";
import { UserService } from "./modules/users/user.service";

dotenv.config();

const PORT = process.env.PORT || 1337;

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("📦 Banco de dados conectado com sucesso!");

    // Cria o admin se nao existir nenhum usuario
    UserService.prototype.createAdminIfNoneExists = UserService.prototype.createAdminIfNoneExists.bind(new UserService());
    await UserService.prototype.createAdminIfNoneExists();

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
};

startServer();