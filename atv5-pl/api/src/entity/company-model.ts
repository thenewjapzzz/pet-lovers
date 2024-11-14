import 'reflect-metadata'
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm"
import bcrypt from 'bcrypt'

@Entity()
export class Empresa {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 255 })
    nome: string

    @Column({ type: 'varchar', length: 14, unique: true })
    CNPJ: string

    @Column({ type: 'varchar', length: 255, unique: true})
    email: string

    @Column({ type: 'varchar', length: 255 })
    password: string

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 8)
        }
    }
}