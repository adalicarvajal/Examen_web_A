import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import CategoryModal from '../components/CategoryModal';
import CategoryTable from '../components/CategoryTable';
import { deleteCategory, getCategories } from '../services/categoryService';



function Category() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = useState(null);
  const [editCategory, setEditCategory] = useState({});

  const fetchCategories = async () => {
    setIsLoading(true);
    const data = await getCategories();
    setCategories(data);

    if (data) setIsLoading(false);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = (category) => {
    if (modalState === 'edit') {
      setCategories(categories.map(c => c.id === category.id ? category : c));
      return;
    }
    setCategories([...categories, category]);
  }

  const handleDeleteCategory = async (id) => {
    await deleteCategory(id);
    setCategories(categories.filter(category => category.id !== id));
  }

  const openCreateModal = () => {
    setEditCategory({});
    setModalState('create');
  };

  const openEditModal = (category) => {
    setEditCategory(category);
    setModalState('edit');
  };

  const closeModal = () => {
    setModalState(null);
  };



  return (
    <section className='flex flex-col gap-2'>
      <div className="flex justify-between">
        <div className="flex  flex-col items-start justify-between">
          <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">Categorias</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-2">Listado de categorias</p>
        </div>
        <div className="flex">
          <Button className="bg-cyan-600 hover:bg-cyan-700 text-white self-end" onClick={openCreateModal} >Crear Categoria</Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        {isLoading
          ? <div className="text-center">
            <Spinner aria-label="Extra large spinner example" size="xl" />
          </div>
          : (<CategoryTable categories={categories} onEdit={openEditModal} onDelete={handleDeleteCategory} />)
        }
      </div>

      {modalState && (
        <CategoryModal
          actionName={modalState === 'edit' ? "Actualizar Categoria" : "Registrar Categoria"}
          show={!!modalState}
          onClose={closeModal}
          onNewCategory={handleCreateCategory}
          isEdit={modalState === 'edit'}
          category={modalState === 'edit' ? editCategory : undefined}
        />
      )}

    </section>
  );

}

export default Category