import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Apagar from "./apagar";

export default class ApagarCliente extends Apagar {
    private clientes: Array<Cliente>;
    private entrada: Entrada;
    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada;
    }

    public apagar(): void {
        console.log(`\nInício da Exclusão de clientes`);
        let cpf = this.entrada.receberTexto(`Por favor, informe o número de CPF do cliente a ser excluído: `);

        let index = this.clientes.findIndex((c) => c.getCpf.getValor === cpf);

        if(index !== -1) {
            this.clientes.splice(index, 1);
            console.log(`Cliente excluído com sucesso :)\n`);
        }else {
            console.log(`Cliente não encontrado :(\n`)
        }
    }
}