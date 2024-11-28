import { AppDataSource } from "../config/data-source"
import { Servico } from "../entity/service-model"

// Função para cadastrar serviço
export const createServiceService = async (nome: string, preco: string, descricao: string, empresa_id) => {
    try {
        const serviceRepository = AppDataSource.getRepository(Servico)
        const newService = serviceRepository.create({
            nome,
            preco,
            descricao,
            empresa_id,
            created_at: new Date(),
        });
        await serviceRepository.save(newService);

        return newService;
    }catch (error) {
        console.log("Error creating service", error);
    }
};

// Função para listar serviço por ID
export const readServiceService = async (id: number) => {
    try {
        const serviceRepository = AppDataSource.getRepository(Servico);
        const service = await serviceRepository.findOne({
            where: {
                id,
            }
        });

        if (!service) {
            throw new Error("Service not found");
        }

        return service;
    }catch (error) {
        console.log("Error retrieving service", error);
    }
};

export const getAllServiceService = async (empresa_id: number) => {
    try {
        const serviceRepository = AppDataSource.getRepository(Servico);
        const services = await serviceRepository.find({
            where: {
                empresa_id,
            }
        });

        return services
    }catch (error) {
        console.log("Error listing all services", error);
    }
};

// Função para atualizar serviço
export const updatedServiceService = async (id: number, updatedService: Partial<Servico>) => {
    try {
        const serviceRepository = AppDataSource.getRepository(Servico);
        const service = await serviceRepository.findOne({
            where: {
                id,
            }
        });

        if (!service) {
            throw new Error("Service not found")
        }

        const updated = await serviceRepository.save({
            ...service,
            ...updatedService,
        })
        
        return updated;
    }catch (error) {
        console.log("Error updating service", error)
    }
}

// Função para deletar serviço
export const deleteServiceService = async (id: number) => {
    try {
        const serviceRepository = AppDataSource.getRepository(Servico);
        const service = await serviceRepository.findOne({
            where: {
                id,
            }
        })

        if (!service) {
            throw new Error("Service not found");
        }

        await serviceRepository.remove(service);
        return service
        
    }catch (error) {
        console.log("Error deleting service", error)
    }
}