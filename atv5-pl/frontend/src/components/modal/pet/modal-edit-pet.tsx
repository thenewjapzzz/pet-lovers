import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import axios from "axios";

interface PetData {
  id: number;
  nome: string;
  idade: string;
  raca: string;
  descricao: string;
  cpf: string;
}

interface PetEditModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editPet: (updatedPet: PetData) => void;
  pet: PetData; 
}

const PetEditModal = ({ setIsOpen, editPet, pet }: PetEditModalProps) => {
  const [petData, setPetData] = useState<PetData>({
    id: pet.id,
    nome: pet.nome,
    idade: pet.idade,
    raca: pet.raca,
    descricao: pet.descricao,
    cpf: pet.cpf,
  });

  useEffect(() => {
    setPetData(pet);
  }, [pet]);

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

      const petDataWithEmpresaAndCpf = {
        ...petData,
        empresa_id,
      };

      const response = await axios.put(
        `http://localhost:3000/update-pet/${pet.id}`,
        petDataWithEmpresaAndCpf
      );

      if (response.status === 200) {
        editPet(response.data);
        setIsOpen(false);
      }
    } catch (error) {
      console.log("Erro ao atualizar pet", error);
    }
  };

  return (
    <Dialog.Root open={true} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <Dialog.Title className="text-2xl font-semibold mb-4">
              Editar Pet
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
                  name="idade"
                  value={petData.idade}
                  onChange={handleInputChange}
                  placeholder="Idade"
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
                  name="descricao"
                  value={petData.descricao}
                  onChange={handleInputChange}
                  placeholder="Descrição"
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
};

export default PetEditModal;
