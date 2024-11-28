import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import axios from "axios";

interface ServiceData {
    id: number;
    nome: string;
    preco: string;
    descricao: string;
  }

interface ServiceRegisterModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addService: (newService: ServiceData) => void;
}

const ServiceRegisterModal = ({ setIsOpen, addService }: ServiceRegisterModalProps) => {
  const [serviceData, setServiceData] = useState<ServiceData>({
    id: 0,
    nome: "",
    preco: "R$ 0,00",
    descricao: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "preco") {
      const rawValue = value.replace(/[^\d,]/g, "").replace(",", ".");
      const numericValue = parseFloat(rawValue);

      if (!isNaN(numericValue)) {
        setServiceData((prevState) => ({
          ...prevState,
          preco: `R$ ${numericValue.toFixed(2).replace(".", ",")}`,
        }));
      }
    } else {
      setServiceData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const empresa_id = sessionStorage.getItem("empresa_id");
      if (!empresa_id) {
        console.log("Empresa ID não encontrado");
        return;
      }

      const serviceDataWithEmpresa = {
        ...serviceData,
        empresa_id,
      };

      const response = await axios.post(
        "http://localhost:3000/create-service",
        serviceDataWithEmpresa
      );

      if (response.status === 201) {
        addService(response.data);
        setIsOpen(false);
      }
    } catch (error) {
      console.log("Erro ao criar serviço", error);
    }
  };

  return (
    <Dialog.Root open={true} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <Dialog.Title className="text-2xl font-semibold mb-4">
              Cadastrar Serviço
            </Dialog.Title>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Input
                  type="text"
                  name="nome"
                  value={serviceData.nome}
                  onChange={handleInputChange}
                  placeholder="Nome do Serviço"
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  name="preco"
                  value={serviceData.preco}
                  onChange={handleInputChange}
                  placeholder="Preço"
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  name="descricao"
                  value={serviceData.descricao}
                  onChange={handleInputChange}
                  placeholder="Descrição"
                  required
                />
              </div>
              <div className="mt-4 flex justify-end">
                <Button type="submit" className="mr-3">
                  Cadastrar
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
};

export default ServiceRegisterModal;
