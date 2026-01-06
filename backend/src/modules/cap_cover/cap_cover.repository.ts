import { AppDataSource } from "../../config/data-source";
import { CapCover } from "./cap_cover.entity";
import { Repository, Like } from "typeorm";

export class CapCoverRepository {
  private repo: Repository<CapCover>;

  constructor() {
    this.repo = AppDataSource.getRepository(CapCover);
  }

  async create(data: Partial<CapCover>): Promise<CapCover> {
    const CapCover = this.repo.create(data);
    return await this.repo.save(CapCover);
  }

  async update(data: Partial<CapCover>): Promise<CapCover> {
    return await this.repo.save(data)
  }

  async findAll(page: number, limit: number, search?: string) {
    const skip = (page - 1) * limit;

    // Filtro
    const condition = search 
      ? { capCover: Like(`%${search}%`) }
      : {};

    const [CapCovers, total] = await this.repo.findAndCount({
      where: condition,
      skip: skip,
      take: limit,
      order: { createdAt: "DESC" }
    });

    return {
      data: CapCovers,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async findByIdCapCover(idCapCover: number): Promise<CapCover | null> {
    return await this.repo.findOneBy({ idCapCover });
  }

  async delete(idCapCover: number): Promise<void> {
    const res =  await this.repo.delete({ idCapCover: idCapCover })
    console.log(res)
  }
}