import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("notas")
export class Nota {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  idCapCover!: number;

  @Column()
  nota!: number;
  
}