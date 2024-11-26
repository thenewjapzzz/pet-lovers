import { AppDataSource } from "config/data-source"
import { Cliente } from "entity/client-model"
import { ItensPedido } from "entity/order-item-model";
import { Pedido } from "entity/order-model";

// Função para criar pedido
export const createOrderService = async (
    cpf: string, 
    items: { tipo: string; item_id: number; quantidade: number; preco: number }[]) => {
    try {
        const clientRepository = AppDataSource.getRepository(Cliente);
        const orderRepository = AppDataSource.getRepository(Pedido);
        const orderItemRepository = AppDataSource.getRepository(ItensPedido);

        const client = await clientRepository.findOne({
            where: {
                cpf,
            }
        })

        // Achar cliente pelo CPF
        if (!client) {
            throw new Error("Client not found")
        }

        // Calcular valor total to pedido
        const total = items.reduce((acc, item) => acc + item.quantidade * item.preco, 0);

        // Criar um pedido
        const newOrder = orderRepository.create({
            cliente_id: client.id,
            total,
        })

        const savedOrder = await orderRepository.save(newOrder);

        // Adicionar itens ao pedido
        const itens = items.map((item) => 
                orderItemRepository.create({
                    pedido_id: savedOrder.id,
                    ...item
                })
        )
        await orderItemRepository.save(itens)

        return { order: savedOrder, itens }

    }catch (error) {
        console.log("Error creating order", error)
    }
}

// Função para listar clientes com mais produtos/serviços consumidos, por valor e quantidade
export const getTopClientsService = async () => {
    try {
        const orderItemRepository = AppDataSource.getRepository(ItensPedido);

        // Função para listar clientes por quantidade
        const topClientsByQuantity = await orderItemRepository
        .createQueryBuilder("item")
        .innerJoin(Pedido, "pedido", "item.pedido_id = pedido.id")
        .innerJoin(Cliente, "cliente", "pedido.cliente_id = cliente.id")
        .select("cliente.nome", "cliente_nome")
        .addSelect("cliente.cpf", "cliente_cpf")
        .addSelect("SUM(item.quantidade)", "total_quantity")
        .groupBy("cliente.nome, cliente.cpf")
        .orderBy("total_quantity", "DESC")
        .getRawMany();

        // Função para listar clientes por valor
        const topClientsByValue = await orderItemRepository
        .createQueryBuilder("item")
        .innerJoin(Pedido, "pedido", "item.pedido_id = pedido.id")
        .innerJoin(Cliente, "cliente", "pedido.cliente_id = cliente.id")
        .select("cliente.nome", "cliente_nome")
        .addSelect("cliente.cpf", "cliente_cpf")
        .addSelect("SUM(item.quantidade * item.preco)", "total_value")
        .groupBy("cliente.nome, cliente.cpf")
        .orderBy("total_value", "DESC")
        .getRawMany();

        return {
            topClientsByQuantity,
            topClientsByValue
        }
    }catch (error) {
        console.log("Error fetching top clients", error)
    }
}