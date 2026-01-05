import { AppDataSource } from "../../config/data-source";
import { MangaPicture } from "./manga_picture.entity";
import { Repository } from "typeorm";

export class MangaPictureRepository {
  private repo: Repository<MangaPicture>;

  constructor() {
    this.repo = AppDataSource.getRepository(MangaPicture);
  }

  async create(mangaPictureData: Partial<MangaPicture>): Promise<MangaPicture> {
    const mangaPicture = this.repo.create(mangaPictureData);
    return await this.repo.save(mangaPicture);
  }

  async findByIdCapCover(idCapCover: number): Promise<MangaPicture | null> {
    return await this.repo.findOne({ where: { idCapCover } });
  }

  async update(mangaPicture: MangaPicture): Promise<MangaPicture> {
    return await this.repo.save(mangaPicture);
  }
}   