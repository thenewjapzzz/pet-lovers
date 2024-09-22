import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";
import Pedir from "./pedir";

export default class PedirProduto extends Pedir {
    private produtos: Array<Produto>;
    private clientes: Array<Cliente>;
    private entrada: Entrada;
    constructor(produtos: Array<Produto>, clientes: Array<Cliente>) {
        super();
        this.produtos = produtos;
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public pedir(): void {
        console.log(`\nInício do pedido de produto`);

        let cpf = this.entrada.receberTexto(`Por favor, informe o CPF do cliente que deseja pedir o produto: `);
        let cliente = this.clientes.find((c) => c.getCpf.getValor === cpf);    

        if(cliente) {
            let nome = this.entrada.receberTexto(`Por favor, informe o nome do produto`);
            let produto = this.produtos.find((c) => c.getNome === nome);

            if(produto) {
                let quantidade = this.entrada.receberNumero(`Por favor, informe a quantidade que deseja pedir: `);
                cliente.adicionarProdutoConsumido(produto, quantidade);
                console.log(`\nProduto concluído`);
            }else {
                console.log(`\nProduto não encontrado`);
            }
        }else{
            console.log(`\nCliente não encontrado`);
        };
    };
};