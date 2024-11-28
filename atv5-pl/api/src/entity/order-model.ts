import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from './client-model';
import { Empresa } from './company-model';

@Entity()
export class Pedido {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Cliente, (cliente) => cliente.id)
    @JoinColumn({ name: "cliente_id" })
    cliente: Cliente;

    @ManyToOne(() => Empresa, (empresa) => empresa.id)
    @JoinColumn({ name: "empresa_id" })
    empresa: Empresa;

    @Column({ type: 'varchar', length: 50 })
    tipo: string;

    @Column({ type: 'integer' })
    item_id: number;

    @Column({ type: 'integer', nullable: true })
    quantidade: number | null;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    preco: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    total: number | null;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({ type: 'integer', nullable: true })
    empresa_id: number | null;
}
