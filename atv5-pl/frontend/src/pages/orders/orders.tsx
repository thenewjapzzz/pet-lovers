import { useState, useEffect } from "react";
import axios from "axios";
import Menu from "../../components/menu/menu";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  nome: string;
  quantidade: number;
  preco: string;
}

interface Service {
  id: number;
  nome: string;
  preco: string;
}

const OrderPage = () => {
  const [cpf, setCpf] = useState<string>("");  
  const [tipo, setTipo] = useState<string>(""); 
  const [quantidade, setQuantidade] = useState<number | "">(""); 
  const [preco, setPreco] = useState<number | "">(""); 
  const [products, setProducts] = useState<Product[]>([]); 
  const [services, setServices] = useState<Service[]>([]); 

  const getProductData = async (empresa_id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/product/empresa/${empresa_id}`
      );
      setProducts(response.data); 
    } catch (error) {
      console.error("Erro ao buscar dados dos produtos:", error);
      setProducts([]);
    }
  };

  const getServiceData = async (empresa_id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/service/empresa/${empresa_id}`
      );
      setServices(response.data); 
    } catch (error) {
      console.error("Erro ao buscar dados dos serviços:", error);
      setServices([]);
    }
  };

  useEffect(() => {
    const empresa_id = sessionStorage.getItem("empresa_id"); 
    if (empresa_id) {
      getProductData(empresa_id);
      getServiceData(empresa_id); 
    } else {
      console.error("empresa_id not found in sessionStorage");
    }
  }, []); 

  const handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTipo = e.target.value;
    setTipo(selectedTipo);
    setQuantidade("");
    setPreco("");
  };

  const handlePrecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreco(Number(e.target.value));
  };

  const handleQuantidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantidade(Number(e.target.value));
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProduct = products.find(
      (product) => product.id === Number(e.target.value)
    );
    if (selectedProduct) {
      const cleanPrice = selectedProduct.preco
        .replace("R$", "")
        .replace(",", ".")
        .trim();
      setPreco(Number(cleanPrice)); 
    } else {
      setPreco(0); 
    }
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedService = services.find(
      (service) => service.id === Number(e.target.value)
    );
    if (selectedService) {
      const cleanPrice = selectedService.preco
        .replace("R$", "")
        .replace(",", ".")
        .trim();
      setPreco(Number(cleanPrice)); 
    } else {
      setPreco(0); 
    }
  };

  const totalValue = preco && quantidade ? preco * quantidade : preco;

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(e.target.value); 
  };

  return (
    <>
      <Menu />
      <h1 className="text-center text-3xl font-bold my-6">Order</h1>

      <div className="w-full max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block mb-2 font-semibold">CPF</label>
          <input
            type="text"
            value={cpf}
            onChange={handleCpfChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Digite o CPF"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Tipo de Pedido</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={tipo}
            onChange={handleTipoChange}
          >
            <option value="">Selecione</option>
            <option value="product">Produto</option>
            <option value="service">Serviço</option>
          </select>
        </div>

        {tipo && (
          <>
            {tipo === "product" && (
              <>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">Produto</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    onChange={handleProductChange}
                  >
                    <option value="">Selecione o Produto</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block mb-2 font-semibold">Quantidade</label>
                  <input
                    type="number"
                    value={quantidade}
                    onChange={handleQuantidadeChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    disabled={!tipo} 
                  />
                </div>
              </>
            )}

            {tipo === "service" && (
              <>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">Serviço</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    onChange={handleServiceChange}
                  >
                    <option value="">Selecione o Serviço</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.nome}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Valor</label>
              <input
                type="number"
                value={totalValue}
                onChange={handlePrecoChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                disabled
              />

              <div className="text-xl mt-2">
                {totalValue > 0
                  ? `TOTAL: R$ ${totalValue.toFixed(2).replace(".", ",")}`
                  : "TOTAL: R$ 0,00"}
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/fazer-pedido"
                className="block text-center text-white bg-blue-500 hover:bg-blue-600 rounded-lg py-2 px-4 transition-all"
              >
                Finalizar Pedido
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderPage;
