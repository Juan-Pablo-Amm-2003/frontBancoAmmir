// src/hooks/useAccounts.ts
import { useEffect, useState } from "react";
import { getAccountsByUserId } from "../services/accountApi";
import AuthService from "../features/auth/users/authService";
import { Account } from "../types/Account";

const useAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      setError(null);
      try {
        const user = AuthService.getUser();
        if (user && user.id) {
          const accountsData = await getAccountsByUserId(user.id.toString());
          setAccounts(accountsData);
        } else {
          setAccounts([]);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  return { accounts, loading, error, setAccounts }; // Asegúrate de retornar setAccounts aquí
};

export default useAccounts;
