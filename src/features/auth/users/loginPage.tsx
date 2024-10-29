// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { useAuth } from "../context/AuhtContext"; // Importa el contexto de autenticación
import { useNavigate } from "react-router-dom";
import { LoginCredentials } from "../../../types/User";

const LoginPage = () => {
  const { login } = useAuth(); // Obtén la función de login del contexto
  const [DNI, setDNI] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const credentials: LoginCredentials = { DNI, pass };

    try {
      await login(credentials); // Llama a la función de login del contexto
      setSuccessMessage("Inicio de sesión exitoso.");
      navigate("/homePrivate");
    } catch (error) {
      console.log(error)
      setError("Credenciales incorrectas. Inténtalo nuevamente.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 py-6"
      >
        <div className="mb-4">
          <label className="block text-gray-700">DNI:</label>
          <input
            type="text"
            value={DNI}
            onChange={(e) => setDNI(e.target.value)}
            required
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contraseña:</label>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
