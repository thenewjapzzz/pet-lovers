import Entrada from "../io/entrada";
import Empresa from "../modelo/empresa";
import ApagarCliente from "../negocio/apagarCliente";
import ApagarPet from "../negocio/apagarPet";
import ApagarProduto from "../negocio/apagarProduto";
import ApagarServico from "../negocio/apagarServico";
import AtualizarCliente from "../negocio/atualizarCliente";
import AtualizarPet from "../negocio/atualizarPet";
import AtualizarProduto from "../negocio/atualizarProduto";
import AtualizarServico from "../negocio/atualizarServico";
import CadastroCliente from "../negocio/cadastroCliente";
import CadastroPet from "../negocio/cadastroPet";
import CadatroProduto from "../negocio/cadastroProduto";
import CadastroServico from "../negocio/cadastroServico";
import Listagem10Clientes from "../negocio/listagem10Clientes";
import Listagem5Clientes from "../negocio/listagem5Clientes";
import ListagemClientes from "../negocio/listagemClientes";
import ListagemMaisConsumidos from "../negocio/listagemMaisConsumidos";
import ListagemPets from "../negocio/listagemPets";
import ListagemProduto from "../negocio/listagemProduto";
import ListagemProdutoPorCPF from "../negocio/listagemProdutoConsumido";
import ListagemServico from "../negocio/listagemServico";
import ListagemServicoPorCPF from "../negocio/listagemServicoConsumido";
import PedirProduto from "../negocio/pedirProduto";
import PedirServico from "../negocio/pedirServico";

let empresa = new Empresa()
let entrada = new Entrada();
let execucao = true;

function menuClientes() {
    console.log(`\nMenu clientes:`);
    console.log(`1 - Cadastrar cliente`);
    console.log(`2 - Listar clientes`);
    console.log(`3 - Atualizar cliente`);
    console.log(`4 - Apagar cliente`);
    console.log(`0 - Voltar ao menu principal`);

    let opcao = entrada.receberNumero(`Escolha uma opção: `);
    switch (opcao) {
        case 1:
            new CadastroCliente(empresa.getCliente).cadastrar();
            break;
        case 2:
            new ListagemClientes(empresa.getCliente).listar();
            break;
        case 3:
            new AtualizarCliente(empresa.getCliente).atualizar();
            break;
        case 4:
            new ApagarCliente(empresa.getCliente).apagar();
            break;
        case 0:
            return;
        default:
            console.log(`Opção inválida`);
    };
};

function menuServicos() {
    console.log(`\nMenu serviços:`);
    console.log(`1 - Cadastrar serviço`);
    console.log(`2 - Listar serviços`);
    console.log(`3 - Atualizar serviço`);
    console.log(`4 - Apagar serviço`);
    console.log(`5 - Pedir serviço`);
    console.log(`6 - Listar serviços consumidos por cliente`);
    console.log(`0 - Voltar ao menu principal`);

    let opcao = entrada.receberNumero(`Escolha uma opção: `);
    switch (opcao) {
        case 1:
            new CadastroServico(empresa.getServicos).cadastrar();
            break;
        case 2:
            new ListagemServico(empresa.getServicos).listar();
            break;
        case 3:
            new AtualizarServico(empresa.getServicos).atualizar();
            break;
        case 4:
            new ApagarServico(empresa.getServicos).apagar();
            break;
        case 5:
            new PedirServico(empresa.getServicos, empresa.getCliente).pedir();
            break;
        case 6:
            new ListagemServicoPorCPF(empresa.getServicos, empresa.getCliente).listar();
            break;
        case 0:
            return;
        default:
            console.log(`Opção inválida`);
    };
};

