import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import axios from "axios";

interface PetData {
  id: number;
  nome: string;
  tipo: string;
  raca: string;
  genero: string;
  cpf: string;
}

interface PetRegisterModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addPet: (newPet: PetData) => void;
}

const PetRegisterModal = ({ setIsOpen, addPet }: PetRegisterModalProps) => {
  const [petData, setPetData] = useState<PetData>({
    id: 0,
    nome: "",
    tipo: "",
    raca: "",
    genero: "",
    cpf: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPetData((prevState) => ({
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

      const petDataWithEmpresa = {
        ...petData,
        empresa_id, 
      };
      
      console.log(petDataWithEmpresa)

      const response = await axios.post<PetData>(
        "http://localhost:3000/create-pet",
        petDataWithEmpresa
      );

      if (response.status === 201) {
        const newPet: PetData = response.data;
        addPet(newPet); 
        setIsOpen(false);  
      }
    } catch (error) {
      console.error("Erro ao registrar pet", error);
    }
  };

  return (
    <Dialog.Root open={true} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <Dialog.Title className="text-2xl font-semibold mb-4">
              Registrar Pet
            </Dialog.Title>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Input
                  type="text"
                  name="cpf"
                  value={petData.cpf}
                  onChange={handleInputChange}
                  placeholder="CPF do Cliente"
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  name="nome"
                  value={petData.nome}
                  onChange={handleInputChange}
                  placeholder="Nome do Pet"
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  name="tipo"
                  value={petData.tipo}
                  onChange={handleInputChange}
                  placeholder="Tipo"
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  name="raca"
                  value={petData.raca}
                  onChange={handleInputChange}
                  placeholder="Raça"
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  name="genero"
                  value={petData.genero}
                  onChange={handleInputChange}
                  placeholder="Gênero"
                  required
                />
              </div>
              <div className="mt-4 flex justify-end">
                <Button type="submit" className="mr-3">
                  Registrar
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

export default PetRegisterModal;
