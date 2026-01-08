import { Request, Response } from 'express';
import { CommentService } from "./comment.service";

const commentService = new CommentService();

export class CommentController {
    async createComment(req: Request, res: Response) {
        try {
            const CommentData = req.body;
            const result = await commentService.createComment(CommentData);
            return res.status(201).json(result);
        } catch (error: any) {
            return res.status(400).json({success: false, message: error.message});
        }
    }

    async updateComment(req: Request, res: Response) {
        try {
            const CommentData = req.body;
            const CommentId = CommentData.id;
            const result = await commentService.updateComment(CommentId, CommentData);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({success: false, message: error.message});
        }
    }

    async getCommentsByIdCapCover(req: Request, res: Response) {
        try {
            const idCapCover = parseInt(req.params.idCapCover as string, 10);
            const result = await commentService.getCommentsByIdCapCover(idCapCover);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({success: false, message: error.message});
        }
    }

    async deleteComment(req: Request, res: Response) {
        try {
            const { id } = req.body;
            const result = await commentService.deleteComment(id);
            return res.status(200).json(result);
            return res.status(200).json({ success: true, message: `Comment with ID ${id} deleted.` });
        } catch (error: any) {
            return res.status(400).json({success: false, message: error.message});
        }
    }
}