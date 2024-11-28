import { useState } from "react";
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

interface ProductRegisterModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addProduct: (newProduct: ProductData) => void;
}

export default function ProductRegisterModal({
  setIsOpen,
  addProduct,
}: ProductRegisterModalProps) {
  const [productData, setProductData] = useState<ProductData>({
    id: 0,
    nome: "",
    preco: "R$ 0,00", 
    descricao: "",
    estoque: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "preco") {
      const rawValue = value.replace(/[^\d,]/g, "").replace(",", ".");
      const numericValue = parseFloat(rawValue);

      if (!isNaN(numericValue)) {
        setProductData((prevState) => ({
          ...prevState,
          preco: `R$ ${numericValue.toFixed(2).replace(".", ",")}`,
        }));
      }
    } else {
      setProductData((prevState) => ({
        ...prevState,
        [name]: name === "estoque" ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedPreco = productData.preco;

    try {
      const empresa_id = sessionStorage.getItem("empresa_id");
      if (!empresa_id) {
        console.log("Empresa ID não encontrado");
        return;
      }

      const productDataWithEmpresa = {
        ...productData,
        preco: formattedPreco,
        empresa_id: empresa_id,
      };

      const response = await axios.post(
        "http://localhost:3000/create-product",
        productDataWithEmpresa
      );

      if (response.status === 201) {
        console.log("Produto criado com sucesso", response.data);
        addProduct(response.data);
        setIsOpen(false);
      }
    } catch (error) {
      console.log("Erro ao criar produto", error);
    }
  };

  return (
    <Dialog.Root open={true} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <Dialog.Title className="text-2xl font-semibold mb-4">
              Cadastrar Produto
            </Dialog.Title>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Input
                  type="text"
                  name="nome"
                  value={productData.nome}
                  onChange={handleInputChange}
                  placeholder="Nome do Produto"
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
                  placeholder="Quantidade em Estoque"
                  min="0"
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
}
