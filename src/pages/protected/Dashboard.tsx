import React, { useEffect, useState } from "react";
import useAccounts from "../../hooks/useAccounts";
import AuthService from "../../features/auth/users/authService";
import useCreateAccount from "../../hooks/useCreateAccount";

const Dashboard: React.FC = () => {
  const { accounts, loading, error, setAccounts } = useAccounts();
  const {
    accountData,
    loading: creating,
    error: createError,
    handleCreateAccount,
  } = useCreateAccount();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const user = AuthService.getUser();
    if (user) {
      setUsername(user.username);
    }
  }, []);

  useEffect(() => {
    if (accountData) {
      setAccounts((prevAccounts) => [...prevAccounts, accountData]);
    }
  }, [accountData, setAccounts]);

  if (loading) return <p className="text-center">Cargando...</p>;
  if (error)
    return (
      <p className="text-red-600 text-center">
        Error al cargar cuentas: {error.message}
      </p>
    );

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Estado del Dashboard:
      </h1>
      {username && (
        <p className="text-xl text-center">¡Bienvenido, {username}!</p>
      )}
      <p className="text-center">Cuentas: {accounts.length}</p>

      {accountData ? (
        <div className="text-center">
          <p className="text-lg">Tu número de cuenta es:</p>
          <p className="font-bold text-2xl">{accountData.nCuenta}</p>
          <p className="text-lg">
            Balance: $
            {typeof accountData.balance === "number"
              ? accountData.balance.toFixed(2)
              : "0.00"}
          </p>
          <p className="text-lg">
            Fecha de Creación:{" "}
            {accountData.creationDate
              ? new Date(accountData.creationDate).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      ) : (
        <div className="text-center">
          {accounts.length < 3 ? (
            <>
              <p>No tienes cuentas. ¿Quieres crear una?</p>
              <button
                onClick={handleCreateAccount}
                disabled={creating}
                className={`mt-4 inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 ease-in-out transform hover:scale-105 ${
                  creating ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {creating ? "Creando cuenta..." : "Crear una Cuenta"}
              </button>
            </>
          ) : (
            <p>Tienes el máximo de 3 cuentas. No puedes crear más.</p>
          )}
          {createError && <p className="text-red-600">{createError}</p>}
        </div>
      )}

      {accounts.length > 0 && (
        <ul className="mt-4">
          {accounts.map((account) => (
            <li
              key={account.id} // Asegúrate de que este valor es único
              className="mb-4 p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
            >
              <p className="font-semibold">
                Número de Cuenta: {account.nCuenta || "N/A"}
              </p>
              <p>
                Balance: $
                {typeof account.balance === "number" && !isNaN(account.balance)
                  ? account.balance.toFixed(2)
                  : "0.00"}{" "}
                {/* Evitar mostrar NaN */}
              </p>
              <p>
                Fecha de Creación:{" "}
                {account.creationDate
                  ? new Date(account.creationDate).toLocaleDateString()
                  : "N/A"}{" "}
                {/* Manejar fechas no válidas */}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
