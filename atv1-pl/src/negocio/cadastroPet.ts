import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Pet from "../modelo/pets";
import Cadastro from "./cadastro";

export default class CadastroPet extends Cadastro {
    private pets: Array<Pet>;
    private clientes: Array<Cliente>;
    private entrada: Entrada;
    constructor(pets: Array<Pet>, clientes: Array<Cliente>) {
        super();
        this.pets = pets;
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro de pet`);
        let nome = this.entrada.receberTexto(`Por favor, informa o nome do pet: `);
        let raca = this.entrada.receberTexto(`Por favor, informa a raça do pet: `);
        let genero = this.entrada.receberTexto(`Por favor, informe o gênero do pet (M/F): `);
        let tipo = this.entrada.receberTexto(`Por favor, informe o tipo do pet: `);
        let cpf = this.entrada.receberTexto(`Por favor, informe o CPF do responsável pelo pet: `);

        let cliente = this.clientes.find((c) => c.getCpf.getValor === cpf);
        
        if(cliente) {
            let pet = new Pet(nome, raca, genero, tipo);
            cliente.adicionarPet(pet);
            console.log(`\nCadastro de pet concluído :)\n`);
        }else{
            console.log(`Cliente não enontrado :(\n`);
        }
    }
};