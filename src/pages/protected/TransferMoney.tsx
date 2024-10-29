import React, { useEffect, useState } from "react";
import { transferMoney } from "../../services/transactionService";
import { getAccountsByUserId } from "../../services/accountApi"; // Función para obtener cuentas
import { Account } from "../../types/Account";
import { useAuth } from "../../features/auth/context/AuhtContext"; // Corrección de la importación

const TransferMoney: React.FC = () => {
  const { user } = useAuth(); // Obtención de datos del usuario
  const userId = user?.id; // ID del usuario
  const [userAccounts, setUserAccounts] = useState<Account[]>([]);
  const [originAcc, setOriginAcc] = useState<number | null>(null);
  const [targetAcc, setTargetAcc] = useState<number | null>(null); // Cambiado a number
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserAccounts = async () => {
      if (userId) {
        try {
          const accounts = await getAccountsByUserId(userId); // Obtención de cuentas
          setUserAccounts(accounts);
        } catch (error) {
          console.error("Error al obtener cuentas del usuario:", error);
          setError("No se pueden cargar las cuentas en este momento.");
        }
      }
    };

    fetchUserAccounts();
  }, [userId]);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (amount <= 0) {
      setError("El monto debe ser un número positivo.");
      return;
    }
    if (originAcc === null) {
      setError("Debe seleccionar una cuenta de origen.");
      return;
    }
    if (originAcc === targetAcc) {
      // Comparar como number
      setError("Las cuentas de origen y destino deben ser diferentes.");
      return;
    }

    const transferData = {
      originAcc,
      targetAcc: targetAcc as number, // Asegurarse de que targetAcc sea number
      amount,
    };

    setLoading(true);

    try {
      await transferMoney(transferData);
      setSuccess("Transferencia realizada con éxito.");
      resetForm();
    } catch (error) {
      console.error("Error en la transferencia:", error);
      setError(
        "Error al realizar la transferencia. Intenta nuevamente más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setOriginAcc(null);
    setTargetAcc(null); // Reiniciar a null
    setAmount(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="container max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Transferir Dinero
        </h1>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Información del Usuario</h2>
          <p>Bienvenido, {user?.username}</p>
          <p>ID: {user?.id}</p>
          <p>DNI: {user?.DNI}</p>
        </div>
        <form onSubmit={handleTransfer} className="space-y-4">
          <select
            value={originAcc !== null ? originAcc : ""}
            onChange={(e) => setOriginAcc(Number(e.target.value))} // Asegúrate de convertir a number
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            required
          >
            <option value="" disabled>
              Selecciona tu cuenta de origen
            </option>
            {userAccounts.map((account) => {
              const balance =
                typeof account.balance === "string"
                  ? parseFloat(account.balance)
                  : account.balance; // Convertir a número si es necesario
              return (
                <option key={account.nCuenta} value={account.nCuenta}>
                  Cuenta {account.nCuenta} - Balance: $
                  {isNaN(balance) ? "Error" : balance.toFixed(2)}
                </option>
              );
            })}
          </select>

          <input
            type="text" // Mantener como text para aceptar cualquier formato
            placeholder="Número de Cuenta de Destino"
            value={targetAcc !== null ? targetAcc.toString() : ""}
            onChange={(e) =>
              setTargetAcc(e.target.value ? Number(e.target.value) : null)
            } // Guardar como number
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            required
          />
          <input
            type="number"
            placeholder="Monto"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            required
          />
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
          <button
            type="submit"
            className={`w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-200 ease-in-out ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Procesando..." : "Transferir"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransferMoney;
