import { NotasRepository } from "./notas.repository";
import { Nota } from "./notas.entity";

export class NotasService {
  private notasRepository: NotasRepository;

  constructor() {
    this.notasRepository = new NotasRepository();
  }

  async createNota(notaData: Partial<Nota>): Promise<Nota> {
    const existingNota = await this.notasRepository.findByCapCoverIdAndUserId(
      notaData.idCapCover!,
      notaData.userId!
    );

    if (existingNota) {
      return this.updateNota(existingNota.id, notaData);
    }

    return await this.notasRepository.create(notaData);
  }

  async updateNota(notaId: number, notaData: Partial<Nota>): Promise<Nota> {
    const existingNota = await this.notasRepository.findByCapCoverIdAndUserId(
      notaData.idCapCover!,
      notaData.userId!
    );

    if (!existingNota || existingNota.id !== notaId) {
      throw new Error("Nota não encontrada.");
    }

    const updatedNota = {
      ...existingNota,
      ...notaData,
    };

    return await this.notasRepository.update(updatedNota);
  }

  async getNotaByIdCapCover(idCapCover: number): Promise<number> {
    const nota = await this.notasRepository.getMediaFromRepository(idCapCover);

    if (!nota) {
      throw new Error("Nota não encontrada.");
    }

    return nota;
  }
}