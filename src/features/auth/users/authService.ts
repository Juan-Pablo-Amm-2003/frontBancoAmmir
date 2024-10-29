import {jwtDecode} from "jwt-decode";
import { loginUser } from "../../../services/userApi";
import { LoginCredentials, User } from "../../../types/User";

interface DecodedToken {
  id: number; // Cambia esto si el ID es diferente
  username: string;
  DNI: string;
  exp: number;
}

class AuthService {
  private static tokenKey = "token";

  // Método para iniciar sesión
  static login = async (
    credentials: LoginCredentials
  ): Promise<User | null> => {
    try {
      const response = await loginUser(credentials);
      localStorage.setItem(this.tokenKey, response.token);
      return this.getUser(); // Retorna User | null
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  // Método para cerrar sesión
  static logout = (): void => {
    localStorage.removeItem(this.tokenKey);
  };

  // Método para verificar si el usuario está logueado
  static isLoggedIn = (): boolean => {
    const token = localStorage.getItem(this.tokenKey);
    return !!token && !this.isTokenExpired(token);
  };

  // Método para decodificar el token y obtener el objeto completo de usuario
  static decodeToken = (token: string): DecodedToken | null => {
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  // Método para verificar si el token ha expirado
  static isTokenExpired = (token: string): boolean => {
    const decoded = this.decodeToken(token);
    return decoded ? decoded.exp * 1000 < Date.now() : true;
  };

  // Método para obtener el usuario desde el token
  static getUser = (): User | null => {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const decoded = this.decodeToken(token);
      return decoded ? this.mapDecodedTokenToUser(decoded) : null;
    }
    return null;
  };

  // Método para mapear DecodedToken a User
  static mapDecodedTokenToUser(decoded: DecodedToken): User {
    return {
      id: decoded.id,
      username: decoded.username,
      DNI: decoded.DNI,
      pass: "", // Si deseas, puedes asignar un valor por defecto
    };
  }
}

export default AuthService;
