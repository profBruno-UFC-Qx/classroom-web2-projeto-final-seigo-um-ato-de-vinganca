import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../users/user.entity";
import { CapCover } from "../cap_cover/cap_cover.entity";

@Entity("notas")
export class Nota {
  @PrimaryGeneratedColumn()
  nota_id!: number;

  @Column()
  nota!: number;
  
  //Relacoes
  @ManyToOne(() => User, (user) => user.user_id)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => CapCover, (capCover) => capCover.capCover_id)
  @JoinColumn({ name: "capCover_id" })
  capCover!: CapCover;
  user_id: any;
  
}