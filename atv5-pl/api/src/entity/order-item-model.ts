import 'reflect-metadata'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Pedido } from './order-model'

@Entity()
export class ItensPedido {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Pedido, (pedido) => pedido.id)
    @JoinColumn({ name: "pedido_id" })
    pedido_id!: number

    @Column({ type: 'varchar', length: 50 })
    tipo: string

    @Column({ type: 'integer' })
    item_id: number

    @Column({ type: 'integer' })
    quantidade: number

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    preco: number
}