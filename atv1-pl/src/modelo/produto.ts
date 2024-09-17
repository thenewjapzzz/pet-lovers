export default class Produto {
    public nome: string;
    public preco: number;
    public quantiadadeConsumida: number;
    constructor(nome: string, preco: number) {
        this.nome = nome;
        this.preco = preco;
        this.quantiadadeConsumida = 0;
    }
    
    public get getNome(): string {
        return this.nome;
    }

    public get getPreco(): number {
        return this.preco;
    }

    public getQuantidadeConsumida(): number {
        return this.quantiadadeConsumida;
    }

    public incrementarQuantidadeConsumida(quantidade: number): void {
        this.quantiadadeConsumida += quantidade;
    }
}