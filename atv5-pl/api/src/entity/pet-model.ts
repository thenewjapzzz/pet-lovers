import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Cliente } from "./client-model";

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.id)
  @JoinColumn({ name: "cliente_id" })
  cliente_id!: number;

  @Column({ type: "varchar", length: 255 })
  nome: string;

  @Column({ type: "varchar", length: 50 })
  tipo: string;

  @Column({ type: "varchar", length: 50 })
  raca: string;

  @Column({ type: "varchar", length: 10 })
  genero: string;
}
