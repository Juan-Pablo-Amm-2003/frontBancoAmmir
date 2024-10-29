// src/services/accountApi.ts
import api from "./api"; // Asegúrate de tener tu configuración de API en este archivo
import { Account } from "../types/Account";

// Crear cuenta
export const createAccount = async (accountData: Account) => {
  const response = await api.post("/accounts", accountData);
  return response.data;
};

// Obtener cuentas por ID de usuario
export const getAccountsByUserId = async (
  userId: number
): Promise<Account[]> => {
  const response = await api.get(`/accounts/user/${userId}`);
  return response.data;
};

// Eliminar cuenta por ID
export const deleteAccountById = async (id: number) => {
  await api.delete(`/accounts/${id}`);
};

// Actualizar balance de la cuenta (depósito o retiro)
export const updateAccountBalance = async (
  id: number,
  amount: number,
  operation: "deposit" | "withdraw"
) => {
  const response = await api.put(`/accounts/${id}`, { amount, operation });
  return response.data;
};
