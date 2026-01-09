import { ActCoverRepository } from './act_cover.repository';
import { ActCover } from './act_cover.entity';

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
    const existingActCover = await this.actCoverRepository.findByUniqueField(
      actCover_id
    );

    if (!existingActCover || existingActCover.actCover_id !== actCover_id) {
      throw new Error("ActCover não encontrada.");
    }

    const updatedActCover = {
      ...existingActCover,
      ...actCoverData,
    };

    return await this.actCoverRepository.update(updatedActCover);
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

  async deleteActCover(actCover_id: number): Promise<{ success: boolean; message: string }> {
    const actCover = await this.actCoverRepository.findById(actCover_id);

    if (!actCover) {
      throw new Error("ActCover não encontrada.");
    }

    await this.actCoverRepository.delete(actCover_id);
    return { success: true, message: "ActCover deletada com sucesso." };
  }
}