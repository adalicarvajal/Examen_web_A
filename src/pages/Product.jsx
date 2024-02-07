import ProductModal from '../components/ProductModal';
import ProductTable from '../components/ProductTable';
import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../services/productService';

function Product() {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalState, setModalState] = useState(null);
    const [editProduct, setEditProduct] = useState({});

    const fetchProducts = async () => {
        setIsLoading(true);
        const data = await getProducts();
        setProducts(data);
        if (data) setIsLoading(false);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleCreateProduct = (product) => {
        if (modalState === 'edit') {
            setProducts(products.map(p => p.id === product.id ? product : p));
            return;
        }
        setProducts([...products, product]);
    }

    const handleDeleteProduct = async (id) => {
        await deleteProduct(id);
        setProducts(products.filter(product => product.id !== id));
    }

    const openCreateModal = () => {
        setEditProduct({});
        setModalState('create');
    };

    const openEditModal = (product) => {
        setEditProduct(product);
        setModalState('edit');
    }

    const closeModal = () => {
        setModalState(null);
    }

    return (
        <section className='flex flex-col gap-2'>
            <div className="flex justify-between">
                <div className="flex  flex-col items-start justify-between">
                    <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">Productos</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-2">Listado de Productos</p>
                </div>
                <div className="flex">
                    <Button className="bg-cyan-600 hover:bg-cyan-700 text-white self-end" onClick={openCreateModal} >Crear Producto</Button>
                </div>
            </div>
            <div className="overflow-x-auto">
                {isLoading
                    ? <div className="text-center">
                        <Spinner aria-label="Extra large spinner example" size="xl" />
                    </div>
                    : (<ProductTable products={products} onEdit={openEditModal} onDelete={handleDeleteProduct} />)
                }
            </div>

            {modalState && (
                <ProductModal
                    actionName={modalState === 'edit' ? "Actualizar Categoria" : "Registrar Categoria"}
                    show={!!modalState}
                    onClose={closeModal}
                    onNewProduct={handleCreateProduct}
                    isEdit={modalState === 'edit'}
                    product={modalState === 'edit' ? editProduct : undefined}
                />
            )}

        </section>
    );
}

export default Product;