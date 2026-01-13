import { deleteByPath, saveImage } from "../../utils/file";
import { CapCover } from "./cap_cover.entity";
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

  async update(idCapCover: number, capCoverData: Partial<CapCover>) {
    const existing = await this.capCoverRepo.findByIdCapCover(idCapCover);
    if (!existing) throw new Error("CapCover com esse ID não existe");

    //Se veio nova imagem
    if(capCoverData.capCoverPicture !== undefined){
      const newImage = saveImage(capCoverData.capCoverPicture)

      // apagar antiga
      deleteByPath(existing.capCoverPicture)

      //Atualiza para a nova 
      existing.capCoverPicture = newImage

    }

    existing.capCoverTitle = capCoverData.capCoverTitle ?? existing.capCoverTitle
    existing.capCoverNumber = capCoverData.capCoverNumber ?? existing.capCoverNumber
    existing.description = capCoverData.description ?? existing.description
    existing.actCover = capCoverData.actCover ?? existing.actCover

    return await this.capCoverRepo.update(existing)
  }

  async getAll(page: number = 1, limit: number = 10, search?: string) {
    return await this.capCoverRepo.findAll(page, limit, search);
  }

  async getById(actCoverId: number) {
    return await this.capCoverRepo.findByActCoverId(actCoverId)
  }

  async getByCapCoverId(capCover_id : number){
    return await this.capCoverRepo.findByIdCapCoverPopulated(capCover_id)
  }

  async delete(idCapCover: number){
    return await this.capCoverRepo.delete(idCapCover)
  }
}