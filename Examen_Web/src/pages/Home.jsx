import { Card, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { FaShoppingCart, FaUsers } from "react-icons/fa";
import { MdCategory, MdOutlineMonetizationOn } from "react-icons/md";


// Importa tus servicios
import { getTotalCategories } from '../services/categoryService';
import { getTotalProducts } from '../services/productService';
import { getTotalSales } from '../services/salesService';
import { getTotalUsers } from '../services/userService';

function Home() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      const totalUsers = await getTotalUsers();
      setTotalUsers(totalUsers);
    }

    const fetchTotalProducts = async () => {
      const totalProducts = await getTotalProducts();
      setTotalProducts(totalProducts);
    }

    const fetchTotalSales = async () => {
      const totalSales = await getTotalSales();
      setTotalSales(totalSales);
    }

    const fetchTotalCategories = async () => {
      const totalCategories = await getTotalCategories();
      setTotalCategories(totalCategories);
    }

    fetchTotalUsers();
    fetchTotalProducts();
    fetchTotalSales();
    fetchTotalCategories();
    setLoading(false);
  }, []);

  return (
    <div className="content flex flex-wrap gap-5">
      <div className="w-full">
        <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
      </div>

      {/* Description */}
      <div className="w-full">
        <p className="text-gray-500">Bienvenido a tu panel de control</p>
      </div>
      {loading
        ? <div className="text-center">
          <Spinner aria-label="Extra large spinner example" size="xl" />
        </div>
        : (<>
          <Card className="w-full md:w-1/2 lg:w-1/4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FaUsers className="text-4xl text-blue-500" size="2em" /> {/* Ajusta el tamaño aquí */}
                <div className="ml-3">
                  <p className="text-sm text-gray-500">USUARIOS</p>
                  <p className="text-lg font-semibold">{totalUsers}</p>
                </div>
              </div>
            </div>
          </Card>
          {/* Categorías */}
          <Card className="w-full md:w-1/2 lg:w-1/4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MdCategory className="text-4xl text-blue-500" size="2em" />
                <div className="ml-3">
                  <p className="text-sm text-gray-500">CATEGORÍAS</p>
                  <p className="text-lg font-semibold">{totalCategories}</p>
                </div>
              </div>
            </div>
          </Card>
          {/* Ganancias */}
          <Card className="w-full md:w-1/2 lg:w-1/4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MdOutlineMonetizationOn className="text-4xl text-blue-500" size="2em" />
                <div className="ml-3">
                  <p className="text-sm text-gray-500">GANANCIAS</p>
                  <p className="text-lg font-semibold">{totalSales}</p>
                </div>
              </div>
            </div>
          </Card>
          {/* Productos */}
          <Card className="w-full md:w-1/2 lg:w-1/4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FaShoppingCart className="text-4xl text-blue-500" size="2em" />
                <div className="ml-3">
                  <p className="text-sm text-gray-500">PRODUCTOS</p>
                  <p className="text-lg font-semibold">{totalProducts}</p>
                </div>
              </div>
            </div>
          </Card>
        </>)
      }
    </div>
  )
}

export default Home;

