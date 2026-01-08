import {CommentRepository} from './comment.repository';
import {Comment} from './comment.entity';

export class CommentService {
    private CommentRepository: CommentRepository;

    constructor() {
        this.CommentRepository = new CommentRepository();
    }

    async createComment(CommentData: Partial<Comment>): Promise<Comment> {
        return await this.CommentRepository.create(CommentData);
    }

    async updateComment(CommentId: number, CommentData: Partial<Comment>): Promise<Comment> {
        const existingComment = await this.CommentRepository.findById(CommentId);

        if (!existingComment) {
            throw new Error('Commentário não encontrado.');
        }

        const updatedComment = {
            ...existingComment,
            ...CommentData,
        };

        return await this.CommentRepository.update(updatedComment);
    }

    async getCommentsByIdCapCover(idCapCover: number): Promise<Comment[]> {
        return await this.CommentRepository.findByIdCapCover(idCapCover);
    }

    async deleteComment(CommentId: number): Promise<{ success: boolean; message: string }> {
        const existingComment = await this.CommentRepository.findById(CommentId);

        if (!existingComment) {
            throw new Error('Comentário não encontrado.');
        }

        await this.CommentRepository.delete(CommentId);
        return { success: true, message: `Comentário com ID ${CommentId} deletado.` };
    }
}