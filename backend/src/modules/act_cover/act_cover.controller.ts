import { Request, Response } from 'express';
import { ActCoverService } from './act_cover.service';

const actCoverService = new ActCoverService();

export class ActCoverController {
    async createActCover(req: Request, res: Response) {
        try {
            const actCoverData = req.body;
            const result = await actCoverService.createActCover(actCoverData);
            return res.status(201).json(result);
        } catch (error: any) {
            return res.status(400).json({success: false, message: error.message});
        }
    }

    async updateActCover(req: Request, res: Response) {
        try {
            const actCoverId = parseInt(req.params.id, 10);
            const actCoverData = req.body;
            const result = await actCoverService.updateActCover(actCoverId, actCoverData);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({success: false, message: error.message});
        }
    }

    async getAllActCover(req: Request, res: Response) {
        try {
            // Implementação futura para listar todos os ActCovers
            const result = await actCoverService.allActCover();
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({success: false, message: error.message});
        }
    }

    async getActCoverById(req: Request, res: Response) {
        try {
            const actCoverId = parseInt(req.params.id, 10);
            const result = await actCoverService.getActCoverById(actCoverId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({success: false, message: error.message});
        }
    }

    async deleteActCover(req: Request, res: Response) {
        try {
            const actCoverId = parseInt(req.params.id, 10);
            const result = await actCoverService.deleteActCover(actCoverId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({success: false, message: error.message});
        }
    }
}