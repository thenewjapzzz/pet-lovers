import { AppDataSource } from "config/data-source"
import { Produto } from "entity/product-model"

// Função para cadastrar produto
export const createProductService = async (nome: string, preco: number, descricao: string, estoque: number, empresa_id: number) => {
    try {
        const productRepository = AppDataSource.getRepository(Produto)
        const newProduct = productRepository.create({
            nome,
            preco,
            descricao,
            estoque,
            empresa_id,
            created_at: new Date(),
        });
        await productRepository.save(newProduct);

        return newProduct;
    }catch (error) {
        console.log("Error creating product", error);
    }
};

// Função para listar produto por ID
export const readProductService = async (id: number) => {
    try {
        const productRepository = AppDataSource.getRepository(Produto);
        const product = await productRepository.findOne({
            where: {
                id,
            }
        });

        if (!product) {
            throw new Error("Product not found");
        }

        return product;
    }catch (error) {
        console.log("Error retrieving product", error);
    }
};

// Função para listar todos os produtos de uma empresa
export const getAllProductService = async (empresa_id: number) => {
    try {
        const productRepository = AppDataSource.getRepository(Produto);
        const products = await productRepository.find({
            where: {
                empresa_id,
            }
        });

        return products;
    }catch (error) {
        console.log("Error listing all products", error);
    }
};

// Função para atualizar produto
export const updatedProductService = async (id: number, updatedProduct: Partial<Produto>) => {
    try {
        const productRepository = AppDataSource.getRepository(Produto);
        const product = await productRepository.findOne({
            where: {
                id,
            }
        });

        if (!product) {
            throw new Error("Product not found");
        }

        const updated = await productRepository.save({
            ...product,
            ...updatedProduct
        });

        return updated;
    } catch (error) {
        console.log("Error updating product", error);
    }
}

// Função para deletar produto
export const deleteProductService = async (id: number) => {
    try {
        const productRepository = AppDataSource.getRepository(Produto);
        const product = await productRepository.findOne({
            where: {
                id,
            }
        })

        if (!product) {
            throw new Error("Product not found");
        }

        await productRepository.remove(product);

        return ({ message: "Product deleted successfully" });
    }catch (error) {
        console.log("Error deleting product", error)
    }
}
