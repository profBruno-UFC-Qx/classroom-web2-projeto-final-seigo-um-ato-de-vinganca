import { AppDataSource } from '../../config/data-source';
import { Favorite } from './favorite.entity';
import { Repository } from 'typeorm';

export class FavoriteRepository {
  private repo: Repository<Favorite>;

  constructor() {
    this.repo = AppDataSource.getRepository(Favorite);
  }

  async create(favoriteData: Partial<Favorite>): Promise<Favorite> {
    const favorite = this.repo.create(favoriteData);
    return await this.repo.save(favorite);
  }

  async findByCapCoverIdAndUserId(idCapCover: number, userId: number): Promise<Favorite | null> {
    return await this.repo.findOne({ where: { idCapCover, userId } });
  }

  async findByUserId(userId: number): Promise<Favorite[]> {
    return await this.repo.find({ where: { userId } });
  }

  async findByIdCapCover(idCapCover: number): Promise<Favorite[]> {
    return await this.repo.find({ where: { idCapCover } });
  }

  async update(favorite: Favorite): Promise<Favorite> {
    return await this.repo.save(favorite);
  }
}