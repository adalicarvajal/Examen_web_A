import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SalesTable from '../components/SalesTable';
import { getSales, deleteSale, getSalesDetailsBySaleId } from '../services/salesService';
import SalesDetailsModal from '../components/SalesDetailsModal';

function Sales() {
    const navigate = useNavigate();
    const [sales, setSales] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [saleDetails, setSaleDetails] = useState([]);
    const [isDetailsLoading, setIsDetailsLoading] = useState(false);
    const [detailsModal, setDetailsModal] = useState(false);

    const fetchSales = async () => {
        setIsLoading(true);
        const data = await getSales();
        setSales(data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchSales();
    }, []);

    const handleDeleteSales = async (id) => {
        await deleteSale(id);
        setSales(sales.filter(sale => sale.id !== id));
    };

    const handleViewDetails = async (id) => {
        setIsDetailsLoading(true); // Iniciar loading de detalles
        const details = await getSalesDetailsBySaleId(id);
        console.log(details);
        setSaleDetails(details);
        setIsDetailsLoading(false); // Finalizar loading de detalles
        openViewDetailsModal();
    };

    const openViewDetailsModal = () => {
        setDetailsModal(true);
    };

    const closeViewDetailsModal = () => {
        setDetailsModal(false);
        setSaleDetails([]); // Limpia los detalles al cerrar el modal
    };

    return (
        <section className='flex flex-col gap-2'>
            <div className="flex justify-between">
                <div className="flex flex-col items-start justify-between">
                    <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">Ventas</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-2">Listado de ventas</p>
                </div>
                <div className="flex">
                    <Button className="bg-cyan-600 hover:bg-cyan-700 text-white self-end" onClick={() => navigate('/sales/new')}>Crear Venta</Button>
                </div>
            </div>

            <div className="overflow-x-auto">
                {isLoading

                    ? <div className="text-center">
                        <Spinner aria-label="Extra large spinner example" size="xl" />
                    </div>
                    : (<SalesTable sales={sales} onViewDetails={handleViewDetails} onDelete={handleDeleteSales} />)
                }
            </div>

            {detailsModal && (
                <SalesDetailsModal
                    show={detailsModal}
                    onClose={closeViewDetailsModal}
                    saleDetails={saleDetails}
                    isLoading={isDetailsLoading}
                />
            )}
        </section>
    );
}

export default Sales;
