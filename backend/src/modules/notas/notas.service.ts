import { NotasRepository } from "./notas.repository";
import { Nota } from "./notas.entity";

export class NotasService {
  private notasRepository: NotasRepository;

  constructor() {
    this.notasRepository = new NotasRepository();
  }

  async createNota(notaData: Partial<Nota>): Promise<Nota> {
    const existingNota = await this.notasRepository.findByCapCoverId(
      notaData.idCapCover!
    );

    if (existingNota) {
      return this.updateNota(notaData.idCapCover!, notaData);
    }

    return await this.notasRepository.create(notaData);
  }

  async updateNota(notaId: number, notaData: Partial<Nota>): Promise<Nota> {
    const existingNota = await this.notasRepository.findByCapCoverId(
      notaData.idCapCover!
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

  async getNotaById(notaId: number): Promise<number> {
    const nota = await this.notasRepository.getMediaFromRepository(notaId);

    if (!nota) {
      throw new Error("Nota não encontrada.");
    }

    return nota;
  }
}