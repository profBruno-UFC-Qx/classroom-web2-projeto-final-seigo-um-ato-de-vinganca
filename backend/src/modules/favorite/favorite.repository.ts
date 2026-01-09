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

  async findByCapCoverIdAndUserId(capCover_id: number, user_id: number): Promise<Favorite | null> {
    return await this.repo.findOne({ where: { capCover: { capCover_id }, user: { user_id } } });
  }

  async findByUserId(user_id: number): Promise<Favorite[]> {
    return await this.repo.find({ where: { user: { user_id } } });
  }

  async findByIdCapCover(capCover_id: number): Promise<Favorite[]> {
    return await this.repo.find({ where: { capCover: { capCover_id } } });
  }

  async update(favorite: Favorite): Promise<Favorite> {
    return await this.repo.save(favorite);
  }
}