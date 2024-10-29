// src/services/userApi.ts
import api from "./api";
import { User, LoginCredentials } from "../types/User";

// Registrar usuario
export const registerUser = async (user: User) => {
  try {
    const response = await api.post("/api/register", {
      username: user.username,
      DNI: user.DNI,
      pass: user.pass,
    });
    return response.data;
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw new Error("Error al registrar el usuario");
  }
};

// Iniciar sesión
export const loginUser = async (credentials: LoginCredentials) => {
  try {
    const response = await api.post("/api/login", {
      DNI: credentials.DNI,
      pass: credentials.pass,
    });
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw new Error("Error al iniciar sesión");
  }
};

// Obtener usuario por DNI
export const getUserByDni = async (dni: string) => {
  try {
    const response = await api.get(`/api/user/${dni}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw new Error("Error al obtener el usuario");
  }
};

// Actualizar usuario
export const updateUser = async (id: string, userData: Partial<User>) => {
  try {
    const response = await api.put(`/api/user/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw new Error("Error al actualizar el usuario");
  }
};

// Eliminar usuario por ID
export const deleteUserById = async (id: string) => {
  try {
    const response = await api.delete(`/api/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw new Error("Error al eliminar el usuario");
  }
};

