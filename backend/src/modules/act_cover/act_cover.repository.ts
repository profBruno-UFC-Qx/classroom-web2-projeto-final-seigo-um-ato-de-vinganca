import { AppDataSource } from "../../config/data-source";
import { ActCover } from "./act_cover.entity";
import { Repository } from "typeorm";

export class ActCoverRepository {
  private repo: Repository<ActCover>;

  constructor() {
    this.repo = AppDataSource.getRepository(ActCover);
  }

  async create(actCoverData: Partial<ActCover>): Promise<ActCover> {
    const actCover = this.repo.create(actCoverData);
    return await this.repo.save(actCover);
  }

  async findByUniqueField(uniqueField: number): Promise<ActCover | null> {
    return await this.repo.findOne({ where: { actNumber: uniqueField } }); // Precisa arrumar dps
  }

  async findById(actCover_id: number): Promise<ActCover | null> {
    return await this.repo.findOne({ where: { actCover_id } });
  }

  async findAll(): Promise<ActCover[]> {
    return await this.repo.find();
  }

  async update(actCover: ActCover): Promise<ActCover> {
    return await this.repo.save(actCover);
  }

  async delete(actCover_id: number): Promise<void> {
    try{
      const res = await this.repo.delete(actCover_id);
      if (res.affected === 0) {
        throw new Error("ActCover não encontrado");
      }

    } catch(e: any) {
      if (e.message === "ActCover não encontrado") {
        throw e;
      }
      throw new Error(`Não foi possível deletar o ActCover. Error: ${e.message}`);
    }
  }
}