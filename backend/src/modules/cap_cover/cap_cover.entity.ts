import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

@Entity("CapCovers")
export class CapCover {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  capCover!: string;

  @Column({ unique: true })
  idCapCover!: number;

  @Column({ nullable: true, type: "text" })
  description?: string;

  @Column({ nullable: true })
  coverUrl?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // RELACOES ...

}