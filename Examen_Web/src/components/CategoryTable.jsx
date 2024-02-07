import { Table } from 'flowbite-react';
import { GrEdit } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";

function CategoryTable({ categories, onEdit, onDelete }) {
    return (
        <Table hoverable>
            <Table.Head>
                <Table.HeadCell>Id</Table.HeadCell>
                <Table.HeadCell>Nombre</Table.HeadCell>
                <Table.HeadCell>Descripcion</Table.HeadCell>
                <Table.HeadCell>Fecha Creacion</Table.HeadCell>
                <Table.HeadCell>
                    <span className="sr-only">Acciones</span>
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {categories.map((category, index) => (
                    <Table.Row key={category.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {index + 1}
                        </Table.Cell>
                        <Table.Cell>{category.name}</Table.Cell>
                        <Table.Cell>{category.description}</Table.Cell>
                        <Table.Cell>
                            {new Intl.DateTimeFormat('es', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(category.created_at))}
                        </Table.Cell>
                        <Table.Cell className="flex items-center gap-2">
                            <button
                                onClick={() => onEdit(category)}
                                className="p-1 text-cyan-600 hover:text-cyan-900 dark:text-cyan-500 dark:hover:text-cyan-400"
                            >
                                <GrEdit className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                onClick={() => onDelete(category.id)}
                                className="p-1 text-red-600 hover:text-red-900 dark:text-red-500 dark:hover:text-red-400"
                            >
                                <MdDeleteForever className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
}

export default CategoryTable;
