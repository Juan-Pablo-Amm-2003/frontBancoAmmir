// src/types/Transaction.ts
export interface Transaction {
  [x: string]: ReacNode;
  id: string;
  transactionDate: Date;
  amount: number;
  type: "deposit" | "withdrawal" | "transfer";
  originAcc: string | null;
  targetAcc: string | null;
}
