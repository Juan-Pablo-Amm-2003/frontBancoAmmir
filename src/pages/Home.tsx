// src/Home.tsx
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-6 shadow-md">
        <h1 className="text-4xl font-extrabold text-center">
          Bienvenido a Banco Ammir
        </h1>
      </header>
      <main className="flex-grow p-8 md:p-12 lg:p-16">
        <h2 className="text-3xl font-semibold mb-4 text-center">
          Tu banco, tu forma
        </h2>
        <p className="text-gray-700 mb-6 text-lg text-center md:max-w-2xl mx-auto">
          Ofrecemos una variedad de servicios financieros para ayudarte a
          manejar tu dinero con facilidad.
        </p>
        <div className="text-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-105">
            Explora nuestros servicios
          </button>
        </div>
      </main>
      <footer className="bg-blue-600 text-white p-4 text-center">
        &copy; 2024 Banco Ammir. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Home;
