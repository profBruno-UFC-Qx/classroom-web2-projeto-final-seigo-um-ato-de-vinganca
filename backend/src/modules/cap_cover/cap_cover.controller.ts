import { Request, Response } from "express";
import { CapCoverService } from "./cap_cover.service";

const capCoverService = new CapCoverService();

export class CapCoverController {
  async create(req: Request, res: Response) {
    try {
      const result = await capCoverService.create(req.body);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const capCover_id = parseInt(req.params.id, 10)
      const result = await capCoverService.update(capCover_id, req.body);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const search = req.query.search as string | undefined;

      const result = await capCoverService.getAll(page, limit, search);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

   async getByActCoverId(req: Request, res: Response) {
    try {
      const actCover_id = parseInt(req.params.id, 10)
      const result = await capCoverService.getById(actCover_id);
      if(result) return res.status(200).json(result);
      else return res.status(404).json({ message: "Capítulo não encontrado"})
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response){
    try {
      const capCover_id = parseInt(req.params.id, 10)
      const result = await capCoverService.delete(capCover_id)
      return res.status(204).json(result)
    } catch (error: any) {
      return res.status(400).json({message: error.message})
    }
  }

}