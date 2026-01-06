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

  async findById(actCoverId: number): Promise<ActCover | null> {
    return await this.repo.findOne({ where: { id: actCoverId } });
  }

  async findAll(): Promise<ActCover[]> {
    return await this.repo.find();
  }

  async update(actCover: ActCover): Promise<ActCover> {
    return await this.repo.save(actCover);
  }

  async delete(actCoverId: number): Promise<void> {
    await this.repo.delete(actCoverId);
  }
}