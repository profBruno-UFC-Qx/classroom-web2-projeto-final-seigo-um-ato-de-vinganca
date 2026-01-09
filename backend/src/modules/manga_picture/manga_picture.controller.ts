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
      const mangaPicture_id = parseInt(req.params.id, 10);
      const result = await mangaPictureService.getMangaPictureByIdCapCover(mangaPicture_id);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  async deleteMangaPicture(req: Request, res: Response) {
    try {
      const mangaPicture_id = parseInt(req.params.mangaPicture_id, 10);
      await mangaPictureService.deleteMangaPicture(mangaPicture_id);
      return res.status(200).json({ success: true, message: "Manga Picture excluída com sucesso." });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}