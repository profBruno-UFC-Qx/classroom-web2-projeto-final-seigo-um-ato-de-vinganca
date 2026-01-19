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

  async getMediaFromRepository(capCover_id: number): Promise<number | null> {

    const average = await this.repo.createQueryBuilder("nota")
      .select("AVG(nota.nota)", "avg")
      .where("nota.capCover_id = :capCover_id", { capCover_id })
      .getRawOne();

    if(average.avg === null) return null 
    
    return average ? parseFloat(average.avg.toFixed(2)) : null;
  }

  async findByCapCoverIdAndUserId(capCover_id: number, user_id: number): Promise<Nota | null> {
    return await this.repo.findOne({ where: { capCover : { capCover_id }, user:  { user_id } } });
  }
  
  async update(nota: Nota): Promise<Nota> {
    return await this.repo.save(nota);
  }

  async getCapCoverById(capCover_id: number){
    return await this.repo.find({ where: { capCover :{ capCover_id } }, relations : {
      user: true
    } },)
  }
}