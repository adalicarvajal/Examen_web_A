import { Card, Modal } from 'flowbite-react';
import { Table } from 'flowbite-react';
import { Spinner } from 'flowbite-react';

function SalesDetailsModal({ show, onClose, saleDetails, isLoading }) {
    return (
        <div >
            {
                isLoading ? (
                    <Spinner aria-label="Cargando detalles..." />
                ) : null}
            <Modal show={show} onClose={onClose}>
                <Modal.Header>Detalles de la Venta</Modal.Header>
                <Modal.Body>
                    <Card>
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell>N0</Table.HeadCell>
                                <Table.HeadCell>Producto</Table.HeadCell>
                                <Table.HeadCell>Cantidad</Table.HeadCell>
                                <Table.HeadCell>Precio Unitario</Table.HeadCell>
                                <Table.HeadCell>Subtotal</Table.HeadCell>
                            </Table.Head>
                            <Table.Body>
                                {saleDetails.map((detail, index) => (
                                    <Table.Row key={detail.id}>
                                        <Table.Cell>{index + 1}</Table.Cell>
                                        <Table.Cell>{detail.product_name}</Table.Cell>
                                        <Table.Cell>{detail.quantity}</Table.Cell>
                                        <Table.Cell>{detail.sale_price}</Table.Cell>
                                        <Table.Cell>{detail.subtotal}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Card>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default SalesDetailsModal;


