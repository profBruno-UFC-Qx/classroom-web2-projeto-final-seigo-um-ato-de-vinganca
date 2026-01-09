import { CapCoverRepository } from "./cap_cover.repository";

export class CapCoverService {
  private capCoverRepo: CapCoverRepository;

  constructor() {
    this.capCoverRepo = new CapCoverRepository();
  }

  async create(data: any) {
    const existing = await this.capCoverRepo.findByCapCoverNumber(data.capCoverNumber);
    if (existing) throw new Error("CapCover com este capCoverNumber já existe");

    return await this.capCoverRepo.create(data);
  }

  async update(idCapCover: number, data: any) {
    const existing = await this.capCoverRepo.findByIdCapCover(idCapCover);
    if (!existing) throw new Error("CapCover with this id does not exist");

    const updated = {
        ...existing,
        ...data
    }

    return await this.capCoverRepo.update(updated)
  }

  async getAll(page: number = 1, limit: number = 10, search?: string) {
    return await this.capCoverRepo.findAll(page, limit, search);
  }

  async getById(actCoverId: number) {
    return await this.capCoverRepo.findByActCoverId(actCoverId)
  }

  async delete(idCapCover: number){
    return await this.capCoverRepo.delete(idCapCover)
  }
}