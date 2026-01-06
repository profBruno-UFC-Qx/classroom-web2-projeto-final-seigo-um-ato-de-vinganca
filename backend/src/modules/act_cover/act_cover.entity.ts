import { Entity, PrimaryGeneratedColumn, Column, } from "typeorm";

@Entity("act_cover")
export class ActCover {
    @PrimaryGeneratedColumn()
    id!: number; // i want this to be auto incrementing

    // @Column()
    // idCapCover!: number;

    @Column()
    actCover!: string;
    
    @Column()
    actDetails!: string;

    @Column()
    isReady!: boolean;

    // @Column()
    // capCovers!: number; //relationship to cap_covers

    @Column()
    actNumber!: number;
}