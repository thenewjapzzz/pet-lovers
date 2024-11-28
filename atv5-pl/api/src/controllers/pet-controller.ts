import { RequestHandler } from "express";
import { createPetService, deletePetService, getAllPetsByClientService, readPetServie, updatePetService } from "../services/pet-service";

export const createPetContoller: RequestHandler = async (req, res): Promise<void> => {
    try {
        const { cpf, nome, tipo, raca, genero} = req.body;

        if (!cpf || !nome || !tipo || !raca || !genero) {
            res.status(400).json({ error: "Missing required fields" })
            return
        }

        const newPet = await createPetService(
            cpf,
            nome,
            tipo,
            raca,
            genero
        )
        res.status(201).json(newPet)
    }catch (error: any) {
        res.status(500).json( {error: error.message })
    }
}

export const readPetController: RequestHandler = async (req, res): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ error: "Pet ID is required" });
            return;
        }

        const pet = await readPetServie(Number(id));
        res.status(201).json(pet)
    }catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

export const getAllPetsByClientController:  RequestHandler = async (req, res): Promise<void> => {
    try {
        const { clientId } = req.params;
        const pets = await getAllPetsByClientService(Number(clientId));
        res.status(201).json(pets);
    }catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const updatePetController: RequestHandler = async (req, res): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedPet = await updatePetService(Number(id), updatedData);
        if(!updatedPet) {
            res.status(404).json({ error: "Pet not found" });
        }
        res.status(201).json(updatedPet);
    }catch (error: any) {
        res.status(500).json({ erro: error.message })
    }
}

export const deletePetController: RequestHandler = async (req, res): Promise<void> => {
    try {
        const { id } = req.params;
        const result = await deletePetService(Number(id));
        if(!result) {
            res.status(404).json({ error: "Pet not found" })
        }
        res.status(201).json({ message: "Pet removed successfully" })
    }catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

