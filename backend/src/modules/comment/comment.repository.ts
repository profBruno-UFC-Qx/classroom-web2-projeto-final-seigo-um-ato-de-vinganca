import { AppDataSource } from '../../config/data-source';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';

export class CommentRepository {
    private repo: Repository<Comment>;

    constructor() {
        this.repo = AppDataSource.getRepository(Comment);
    }

    async create(CommentData: Partial<Comment>): Promise<Comment> {
        const Comment = this.repo.create(CommentData);
        return await this.repo.save(Comment);
    }

    async findById(comment_id: number): Promise<Comment | null> {
        return await this.repo.findOne({ where: { comment_id }, relations: ["user"], });
    }

    async delete(comment_id: number): Promise<void> {
        await this.repo.delete(comment_id);
    }

    async update(Comment: Comment): Promise<Comment> {
        return await this.repo.save(Comment);
    }

    async findByIdCapCover(capCover_id: number): Promise<Comment[]> {
        return await this.repo.find({ where: { capCover: { capCover_id } } });
    }
}