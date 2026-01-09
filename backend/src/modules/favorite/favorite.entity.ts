import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { User } from "../users/user.entity";
import { CapCover } from "../cap_cover/cap_cover.entity";

@Entity("favorites")
export class Favorite {
  @PrimaryGeneratedColumn()
  favorite_id!: number;

  @Column()
  isFavorite!: boolean;
  
  //Relacoes 
  @ManyToOne(() => User, (user) => user.user_id, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => CapCover, (capCover) => capCover.capCover_id, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "capCover_id" })
  capCover!: CapCover;

}