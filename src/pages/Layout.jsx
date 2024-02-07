import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';

const Layout = () => {
    return (
        <div className="flex min-h-screen bg-gray-100 " >
            {/* Sidebar: se muestra a la izquierda y tiene un ancho fijo en pantallas grandes, pero es flexible en pantallas pequeñas */}
            <div className="sidebar  flex-shrink-0 overflow-y-auto text-white hidden lg:block m-5 ">
                <SideBar />
            </div>
            {/* Contenido principal: se expande para usar el espacio disponible */}
            <div className="flex-grow m-5">
                <Outlet />
            </div>
        </div>
    );
};
export default Layout;
