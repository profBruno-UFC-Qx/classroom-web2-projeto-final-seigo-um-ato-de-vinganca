import { FavoriteRepository } from './favorite.repository';
import { Favorite } from './favorite.entity';

export class FavoriteService {
  private favoriteRepository: FavoriteRepository;
  
  constructor() {
    this.favoriteRepository = new FavoriteRepository();
  }
    async addFavorite(favoriteData: Partial<Favorite>): Promise<Favorite> {
        const existingFavorite = await this.favoriteRepository.findByCapCoverIdAndUserId(
            favoriteData.capCover?.capCover_id!,
            favoriteData.user?.user_id!
        );

        if (existingFavorite) {
            existingFavorite.isFavorite = favoriteData.isFavorite ?? existingFavorite.isFavorite;
            return await this.favoriteRepository.update(existingFavorite);
        }
        console.log({favoriteData})

        return await this.favoriteRepository.create(favoriteData);
    }
    async getUserFavorites(userId: number): Promise<Favorite[]> {
        return this.favoriteRepository.findByUserId(userId);
    }

    async updateFavorite(user_id: number, favoriteData: Partial<Favorite>): Promise<Favorite> {
        const existingFavorite = await this.favoriteRepository.findByCapCoverIdAndUserId(
            favoriteData.capCover?.capCover_id!,
            user_id
        );

        if (!existingFavorite) {
            throw new Error('Favorite not found');
        }

        existingFavorite.isFavorite = favoriteData.isFavorite ?? existingFavorite.isFavorite;

        return await this.favoriteRepository.update(existingFavorite);
    }
}   