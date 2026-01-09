import { FavoriteRepository } from './favorite.repository';
import { Favorite } from './favorite.entity';

export class FavoriteService {
  private favoriteRepository: FavoriteRepository;
  
  constructor() {
    this.favoriteRepository = new FavoriteRepository();
  }
    async addFavorite(userId: number, favoriteData: Partial<Favorite>): Promise<Favorite> {
        const existingFavorite = await this.favoriteRepository.findByCapCoverIdAndUserId(
            favoriteData.capCover?.capCover_id!,
            userId
        );

        if (existingFavorite) {
            // Update existing favorite
            existingFavorite.isFavorite = favoriteData.isFavorite ?? existingFavorite.isFavorite;
            return await this.favoriteRepository.update(existingFavorite);
        }

        // Create new favorite
        const newFavoriteData: Partial<Favorite> = {
            user: { user_id: userId } as any,
            capCover: favoriteData.capCover,
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