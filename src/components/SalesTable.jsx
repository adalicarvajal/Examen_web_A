import { Table } from 'flowbite-react';
import { GrEdit } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { IoIosEye } from "react-icons/io";

function ProductTable({ sales, onViewDetails, onEdit, onDelete }) {
    return (
        <Table hoverable>
            <Table.Head>
                <Table.HeadCell>Id</Table.HeadCell>
                <Table.HeadCell>Cedula</Table.HeadCell>
                <Table.HeadCell>Cliente</Table.HeadCell>
                <Table.HeadCell>Fecha Venta</Table.HeadCell>
                <Table.HeadCell>Total</Table.HeadCell>
                <Table.HeadCell>
                    <span className="sr-only">Acciones</span>
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {sales.map((sale, index) => (
                    <Table.Row key={sale.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {index + 1}
                        </Table.Cell>
                        <Table.Cell>{sale.dni}</Table.Cell>
                        <Table.Cell>{sale.customer_name}</Table.Cell>
                        <Table.Cell>
                            {new Intl.DateTimeFormat('es', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(sale.created_at))}
                        </Table.Cell>
                        <Table.Cell>{sale.total_price}</Table.Cell>
                        <Table.Cell className="flex items-center gap-2">
                            <button
                                onClick={() => onViewDetails(sale.id)}
                                className="p-1 text-green-600 hover:text-green-900 dark:text-green-500 dark:hover:text-green-400"
                            >
                                <IoIosEye className="h-5 w-5" aria-hidden="true" />
                            </button>

                            <button
                                onClick={() => onEdit(sale)}
                                className="p-1 text-cyan-600 hover:text-cyan-900 dark:text-cyan-500 dark:hover:text-cyan-400"
                            >
                                <GrEdit className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                onClick={() => onDelete(sale.id)}
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

export default ProductTable;