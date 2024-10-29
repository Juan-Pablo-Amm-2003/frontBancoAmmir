// src/features/auth/context/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../users/authService"; // Asegúrate de tener la ruta correcta

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const user = AuthService.getUser(); // Obtén el usuario del AuthService

  if (!user) {
    return <Navigate to="/users/loginPage" replace />;
  }

  return <>{children}</>; // Renderiza los componentes hijos si el usuario está autenticado
};

export default ProtectedRoute;
