import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "./supabase/client"; 

import Login from "./pages/Login.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import DashboardHome from "./components/DashboardHome.jsx";
import UsersPage from "./components/UsersPage.jsx";
import ClientsPage from "./components/ClientsPage.jsx";
import ProductsPage from "./components/ProductsPage.jsx";
import OrdersPage from "./components/OrdersPage.jsx";
import ReportsPage from "./components/ReportsPage.jsx";
import ActivityPage from "./components/ActivityPage.jsx";

// YA NO IMPORTAMOS DataContext NI DataProvider 🎉

export default function App() {
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async (userId) => {
      try {
        const { data } = await supabase
          .from('users')
          .select('username')
          .eq('id', userId)
          .single();

        if (data) setUserProfile(data);
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchProfile(session.user.id);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return <div className="min-h-screen bg-bgDark flex items-center justify-center text-primary font-bold animate-pulse">Loading Dashflow...</div>;
  }

  if (!session) {
    return <Login />;
  }

  const userData = {
    name: userProfile?.username || session.user.email.split('@')[0], 
    email: session.user.email,
    role: "Admin" 
  };

  const LayoutWrapper = ({ children }) => (
    <DashboardLayout user={userData} onLogout={handleLogout}>
      {children}
    </DashboardLayout>
  );

  return (
    // YA NO NECESITAMOS <DataProvider> AQUÍ
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* Rutas Protegidas */}
      <Route path="/dashboard" element={<LayoutWrapper><DashboardHome /></LayoutWrapper>} />
      <Route path="/users" element={<LayoutWrapper><UsersPage /></LayoutWrapper>} />
      <Route path="/clients" element={<LayoutWrapper><ClientsPage /></LayoutWrapper>} />
      <Route path="/products" element={<LayoutWrapper><ProductsPage /></LayoutWrapper>} />
      <Route path="/orders" element={<LayoutWrapper><OrdersPage /></LayoutWrapper>} />
      <Route path="/reports" element={<LayoutWrapper><ReportsPage /></LayoutWrapper>} />
      <Route path="/activity" element={<LayoutWrapper><ActivityPage /></LayoutWrapper>} />

      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}