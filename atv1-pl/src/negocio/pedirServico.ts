import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Servico from "../modelo/servico.";
import Pedir from "./pedir";

export default class PedirServico extends Pedir {
    private servicos: Array<Servico>;
    private clientes: Array<Cliente>;
    private entrada: Entrada;
    constructor(servicos: Array<Servico>, clientes: Array<Cliente>) {
        super();
        this.servicos = servicos;
        this.clientes = clientes;
        this.entrada = new Entrada();
    }
    public pedir(): void {
        console.log(`\nInício do pediro de serviço`);

        let cpf = this.entrada.receberTexto(`Por favor, informe o CPF do cliente que deseja pedir o serviço: `);
        let cliente = this.clientes.find((c) => c.getCpf.getValor === cpf);

        if(cliente) {
            let nome = this.entrada.receberTexto(`Por favor, informe o nome do serviço `);
            let servico = this.servicos.find((c) => c.getNome === nome);

            if(servico) {
                let quantidade = this.entrada.receberNumero(`Por favor, informe a quantidade que deseja pedir: `);
                cliente.adicionarServicoConsumido(servico, quantidade);
                console.log(`\nServiço concluído`);
            }else {
                console.log(`\nServiço não encontrado`);
            }
        }else{
            console.log(`\nCliente não encontrado`);
        };
    };
};