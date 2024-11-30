import { RequestHandler } from "express";
import { createOrderService, getOrdersByEmpresaService, getTopClientsService } from "../services/order-service";

export const createOrderController: RequestHandler = async (req, res): Promise<void> => {
    try {
        const { cpf, items, empresa_id } = req.body;

        if (!cpf || !items || !Array.isArray(items) || !empresa_id) {
            res.status(400).json({ message: "Invalid input data" });
        }

        const result = await createOrderService(cpf, items, empresa_id);

        if (!result) {
            res.status(500).json({ message: "Failed to create order" });
        }

        res.status(201).json({ message: "Order created successfully", data: result });
    } catch (error) {
        console.log("Error in createOrderController", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getOrdersByEmpresaController: RequestHandler = async (req, res): Promise<void> => {
    try {
        const { empresa_id } = req.params;

        if (!empresa_id) {
            res.status(400).json({ message: "Missing empresa_id parameter" });
            return;
        }

        const empresaIdNumber = parseInt(empresa_id, 10);

        if (isNaN(empresaIdNumber)) {
            res.status(400).json({ message: "Invalid empresa_id, must be a number" });
            return;
        }

        const orders = await getOrdersByEmpresaService(empresaIdNumber);

        if (!orders || orders.length === 0) {
            res.status(404).json({ message: "No orders found for the specified empresa_id" });
            return;
        }

        res.status(200).json({ message: "Orders retrieved successfully", data: orders });
    } catch (error) {
        console.log("Error in getOrdersByEmpresaController", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getTopClientsController: RequestHandler = async (req, res): Promise<void> => {
    try {
        // Extract empresa_id from query parameters
        const { empresa_id } = req.query;

        if (!empresa_id) {
            res.status(400).json({ message: 'empresa_id is required' });
        }

        const result = await getTopClientsService(Number(empresa_id));

        if (!result) {
            res.status(500).json({ message: "Error to fetch top clients" });
        }

        // Return success response
        res.status(200).json({ message: "Top clients fetched successfully", data: result });
    } catch (error) {
        console.log("Error in getTopClientsController", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};