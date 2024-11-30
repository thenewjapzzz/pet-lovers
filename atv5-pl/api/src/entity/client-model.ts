import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Empresa } from "./company-model";

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Empresa, (empresa) => empresa.id)
  @JoinColumn({ name: "empresa_id" })
  empresa_id!: number;

  @Column({ type: "varchar", length: 255 })
  nome: string;

  @Column({ type: "varchar", length: 255 })
  nomeSocial: string;

  @Column({ type: "varchar", length: 20, unique: true })
  rg: string;

  @Column({ type: "varchar", length: 255, unique: true })
  cpf: string;

  @Column({ type: "timestamp" })
  dataCadastro: Date;

  @Column({ type: "varchar", length: 20 })
  telefone: string;
}
