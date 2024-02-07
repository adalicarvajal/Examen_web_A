import { Table } from 'flowbite-react';
import { GrEdit } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { Badge } from 'flowbite-react';



function ProductTable({ products, onEdit, onDelete }) {
    return (
        <Table hoverable>
            <Table.Head>
                <Table.HeadCell>Id</Table.HeadCell>
                <Table.HeadCell>Nombre</Table.HeadCell>
                <Table.HeadCell>Color</Table.HeadCell>
                <Table.HeadCell>Estado</Table.HeadCell>
                <Table.HeadCell>Categoria</Table.HeadCell>
                <Table.HeadCell>Precio</Table.HeadCell>
                <Table.HeadCell>Stock</Table.HeadCell>
                <Table.HeadCell>Fecha Creacion</Table.HeadCell>
                <Table.HeadCell>
                    <span className="sr-only">Acciones</span>
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {products.map((product, index) => (
                    <Table.Row key={product.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {index + 1}
                        </Table.Cell>
                        <Table.Cell>{product.product_name}</Table.Cell>
                        <Table.Cell>{product.color}</Table.Cell>
                        <Table.Cell>
                            <Badge color={product.active ? 'success' : 'danger'}>
                                {product.active ? 'Activo' : 'Inactivo'}
                            </Badge>
                        </Table.Cell>
                        <Table.Cell>{product.category_name}</Table.Cell>
                        <Table.Cell>{product.price}</Table.Cell>
                        <Table.Cell>{product.stock}</Table.Cell>
                        <Table.Cell>
                            {new Intl.DateTimeFormat('es', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(product.created_at))}
                        </Table.Cell>
                        <Table.Cell className="flex items-center gap-2">
                            <button
                                onClick={() => onEdit(product)}
                                className="p-1 text-cyan-600 hover:text-cyan-900 dark:text-cyan-500 dark:hover:text-cyan-400"
                            >
                                <GrEdit className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                onClick={() => onDelete(product.id)}
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
