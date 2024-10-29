// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./features/auth/users/loginPage";
import RegisterPage from "./features/auth/users/registerPage";
import Dashboard from "./pages/protected/Dashboard";
import ProtectedRoute from "./features/auth/context/ProtectedRoute";
import PublicRoute from "./features/auth/context/PublicRoute";
import HomePrivate from "./pages/protected/homePrivate"; // Asegúrate de que el nombre de la importación coincide con el archivo
import TransferMoney from "./pages/protected/TransferMoney";
import ManageAccount from "./pages/protected/updateBalance"; // Asegúrate de que el nombre de la importación coincide con el archivo
import TransactionHistory from "./pages/protected/TransactionHistory"; // Nueva página
import { AuthProvider } from "./features/auth/context/AuhtContext"; // Corrige el nombre del archivo si es necesario

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route
            path="/about"
            element={
              <PublicRoute>
                <About />
              </PublicRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <PublicRoute>
                <Contact />
              </PublicRoute>
            }
          />
          <Route
            path="/users/loginPage"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/users/registerPage"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          {/* Rutas protegidas */}
          <Route
            path="/homePrivate"
            element={
              <ProtectedRoute>
                <HomePrivate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transferMoney"
            element={
              <ProtectedRoute>
                <TransferMoney />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-balance" // Asegúrate de que el nombre de la ruta coincide con la estructura de tu proyecto
            element={
              <ProtectedRoute>
                <ManageAccount />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transaction-history/:accountNumber" // Nueva ruta para el historial de transacciones
            element={
              <ProtectedRoute>
                <TransactionHistory />
              </ProtectedRoute>
            }
          />
          {/* Ruta para manejar páginas no encontradas */}
          <Route path="*" element={<h1>Página no encontrada</h1>} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
