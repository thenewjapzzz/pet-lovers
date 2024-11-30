import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:32831/cliente", 
  validateStatus: function (status) {
    return status >= 200 && status < 400;
  },
});

export interface Cliente {
  id?: number;
  nome: string;
  nomeSocial?: string;
  email: string;
  endereco?: Endereco;
  telefones?: Telefone[];
}

export interface Endereco {
  bairro: string;
  cidade: string;
  codigoPostal: string;
  estado: string;
  informacoesAdicionais?: string;
  numero: string;
  rua: string;
}

export interface Telefone {
  ddd: string;
  numero: string;
}


export const listarClientes = async (): Promise<Cliente[]> => {
  const response = await api.get<Cliente[]>("/clientes");
  return response.data;
};


export const buscarClientePorId = async (id: number): Promise<Cliente> => {
  const response = await api.get<Cliente>(`/${id}`);
  return response.data;
};


export const cadastrarCliente = async (cliente: Cliente): Promise<Cliente> => {
  const response = await api.post<Cliente>("/cadastrar", cliente);
  return response.data;
};

export const atualizarCliente = async (id: number, cliente: Cliente): Promise<Cliente> => {
  const response = await api.put<Cliente>(`/atualizar`, { id, ...cliente });
  return response.data;
};


export const excluirCliente = async (id: number): Promise<void> => {
  await api.delete(`/excluir`, { data: { id } });
};