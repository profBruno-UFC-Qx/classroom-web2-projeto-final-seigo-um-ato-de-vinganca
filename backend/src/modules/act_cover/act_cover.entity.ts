import { Entity, PrimaryGeneratedColumn, Column, OneToMany, } from "typeorm";
import { CapCover } from "../cap_cover/cap_cover.entity";

@Entity("act_cover")
export class ActCover {
    @PrimaryGeneratedColumn()
    actCover_id!: number;

    @Column()
    actCoverPicture!: string;
    
    @Column()
    actDetails!: string;

    @Column()
    isReady!: boolean;

    @Column()
    actNumber!: number;

    // RELACOES
    @OneToMany(() => CapCover, (capCover) => capCover.capCover_id)
    capCovers!: CapCover[];
}