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
    @ManyToOne(() => User, (user) => user.user_id, {
        nullable: false,
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "user_id" })
    user!: User;

    @ManyToOne(() => CapCover, (capCover) => capCover.capCover_id, {
        nullable: false,
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "capCover_id" })
    capCover!: CapCover;
  user_id: any;
}