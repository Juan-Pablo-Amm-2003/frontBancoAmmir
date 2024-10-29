// src/Contact.tsx
import React from "react";

const Contact: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-700 text-white p-6 shadow-md">
        <h1 className="text-4xl font-bold">Contáctanos</h1>
      </header>
      <main className="flex-grow p-8">
        <h2 className="text-3xl font-semibold mb-6 text-blue-700">
          Estamos aquí para ayudarte
        </h2>
        <form className="bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-6">
            <label className="block text-gray-800 mb-2">Nombre:</label>
            <input
              type="text"
              className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu nombre"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 mb-2">
              Correo Electrónico:
            </label>
            <input
              type="email"
              className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu correo electrónico"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 mb-2">Mensaje:</label>
            <textarea
              className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Escribe tu mensaje"
              rows={4}
              required
            />
          </div>
          <button className="bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition duration-200">
            Enviar Mensaje
          </button>
        </form>
      </main>
      <footer className="bg-blue-700 text-white p-4 text-center shadow-md">
        &copy; 2024 Banco Ammir. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Contact;
