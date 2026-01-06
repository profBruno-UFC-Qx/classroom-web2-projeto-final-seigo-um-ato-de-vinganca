import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../modules/users/user.entity";
import { Nota } from "../modules/notas/notas.entity";
import { MangaPicture } from "../modules/manga_picture/manga_picture.entity";
import { CapCover } from "../modules/cap_cover/cap_cover.entity";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: process.env.DB_PATH || "./database.sqlite",
  synchronize: true,
  logging: true,
  entities: [
    User, 
    Nota,
    MangaPicture,
    CapCover,
  ], 
  migrations: [],
  subscribers: [],
});