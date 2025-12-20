// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

// Pages & Components
import Login from "./pages/Login.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import DashboardHome from "./components/DashboardHome.jsx";
import UsersPage from "./components/UsersPage.jsx";
import ClientsPage from "./components/ClientsPage.jsx";
import ProductsPage from "./components/ProductsPage.jsx";
import OrdersPage from "./components/OrdersPage.jsx";
import ReportsPage from "./components/ReportsPage.jsx";
import ActivityPage from "./components/ActivityPage.jsx";

// Context
import { DataProvider } from "./context/DataContext.jsx";

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = ({ email, password }) => {
    // Login simulado - Ahora en inglés para consistencia
    setUser({ name: "Administrator", email, role: "Admin" });
  };

  const handleLogout = () => setUser(null);

  // Si no hay usuario -> Pantalla de Login con estética Carbon & Amber
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // Componente Auxiliar para no repetir DashboardLayout en cada ruta
  const LayoutWrapper = ({ children }) => (
    <DashboardLayout user={user} onLogout={handleLogout}>
      {children}
    </DashboardLayout>
  );

  return (
    <DataProvider>
      <Routes>
        {/* Redirección inicial */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* Rutas Principales (Traducidas) */}
        <Route path="/dashboard" element={<LayoutWrapper><DashboardHome /></LayoutWrapper>} />
        <Route path="/users" element={<LayoutWrapper><UsersPage /></LayoutWrapper>} />
        <Route path="/clients" element={<LayoutWrapper><ClientsPage /></LayoutWrapper>} />
        <Route path="/products" element={<LayoutWrapper><ProductsPage /></LayoutWrapper>} />
        <Route path="/orders" element={<LayoutWrapper><OrdersPage /></LayoutWrapper>} />
        <Route path="/reports" element={<LayoutWrapper><ReportsPage /></LayoutWrapper>} />
        <Route path="/activity" element={<LayoutWrapper><ActivityPage /></LayoutWrapper>} />

        {/* Catch-all para rutas inexistentes */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </DataProvider>
  );
}