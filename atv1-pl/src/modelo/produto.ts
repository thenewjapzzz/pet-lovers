export default class Produto {
    public nome: string;
    public preco: number;
    public quantiaddeConsumida: number;
    constructor(nome: string, preco: number) {
        this.nome = nome;
        this.preco = preco;
        this.quantiaddeConsumida = 0;
    }
    
    public get getNome(): string {
        return this.nome;
    }

    public get getPreco(): number {
        return this.preco;
    }

    public getQuantidadeConsumida(): number {
        return this.quantiaddeConsumida;
    }

    public incrementarQuantidadeConsumida(quantidade: number): void {
        this.quantiaddeConsumida += quantidade;
    }
}