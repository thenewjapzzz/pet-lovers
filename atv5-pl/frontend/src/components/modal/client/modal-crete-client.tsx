import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import axios from "axios";

interface ClienteData {
  id: number; 
  nome: string;
  nomeSocial: string;
  rg: string;
  cpf: string;
  telefone: string;
}

interface ClientRegisterModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addClient: (newClient: ClienteData) => void;
}

export default function ClientRegisterModal({
  setIsOpen,
  addClient,
}: ClientRegisterModalProps) {
  const [clienteData, setClienteData] = useState<ClienteData>({
    id: 0, 
    nome: "",
    nomeSocial: "",
    rg: "",
    cpf: "",
    telefone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClienteData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const empresa_id = sessionStorage.getItem("empresa_id");
      if (!empresa_id) {
        console.log("Empresa ID não encontrado");
        return;
      }

      const clientDataWithEmpresa = {
        ...clienteData,
        empresa_id: empresa_id,
      };

      const response = await axios.post(
        "http://localhost:3000/create-client",
        clientDataWithEmpresa
      );

      if (response.status === 201) {
        console.log("Cliente criado com sucesso", response.data);
        addClient(response.data); 
        setIsOpen(false);
      }
    } catch (error) {
      console.log("Erro ao criar cliente", error);
    }
  };

  return (
    <Dialog.Root open={true} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <Dialog.Title className="text-2xl font-semibold mb-4">
              Cadastrar Cliente
            </Dialog.Title>

            <form>
              <div className="mb-4">
                <Input
                  type="text"
                  name="nome"
                  value={clienteData.nome}
                  onChange={handleInputChange}
                  placeholder="Nome"
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  name="nomeSocial"
                  value={clienteData.nomeSocial}
                  onChange={handleInputChange}
                  placeholder="Nome Social"
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  name="rg"
                  value={clienteData.rg}
                  onChange={handleInputChange}
                  placeholder="RG"
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  name="cpf"
                  value={clienteData.cpf}
                  onChange={handleInputChange}
                  placeholder="CPF"
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  name="telefone"
                  value={clienteData.telefone}
                  onChange={handleInputChange}
                  placeholder="Telefone"
                  required
                />
              </div>
            </form>

            <div className="mt-4 flex justify-end">
              <Button onClick={handleSubmit} className="mr-3">
                Cadastrar
              </Button>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Fechar
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
