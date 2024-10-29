// src/types/User.ts
// ../../../types/User.ts
export interface User {
  id?: number; // Cambia a opcional
  username: string;
  DNI: string;
  pass: string;
  accountId?: number;
}

export interface LoginCredentials {
  DNI: string; // DNI
  pass: string; // Contraseña
}
