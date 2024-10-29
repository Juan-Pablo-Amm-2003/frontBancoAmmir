// src/services/transactionApi.ts
import api from "./api";
import { Account } from "../types/Account";
// Crear transacción
export const createTransaction = async (transactionData: {
  originAcc: number; // Cambiar a 'number' en lugar de 'string'
  targetAcc: number; // Cambiar a 'number' en lugar de 'string'
  amount: number;
}) => {
  try {
    const response = await api.post("/transactions", transactionData);
    return response.data;
  } catch (error) {
    console.error("Error al crear la transacción:", error);
    throw new Error("Error al crear la transacción");
  }
};

// Transferir dinero
export const transferMoney = async (transferData: {
  originAcc: number;
  targetAcc: number;
  amount: number;
}) => {
  try {
    const response = await api.post("/transactions", transferData);
    return response.data;
  } catch (error) {
    console.error("Error al transferir dinero:", error);
    throw new Error("Error al transferir dinero");
  }
};

// Eliminar transacción por número de cuenta
export const deleteTransactionByNCuenta = async (nCuenta: string) => {
  try {
    const response = await api.delete(`/transactions/${nCuenta}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la transacción:", error);
    throw new Error("Error al eliminar la transacción");
  }
};

// Obtener el historial de transacciones por número de cuenta
export const getTransactionHistory = async (id: string) => {
  try {
    const response = await api.get(`/transactions/history/${id}`);
    return response.data as Account[]; // Asegúrate de que la respuesta tenga la estructura esperada
  } catch (error) {
    console.error("Error al obtener el historial de transacciones:", error);
    throw new Error("Error al obtener el historial de transacciones");
  }
};