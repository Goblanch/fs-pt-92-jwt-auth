import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            // Si no hay token, redirige al login
            navigate("/login");
        }
    }, [navigate]);

    // Si hay un token, renderiza el contenido de la ruta privada
    return <>
        <h1>Ruta Privada</h1>
    </>;
};

export default PrivateRoute;