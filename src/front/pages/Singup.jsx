import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Singup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("https://fluffy-goldfish-qx7jjj4rqj9c4jq9-3001.app.github.dev/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                alert("Usuario registrado con éxito. Redirigiendo al inicio de sesión.");
                navigate("/login"); // Redirige al inicio de sesión
            } else {
                const errorData = await response.json();
                setError(errorData.msg || "Ocurrió un error. Intenta de nuevo.");
            }

        } catch (error) {
            console.error("Error en la solicitud:", error);
            setError("Ocurrió un error inesperado. Intenta de nuevo.");
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-96 bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-4">Regístrate</h2>
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                        Registrarse
                    </button>
                </form>
                <p className="mt-4 text-sm text-center">
                    ¿Ya tienes cuenta?{" "}
                    <a
                        href="/login"
                        className="text-blue-500 hover:underline"
                    >
                        Inicia sesión aquí
                    </a>
                </p>
            </div>
        </div>
    );

}

export default Singup