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

  async findByIdCapCover(capCover_id: number): Promise<MangaPicture[] | null> {
    return await this.repo.find({ where: { capCover: { capCover_id: capCover_id } } });
  }

  async update(mangaPicture: MangaPicture): Promise<MangaPicture> {
    return await this.repo.save(mangaPicture);
  }

  async deleteMangaPictureById(mangaPictureId: number): Promise<{success: boolean, message: string}> {
    await this.repo.delete({ mangaPicture_id: mangaPictureId });
    return {success: true, message: "Manga Picture deletado com sucesso."};
  }
}   