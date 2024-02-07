import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import RegisterModal from '../components/RegisterModal';
import UsersTable from '../components/UsersTable';
import { supabase } from '../supabase/client';


function User() {
  const [users, setUsers] = useState([]);
  const [createUserModal, setCreateUserModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true); // Inicia la carga
    try {
      const { data, error } = await supabase.from('users_with_email').select();
      if (error) {
        throw error;
      }

      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
    }
  };

  const handleCreateUser = () => setCreateUserModal(true);
  const handleNewUser = () => fetchUsers();

  return (
    <section className='flex flex-col gap-2'>
      <div className="flex justify-between">
        <div className="flex  flex-col items-start justify-between">
          <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">Usuarios</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-2">Listado de usuarios</p>
        </div>
        <div className="flex">
          <Button className="bg-cyan-600 hover:bg-cyan-700 text-white self-end" onClick={
            handleCreateUser
          } >Crear Usuario</Button>
        </div>
      </div>
      <div className="overflow-x-auto">

        {isLoading
          ? <div className="text-center">
            <Spinner aria-label="Extra large spinner example" size="xl" />
          </div>
          : (<UsersTable users={users} />)
        }
      </div>
      <RegisterModal show={createUserModal} onClose={() => setCreateUserModal(false)} onNewUser={handleNewUser} />
    </section>
  );
}

export default User