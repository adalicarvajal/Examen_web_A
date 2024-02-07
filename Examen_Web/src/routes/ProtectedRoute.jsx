import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth"; // Asegúrate de tener este hook o contexto implementado

function ProtectedRoute({ children }) {
    const { user } = useAuth(); // Suponiendo que `useAuth` te da acceso al usuario actual

    if (!user) {
        return <Navigate to="/" />;
    }
    return children;
}

export default ProtectedRoute;


