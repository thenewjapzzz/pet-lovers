import { useState, useEffect } from "react";
import axios from "axios";
import { Pet, columns } from "../../app/pet/columns";
import { DataTable } from "../../components/data-table-clients";
import Menu from "../../components/menu/menu";
import { Button } from "../../components/ui/button";
import PetEditModal from "../../components/modal/pet/modal-edit-pet";
import PetRegisterModal from "../../components/modal/pet/modal-create-pet";

async function getData(empresa_id: string): Promise<Pet[]> {
  try {
    const response = await axios.get(
      `http://localhost:3000/pets/empresa/${empresa_id}`
    );
    console.log(response)
    return response.data.map((pet: any) => ({
        ...pet,
        cpf: pet.cliente ? pet.cliente.cpf : "",
      }));
  } catch (error) {
    console.error("Erro ao buscar dados dos pets:", error);
    return [];
  }
}

const PetsPage = () => {
  const [data, setData] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [petToEdit, setPetToEdit] = useState<Pet | null>(null);
  const [refresh, setRefresh] = useState(false); 

  useEffect(() => {
    const empresaId = localStorage.getItem("empresa_id");

    if (empresaId) {
      getData(empresaId)
        .then((pets) => {
          setData(pets);
          setLoading(false);
        })
        .catch(() => {
          setError("Erro ao carregar os dados dos pets.");
          setLoading(false);
        });
    } else {
      setError("Empresa ID não encontrado.");
      setLoading(false);
    }
  }, [refresh]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const handleDelete = async (pet: Pet) => {
    const confirmDelete = window.confirm("Deseja mesmo excluir esse pet?");
    if (!confirmDelete) return;
  
    try {
      const response = await axios.delete(
        `http://localhost:3000/pet/${pet.id}`
      );
      if (response.status === 201) {
        const empresaId = localStorage.getItem("empresa_id");
        if (empresaId) {
          const updatedPets = await getData(empresaId);
          setData(updatedPets);
        }
      }
    } catch (error) {
      console.error("Erro ao excluir pet", error);
      setError("Erro ao excluir pet");
    }
  };
  
  const addPet = async (newPet: Pet) => {
    try {
      const empresaId = localStorage.getItem("empresa_id");
      if (empresaId) {
        setData((prevData) => [...prevData, newPet]);
        setRefresh(!refresh); 
      }
    } catch (error) {
      console.error("Erro ao atualizar a lista de pets:", error);
    }
  };
  
  const handleEdit = (pet: Pet) => {
    setPetToEdit(pet);
    setIsEditModalOpen(true);
  };

  const editPet = (updatedPet: Pet) => {
    const updatedPets = data.map((pet) =>
      pet.id === updatedPet.id ? updatedPet : pet
    );
    setData(updatedPets);
  };

  return (
    <>
      <div>
        <Menu />
      </div>
      <div className="container mx-auto py-10">
        <div className="flex justify-end mb-4 text-ls">
          <Button onClick={() => setIsModalOpen(true)}>Adicionar Pet</Button>
        </div>
        <DataTable
          columns={columns}
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      {isModalOpen && (
        <PetRegisterModal
          setIsOpen={setIsModalOpen}
          addPet={addPet}
        />
      )}
      {isEditModalOpen && petToEdit && (
        <PetEditModal
          setIsOpen={setIsEditModalOpen}
          editPet={editPet}
          pet={petToEdit}
        />
      )}
    </>
  );
};

export default PetsPage;
