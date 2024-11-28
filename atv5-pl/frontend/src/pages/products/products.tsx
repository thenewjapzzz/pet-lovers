import React, { useState, useEffect } from "react";
import axios from "axios";
import { Product, columns } from "../../app/product/columns";
import { DataTable } from "../../components/data-table-clients";
import Menu from "../../components/menu/menu";
import { Button } from "../../components/ui/button";
import ProductEditModal from "../../components/modal/product/modal-edit-product";
import ProductRegisterModal from "../../components/modal/product/modal-create-product";

async function getData(empresa_id: string): Promise<Product[]> {
  try {
    const response = await axios.get(
      `http://localhost:3000/product/empresa/${empresa_id}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados dos produtos:", error);
    return [];
  }
}

const ProductPage = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  useEffect(() => {
    const empresaId = localStorage.getItem("empresa_id");

    if (empresaId) {
      getData(empresaId)
        .then((products) => {
          setData(products);
          setLoading(false);
        })
        .catch((err) => {
          setError("Erro ao carregar os dados dos produtos.");
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

  const handleDelete = async (product: Product) => {
    const confirmDelete = window.confirm("Deseja mesmo excluir esse produto?");

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:3000/product/${product.id}`
      );

      if (response.status === 200) {
        setData(data.filter((item) => item.id !== product.id));
      }
    } catch (error) {
      console.log("Error deleting product", error);
      setError("Erro ao excluir produto");
    }
  };

  const addProduct = (newProduct: Product) => {
    setData((prevData) => [...prevData, newProduct]);
  };

  const handleEdit = (product: Product) => {
    setProductToEdit(product);
    setIsEditModalOpen(true);
  };

  const editProduct = (updatedProduct: Product) => {
    const updatedProducts = data.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setData(updatedProducts);
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
        <ProductRegisterModal setIsOpen={setIsModalOpen} addProduct={addProduct} />
      )}
      {isEditModalOpen && productToEdit && (
        <ProductEditModal
          setIsOpen={setIsEditModalOpen}
          editProduct={editProduct}
          productToEdit={productToEdit}
        />
      )}
    </>
  );
};

export default ProductPage;
