import { MangaPictureRepository } from "./manga_picture.repository";
import { MangaPicture } from "./manga_picture.entity";

export class MangaPictureService {
  private mangaPictureRepository: MangaPictureRepository;

  constructor() {
    this.mangaPictureRepository = new MangaPictureRepository();
  }

  async uploadMangaPicture(
    mangaPictureData: Partial<MangaPicture>
  ): Promise<MangaPicture> {

    console.log("MangaPictureData received in service:", mangaPictureData);
    const existingMangaPicture =
      await this.mangaPictureRepository.findByIdCapCover(
        mangaPictureData.capCover!.capCover_id
      );

    if (existingMangaPicture && existingMangaPicture.length > 0) {
      return this.updateMangaPicture(
        existingMangaPicture[0].mangaPicture_id,
        mangaPictureData
      );
    }

    return await this.mangaPictureRepository.create(mangaPictureData);
  }

  async updateMangaPicture(
    mangaPictureId: number,
    mangaPictureData: Partial<MangaPicture>
  ): Promise<MangaPicture> {
    const existingMangaPicture =
      await this.mangaPictureRepository.findByIdCapCover(
        mangaPictureData.capCover!.capCover_id
      );

    if (!existingMangaPicture || existingMangaPicture.length === 0 || existingMangaPicture[0].mangaPicture_id !== mangaPictureId) {
      throw new Error("Manga Picture não encontrada.");
    }

    const updatedMangaPicture = {
      ...existingMangaPicture[0],
      ...mangaPictureData,
    };

    return await this.mangaPictureRepository.update(updatedMangaPicture);
  }

  async getMangaPictureByIdCapCover(
    mangaPictureId: number
  ): Promise<MangaPicture> {
    const mangaPicture =
      await this.mangaPictureRepository.findByIdCapCover(mangaPictureId);

    if (!mangaPicture || mangaPicture.length === 0) {
      throw new Error("Manga Picture não encontrada.");
    }

    return mangaPicture[0];
  }

  async deleteMangaPicture(mangaPictureId: number): Promise<void> {
      await this.mangaPictureRepository.deleteMangaPictureById(mangaPictureId);
  }
}