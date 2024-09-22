import Cliente from "../modelo/cliente";
import Listagem from "./listagem";

export default class ListagemPets extends Listagem {
    private clientes: Array<Cliente>;
    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
    }

    public listar(): void {
        console.log(`\nLista de todos os pets cadastrados:`);
        this.clientes.forEach((cliente) => {
            console.log(`Cliente: ${cliente.nome}`);
            cliente.getPets.forEach((pet) => {
                console.log(`Nome do pet: ${pet.getNome}`);
                console.log(`Raça: ${pet.getRaca}`);
                console.log(`Gênero: ${pet.getRaca}`);
                console.log(`Tipo: ${pet.getTipo}`);
                console.log(`-----------------------------------`);
            });
        });
        console.log(`\n`);
    };
};