export default class Pet {
    private nome: string;
    private tipo: string;
    private raca: string;
    private genero: string;
    constructor(nome: string, tipo: string, raca: string, genero: string) {
        this.nome = nome;
        this.tipo = tipo;
        this.raca = raca;
        this.genero = genero;
    }
    public get getNome(): string {
        return this.nome;
    }
    public get getTipo(): string {
        return this.tipo;
    }
    public get getRaca(): string {
        return this.raca;
    }
    public get getGenero(): string {
        return this.genero;
    }
    
}