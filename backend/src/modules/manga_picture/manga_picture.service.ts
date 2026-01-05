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
    const existingMangaPicture =
      await this.mangaPictureRepository.findByIdCapCover(
        mangaPictureData.idCapCover!
      );

    if (existingMangaPicture) {
      return this.updateMangaPicture(
        mangaPictureData.idCapCover!,
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
        mangaPictureData.idCapCover!
      );

    if (!existingMangaPicture || existingMangaPicture.id !== mangaPictureId) {
      throw new Error("Manga Picture não encontrada.");
    }

    const updatedMangaPicture = {
      ...existingMangaPicture,
      ...mangaPictureData,
    };

    return await this.mangaPictureRepository.update(updatedMangaPicture);
  }

  async getMangaPictureByIdCapCover(
    mangaPictureId: number
  ): Promise<MangaPicture> {
    const mangaPicture =
      await this.mangaPictureRepository.findByIdCapCover(mangaPictureId);

    if (!mangaPicture) {
      throw new Error("Manga Picture não encontrada.");
    }

    return mangaPicture;
  }
}