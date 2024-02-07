import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, TextInput, Button, Select, Table } from "flowbite-react";
import { getProducts } from "../services/productService";
import { createSale, createSaleDetail } from "../services/salesService";

function CreateOrUpdateSale() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [customer, setCustomer] = useState("");
  const [dni, setDni] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [saleDetails, setSaleDetails] = useState([]);
  const [total, setTotal] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      const productsData = await getProducts();
      setProducts(productsData);
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const newTotal = saleDetails.reduce((acc, curr) => acc + curr.subtotal, 0);
    setTotal(newTotal);
  }, [saleDetails]);

  const handleAddProduct = () => {
    const product = products.find((p) => p.id === parseInt(selectedProduct));
    const quantityInt = Math.abs(parseInt(quantity));

    if (product && quantityInt) {
      if (quantityInt > product.stock) {
        setErrorMessage('La cantidad seleccionada excede el stock disponible.');
        setIsButtonDisabled(true);
        return;
      }

      const existingDetailIndex = saleDetails.findIndex(detail => detail.id === product.id);
      if (existingDetailIndex > -1) {
        const newSaleDetails = [...saleDetails];

        if (newSaleDetails[existingDetailIndex].quantity + quantityInt > product.stock) {
          setErrorMessage('La cantidad seleccionada excede el stock disponible.');
          setIsButtonDisabled(true);
          return;
        }
        newSaleDetails[existingDetailIndex].quantity += quantityInt;
        newSaleDetails[existingDetailIndex].subtotal = newSaleDetails[existingDetailIndex].quantity * product.price;
        setSaleDetails(newSaleDetails);

      } else {
        const newDetail = {
          ...product,
          quantity: quantityInt,
          subtotal: quantityInt * product.price,
        };
        setSaleDetails([...saleDetails, newDetail]);
      }

      setSelectedProduct('');
      setQuantity(0);
      setErrorMessage('');
      setIsButtonDisabled(false);
    } else {
      setErrorMessage('Por favor, seleccione un producto y una cantidad válida.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dni || !customer) {
      setErrorMessage('Debe ingresar la cedula y nombre del cliente para procesar la venta.');
      return;
    }
    if (saleDetails.length === 0) {
      setErrorMessage('Debe agregar al menos un producto a la venta.');
      return;
    }

    const sale = {
      dni,
      customer_name: customer,
      total_price: total,
    };

    const afterSaleCreated = await createSale(sale);

    const newSaleDetails = saleDetails.map((detail) => ({
      sale_id: afterSaleCreated.id,
      product_id: detail.id,
      quantity: detail.quantity,
      sale_price: detail.price,
    }));

    await createSaleDetail(newSaleDetails);

    navigate("/sales");
  };

  return (

    <Card className="w-full max-w-4xl p-4">
      <section className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex  flex-col items-start justify-between">
            <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">Modulo de Ventas</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-2">Ingrese los datos de la venta</p>
          </div>
        </div>
        <div className="flex flex-1 justify-center items-center h-full">
          <Card className="w-full max-w-4xl p-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <TextInput
                type="text"
                placeholder="Cedula"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
              />
              <TextInput
                type="text"
                placeholder="Nombre del cliente"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
              />
              <Select
                value={selectedProduct}
                onChange={(e) => {
                  setSelectedProduct(e.target.value);
                  setIsButtonDisabled(false);
                }}
              >
                <option>Seleccione un producto</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.product_name}
                  </option>
                ))}
              </Select>
              <TextInput
                type="number"
                min="0"
                placeholder="Cantidad"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  setErrorMessage('');
                  setIsButtonDisabled(false);
                }}
              />
              {errorMessage && <div className="text-red-500 mb-2">{errorMessage}</div>}
              <div className="flex gap-4">
                <Button disabled={isButtonDisabled} onClick={handleAddProduct}>Agregar Producto</Button>
                <Button color="gray" onClick={() => navigate("/sales")}>Regresar a Ventas</Button>
              </div>
              <Table>
                <Table.Head>
                  <Table.HeadCell>Producto</Table.HeadCell>
                  <Table.HeadCell>Cantidad</Table.HeadCell>
                  <Table.HeadCell>Subtotal</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {saleDetails.map((detail, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{detail.product_name}</Table.Cell>
                      <Table.Cell>{detail.quantity}</Table.Cell>
                      <Table.Cell>${detail.subtotal.toFixed(2)}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <div>Total: ${total.toFixed(2)}</div>
              <div className="text-right">
                <Button type="submit" className="mt-4">Vender</Button>
              </div>
            </form>
          </Card>
        </div>
      </section>
    </Card>
  );
}

export default CreateOrUpdateSale;
