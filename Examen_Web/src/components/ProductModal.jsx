import { Alert, Button, Card, Label, Modal, TextInput, Select } from 'flowbite-react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { createProduct, existsProduct, updateProduct } from '../services/productService';
import { getCategories } from '../services/categoryService';

function ProductModal({ actionName, show, onClose, onNewProduct, isEdit, product }) {
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [price, setPrice] = useState('');
    const [categoryId, setCategoryId] = useState(0);
    const [active, setActive] = useState(true);
    const [stock, setStock] = useState('');
    const [categories, setCategories] = useState([]);

    const [errorMessage, setErrorMessage] = useState('');
    const [showAlertSucess, setShowAlertSucess] = useState(false);

    useEffect(() => {
        if (isEdit && product) {
            setName(product.product_name);
            setColor(product.color);
            setPrice(product.price);
            setCategoryId(product.category_id);
            setStock(product.stock);
        } else {
            defaultState();
        }
    }, [product, isEdit]);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            setCategories(data);
        }
        fetchCategories();
    }, []);

    const validateStock = (stock) => {
        if (stock < 0) {
            setErrorMessage('El stock no puede ser negativo');
            setShowAlertSucess(false);
            return false;
        }
        return true;
    }

    const validatePrice = (price) => {
        if (price < 0) {
            setErrorMessage('El precio no puede ser negativo');
            setShowAlertSucess(false);
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const exists = await existsProduct(name);
        if (exists) {
            setErrorMessage('Ya existe un producto con el nombre ingresado');
            setShowAlertSucess(false);
            return;
        }

        if (!validateStock(stock) || !validatePrice(price)) {
            return;
        }

        const productData = { name, color, price, category_id: categoryId, active, stock };
        const result = isEdit ? await updateProduct(product.id, productData)
            : await createProduct(productData);

        if (!result) {
            setErrorMessage('Error al procesar el producto.');
            setShowAlertSucess(false);
            return;
        }

        const resultAddapted = {
            ...result,
            product_name: result.name,
            category_name: categories.find(c => c.id === result.category_id).name
        }
        onNewProduct(resultAddapted);
        defaultState();
        setShowAlertSucess(true);

    };

    const onCloseModal = () => {
        defaultState();
        setShowAlertSucess(false);
        onClose();
    }

    const defaultState = () => {
        setName('');
        setColor('');
        setPrice('');
        setCategoryId(0);
        setActive(true);
        setStock('');
        setErrorMessage('');
    }

    return (
        <Modal show={show} size="md" onClose={onCloseModal} popup>
            <Modal.Header />
            <Modal.Body>
                <Card className="max-w-sm">
                    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
                        {showAlertSucess && (
                            <Alert color="success" onDismiss={() => setShowAlertSucess(false)}>
                                <span className="font-medium">{isEdit ? "Actualizacion exitosa!" : "Registro exitoso!"}</span>
                            </Alert>
                        )}
                        {errorMessage && (
                            <span className="text-red-500 text-sm font-medium">{errorMessage}</span>
                        )}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Producto" />
                            </div>
                            <TextInput
                                id="name"
                                type="text"
                                placeholder="Ingresa el nombre del producto"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="color" value="Color" />
                            </div>
                            <TextInput
                                id="color"
                                type="text"
                                placeholder="Ingresa el color"
                                required
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </div>
                        {/* active */}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="active" value="Estado" />
                            </div>
                            <Select
                                id="active"
                                value={active}
                                onChange={(e) => setActive(e.target.value)}
                            >
                                <option value=""> -- Selecciona un estado -- </option>
                                <option value={true}>Activo</option>
                                <option value={false}>Inactivo</option>
                            </Select>
                        </div>
                        {/* Categories */}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="category" value="Categoria" />
                            </div>
                            <Select
                                id="category"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                            >
                                <option value=""> -- Selecciona una categoria -- </option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </Select>
                        </div>
                        {/* Price */}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="price" value="Precio" />
                            </div>
                            <TextInput
                                id="price"
                                type="number"
                                placeholder="Ingresa el precio"
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        {/* Stock */}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="stock" value="Stock" />
                            </div>
                            <TextInput
                                id="stock"
                                type="number"
                                placeholder="Ingresa el stock"
                                required
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                        <Button type="submit">{actionName}</Button>
                    </form>
                </Card>
            </Modal.Body>
        </Modal>
    );

}

export default ProductModal;
