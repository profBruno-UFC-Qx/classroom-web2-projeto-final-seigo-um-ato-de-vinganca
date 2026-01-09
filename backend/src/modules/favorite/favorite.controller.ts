import { Request, Response } from 'express';
import { FavoriteService } from './favorite.service';

const favoriteService = new FavoriteService();

export class FavoriteController {
    async addFavorite(req: Request, res: Response) {
        try {
            const favoriteData = req.body;
            const user_id = favoriteData.userId;
            const result = await favoriteService.addFavorite(user_id, favoriteData);
            return res.status(201).json(result);
        } catch (error: any) {
            return res.status(400).json({ success: false, message: error.message });
        }
    }

    async getUserFavorites(req: Request, res: Response) {
        try {
            const data = req.body;
            const userId = data.userId;
            const result = await favoriteService.getUserFavorites(userId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({ success: false, message: error.message });
        }
    }

    async getUserFavoritesByIdCapCover(req: Request, res: Response) {
        try {
            const capCover_id = parseInt(req.params.capCover_id, 10);
            const result = await favoriteService.getUserFavoritesByIdCapCover(capCover_id);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({ success: false, message: error.message });
        }
    }

    async updateFavorite(req: Request, res: Response) {
        try {
            const favoriteData = req.body;
            const user_id = favoriteData.user_id;
            const result = await favoriteService.updateFavorite(user_id, favoriteData);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({ success: false, message: error.message });
        }
    }
}