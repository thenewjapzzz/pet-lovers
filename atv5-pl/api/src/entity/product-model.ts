import 'reflect-metadata'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Empresa } from './company-model'

@Entity()
export class Produto {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Empresa, (empresa) => empresa.id)
    @JoinColumn({ name: 'empresa_id' })
    empresa_id!:number

    @Column({ type: 'varchar', length: 255 })
    nome: string

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    preco: number

    @Column({ type: 'text' })
    descricao: string

    @Column({ type: 'integer' })
    estoque: number

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    created_at: Date
}