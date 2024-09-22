import Cliente from "./cliente";
import Pet from "./pets";
import Produto from "./produto";
import Servico from "./servico.";

export default class Empresa {
    private clientes: Array<Cliente>;
    private produtos: Array<Produto>;
    private servicos: Array<Servico>;
    private pets: Array<Pet>;
    constructor(){
        this.clientes = [];
        this.produtos = [];
        this.servicos = [];
        this.pets = [];
    }
    public get getCliente(){
        return this.clientes;
    }
    public get getProdutos(){
        return this.produtos;
    }
    public get getServicos(){
        return this.servicos;
    }
    public get getPets(){
        return this.pets
    }
}