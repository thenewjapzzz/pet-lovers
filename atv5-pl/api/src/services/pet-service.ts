import { AppDataSource } from "../config/data-source"
import { Cliente } from "../entity/client-model"
import { Pet } from "../entity/pet-model";

// Função para cadastrar um pet vinculado a um cliente por CPF
export const createPetService = async (cpf: string, nome: string, tipo: string, raca: string, genero: string) => {
    try {
        const clientRepository = AppDataSource.getRepository(Cliente);
        const petRepository = AppDataSource.getRepository(Pet)

        const client = await clientRepository.findOne({
            where: {
                cpf,
            }
        })
        if (!client) {
            throw new Error("Client not found")
        }

        const newPet = petRepository.create({
            cliente: client,
            nome,
            tipo,
            raca,
            genero,
        });
        await petRepository.save(newPet)
        return newPet;
    }catch (error) {
        console.log("Error in creating pet", error)
    }
}

// Função para listar um pet por ID
export const readPetServie = async (id: number) => {
    try {
        const petRepository = AppDataSource.getRepository(Pet);
        const pet = await petRepository.findOne({
            where: {
                id,
            },
            relations: [
                "client_id" // Relacionando com o ID do cliente
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

// Função para listar todos os pets de um client
export const getAllPetsByClientService = async (clientId: number) => {
    try {
        const petRepository = AppDataSource.getRepository(Pet);
        
        // Corrigido: usando 'cliente' na cláusula WHERE
        const pets = await petRepository.find({
            where: {
                cliente: { id: clientId },  
            },
            relations: ["cliente"], // Relacionando o cliente completo ao pet
        });

        // Mapeando os pets para adicionar o nome do cliente
        return pets.map(pet => ({
            ...pet,
            cliente_nome: pet.cliente ? pet.cliente.nome : "Desconhecido"
        }));
    } catch (error) {
        console.log("Error listing all pets for client", error);
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
