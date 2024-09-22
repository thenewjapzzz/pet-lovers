import Servico from "../modelo/servico.";
import Listagem from "./listagem";

export default class ListagemServico extends Listagem {
    private servicos: Array<Servico>;
    constructor(servicos: Array<Servico>) {
        super();
        this.servicos = servicos;
    }

    public listar(): void {
        console.log(`\nLista de todos os serviços:`);
        this.servicos.forEach(servico => {
            console.log(`Nome: ${servico.getNome} | Preço: ${servico.getPreco}`);
        });
    };
};