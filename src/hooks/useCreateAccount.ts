import { useState } from "react";
import { createAccount } from "../services/accountApi"; // Ajusta la ruta si es necesario
import AuthService from "../features/auth/users/authService"; // Asegúrate de la ruta correcta
import { Account } from "../types/Account"; // Ajusta la ruta si es necesario

const useCreateAccount = () => {
  const [accountData, setAccountData] = useState<Account | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateAccount = async () => {
    setLoading(true);
    setError(null); // Resetea el error al inicio

    const user = AuthService.getUser();

    if (!user || !user.id) {
      const errorMessage = "Debes estar autenticado para crear una cuenta.";
      console.error(errorMessage);
      setError(errorMessage);
      setLoading(false);
      return;
    }

    try {
      const newAccount = await createAccount({
        userId: user.id,
        balance: 0.0,
        nCuenta: Math.floor(Math.random() * 1000000),
        creationDate: new Date(),
      });
      setAccountData(newAccount);
    } catch (error: unknown) {
      let errorMessage =
        "Hubo un problema al crear la cuenta. Intenta de nuevo.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error("Error al crear la cuenta:", errorMessage); // Log detallado del error
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { accountData, loading, error, handleCreateAccount };
};

export default useCreateAccount;
