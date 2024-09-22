import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Apagar from "./apagar";

export default class ApagarPet extends Apagar {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public apagar(): void {
        console.log("\nInício da Exclusão de pet");
        let cpf = this.entrada.receberTexto(`Por favor informe o número de CPF do cliente: `);

        let cliente = this.clientes.find((c) => c.getCpf.getValor === cpf);

        if(cliente) {
            let nomePet = this.entrada.receberTexto(`Por favor informe o nome do pet a ser apagado: `);
            let pet = cliente.getPets.find((p) => p.getNome === nomePet);

            if(pet) {
                console.log(`Pet encontrado: \n`, pet);

                let index = cliente.getPets.findIndex((p) => p.getNome === nomePet);

                if(index !== -1) {
                    cliente.getPets.splice(index, 1);
                    console.log(`Pet excluído!\n`);
                }else {
                    console.log(`Pet não encontrado!`);
                }
            }else {
                console.log(`Pet não encontrado!`)
            }
        }else{
            console.log(`Cliente não encontrado`)
        }
    }
}