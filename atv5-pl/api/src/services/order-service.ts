import { Produto } from "../entity/product-model";
import { AppDataSource } from "../config/data-source";
import { Cliente } from "../entity/client-model";
import { Pedido } from "../entity/order-model";
import { Empresa } from "../entity/company-model";

// Função para criar pedido
export const createOrderService = async (
    cpf: string, 
    items: { tipo: string; item_id: number; quantidade: number; preco: string | number }[], 
    empresa_id: number
) => {
    try {
        const clientRepository = AppDataSource.getRepository(Cliente);
        const orderRepository = AppDataSource.getRepository(Pedido);
        const productRepository = AppDataSource.getRepository(Produto);
        const empresaRepository = AppDataSource.getRepository(Empresa); 

        const client = await clientRepository.findOne({
            where: { cpf }
        });

        if (!client) {
            throw new Error("Client not found");
        }

        const empresa = await empresaRepository.findOne({
            where: { id: empresa_id }
        });

        if (!empresa) {
            throw new Error("Empresa not found");
        }

        let total = 0;
        for (const item of items) {
            let preco: number;
            if (item.tipo === 'produto') {
                const product = await productRepository.findOne({
                    where: { id: item.item_id }
                });

                if (!product) {
                    throw new Error(`Produto com ID ${item.item_id} não encontrado`);
                }

                preco = parsePrice(product.preco);
                total += item.quantidade * preco;
            } else if (item.tipo === 'serviço') {
                preco = parsePrice(item.preco);
                total += preco;
            }
        }

        const pedidos = await Promise.all(items.map(async (item) => {  
            let preco: number;

            if (item.tipo === 'produto') {
                const product = await productRepository.findOne({
                    where: { id: item.item_id }
                });

                if (!product) {
                    throw new Error(`Produto com ID ${item.item_id} não encontrado`);
                }

                preco = parsePrice(product.preco);
            } else {
                preco = parsePrice(item.preco);
            }

            return orderRepository.create({
                cliente: client, 
                empresa: empresa, 
                tipo: item.tipo,
                item_id: item.item_id,
                quantidade: item.quantidade,
                preco: preco,
                total: item.tipo === 'produto' ? item.quantidade * preco : preco 
            });
        }));

        const savedOrders = await orderRepository.save(pedidos);

        return { orders: savedOrders, total };

    } catch (error) {
        console.log("Error creating order", error);
        throw new Error("Error creating order");
    }
};

const parsePrice = (preco: string | number): number => {
    return typeof preco === 'string' ? parseFloat(preco) : preco;
};

// Função para listar todos os pedidos de uma empresa
export const getOrdersByEmpresaService = async (empresa_id: number) => {
    try {
        const orderRepository = AppDataSource.getRepository(Pedido);

        const orders = await orderRepository.find({
            where: { empresa: { id: empresa_id } },
            relations: ["cliente", "empresa"],
            select: [
                "id",
                "tipo",       
                "quantidade",  
                "preco",
                "total",
                "created_at",
                "empresa_id"
            ]
        });

        return orders;
    } catch (error) {
        console.log("Error fetching orders for empresa_id", error);
        throw new Error("Error fetching orders for empresa_id");
    }
};

// Função para listar clientes com mais produtos/serviços consumidos, por valor e quantidade
export const getTopClientsService = async (empresa_id: number) => {
    try {
        const orderItemRepository = AppDataSource.getRepository(Pedido);

        // Função para listar clientes por quantidade
        const topClientsByQuantity = await orderItemRepository
            .createQueryBuilder("pedido") 
            .innerJoin("pedido.cliente", "cliente") 
            .where("pedido.empresa_id = :empresa_id", { empresa_id })
            .select("cliente.nome", "cliente_nome")
            .addSelect("cliente.cpf", "cliente_cpf")
            .addSelect("SUM(pedido.quantidade)", "total_quantity")
            .groupBy("cliente.nome, cliente.cpf")
            .orderBy("total_quantity", "DESC")
            .getRawMany();

        // Função para listar clientes por valor
        const topClientsByValue = await orderItemRepository
            .createQueryBuilder("pedido")
            .innerJoin("pedido.cliente", "cliente") 
            .where("pedido.empresa_id = :empresa_id", { empresa_id })
            .select("cliente.nome", "cliente_nome")
            .addSelect("cliente.cpf", "cliente_cpf")
            .addSelect("SUM(pedido.quantidade * pedido.preco)", "total_value")
            .groupBy("cliente.nome, cliente.cpf")
            .orderBy("total_value", "DESC")
            .getRawMany();

        return {
            topClientsByQuantity,
            topClientsByValue
        };
    } catch (error) {
        console.log("Error fetching top clients", error);
        throw new Error("Error fetching top clients");
    }
}
