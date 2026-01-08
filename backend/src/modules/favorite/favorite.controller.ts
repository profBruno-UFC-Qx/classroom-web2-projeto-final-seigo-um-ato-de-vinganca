import { Request, Response } from 'express';
import { FavoriteService } from './favorite.service';

const favoriteService = new FavoriteService();

export class FavoriteController {
    async addFavorite(req: Request, res: Response) {
        try {
            const favoriteData = req.body;
            const userId = favoriteData.userId;
            const result = await favoriteService.addFavorite(userId, favoriteData);
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
            console.log('Request Params:', req.params.idCapCover);
            const idCapCover = parseInt(req.params.idCapCover, 10);
            console.log('ID Cap Cover:', idCapCover);
            const result = await favoriteService.getUserFavoritesByIdCapCover(idCapCover);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({ success: false, message: error.message });
        }
    }

    async updateFavorite(req: Request, res: Response) {
        try {
            const favoriteData = req.body;
            const userId = favoriteData.userId;
            const result = await favoriteService.updateFavorite(userId, favoriteData);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({ success: false, message: error.message });
        }
    }
}