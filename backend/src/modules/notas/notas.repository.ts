import { AppDataSource } from "../../config/data-source";
import { Nota } from "./notas.entity";
import { Repository } from "typeorm";

export class NotasRepository {
  private repo: Repository<Nota>;

  constructor() {
    this.repo = AppDataSource.getRepository(Nota);
  }

  async create(notaData: Partial<Nota>): Promise<Nota> {
    const nota = this.repo.create(notaData);
    return await this.repo.save(nota);
  }

  async getMediaFromRepository(idCapCover: number): Promise<number | null> {

    const average = await this.repo.createQueryBuilder("nota")
      .select("AVG(nota.nota)", "avg")
      .where("nota.idCapCover = :idCapCover", { idCapCover })
      .getRawOne();

    return average ? average.avg : null;
  }

  async findByCapCoverId(idCapCover: number): Promise<Nota | null> {
    return await this.repo.findOne({ where: { idCapCover } });
  }
  
  async update(nota: Nota): Promise<Nota> {
    return await this.repo.save(nota);
  }
}