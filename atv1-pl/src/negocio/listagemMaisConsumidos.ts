import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";
import Servico from "../modelo/servico.";
import Listagem from "./listagem";

export default class ListagemMaisConsumidos extends Listagem {
    private clientes: Array<Cliente>;
    private produtos: Array<Produto>;
    private servicos: Array<Servico>;
    constructor(clientes: Array<Cliente>, produtos: Array<Produto>, servicos: Array<Servico>) {
        super();
        this.clientes = clientes;
        this.produtos = produtos;
        this.servicos = servicos;
    }

    public listar(): void {
        if(this.clientes.length < 5) {
            console.log(`Não há clientes suficientes cadastrados`);
        }else if(this.produtos.length < 5) {
            console.log(`Não há produtos suficientes cadastrados`);
        }else if(this.servicos.length < 5) {
            console.log(`Não há serviços suficientes cadastrados`);
        }
        else{
            this.produtos.sort((a, b) => {
                if(a.quantiadadeConsumida > b.quantiadadeConsumida) {
                    return -1;
                }else if(a.quantiadadeConsumida < b.quantiadadeConsumida) {
                    return 1;
                }else{
                    return 0;
                }
            });
            this.servicos.sort((a, b) => {
                if(a.quantidadeConsumida > b.quantidadeConsumida) {
                    return -1;
                }else if(a.quantidadeConsumida < b.quantidadeConsumida) {
                    return 1;
                }else{
                    return 0;
                }
            });
            console.log(`Produtos mais consumidos:`);
            for(let i=0; i< 5; i++) {
                console.log(`${i+1} - ${this.produtos[i].getNome} - ${this.produtos[i].getQuantidadeConsumida} unidades`);
            };
            console.log(`Serviços mais consumidos:`);
            for(let i=0; i<5; i++) {
                console.log(`${i+1} - ${this.servicos[i].getNome} - ${this.servicos[i].getQuantidadeConsumida}`);
            };
        };
    };
};