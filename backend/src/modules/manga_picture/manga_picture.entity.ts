import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity("manga_pictures")
export class MangaPicture {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  idCapCover!: number;

  @Column("simple-array")
  pictures!: string[];
}