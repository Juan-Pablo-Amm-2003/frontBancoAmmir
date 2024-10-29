// src/features/auth/context/PublicRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../users/authService"; // Asegúrate de tener la ruta correcta

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = AuthService.getUser(); // Obtén el usuario del AuthService

  if (user) {
    return <Navigate to="/homePrivate" replace />; // Redirige a la página privada si ya está autenticado
  }

  return <>{children}</>; // Renderiza los componentes hijos si el usuario no está autenticado
};

export default PublicRoute;
