import { Table } from 'flowbite-react';


function UsersTable({ users }) {
    return (
        <Table hoverable>
            <Table.Head>
                <Table.HeadCell>Id</Table.HeadCell>
                <Table.HeadCell>Nombre</Table.HeadCell>
                <Table.HeadCell>Usuario</Table.HeadCell>
                <Table.HeadCell>Rol</Table.HeadCell>
                <Table.HeadCell>Fecha Ingreso</Table.HeadCell>
                <Table.HeadCell>
                    <span className="sr-only">Acciones</span>
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {users.map((user, index) => (
                    <Table.Row key={user.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {index + 1}
                        </Table.Cell>
                        <Table.Cell>{user.names}</Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.Cell>{user.role}</Table.Cell>
                        <Table.Cell>
                            {new Intl.DateTimeFormat('es', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(user.created_at))}
                        </Table.Cell>
                        <Table.Cell>
                            <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                Editar
                            </a>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
}

export default UsersTable;