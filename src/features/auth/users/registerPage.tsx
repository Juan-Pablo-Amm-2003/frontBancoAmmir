// src/pages/RegisterPage.tsx
import React, { useState } from "react";
import { registerUser } from "../../../services/userApi";
import { User } from "../../../types/User"; // Importar la interfaz

const RegisterPage = () => {
  const [user, setUser] = useState<User>({
    username: "",
    DNI: "",
    pass: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await registerUser(user);
      setMessage("Registro exitoso");
      console.log("Usuario registrado:", data);
    } catch (error) {
      console.error("Error en el registro", error);
      setMessage("Error al registrar usuario");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Registro de Usuario</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 py-6"
      >
        <input
          name="username"
          value={user.username}
          onChange={handleChange}
          placeholder="Nombre de Usuario"
          required
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          name="DNI"
          value={user.DNI}
          onChange={handleChange}
          placeholder="DNI"
          required
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          name="pass"
          type="password"
          value={user.pass}
          onChange={handleChange}
          placeholder="Contraseña"
          required
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Registrar
        </button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default RegisterPage;
