// src/About.tsx
import React from "react";

const About: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-700 text-white p-6 shadow-md">
        <h1 className="text-4xl font-bold">Sobre Nosotros</h1>
      </header>
      <main className="flex-grow p-8">
        <h2 className="text-3xl font-semibold mb-6 text-blue-700">
          Nuestra Misión
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          En Banco Ammir, nos comprometemos a ofrecer servicios financieros de
          alta calidad y accesibles para todos.
        </p>
        <h2 className="text-3xl font-semibold mb-6 text-blue-700">
          Nuestra Visión
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Ser el banco de elección, brindando soluciones innovadoras y
          personalizadas a nuestros clientes.
        </p>
      </main>
      <footer className="bg-blue-700 text-white p-4 text-center shadow-md">
        &copy; 2024 Banco Ammir. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default About;
