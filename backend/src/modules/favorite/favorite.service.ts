import { FavoriteRepository } from './favorite.repository';
import { Favorite } from './favorite.entity';

export class FavoriteService {
  private favoriteRepository: FavoriteRepository;
  
  constructor() {
    this.favoriteRepository = new FavoriteRepository();
  }
    async addFavorite(favoriteData: Partial<Favorite>): Promise<Favorite> {
        let existingFavorite = await this.favoriteRepository.findByCapCoverIdAndUserId(
            favoriteData.capCover?.capCover_id!,
            favoriteData.user?.user_id!
        );

        if (existingFavorite) {
            existingFavorite = {
                ...existingFavorite,
                ...favoriteData,

            }
            return await this.favoriteRepository.update(existingFavorite);
        }

        return await this.favoriteRepository.create(favoriteData);
    }
    async getUserFavorites(userId: number): Promise<Favorite[]> {
        return await this.favoriteRepository.findByUserId(userId);
    }

    async getFavoriteByCapCoverId(user_id : number, capCover_id : number): Promise<Favorite | null> {
        return await this.favoriteRepository.findByCapCoverId(user_id, capCover_id)
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