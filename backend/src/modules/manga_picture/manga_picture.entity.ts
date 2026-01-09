import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { CapCover } from "../cap_cover/cap_cover.entity";


@Entity("manga_pictures")
export class MangaPicture {

  @PrimaryGeneratedColumn()
  mangaPicture_id!: number;

  @Column("simple-array")
  pictures!: string[];
  
  //Relacoes
  @OneToOne(() => CapCover, (capCover) => capCover.capCover_id, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "capCover_id" })
  capCover!: CapCover;
}