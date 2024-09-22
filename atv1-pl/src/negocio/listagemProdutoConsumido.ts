import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";
import Listagem from "./listagem";

export default class ListagemProdutoPorCPF extends Listagem { 
    private produtos: Array<Produto>;
    private clientes: Array<Cliente>;
    private entrada: Entrada;
    constructor(produtos: Array<Produto>, clientes: Array<Cliente>){
        super()
        this.produtos = produtos;
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public listar(): void {
        console.log(`\nInício da listagem de produtos consumidos do usuário:`);

        let cpf = this.entrada.receberTexto(`Por favor, informe o seu CPF: `);
        const cliente = this.clientes.find((c) => c.getCpf.getValor === cpf);

        if(cliente) {
            const produtosPedidos = cliente.getProdutosConsumidos;
            if(produtosPedidos.length === 0) {
                console.log(`Nenhum produto encontrado`);
            }else {
                produtosPedidos.forEach((produto) => {
                    console.log(`Nome do produto: ${produto.getNome}`);
                    console.log(`-------------------------------------`);
                });
            }
        }else {
            console.log(`Cliente não encontrado`);
        };
    };
};