import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";
import Servico from "../modelo/servico.";
import Listagem from "./listagem";

export default class Listagem5Clientes extends Listagem {
    private clientes: Array<Cliente>;
    private servicos: Array<Servico>;
    private produtos: Array<Produto>;
    private entrada: Entrada;
    constructor(clientes: Array<Cliente>, servicos: Array<Servico>, produtos: Array<Produto>) {
        super();
        this.clientes = clientes;
        this.servicos = servicos;
        this.produtos = produtos;
        this.entrada = new Entrada();
    }
}