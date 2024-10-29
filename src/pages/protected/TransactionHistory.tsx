import React, { useEffect, useState } from "react";
import { getTransactionHistory } from "../../services/transactionService";
import useAccounts from "../../hooks/useAccounts";
import { Transaction } from "../../types/Transaction";
import { Account } from "../../types/Account";

const PAGE_SIZE = 5;

const TransactionHistory: React.FC = () => {
  const {
    accounts,
    loading: loadingAccounts,
    error: errorAccounts,
  } = useAccounts();

  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null
  );
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);

      if (selectedAccountId) {
        try {
          const data = await getTransactionHistory(selectedAccountId);
          if (data.length === 0) {
            setError("No se encontraron transacciones para esta cuenta.");
          } else {
            const formattedTransactions: Transaction[] = data.map(
              (transaction) => ({
                id: transaction.id,
                transactionDate: new Date(transaction.transactionDate),
                amount: parseFloat(transaction.amount as unknown as string),
                type: transaction.type,
                originAcc: transaction.originAcc || null,
                targetAcc: transaction.targetAcc || null,
                creationDate: transaction.creationDate
                  ? new Date(transaction.creationDate)
                  : new Date(),
                name: transaction.name || "N/A",
                balance:
                  typeof transaction.balance === "number"
                    ? transaction.balance
                    : 0,
              })
            );
            setTransactions(formattedTransactions);
          }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.error(error);
          setError("Error al obtener el historial de transacciones.");
        } finally {
          setLoading(false);
        }
      } else {
        setTransactions([]);
        setError("ID de cuenta no proporcionado.");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [selectedAccountId]);

  useEffect(() => {
    if (selectedAccountId) {
      setTransactions([]);
      setCurrentPage(1);
    }
  }, [selectedAccountId]);

  if (loadingAccounts)
    return <p className="text-center">Cargando cuentas...</p>;
  if (errorAccounts)
    return <p className="text-center text-red-500">{errorAccounts.message}</p>;

  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const totalPages = Math.ceil(transactions.length / PAGE_SIZE);

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg max-w-4xl">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
        Historial de Transacciones
      </h1>

      <div className="mb-6">
        <label
          htmlFor="accountSelect"
          className="block text-lg font-medium text-gray-700 mb-2 text-center"
        >
          Selecciona una cuenta:
        </label>
        <select
          id="accountSelect"
          value={selectedAccountId || ""}
          onChange={(e) => setSelectedAccountId(e.target.value)}
          className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        >
          <option value="" disabled>
            Elige una cuenta
          </option>
          {accounts.map((account: Account) => {
            const balance =
              typeof account.balance === "string"
                ? parseFloat(account.balance) // Convertir a número si es necesario
                : account.balance;

            return (
              <option key={account.id} value={account.id}>
                {account.nCuenta} - $
                {isNaN(balance) ? "Error" : balance.toFixed(2)}{" "}
                {/* Manejo de errores en el balance */}
              </option>
            );
          })}
        </select>
      </div>

      {selectedAccountId && loading && (
        <p className="text-center text-blue-500 font-semibold">
          Cargando transacciones...
        </p>
      )}
      {error && (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      )}

      {transactions.length > 0 && (
        <div className="overflow-y-auto max-h-80 mb-4">
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-blue-500 text-white text-lg font-semibold">
                <th className="py-3 px-5 border-b border-blue-200">Fecha</th>
                <th className="py-3 px-5 border-b border-blue-200">
                  Descripción
                </th>
                <th className="py-3 px-5 border-b border-blue-200">Monto</th>
                <th className="py-3 px-5 border-b border-blue-200">Tipo</th>
                <th className="py-3 px-5 border-b border-blue-200">
                  De Cuenta
                </th>
                <th className="py-3 px-5 border-b border-blue-200">A Cuenta</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <td className="py-3 px-5 border-b text-center">
                    {new Date(
                      transaction.transactionDate
                    ).toLocaleDateString() || "N/A"}
                  </td>
                  <td className="py-3 px-5 border-b text-center">
                    {transaction.name}
                  </td>
                  <td className="py-3 px-5 border-b text-center text-green-600 font-semibold">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-5 border-b text-center">
                    {transaction.type}
                  </td>
                  <td className="py-3 px-5 border-b text-center">
                    {transaction.originAcc}
                  </td>
                  <td className="py-3 px-5 border-b text-center">
                    {transaction.targetAcc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="self-center text-lg">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
