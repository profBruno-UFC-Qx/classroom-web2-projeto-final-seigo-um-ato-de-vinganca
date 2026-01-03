import { NotasRepository } from "./notas.repository";
import { Nota } from "./notas.entity";

export class NotasService {
  private notasRepository: NotasRepository;

  constructor() {
    this.notasRepository = new NotasRepository();
  }

  async createNota(notaData: Partial<Nota>): Promise<Nota> {
    const existingNota = await this.notasRepository.findByUserIdAndCapCoverId(
      notaData.userId!,
      notaData.idCapCover!
    );

    if (existingNota) {
      throw new Error("Nota já existe para este usuário e capa.");
    }

    return await this.notasRepository.create(notaData);
  }

  async updateNota(notaId: number, notaData: Partial<Nota>): Promise<Nota> {
    const existingNota = await this.notasRepository.findByUserIdAndCapCoverId(
      notaData.userId!,
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

  async getNotaById(notaId: number): Promise<Nota> {
    const nota = await this.notasRepository.findByUserIdAndCapCoverId(notaId, 0); // Ajuste conforme necessário

    if (!nota) {
      throw new Error("Nota não encontrada.");
    }

    return nota;
  }
}