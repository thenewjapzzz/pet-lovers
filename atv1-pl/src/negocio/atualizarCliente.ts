import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Atualizar from "./atualizar";

export default class AtualizarCliente extends Atualizar {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public atualizar(): void {
        console.log(`\nInício da Atualização do cliente`);
        let cpf = this.entrada.receberTexto(`Por favor, informe o número do CPF do cliente a ser atualizado`);

        let cliente = this.clientes.find((c) => c.getCpf.getValor === cpf);

        if(cliente) {
            let nome = this.entrada.receberTexto(`Por favor, informe o novo nome do cliente: `);
            let nomeSocial = this.entrada.receberTexto(`Por favor, informe o novo nome social do cliente`);

            cliente.nome = nome;
            cliente.nomeSocial = nomeSocial;

            console.log(`\nCadastro atualizado com sucesso!\n`);
        }else{
            console.log(`Cliente não encontrado!\n`);
        }
    }
}