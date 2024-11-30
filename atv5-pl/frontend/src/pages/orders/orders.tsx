import { useState, useEffect } from "react";
import axios from "axios";
import Menu from "../../components/menu/menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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

interface OrderItem {
  tipo: string;
  id: number | "";
  quantidade: number | "";
  preco: number | "";
}

interface Order {
  id: number;
  cliente: {
    cpf: string;
  };
  items: OrderItem[];
  total: string;
  created_at: string;
}

const OrderPage = () => {
  const [cpf, setCpf] = useState<string>("");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { tipo: "", id: "", quantidade: "", preco: "" },
  ]);
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<"fazer" | "ver">("fazer");

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

  const getOrderData = async (empresa_id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/orders/empresa/${empresa_id}`
      );

      if (Array.isArray(response.data.data)) {
        setOrders(response.data.data);
      } else {
        console.error("Data is not an array:", response.data);
        setOrders([]);
      }
    } catch (error) {
      console.error("Erro ao buscar dados dos pedidos:", error);
      setOrders([]);
    }
  };

  useEffect(() => {
    const empresa_id = sessionStorage.getItem("empresa_id");
    if (empresa_id) {
      getProductData(empresa_id);
      getServiceData(empresa_id);
      if (activeTab === "ver") {
        getOrderData(empresa_id);
      }
    } else {
      console.error("empresa_id not found in sessionStorage");
    }
  }, [activeTab]);

  const handleOrderItemChange = (
    index: number,
    field: keyof OrderItem,
    value: string | number
  ) => {
    const newOrderItems = [...orderItems];
    newOrderItems[index][field] = value;

    if (field === "id") {
      const selectedItem =
        newOrderItems[index].tipo === "product"
          ? products.find((product) => product.id === Number(value))
          : services.find((service) => service.id === Number(value));

      if (selectedItem) {
        const cleanPrice = selectedItem.preco
          .replace("R$", "")
          .replace(",", ".")
          .trim();
        newOrderItems[index].preco = Number(cleanPrice);

        if (newOrderItems[index].tipo === "service") {
          newOrderItems[index].quantidade = 1;
        }
      }
    }

    if (field === "quantidade" && typeof value === "number" && value < 0) {
      newOrderItems[index].quantidade = 0;
    }

    setOrderItems(newOrderItems);
  };

  const handleAddOrderItem = () => {
    setOrderItems([
      ...orderItems,
      { tipo: "", id: "", quantidade: "", preco: "" },
    ]);
  };

  const handleDeleteOrderItem = (index: number) => {
    const newOrderItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(newOrderItems);
  };

  const totalValue = orderItems.reduce(
    (total, item) =>
      item.quantidade && item.preco
        ? total + item.quantidade * item.preco
        : total,
    0
  );

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(e.target.value);
  };

  const handleSubmitOrder = async () => {
    const empresa_id = sessionStorage.getItem("empresa_id");

    if (!cpf || !empresa_id || orderItems.length === 0) {
      console.error("Por favor, preencha todos os campos corretamente.");
      return;
    }

    const orderData = {
      cpf,
      items: orderItems.map((item) => ({
        tipo: item.tipo,
        item_id: item.id,
        quantidade: item.quantidade,
        preco: item.preco,
      })),
      empresa_id: Number(empresa_id),
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/create-order",
        orderData
      );
      console.log("Order created successfully", response.data);
      alert("Pedido realizado com sucesso!");
      setCpf("");
      setOrderItems([{ tipo: "", id: "", quantidade: "", preco: "" }]);
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Erro ao criar o pedido. Tente novamente.");
    }
  };

  return (
    <>
      <Menu />
      <h1 className="text-center text-3xl font-bold my-6">Pedido</h1>

      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("fazer")}
          className={`font-semibold py-2 px-4 ${
            activeTab === "fazer" ? "underline" : ""
          }`}
        >
          Fazer Pedido
        </button>
        <button
          onClick={() => setActiveTab("ver")}
          className={`font-semibold py-2 px-4 ${
            activeTab === "ver" ? "underline" : ""
          }`}
        >
          Ver Pedidos
        </button>
      </div>

      {activeTab === "fazer" && (
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

          {orderItems.map((item, index) => (
            <div key={index} className="mb-6">
              <div className="mb-4">
                <label className="block mb-2 font-semibold">
                  Tipo de Pedido
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={item.tipo}
                  onChange={(e) =>
                    handleOrderItemChange(index, "tipo", e.target.value)
                  }
                >
                  <option value="">Selecione</option>
                  <option value="product">Produto</option>
                  <option value="service">Serviço</option>
                </select>
              </div>

              {item.tipo === "product" && (
                <>
                  <div className="mb-4">
                    <label className="block mb-2 font-semibold">Produto</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={item.id}
                      onChange={(e) =>
                        handleOrderItemChange(
                          index,
                          "id",
                          Number(e.target.value)
                        )
                      }
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
                    <label className="block mb-2 font-semibold">
                      Quantidade
                    </label>
                    <input
                      type="number"
                      value={item.quantidade}
                      onChange={(e) =>
                        handleOrderItemChange(
                          index,
                          "quantidade",
                          Number(e.target.value)
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      min={0}
                    />
                  </div>
                </>
              )}

              {item.tipo === "service" && (
                <>
                  <div className="mb-4">
                    <label className="block mb-2 font-semibold">Serviço</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={item.id}
                      onChange={(e) =>
                        handleOrderItemChange(
                          index,
                          "id",
                          Number(e.target.value)
                        )
                      }
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

              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleDeleteOrderItem(index)}
                  className="text-black"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={handleAddOrderItem}
            className="w-full text-black py-2 rounded-lg mb-6 border-2 border-orange-500 font-bold"

          >
            Adicionar Item
          </button>

          <div className="flex justify-between mb-6">
            <span className="font-semibold">
              Total: R${totalValue.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleSubmitOrder}
            className="w-full bg-orange-500 hover:bg-orange-400 text-white py-2 rounded-lg font-bold"
          >
            Finalizar Pedido
          </button>
        </div>
      )}

      {activeTab === "ver" && (
        <div className="w-full max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Pedidos</h2>
          <div>
            {orders.length === 0 ? (
              <p>Nenhum pedido encontrado.</p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="mb-4">
                  <div>
                    <strong>Pedido #{order.id}</strong>
                  </div>
                  <div>
                    <strong>Cliente:</strong> {order.cliente.cpf}
                  </div>
                  <div> 
                  <strong>Tipo:</strong> {order.tipo}
                  </div>
                  <div> 
                  <strong>Quantidade:</strong> {order.quantidade}
                  </div>
                  <div>
                    <strong>Data:</strong>{" "}
                    {new Date(order.created_at).toLocaleString("pt-BR")}
                  </div>
                  <div>
                    <strong>Total:</strong> R${order.total}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderPage;
