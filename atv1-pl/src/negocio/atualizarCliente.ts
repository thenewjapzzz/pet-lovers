import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Atualizar from "./atualizar";
import CPF from "../modelo/cpf";
import RG from "../modelo/rg";

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
            let nomeSocial = this.entrada.receberTexto(`Por favor, informe o novo nome social do cliente: `);
            let valorCpf = this.entrada.receberTexto(`Por favor, informe o novo CPF do cliente: `);
            let data = this.entrada.receberTexto(`Por favor, informe a nova data de emissão do CPF: `);
            let partesData = data.split('/');
            let ano = parseInt(partesData[2]);
            let mes = parseInt(partesData[1]);
            let dia = parseInt(partesData[0]);
            let novoCpf = new CPF(valorCpf, new Date(ano, mes, dia));
            let valorRg = this.entrada.receberTexto(`Por favor, informe o novo RG do cliente: `)
            let dataEmissaoRg = this.entrada.receberTexto(`Por favor, informe a nova data de emissão do RG: `)
            let partesDataRg = dataEmissaoRg.split('/');
            let anoRg = parseInt(partesDataRg[2]);
            let mesRg = parseInt(partesData[1]);
            let diaRg = parseInt(partesData[0]);
            let novoRg = new RG(valorRg, new Date(anoRg, mesRg, diaRg));
            
            cliente.nome = nome;
            cliente.nomeSocial = nomeSocial;
            cliente['cpf'] = novoCpf;
            cliente['rg'] = novoRg;

            console.log(`\nCadastro atualizado com sucesso!\n`);
        }else{
            console.log(`Cliente não encontrado!\n`);
        }
    }
}