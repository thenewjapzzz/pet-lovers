import { RequestHandler } from "express"
import { createProductService, deleteProductService, getAllProductService, readProductService, updatedProductService } from "../services/product-service";

export const createProductController: RequestHandler = async (req, res): Promise<void> => {
    try {
        const { nome, preco, descricao, estoque, empresa_id} = req.body;
        const newProduct = await createProductService(
            nome,
            preco,
            descricao,
            estoque,
            empresa_id
        );
        res.status(201).json(newProduct);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const readProductController: RequestHandler = async (req, res): Promise<void> => {
    try {
        const { id } = req.params;
        const product = await readProductService(Number(id));

        if(!product) {
            res.status(404).json({ error: "Product not found"})
        }
        res.status(200).json(product);
    }catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

export const getAllProductController: RequestHandler = async (req, res): Promise<void> => {
    try {
        const { empresa_id } = req.params;
        const products = await getAllProductService(Number(empresa_id));
        res.status(200).json(products);
    }catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProductController: RequestHandler = async (req, res): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedProduct = await updatedProductService(Number(id), updatedData);
        
        if (!updatedProduct) {
            res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(updatedProduct);
    }catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

export const deleteProductController: RequestHandler = async (req, res): Promise<void> => {
    try {
        const { id } = req.params;
        const result = await deleteProductService(Number(id));
        if (!result) {
            res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({ message: "Product removed successfully" });
    }catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}
