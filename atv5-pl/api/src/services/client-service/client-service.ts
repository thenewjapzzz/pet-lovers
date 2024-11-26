import { Cliente } from "../../entity/client-model"
import { AppDataSource } from "../../config/data-source";

// Função para cadastrar cliente
export const createClientService = async (nome: string, nomeSocial: string, cpf: string, rg: string, telefone: string, empresa_id: number) => {
    try {
        const clientRepository = AppDataSource.getRepository(Cliente)
        const newCliente = clientRepository.create({
            nome,
            nomeSocial,
            cpf,
            rg,
            telefone,
            empresa_id,
            dataCadastro: new Date(),
        });
        await clientRepository.save(newCliente);
        return newCliente
    }catch (error) {
        console.log("Error creating client", error);
    }
}

// Função para listar cliente por ID
export const readClientService = async (id: number) => {
    try {
        const clientRepository = AppDataSource.getRepository(Cliente)
        const client = await clientRepository.findOne({
            where: {
                id: id
            }
        })

        if (!client) {
            throw new Error("Client not found")
        }
        return client
    }catch (error) {
        console.log("Error is list client", error)
    }
} 

// Função para listar todos os clientes de uma empresa
export const getAllClientService = async(empresa_id: number) => {
    try {
        const clientRepository = AppDataSource.getRepository(Cliente);
        const clients = await clientRepository.find({
            where: {
                empresa_id
            },
        });

        return clients;
    }catch (error) {
        console.log("Error listing all clients", error);
    }
};

// Função para atualiar cliente
export const updateClientService = async (id: number, updatedData: Partial<Cliente>) => {
    try {
        const clientRepository = AppDataSource.getRepository(Cliente);
        const client = await clientRepository.findOne({
            where: {
                id,
            }
        });

        if (!client) {
            throw new Error("Client not found");
        }

        const updatedClient = await clientRepository.save({
            ...client,
            ...updatedData,
        });

        return updatedClient;
    }catch (error) {
        console.log("Error updating client", error);
    }
};

// Função para deletar cliente
export const deleteClientService = async (id: number) => {
    try {
        const clientRepository = AppDataSource.getRepository(Cliente);
        const client = await clientRepository.findOne({
            where: {
                id,
            }
        });

        if (!client) {
            throw new Error("Client not found");
        }

        await clientRepository.remove(client);

        return({ message: "Client deleted successfully" })
    }catch (error) {
        console.log("Error deleting client", error)
    }
}
