import { AppDataSource } from "../../config/data-source";
import { deleteMangaPicturesArchives } from "../../utils/file";
import { CapCover } from "./cap_cover.entity";
import { Repository, Like, Equal } from "typeorm";

export class CapCoverRepository {
  private repo: Repository<CapCover>;

  constructor() {
    this.repo = AppDataSource.getRepository(CapCover);
  }

  async create(data: Partial<CapCover>): Promise<CapCover> {
    const CapCover = this.repo.create(data);
    
    console.log(CapCover);
    return await this.repo.save(CapCover);
  }

  async update(data: Partial<CapCover>): Promise<CapCover> {
    return await this.repo.save(data)
  }

  async findAll(page: number, limit: number, search?: string) {
    const skip = (page - 1) * limit;

    const condition = search 
      ? { capCover: Like(`%${search}%`) }
      : {};

    const [CapCovers, total] = await this.repo.findAndCount({
      where: condition,
      skip: skip,
      take: limit,
      order: { createdAt: "DESC" },
      relations: {actCover: true}
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

  async findByIdCapCover(capCover_id: number): Promise<CapCover | null> {
    return await this.repo.findOneBy({ capCover_id });
  }

  async findByIdCapCoverPopulated(capCover_id : number): Promise<CapCover | null> {
    return await this.repo.findOne({
      where: { capCover_id: capCover_id },
      relations: {
        notas: true,
        comments: true,
        favorite: true,
        actCover: true,
        mangaPictures : true
      }
    })
  }

  async findByActCoverId(actCover_id: number): Promise<CapCover[] | null> {
    return await this.repo.findBy({ actCover: { actCover_id } });
  }

  async findByCapCoverNumber(capCoverNumber: number): Promise<CapCover | null> {
    return await this.repo.findOneBy({ capCoverNumber });
  }
  
  async findByNumberAndAct(capCoverNumber: number, actCover_id: number): Promise<CapCover | null> {
    return await this.repo.findOne({
      where: { 
        capCoverNumber: capCoverNumber,
        actCover: { actCover_id: actCover_id }
      }
    });
  }

  async delete(capCover_id: number): Promise<{success: boolean, message: string}> {
    try{
      const res =  await this.repo.delete({ capCover_id });
      if (res.affected === 0) {
        throw new Error("Capítulo não encontrado");
      }
      try {
        deleteMangaPicturesArchives(capCover_id);
      } catch (fileError) {
        console.error("Erro ao deletar arquivos físicos:", fileError);
      }
    
      return {success: true, message: "Capítulo deletado com sucesso."};
    } catch(e: any) {
      if (e.message === "Capítulo não encontrado") {
        throw e;
      }
      throw new Error(`Não foi possível deletar o capítulo. Error: ${e.message}`);
    }
  }
}