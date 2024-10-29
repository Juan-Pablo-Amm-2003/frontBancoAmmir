import React, { useEffect, useState } from "react";
import { useAuth } from "../../features/auth/context/AuhtContext"; // Make sure the context name is correct
import {
  updateAccountBalance,
  getAccountsByUserId,
} from "../../services/accountApi";
import { Account } from "../../types/Account";

const ManageAccount: React.FC = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null
  );
  const [amount, setAmount] = useState<number>(0);
  const [operation, setOperation] = useState<"deposit" | "withdraw">("deposit");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadAccounts = async () => {
      if (user?.id) {
        try {
          const fetchedAccounts: Account[] = await getAccountsByUserId(user.id);
          setAccounts(fetchedAccounts);
          if (fetchedAccounts.length > 0) {
            setSelectedAccountId(fetchedAccounts[0].id.toString());
          }
        } catch (error) {
          console.error("Error fetching accounts:", error);
          setError("Error fetching accounts. Please try again later.");
        }
      }
    };

    loadAccounts();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);

    if (!selectedAccountId) {
      setError("No se pudo encontrar la cuenta seleccionada.");
      setLoading(false);
      return;
    }

    const accountId = Number(selectedAccountId); // Convertir a número

    if (amount <= 0) {
      setError("El monto debe ser mayor que cero.");
      setLoading(false);
      return;
    }

    try {
      const response = await updateAccountBalance(accountId, amount, operation);
      if (response && typeof response.balance === "string") {
        setMessage(
          `Operación exitosa. Nuevo balance: ${parseFloat(
            response.balance
          ).toFixed(2)}`
        );
      } else {
        setError("Error al obtener el nuevo balance. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al realizar la operación:", error);
      setError("Error al realizar la operación. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Administrar Cuenta
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={selectedAccountId || ""}
          onChange={(e) => setSelectedAccountId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Selecciona una cuenta
          </option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id.toString()}>
              {account.nCuenta}
            </option>
          ))}
        </select>

        <select
          value={operation}
          onChange={(e) =>
            setOperation(e.target.value as "deposit" | "withdraw")
          }
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="deposit">Depositar</option>
          <option value="withdraw">Retirar</option>
        </select>

        <input
          type="number"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {error && <p className="text-red-500 text-center">{error}</p>}
        {message && <p className="text-green-500 text-center">{message}</p>}

        <button
          type="submit"
          className={`w-full px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-200 ease-in-out ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Procesando..." : "Confirmar"}
        </button>
      </form>
    </div>
  );
};

export default ManageAccount;
