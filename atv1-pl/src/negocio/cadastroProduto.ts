import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";
import Cadastro from "./cadastro";

export default class CadatroProduto extends Cadastro {
    private produtos: Array<Produto>;
    private entrada: Entrada;
    constructor(produtos: Array<Produto>) {
        super();
        this.produtos = produtos;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro de produto`);
        let nome = this.entrada.receberTexto(`Por favor, informe o nome do produto: `);
        let preco = parseFloat(this.entrada.receberTexto(`Por favor, informe o valor do produto: `));

        let produto = new Produto(nome, preco);
        this.produtos.push(produto);
        console.log(`\nCadastro de produto concluído!\n`);
    }
};