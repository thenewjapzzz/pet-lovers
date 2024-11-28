import React, { useState, useEffect } from "react";
import axios from "axios";
import { Client, columns } from "../../app/client/columns";
import { DataTable } from "../../components/data-table-clients";
import Menu from "../../components/menu/menu";
import { Button } from "../../components/ui/button";
import ClientRegisterModal from "../../components/modal/client/modal-crete-client";
import ClientEditModal from "../../components/modal/client/modal-edit-client"; 

async function getData(empresa_id: string): Promise<Client[]> {
  try {
    const response = await axios.get(
      `http://localhost:3000/client/empresa/${empresa_id}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados dos clientes:", error);
    return [];
  }
}

const ClientPage = () => {
  const [data, setData] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<Client | null>(null);

  useEffect(() => {
    const empresaId = localStorage.getItem("empresa_id");

    if (empresaId) {
      getData(empresaId)
        .then((clients) => {
          setData(clients);
          setLoading(false);
        })
        .catch((err) => {
          setError("Erro ao carregar os dados dos clientes.");
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

  const handleDelete = async (client: Client) => {
    const confirmDelete = window.confirm("Deseja mesmo excluir esse cliente?");

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:3000/client/${client.id}`
      );

      if (response.status === 200) {
        setData(data.filter((item) => item.id !== client.id));
      }
    } catch (error) {
      console.log("Error deleting client", error);
      setError("Erro ao excluir cliente");
    }
  };

  const addClient = (newClient: Client) => {
    setData((prevData) => [...prevData, newClient]);
  };

  const handleEdit = (client: Client) => {
    setClientToEdit(client);
    setIsEditModalOpen(true);
  };

  const editClient = (updatedClient: Client) => {
    const updatedClients = data.map((client) =>
      client.id === updatedClient.id ? updatedClient : client
    );
    setData(updatedClients);
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
        <ClientRegisterModal setIsOpen={setIsModalOpen} addClient={addClient} />
      )}
      {isEditModalOpen && clientToEdit && (
        <ClientEditModal
          setIsOpen={setIsEditModalOpen}
          editClient={editClient}
          clientToEdit={clientToEdit}
        />
      )}
    </>
  );
};

export default ClientPage;
