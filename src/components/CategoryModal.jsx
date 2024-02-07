import { Alert, Button, Card, Label, Modal, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { createCategory, existsCategory, updateCategory } from '../services/categoryService';
import { useEffect } from 'react';

function CategoryModal({ actionName, show, onClose, onNewCategory, isEdit, category }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showAlertSucess, setShowAlertSucess] = useState(false);

    useEffect(() => {
        if (isEdit && category) {
            setName(category.name);
            setDescription(category.description);
        } else {
            defaultState();
        }
    }, [category, isEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const exists = await existsCategory(name);
        if (exists) {
            setErrorMessage('Ya existe una categoria con el nombre ingresado');
            setShowAlertSucess(false);
            return;
        }


        const categoryData = { name, description };
        const result = isEdit ? await updateCategory(category.id, categoryData)
            : await createCategory(categoryData);

        if (!result) {
            setErrorMessage('Error al procesar la categoría.');
            setShowAlertSucess(false);
            return;
        }

        onNewCategory(result);
        defaultState();
        setShowAlertSucess(true);
    };

    const onCloseModal = () => {
        defaultState();
        setShowAlertSucess(false);
        onClose();
    }

    const defaultState = () => {
        setDescription('');
        setName('');
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
                                <Label htmlFor="name" value="Categoria" />
                            </div>
                            <TextInput
                                id="name"
                                type="text"
                                placeholder="Ingresa el nombre de la categoria"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="description" value="Descripción" />
                            </div>
                            <TextInput
                                id="description"
                                type="text"
                                placeholder="Ingresa la descripción de la categoria"
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <Button type="submit">{actionName}</Button>
                    </form>
                </Card>
            </Modal.Body>
        </Modal>
    );
}

export default CategoryModal;