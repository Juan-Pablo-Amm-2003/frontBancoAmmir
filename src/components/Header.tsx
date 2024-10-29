// src/components/Header.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuhtContext"; // Asegúrate de importar useAuth

const Header: React.FC = () => {
  const { user, logout } = useAuth(); // Obtén el estado de usuario y logout desde el contexto

  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Banco Ammir</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:underline">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:underline">
              Sobre Nosotros
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline">
              Contacto
            </Link>
          </li>

          {/* Condicionalmente renderizar los enlaces según el estado de autenticación */}
          {!user ? ( // Si no hay usuario (no está autenticado)
            <>
              <li>
                <Link to="/users/loginPage" className="hover:underline">
                  Iniciar Sesión
                </Link>
              </li>
              <li>
                <Link to="/users/registerPage" className="hover:underline">
                  Registro
                </Link>
              </li>
            </>
          ) : (
            // Si hay un usuario (está autenticado)
            <>
              <li>
                <button onClick={logout} className="hover:underline">
                  Cerrar Sesión
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
