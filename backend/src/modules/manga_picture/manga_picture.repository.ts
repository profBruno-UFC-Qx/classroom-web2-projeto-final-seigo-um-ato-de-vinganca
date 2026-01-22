import { AppDataSource } from "../../config/data-source";
import {  deleteMangaPicturesArchives } from "../../utils/file";
import { MangaPicture } from "./manga_picture.entity";
import { Repository } from "typeorm";

export class MangaPictureRepository {
  private repo: Repository<MangaPicture>;

  constructor() {
    this.repo = AppDataSource.getRepository(MangaPicture);
  }

  async create(capCover_id: number, pictures : string[]): Promise<MangaPicture> {
    const mangaPictureData = {
      capCover : {capCover_id},
      pictures : pictures
    }
    const mangaPicture = this.repo.create(mangaPictureData);
    return await this.repo.save(mangaPicture);
  }

  async findByIdCapCover(capCover_id: number): Promise<MangaPicture[] | null> {
    console.log(`repo`, capCover_id)
    return await this.repo.find({ where: { capCover: { capCover_id: capCover_id } } });
  }

  async update(mangaPicture: MangaPicture): Promise<MangaPicture> {
    return await this.repo.save(mangaPicture);
  }

  async deleteMangaPictureById(mangaPictureId: number): Promise<{success: boolean, message: string}> {
    const mangaPicture = await this.repo.findOne({
      where: { mangaPicture_id: mangaPictureId },
      relations: {
        capCover: true
      }
    })
    console.log(mangaPicture)
    await this.repo.delete({ mangaPicture_id: mangaPictureId });
    if (mangaPicture !== null) {
      deleteMangaPicturesArchives(mangaPicture.capCover.capCover_id)
    }
    return {success: true, message: "Manga Picture deletado com sucesso."};
  }
}   