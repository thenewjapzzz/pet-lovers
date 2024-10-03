import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import CPF from "../modelo/cpf";
import RG from "../modelo/rg";
import Cadastro from "./cadastro";

export default class CadastroCliente extends Cadastro {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro do cliente`);
        let nome = this.entrada.receberTexto(`Por favor, informe o nome do cliente: `);
        let nomeSocial = this.entrada.receberTexto(`Por favor, informe o nome social do cliente: `);
        let valorCpf = this.entrada.receberTexto(`Por favor, informe o número do CPF: `);

        let data = this.entrada.receberTexto(`Por favor, informe a data de emissão do CPF, no padrão dd/mm/yyyy: `);
        let partesData = data.split('/');
        let ano = Number(partesData[2]);
        let mes = Number(partesData[1]) 
        let dia = Number(partesData[0]);
        let cpf = new CPF(valorCpf, new Date(ano, mes, dia));

        if (this.clienteCadastrado(cpf, null)) { // Passar null para RG, pois ainda não foi criado
            console.log("Cliente já cadastrado com este CPF.");
            return;
        }

        let valorRg = this.entrada.receberTexto(`Por favor, informe o número do RG: `);
        let dataEmissaoRg = this.entrada.receberTexto(`Por favor, informe a data de emissão do RG, no padrão dd/mm/yyyy: `);
        let partesDataRg = dataEmissaoRg.split('/');
        let anoRg = Number(partesDataRg[2]);
        let mesRg = Number(partesDataRg[1])
        let diaRg = Number(partesDataRg[0]);
        let rg = new RG(valorRg, new Date(anoRg, mesRg, diaRg));

        if (this.clienteCadastrado(null, rg)) { // Passar null para CPF, pois já foi criado
            console.log("Cliente já cadastrado com este RG.");
            return;
        }

        let cliente = new Cliente(nome, nomeSocial, cpf, rg);
        this.clientes.push(cliente);
        console.log(`\nCadastro concluído!\n`);
    }

    private clienteCadastrado(cpf: CPF | null, rg: RG | null): boolean {
        return this.clientes.some(cliente => 
            (cpf && cliente.getCpf === cpf) || (rg && cliente.getRgs.includes(rg))
        );
    }
}
