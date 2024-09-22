import Entrada from "../io/entrada";
import Servico from "../modelo/servico.";
import Atualizar from "./atualizar";

export default class AtualizarServico extends Atualizar {
    private servicos: Array<Servico>;
    private entrada: Entrada;
    
    constructor(servicos: Array<Servico>) {
        super();
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public atualizar(): void {
        console.log("\nInício da Atualização de serviço");
        this.servicos.forEach(servico => {
            console.log(`[${this.servicos.indexOf(servico)}] Nome: ${servico.getNome} | Preço: ${servico.getPreco}`);
        });
        let indexServ = this.entrada.receberNumero(`Por favro, informe o índice do serviço`);
        let nome = this.entrada.receberTexto(`Por favor, informe o novo nome do serviço`);
        let preco = parseFloat(this.entrada.receberTexto(`Por favor, informe o novo valor do serviço`));
        this.servicos[indexServ].nome = nome;
        this.servicos[indexServ].preco = preco;
        console.log(`\nServiço atualizado com sucesso!`);
    }
}