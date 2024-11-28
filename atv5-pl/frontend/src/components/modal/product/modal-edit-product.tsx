import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import axios from "axios";

interface ProductData {
  id: number;
  nome: string;
  preco: string;
  descricao: string;
  estoque: number;
}

interface ProductEditModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editProduct: (updatedProduct: ProductData) => void;
  productToEdit: ProductData;
}

export default function ProductEditModal({
  setIsOpen,
  editProduct,
  productToEdit,
}: ProductEditModalProps) {
  const [productData, setProductData] = useState<ProductData>(productToEdit);

  useEffect(() => {
    setProductData(productToEdit);
  }, [productToEdit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
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

      const productDataWithEmpresa = {
        ...productData,
        empresa_id: empresa_id,
      };

      const response = await axios.put(
        `http://localhost:3000/product/${productData.id}`,
        productDataWithEmpresa
      );

      if (response.status === 200) {
        console.log("Produto atualizado com sucesso", response.data);
        editProduct(response.data); 
        setIsOpen(false); 
      }
    } catch (error) {
      console.log("Erro ao atualizar produto", error);
    }
  };

  return (
    <Dialog.Root open={true} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <Dialog.Title className="text-2xl font-semibold mb-4">
              Editar Produto
            </Dialog.Title>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Input
                  type="text"
                  name="nome"
                  value={productData.nome}
                  onChange={handleInputChange}
                  placeholder="Nome"
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  name="preco"
                  value={productData.preco}
                  onChange={handleInputChange}
                  placeholder="Preço"
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  name="descricao"
                  value={productData.descricao}
                  onChange={handleInputChange}
                  placeholder="Descrição"
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  type="number"
                  name="estoque"
                  value={productData.estoque}
                  onChange={handleInputChange}
                  placeholder="Estoque"
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
