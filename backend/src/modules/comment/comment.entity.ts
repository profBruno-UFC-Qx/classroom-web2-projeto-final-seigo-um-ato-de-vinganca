import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("comments")
export class Comment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userId!: number;

    @Column()
    text!: string;

    @Column()
    idCapCover!: number;
}