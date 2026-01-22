import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, ManyToOne, JoinColumn, Unique } from "typeorm";
import { Nota } from "../notas/notas.entity";
import { Favorite } from "../favorite/favorite.entity";
import { Comment } from "../comment/comment.entity";
import { ActCover } from "../act_cover/act_cover.entity";
import { MangaPicture } from "../manga_picture/manga_picture.entity";

@Entity("cap_covers")
@Unique(["capCoverNumber", "actCover"])
export class CapCover {
  @PrimaryGeneratedColumn()
  capCover_id!: number;

  @Column()
  capCoverTitle!: string;
  
  @Column()
  capCoverNumber!: number;

  @Column()
  description?: string;

  @Column()
  capCoverPicture?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // RELACOES

  @OneToMany(() => Nota, (nota) => nota.capCover)
  notas!: Nota[];

  @OneToMany(() => Comment, (comment) => comment.capCover)
  comments!: Comment[];

  @OneToMany(() => Favorite, (favorite) => favorite.capCover)
  favorite!: Favorite[];

  @ManyToOne(() => ActCover, (actCover) => actCover.capCovers, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "actCover_id" })
  actCover!: ActCover;

  @OneToOne(() => MangaPicture, (mangaPicture) => mangaPicture.capCover, {onDelete: "CASCADE"})
  mangaPictures!: MangaPicture;
  
}