import { FavoriteRepository } from './favorite.repository';
import { Favorite } from './favorite.entity';

export class FavoriteService {
  private favoriteRepository: FavoriteRepository;
  
  constructor() {
    this.favoriteRepository = new FavoriteRepository();
  }
    async addFavorite(userId: number, favoriteData: Partial<Favorite>): Promise<Favorite> {
        const existingFavorite = await this.favoriteRepository.findByCapCoverIdAndUserId(
            favoriteData.idCapCover!,
            userId
        );

        if (existingFavorite) {
            // Update existing favorite
            existingFavorite.isFavorite = favoriteData.isFavorite ?? existingFavorite.isFavorite;
            return await this.favoriteRepository.update(existingFavorite);
        }

        // Create new favorite
        const newFavoriteData: Partial<Favorite> = {
            userId,
            idCapCover: favoriteData.idCapCover!,
            isFavorite: favoriteData.isFavorite ?? true,
        };

        return await this.favoriteRepository.create(newFavoriteData);
    }
    async getUserFavorites(userId: number): Promise<Favorite[]> {
        return this.favoriteRepository.findByUserId(userId);
    }
    async getUserFavoritesByIdCapCover(idCapCover: number): Promise<Favorite[]> {
        return this.favoriteRepository.findByIdCapCover(idCapCover);
    }
    async updateFavorite(userId: number, favoriteData: Partial<Favorite>): Promise<Favorite> {
        const existingFavorite = await this.favoriteRepository.findByCapCoverIdAndUserId(
            favoriteData.idCapCover!,
            userId
        );

        if (!existingFavorite) {
            throw new Error('Favorite not found');
        }

        existingFavorite.isFavorite = favoriteData.isFavorite ?? existingFavorite.isFavorite;

        return await this.favoriteRepository.update(existingFavorite);
    }
}   