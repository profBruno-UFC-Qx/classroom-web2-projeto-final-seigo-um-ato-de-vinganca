import {Request, Response} from 'express';
import { NotasService } from './notas.service';


const notasService = new NotasService();

export class NotasController {
    async createNota(req: Request, res: Response) {
        try {
            const notaData = req.body;
            const result = await notasService.createNota(notaData);
            return res.status(201).json(result);
        } catch (error: any) {
            return res.status(400).json({success: false, message: error.message});
        }
    }

    async updateNota(req: Request, res: Response) {
        try {
            const notaId = parseInt(req.params.id, 10);
            const notaData = req.body;
            const result = await notasService.updateNota(notaId, notaData);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({success: false, message: error.message});
        }
    }

    async getNotaById(req: Request, res: Response) {
        try {
            const notaId = parseInt(req.params.id, 10);
            const result = await notasService.getNotaById(notaId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({success: false, message: error.message});
        }
    }
}