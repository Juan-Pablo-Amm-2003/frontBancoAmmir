// src/pages/protected/HomePrivate.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../features/auth/users/authService";

const HomePrivate: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const user = AuthService.getUser();
    if (user) {
      setUsername(user.username);
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-300">
      <div className="p-8 bg-white rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
          {username
            ? `¡Bienvenido, ${username}!`
            : "¡Bienvenido a tu Página de Inicio!"}
        </h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          Accede a las diferentes secciones desde aquí.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4 space-y-4 sm:space-y-0">
          <Link
            to="/dashboard"
            className="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            Cuentas
          </Link>
          <Link
            to="/transferMoney"
            className="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            Transferir Dinero
          </Link>
          <Link
            to="/update-balance"
            className="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            Retirar / Ingresar
          </Link>
          <Link
            to="/transaction-history/123456" // Cambia "123456" por el número de cuenta correspondiente
            className="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            Historial de Transacciones
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePrivate;
