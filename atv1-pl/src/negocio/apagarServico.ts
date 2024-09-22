import Entrada from "../io/entrada";
import Servico from "../modelo/servico.";
import Apagar from "./apagar";

export default class ApagarServico extends Apagar {
    private servicos: Array<Servico>;
    private entrada: Entrada;
    constructor(servicos: Array<Servico>) {
        super();
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public apagar(): void {
        console.log(`\nInício da Exclusão do serviço`);
        let nome = this.entrada.receberTexto(`Por favo, informe o nome do serviço a ser excluído`);

        let index = this.servicos.findIndex((c) => c.getNome === nome);

        if(index !== 1) {
            this.servicos.splice(index, 1);
            console.log(`Cadastro do serviço excluído!\n`);
        }else {
            console.log(`Serviço não encontrado!\n`)
        }
    }
}