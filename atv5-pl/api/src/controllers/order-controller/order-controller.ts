import { RequestHandler } from "express";
import { createOrderService, getTopClientsService } from "services/order-service/order-service";

export const createOrderController: RequestHandler = async (req, res): Promise<void> => {
    try {
        const { cpf, items } = req.body;

        if (!cpf || !items || !Array.isArray(items)) {
            res.status(404).json({ message: "Invalid input data" })
        }

        const result = await createOrderService(cpf, items);

        if (!result) {
            res.status(500).json({ meesage: "Failed to create order" })
        }

        res.status(201).json({ message: "Order created successfully", data: result })
    }catch (error) {
        console.log("Error in createOrderController", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getTopClientsController: RequestHandler = async (req, res): Promise<void> => {
    try {
        const result = getTopClientsService()

        if (!result) {
            res.status(500).json({ message: "Error to fetch top clients" })
        }

        res.status(201).json({ message: "Top clients fetch successfully", data: result })
    }catch (error) {
        console.log("Error in getTopClientsController", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}