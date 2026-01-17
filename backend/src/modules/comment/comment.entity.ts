import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../users/user.entity";
import { CapCover } from "../cap_cover/cap_cover.entity";

@Entity("comments")
export class Comment {
    @PrimaryGeneratedColumn()
    comment_id!: number;
    
    @Column()
    text!: string;
    
    // Relacoes 
    @ManyToOne(() => User, (user) => user.comments, {
        nullable: false,
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "user_id" })
    user!: User;

    @ManyToOne(() => CapCover, (capCover) => capCover.comments, {
        nullable: false,
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "capCover_id" })
    capCover!: CapCover;
}