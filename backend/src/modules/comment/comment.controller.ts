import { Request, Response } from 'express';
import { CommentService } from "./comment.service";

const commentService = new CommentService();

export class CommentController {
    async createComment(req: Request, res: Response) {
        try {
            const CommentData = {
                ...req.body,
                user: { user_id : req.body.userId}
            }
            const result = await commentService.createComment(CommentData);
            return res.status(201).json(result);
        } catch (error: any) {
            return res.status(400).json({success: false, message: error.message});
        }
    }

    async updateComment(req: Request, res: Response) {
        try {
            const CommentData = {
                ...req.body,
                user: { user_id : req.body.userId}
            }
            const comment_id = parseInt(req.params.id, 10)
            const result = await commentService.updateComment(comment_id, CommentData);
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
            const id = Number(req.params.id);
            const result = await commentService.deleteComment(id);
            return res.status(200).json(result);
            return res.status(200).json({ success: true, message: `Comment with ID ${id} deleted.` });
        } catch (error: any) {
            return res.status(400).json({success: false, message: error.message});
        }
    }
}