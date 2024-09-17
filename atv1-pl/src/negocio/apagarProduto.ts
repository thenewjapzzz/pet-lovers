import Entrada from "../io/entrada";
import Produto from "../modelo/produto";
import Apagar from "./apagar";

export default class ApagarProduto extends Apagar {
    private produtos: Array<Produto>;
    private entrada: Entrada;
    constructor(produtos: Array<Produto>) {
        super();
        this.produtos = produtos;
        this.entrada = new Entrada();
    }

    public apagar(): void {
        this.produtos.forEach(produto =>  {
            console.log(`[${this.produtos.indexOf(produto)}] Nome: ${produto.getNome} | Preço: ${produto.getPreco}`);
        });
        let indexProd = this.entrada.receberNumero(`Por favor, informe a índice do produto que deseja apagar: `);
        this.produtos.splice(indexProd, 1);
        console.log(`\nProdudo excluído :)\n`);
        console.log(`Produtos restantes: `);
        if(this.produtos.length == 0) {
            console.log(`Nenhum`);
        }else {
            this.produtos.forEach(produto => {
                console.log(`Nome: ${produto.getNome} | Preço: ${produto.getPreco}`);
            });
        };
    };
};