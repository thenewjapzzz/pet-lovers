import { Empresa } from "../entity/company-model";
import { AppDataSource } from "../config/data-source"
import { Cliente } from "../entity/client-model"
import { Pet } from "../entity/pet-model";

// Função para cadastrar um pet vinculado a um cliente por CPF
export const createPetService = async (
    cpf: string,
    nome: string,
    tipo: string,
    raca: string,
    genero: string,
    empresa_id: number
) => {
    try {
        const clientRepository = AppDataSource.getRepository(Cliente);
        const petRepository = AppDataSource.getRepository(Pet);
        const empresaRepository = AppDataSource.getRepository(Empresa);

        const client = await clientRepository.findOne({
            where: {
                cpf,
            },
        });
        if (!client) {
            throw new Error("Client not found");
        }

        const empresa = await empresaRepository.findOne({
            where: {
                id: empresa_id, 
            },
        });
        if (!empresa) {
            throw new Error("Company not found");
        }

        const newPet = petRepository.create({
            cliente: client,
            nome,
            tipo,
            raca,
            genero,
            empresa, 
        });

        await petRepository.save(newPet);

        return {
            newPet,
            clientCpf: client.cpf,
        }
    } catch (error) {
        console.error("Error in creating pet:", error);
        throw new Error("Error creating pet");
    }
};

// Função para listar um pet por ID
export const readPetServie = async (id: number) => {
    try {
        const petRepository = AppDataSource.getRepository(Pet);
        const pet = await petRepository.findOne({
            where: {
                id,
            },
            relations: [
                "client_id" 
            ]
        })
        if (!pet) {
            throw new Error("Pet not found")
        }

        return pet
    }catch (error) {
        console.log("Error in retrieving pet", error)
    }
}

export const getAllPetsByCompanyService = async (empresaId: number) => {
    try {
        const petRepository = AppDataSource.getRepository(Pet);

        const pets = await petRepository.find({
            where: {
                empresa: { id: empresaId }, 
            },
            relations: ["cliente", "empresa"], 
        });

        return pets.map(pet => ({
            ...pet,
            cliente_nome: pet.cliente ? pet.cliente.nome : "Desconhecido", 
            cliente_cpf: pet.cliente ? pet.cliente.cpf : "Desconhecido",
            empresa_nome: pet.empresa ? pet.empresa.nome : "Desconhecido", 
        }));
    } catch (error) {
        console.error("Error fetching pets for company", error);
        throw new Error("Error fetching pets for company");
    }
}

// Função para atualizar pet
export const updatePetService = async (id: number, updatedData: Partial<Pet>) => {
    try {
        const petRepository = AppDataSource.getRepository(Pet);
        const pet = petRepository.findOne({
            where: {
                id,
            }
        })
        if(!pet) {
            throw new Error("Pet not found");
        }

        const updated = await petRepository.save({
            ...pet,
            ...updatedData,
        })

        return updated
    }catch (error) {
        console.log("Error in updating pet", error)
    }
}

// Função para deletar pet
export const deletePetService = async (id: number) => {
    try {

        const petRepository = AppDataSource.getRepository(Pet);
        const pet = await petRepository.findOne({
            where: {
                id,
            }
        });

        if (!pet) {
            throw new Error("Pet not found");
        }

        await petRepository.remove(pet)

        return({ message: "Pet deleted successfully" })
    }catch (error) {
        console.log("Error deleting pet", error)
    }
}
