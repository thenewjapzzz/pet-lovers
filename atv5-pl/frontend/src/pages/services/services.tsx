import React, { useState, useEffect } from "react";
import axios from "axios";
import { Service, columns } from "../../app/service/columns"; 
import { DataTable } from "../../components/data-table-clients"; 
import Menu from "../../components/menu/menu";
import { Button } from "../../components/ui/button";
import ServiceEditModal from "../../components/modal/service/modal-edit-service";
import ServiceRegisterModal from "../../components/modal/service/modal-create-service";

async function getData(empresa_id: string): Promise<Service[]> {
  try {
    const response = await axios.get(
      `http://localhost:3000/service/empresa/${empresa_id}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados dos serviços:", error);
    return [];
  }
}

const ServicePage = () => {
  const [data, setData] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);

  useEffect(() => {
    const empresaId = localStorage.getItem("empresa_id");

    if (empresaId) {
      getData(empresaId)
        .then((services) => {
          setData(services);
          setLoading(false);
        })
        .catch((err) => {
          setError("Erro ao carregar os dados dos serviços.");
          setLoading(false);
        });
    } else {
      setError("Empresa ID não encontrado.");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const handleDelete = async (service: Service) => {
    const confirmDelete = window.confirm("Deseja mesmo excluir esse serviço?");

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:3000/service/${service.id}`
      );

      if (response.status === 200) {
        setData(data.filter((item) => item.id !== service.id));
      }
    } catch (error) {
      console.log("Error deleting service", error);
      setError("Erro ao excluir serviço");
    }
  };

  const addService = (newService: Service) => {
    setData((prevData) => [...prevData, newService]);
  };

  const handleEdit = (service: Service) => {
    setServiceToEdit(service);
    setIsEditModalOpen(true);
  };

  const editService = (updatedService: Service) => {
    const updatedServices = data.map((service) =>
      service.id === updatedService.id ? updatedService : service
    );
    setData(updatedServices);
  };

  return (
    <>
      <div>
        <Menu />
      </div>
      <div className="container mx-auto py-10">
        <div className="flex justify-end mb-4 text-ls">
          <Button onClick={() => setIsModalOpen(true)}>Adicionar</Button>
        </div>
        <DataTable
          columns={columns}
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      {isModalOpen && (
        <ServiceRegisterModal setIsOpen={setIsModalOpen} addService={addService} />
      )}
      {isEditModalOpen && serviceToEdit && (
        <ServiceEditModal
          setIsOpen={setIsEditModalOpen}
          editService={editService}
          serviceToEdit={serviceToEdit}
        />
      )}
    </>
  );
};

export default ServicePage;
