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

    async findById(CommentId: number): Promise<Comment | null> {
        console.log("Finding Comment by ID:", CommentId);
        return await this.repo.findOne({ where: { id: CommentId } });
    }

    async delete(CommentId: number): Promise<void> {
        await this.repo.delete(CommentId);
    }

    async update(Comment: Comment): Promise<Comment> {
        return await this.repo.save(Comment);
    }

    async findByIdCapCover(idCapCover: number): Promise<Comment[]> {
        return await this.repo.find({ where: { idCapCover } });
    }
}