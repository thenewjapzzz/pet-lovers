import { useState, useEffect } from "react";
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
  cliente_nome: string
}

interface ClientEditModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editClient: (updatedClient: ClienteData) => void;
  clientToEdit: ClienteData;
}

export default function ClientEditModal({
  setIsOpen,
  editClient,
  clientToEdit,
}: ClientEditModalProps) {
  const [clienteData, setClienteData] = useState<ClienteData>(clientToEdit);

  useEffect(() => {
    setClienteData(clientToEdit);
  }, [clientToEdit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClienteData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

      const response = await axios.put(
        `http://localhost:3000/client/${clienteData.id}`,
        clientDataWithEmpresa
      );

      if (response.status === 200) {
        console.log("Cliente atualizado com sucesso", response.data);
        editClient(response.data); 
        setIsOpen(false); 
      }
    } catch (error) {
      console.log("Erro ao atualizar cliente", error);
    }
  };

  return (
    <Dialog.Root open={true} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <Dialog.Title className="text-2xl font-semibold mb-4">
              Editar Cliente
            </Dialog.Title>

            <form onSubmit={handleSubmit}>
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

              <div className="mt-4 flex justify-end">
                <Button type="submit" className="mr-3">
                  Atualizar
                </Button>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Fechar
                </Button>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
