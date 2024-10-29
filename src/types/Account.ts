// src/types/Account.ts
export interface Account {
  transactionDate: Date; // Cambiado a `Date` para representar mejor la fecha de transacción
  amount: (value: number) => number; // Tipo de función que toma un número y devuelve un número
  type: "deposit" | "withdrawal" | "transfer"; // Tipo de transacción, puedes ajustar los valores según tus necesidades
  originAcc: string | null; // La cuenta de origen, `null` si no aplica
  targetAcc: string | null; // La cuenta de destino, `null` si no aplica
  id: string; // ID único de la cuenta
  userId: number; // ID del usuario al que pertenece la cuenta
  nCuenta: string; // Número de la cuenta
  name: string; // Nombre asociado a la cuenta
  balance: number; // Saldo de la cuenta, tipo `number` para precisión en cálculos
  creationDate: Date; // Fecha de creación de la cuenta
}
