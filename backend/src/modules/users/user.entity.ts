import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Nota } from "../notas/notas.entity";
import { Favorite } from "../favorite/favorite.entity";
import { Comment } from "../comment/comment.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column()
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column()
  role!: string;

  @Column({ default: true })
  confirmed!: boolean;

  @Column({ default: false })
  blocked!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
  
  // Relacoes

  @OneToMany(() => Nota, (nota) => nota.user)
  notas!: Nota[];

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites!: Favorite[];

  @OneToMany(() => Comment, (comment) => comment.user_id)
  comments!: Comment[];
}