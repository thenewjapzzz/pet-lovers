import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Empresa } from "../entity/company-model";



@Entity()
export class Servico {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Empresa, (empresa) => empresa.id)
  @JoinColumn({ name: "empresa_id" })
  empresa_id!: number;

  @Column({ type: "varchar", length: 255 })
  nome: string;

  @Column({ type: 'varchar', length: 255 }) 
  preco: string

  @Column({ type: "text" })
  descricao: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
}
