import { ActCoverRepository } from './act_cover.repository';
import { ActCover } from './act_cover.entity';
import path from 'path';
import fs from 'fs';
import { UPLOAD_DIR } from '../../app';
import { deleteByPath, saveImage } from '../../utils/file';

export class ActCoverService {
  private actCoverRepository: ActCoverRepository;

  constructor() {
    this.actCoverRepository = new ActCoverRepository();
  }

  async createActCover(actCoverData: Partial<ActCover>): Promise<ActCover> {
    const existingActCover = await this.actCoverRepository.findByUniqueField(
      actCoverData.actNumber!
    );

    if (existingActCover) {
      return this.updateActCover(actCoverData.actCover_id!, actCoverData);
    }

    return await this.actCoverRepository.create(actCoverData);
  }

  async updateActCover(actCover_id: number, actCoverData: Partial<ActCover>): Promise<ActCover> {
    const existingActCover = await this.actCoverRepository.findById(
      actCover_id
    );

    if (!existingActCover) {
      throw new Error("ActCover não encontrada.");
    }

    // Se veio nova imagem
    if (actCoverData.actCoverPicture) {
      const newImage = saveImage(actCoverData.actCoverPicture)

      // apagar antiga
      deleteByPath(existingActCover.actCoverPicture)

      //Atualizar para nova
      existingActCover.actCoverPicture = newImage
    }

    // atualizar outros campos
    existingActCover.actDetails = actCoverData.actDetails ?? existingActCover.actDetails
    existingActCover.isReady = actCoverData.isReady ?? existingActCover.isReady
    existingActCover.actNumber = actCoverData.actNumber ?? existingActCover.actNumber
    return await this.actCoverRepository.update(existingActCover);
  }

  async allActCover(): Promise<ActCover[]> {
    const actCovers = await this.actCoverRepository.findAll();
    return actCovers;
  }

  async getActCoverById(actCover_id: number): Promise<ActCover> {
    const actCover = await this.actCoverRepository.findById(actCover_id);

    if (!actCover) {
      throw new Error("ActCover não encontrada.");
    }

    return actCover;
  }

  async deleteActCover(actCover_id: number, acCoverPicture : string): Promise<{ success: boolean; message: string }> {
    const actCover = await this.actCoverRepository.findById(actCover_id);

    if (!actCover) {
      throw new Error("ActCover não encontrada.");
    }
    await this.actCoverRepository.delete(actCover_id);
    deleteByPath(acCoverPicture);

    return { success: true, message: "ActCover deletada com sucesso." };
  }
}