function menuProdutos() {
    console.log(`\nMenu produtos:`);
    console.log(`1 - Cadastra produto`);
    console.log(`2 - Listar produtos`);
    console.log(`3 - Atualizar produto`);
    console.log(`4 - Apagar produto`);
    console.log(`5 - Pedir produto`);
    console.log(`6 - Listar produtos consumidos por cliente`);
    console.log(`0 - Voltar ao menu principal`);

    let opcao = entrada.receberNumero(`Escolha uma opção: `);
    switch (opcao) {
        case 1:
            new CadatroProduto(empresa.getProdutos).cadastrar();
            break;
        case 2:
            new ListagemProduto(empresa.getProdutos).listar();
            break;
        case 3:
            new AtualizarProduto(empresa.getProdutos).atualizar();
        case 4:
            new ApagarProduto(empresa.getProdutos).apagar();
        case 5:
            new PedirProduto(empresa.getProdutos, empresa.getCliente).pedir();
            break;
        case 6: 
            new ListagemProdutoPorCPF(empresa.getProdutos, empresa.getCliente).listar();
            break;
        case 0:
            return;
        default:
            console.log(`Opção inválida`);
    };
};

function menuPets() {
    console.log(`\nMenu pets:`);
    console.log(`1 - Cadastra pet`);
    console.log(`2 - Listar pets`);
    console.log(`3 - Atualizar pet`);
    console.log(`4 - Apagar pet`);
    console.log(`0 - Voltar ao menu principal`);

    let opcao  = entrada.receberNumero(`Escolha uma opção: `);
    switch (opcao) {
        case 1:
            new CadastroPet(empresa.getCliente).cadastrar();
            break;
        case 2:
            new ListagemPets(empresa.getCliente).listar();
            break;
        case 3:
            new AtualizarPet(empresa.getCliente).atualizar();
            break;
        case 4:
            new ApagarPet(empresa.getCliente).apagar();
            break;
        case 0:
            return;
        default:
            console.log(`Opção inválida`);
    };
};

function menuListagem() {
    console.log(`\nMenu listagem:`);
    console.log(`1 - Listar os 5 clientes que mais consumiram produtos ou serviços por valor`);
    console.log(`2 - Listar os 10 clientes que mais consumiram produtos ou serviços por quantidade`);
    console.log(`3 - Listar os serviços ou produtos mais consumidos`);
    console.log(`0 - Voltar ao menu principal`)

    let opcao = entrada.receberNumero(`Escolha uma opção: `);
    switch (opcao) {
        case 1:
            new Listagem5Clientes(empresa.getCliente, empresa.getServicos, empresa.getProdutos).listar();
            break;
        case 2:
            new Listagem10Clientes(empresa.getCliente).listar();
            break;
        case 3:
            new ListagemMaisConsumidos(empresa.getCliente, empresa.getProdutos, empresa.getServicos).listar();
            break;
        case 0:
            return;
        default:
            console.log(`Opção inválida`);
    };
};

function menuPedir() {
    console.log(`\nMenu Pedir:`);
    console.log(`1 - Pedir produto`);
    console.log(`2 - Pedir serviço`);

    let opcao = entrada.receberNumero(`Escolha uma opção: `);
    switch (opcao) {
        case 1:
            new PedirProduto(empresa.getProdutos, empresa.getCliente).pedir();
            break;
        case 2:
            new PedirServico(empresa.getServicos, empresa.getCliente).pedir();
            break;
        case 0:
            return;
        default:
            console.log(`Opção inválida`)
    }
}

while (execucao) {
    console.log(`\nBem-vindo ao sistema de geriamento de pet shop!`);
    console.log(`Escolha uma das opções:`);
    console.log(`1 - Clientes`);
    console.log(`2 - Serviços`);
    console.log(`3 - Produtos`);
    console.log(`4 - Pets`);
    console.log(`5 - Listagem`);
    console.log(`6 - Pedir`)
    console.log(`0 - Sair`);

    let opcao = entrada.receberNumero(`Escolha uma opção: `);
    switch (opcao) {
        case 1:
            menuClientes();
            break;
        case 2:
            menuServicos();
            break;
        case 3:
            menuProdutos();
            break;
        case 4:
            menuPets();
            break;
        case 5:
            menuListagem();
            break;
        case 6:
            menuPedir();
            break;
        case 0:
            execucao = false;
            console.log("Até mais");
            break;
        default:
            console.log(`Opção inválida`)
    };
};

