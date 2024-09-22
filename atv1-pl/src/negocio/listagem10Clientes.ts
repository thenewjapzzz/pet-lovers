import Cliente from "../modelo/cliente";
import Listagem from "./listagem";

export default class Listagem10Clientes extends Listagem {
    private clientes: Array<Cliente>;
    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
    }

    public listar(): void {
        console.log(`\nLista de 10 clientes que mais consumira produtos ou serviços: `);
        let clis: any = [];
        this.clientes.forEach(cliente => {
            clis.push({
                nome: cliente.nome,
                quantidade: cliente.getProdutosConsumidos.length + cliente.getServicosConsumidos.length,
                cpf: cliente.getCpf.getValor
            })  
        })

        clis.sort((a: any, b:any) => b.quantidade - a.quantidade);

        clis.slice(0, 10).forEach((cli: any) => {
            console.log(`Nome: ${cli.nome}`);
            console.log(`Quantidade: ${cli.quantidade}`);
            console.log(`CPF: ${cli.cpf}`);
            console.log(`----------------------------------`);
        })
    }
}