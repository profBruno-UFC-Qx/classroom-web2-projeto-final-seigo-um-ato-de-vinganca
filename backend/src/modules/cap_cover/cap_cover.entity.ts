import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { Nota } from "../notas/notas.entity";
import { Favorite } from "../favorite/favorite.entity";
import { Comment } from "../comment/comment.entity";
import { ActCover } from "../act_cover/act_cover.entity";
import { MangaPicture } from "../manga_picture/manga_picture.entity";

@Entity("cap_covers")
export class CapCover {
  @PrimaryGeneratedColumn()
  capCover_id!: number;

  @Column()
  capCover!: string;
  
  @Column()
  capCoverNumber!: number;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  coverUrl?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // RELACOES

  @OneToMany(() => Nota, (nota) => nota.nota_id)
  notas!: Nota[];

  @OneToMany(() => Comment, (comment) => comment.comment_id)
  comments!: Comment[];

  @OneToMany(() => Favorite, (favorite) => favorite.favorite_id)
  favorite!: Favorite[];

  @ManyToOne(() => ActCover, (actCover) => actCover.actCover_id, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "actCover_id" })
  actCover!: ActCover;

  @OneToOne(() => MangaPicture, (mangaPicture) => mangaPicture.mangaPicture_id)
  mangaPictures!: MangaPicture;
  
}