import { Router } from 'express';
import { CommentController } from './comment.controller';
import { authMiddleware } from '../../shared/middlewares/auth.middleware';
import { validate } from '../../shared/middlewares/validate';
import { commentCreateSchema, commentUpdateSchema } from './comment.schema';

const router = Router();
const commentController = new CommentController();

router.post('/comments', validate(commentCreateSchema), commentController.createComment);
router.put('/comments/:id', validate(commentUpdateSchema), commentController.updateComment);
router.get('/comments/:idCapCover', commentController.getCommentsByIdCapCover);
router.delete('/comments', commentController.deleteComment);

export { router as CommentRoutes };

