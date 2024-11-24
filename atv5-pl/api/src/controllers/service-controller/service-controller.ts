import { error } from "console";
import { RequestHandler } from "express";
import { createServiceService, deleteServiceService, getAllServiceService, readServiceService, updatedServiceService } from "services/service-service/service-service";

export const createServiceController: RequestHandler = async (req, res): Promise<void> => {
    try {
        const { nome, preco, descricao , empresa_id} = req.body;
        const newService = await createServiceService(
            nome,
            preco,
            descricao,
            empresa_id
        );
        res.status(201).json(newService);
    }catch (error: any) {
        res.status(500).json({ error:  error.message });
    }
};

export const readServiceController: RequestHandler = async (req, res): Promise<void> => {
    try {
        const { id } = req.params;
        const service = await readServiceService(Number(id));

        if (!service) {
            res.status(404).json({ error: "Product not found" })
        }
        res.status(200).json(service);
    }catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

export const getAllServiceController: RequestHandler = async (req, res): Promise<void> => {
    try {
        const { empresa_id } = req.params;
        const services = await getAllServiceService(Number(empresa_id));
        res.status(200).json(services);
    }catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

export const updatedServiceController: RequestHandler = async  (req, res): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedService = await updatedServiceService(Number(id), updatedData);
        
        if (!updatedService) {
            res.status(404).json({ error: "Serivce not found" })
        }
        res.status(200).json(updatedService);
    }catch (error: any) {
        res.status(500).json({ errr: error.message })
    }
}

export const deleteServiceController: RequestHandler = async (req, res): Promise<void> => {
    try {
        const { id } = req.params;
        const result = await deleteServiceService(Number(id));
        if(!result) {
            res.status(404).json({ error: "Service not found" });
        }
        res.status(200).json({ message: "Service removed successfully" })
    }catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

