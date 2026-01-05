import { Request, Response } from "express";
import { MangaPictureService } from "./manga_picture.service";
const mangaPictureService = new MangaPictureService();

export class MangaPictureController {
  async uploadMangaPicture(req: Request, res: Response) {
    try {
      const mangaPictureData = req.body;
      const result = await mangaPictureService.uploadMangaPicture(mangaPictureData);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  async getMangaPictureByIdCapCover(req: Request, res: Response) {
    try {
      const mangaPictureId = parseInt(req.params.id, 10);
      const result = await mangaPictureService.getMangaPictureByIdCapCover(mangaPictureId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}