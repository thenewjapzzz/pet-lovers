import { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from "../../components/menu/menu";

const TopConsumablesListPage = () => {
    const [topClientsByQuantity, setTopClientsByQuantity] = useState<any[]>([]);
    const [topClientsByValue, setTopClientsByValue] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchTopConsumables = async () => {
        try {
            const empresa_id = sessionStorage.getItem('empresa_id');
            if (!empresa_id) {
                console.error("Empresa ID is missing in sessionStorage");
                return;
            }

            const response = await axios.get(`http://localhost:3000/orders/top-clients/${empresa_id}`, {
                params: { empresa_id: parseInt(empresa_id) }
            });

            const { topClientsByQuantity, topClientsByValue } = response.data.data;
            setTopClientsByQuantity(topClientsByQuantity);
            setTopClientsByValue(topClientsByValue);
        } catch (error) {
            console.error("Error fetching the top consumables", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTopConsumables();
    }, []);

    if (loading) {
        return <div className="text-center p-5">Carregando...</div>;
    }

    return (
        <div>
            <Menu />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-semibold mb-6">Produtos e Serviços Mais Consumidos</h1>

                <section className="mb-8">
                    <h2 className="text-2xl font-medium mb-4">Mais Consumidos por Quantidade</h2>
                    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Nome</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">CPF</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Quantidade Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topClientsByQuantity.map((client, index) => (
                                <tr key={index} className="border-t border-gray-200">
                                    <td className="px-6 py-4 text-sm text-gray-800">{client.cliente_nome}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{client.cliente_cpf}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{client.total_quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section>
                    <h2 className="text-2xl font-medium mb-4">Mais Consumidos por Valor</h2>
                    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Nome</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">CPF</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Valor Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topClientsByValue.map((client, index) => (
                                <tr key={index} className="border-t border-gray-200">
                                    <td className="px-6 py-4 text-sm text-gray-800">{client.cliente_nome}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{client.cliente_cpf}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{client.total_value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
};

export default TopConsumablesListPage;
