import { NotasRepository } from "./notas.repository";
import { Nota } from "./notas.entity";
import { User } from "../users/user.entity";

export class NotasService {
  private notasRepository: NotasRepository;

  constructor() {
    this.notasRepository = new NotasRepository();
  }

  async createNota(notaData: Partial<Nota>): Promise<Nota> {
    const existingNota = await this.notasRepository.findByCapCoverIdAndUserId(
      notaData.capCover?.capCover_id!,
      notaData.user?.user_id!
    );

    if (existingNota) {
      return this.updateNota(existingNota.nota_id, notaData);
    }

    return await this.notasRepository.create(notaData);
  }

  async updateNota(notaId: number, notaData: Partial<Nota>): Promise<Nota> {
    const existingNota = await this.notasRepository.findByCapCoverIdAndUserId(
      notaData.capCover?.capCover_id!,
      notaData.user?.user_id!
    );

    if (!existingNota || existingNota.nota_id !== notaId) {
      throw new Error("Nota não encontrada.");
    }

    const updatedNota = {
      ...existingNota,
      ...notaData,
    };

    return await this.notasRepository.update(updatedNota);
  }

  async getNotaByIdCapCover(capCover_id: number): Promise<number> {
    const nota = await this.notasRepository.getMediaFromRepository(capCover_id);

    if (!nota) {
      return 0
    }

    return nota;
  }

  async getNotaByUserAndCap(capCover_id : number, user_id : number): Promise<Nota | undefined> {
    const res = await this.notasRepository.getCapCoverById(capCover_id)
    const nota =  res.find(ea => ea.user.user_id === user_id)
    return nota
  }
}