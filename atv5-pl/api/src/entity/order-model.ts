import 'reflect-metadata'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Cliente } from './client-model'

@Entity()
export class Pedido {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Cliente, (empresa) => empresa.id)
    @JoinColumn({ name: "cliente_id "})
    cliente_id!: number

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    created_at: Date

    @Column({ type: "decimal", precision: 10, scale: 2 })
    total: number
}