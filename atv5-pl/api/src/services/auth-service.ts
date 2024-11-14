import { AppDataSource } from "../config/data-source"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Empresa } from "../entity/company-model"

export const auth = async (email: string, password: string) => {
    const empresaRepository = AppDataSource.getRepository(Empresa)
    const empresa = await empresaRepository.findOneBy({ email })

    if (!empresa) {
        throw new Error('Invalid CNPJ or password');
    }

    const isPasswordValid = await bcrypt.compare(password, empresa.password);
    if (!isPasswordValid) {
        throw new Error('Invalid CNPJ or password');
    }

    const token = jwt.sign({ id: empresa.id, cnpj: empresa.email}, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
    });

    return token
}