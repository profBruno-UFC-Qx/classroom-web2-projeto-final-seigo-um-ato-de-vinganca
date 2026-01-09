import { Request, Response } from 'express';
import { FavoriteService } from './favorite.service';

const favoriteService = new FavoriteService();

export class FavoriteController {
    async addFavorite(req: Request, res: Response) {
        try {
            const user_id = req.body.userId;
            const favoriteData = {
                ...req.body,
                user: { user_id: user_id}
            };
            const result = await favoriteService.addFavorite(favoriteData);
            return res.status(201).json(result);
        } catch (error: any) {
            return res.status(400).json({ success: false, message: error.message });
        }
    }

    async getUserFavorites(req: Request, res: Response) {
        try {
            const user_id = req.body.userId
            const result = await favoriteService.getUserFavorites(user_id);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({ success: false, message: error.message });
        }
    }

    async updateFavorite(req: Request, res: Response) {
        try {
            const user_id = req.body.userId;
            const favorite_id = parseInt(req.params.favorite_id,10)
            const favoriteData = {
                ...req.body, 
                favorite_id
            };
            const result = await favoriteService.updateFavorite(user_id, favoriteData);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({ success: false, message: error.message });
        }
    }
}