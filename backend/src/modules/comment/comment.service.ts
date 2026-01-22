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

    async updateComment(comment_id: number, CommentData: Partial<Comment>): Promise<Comment> { 
        const existingComment = await this.CommentRepository.findById(comment_id);

        if (!existingComment) {
            throw new Error('Commentário não encontrado.');
        }
        // DPS TBM CHECAR SE FOR DIFERENTE DE ADMIN
        if (existingComment.user.user_id !== CommentData.user?.user_id){
            throw new Error('Você não é o criador deste comentário!')
        }

        const updatedComment = {
            ...existingComment,
            ...CommentData,
        };

        return await this.CommentRepository.update(updatedComment);
    }

    async getCommentsByIdCapCover(capCover_id: number): Promise<Comment[]> {
        return await this.CommentRepository.findByIdCapCover(capCover_id);
    }

    async deleteComment(comment_id: number): Promise<{ success: boolean; message: string }> {
        const existingComment = await this.CommentRepository.findById(comment_id);

        if (!existingComment) {
            throw new Error('Comentário não encontrado.');
        }

        await this.CommentRepository.delete(comment_id);
        return { success: true, message: `Comentário com ID ${comment_id} deletado.` };
    }
}