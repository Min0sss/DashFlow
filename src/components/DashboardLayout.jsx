import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function DashboardLayout({ user, onLogout, children }) {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavLink = ({ to, label }) => {
    const isActive = pathname === to || pathname.startsWith(to + "/");
    
    return (
      <Link
        to={to}
        onClick={() => setMobileOpen(false)}
        className={`block px-4 py-3 rounded-2xl transition-all duration-300 text-sm ${
          isActive
            ? "bg-primary text-white font-black shadow-xl shadow-primary/20 scale-[1.02]"
            : "text-textMuted hover:bg-white/[0.03] hover:text-textDark font-bold"
        }`}
      >
        <div className="flex items-center gap-3">
          {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />}
          {label}
        </div>
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen bg-bgDark text-textDark font-sans selection:bg-primary/30">
      {}
      <aside className="hidden md:flex md:flex-col w-72 bg-bgDark border-r border-white/5 shadow-2xl">
        <div className="px-10 py-10">
          <div className="text-3xl font-black tracking-tighter text-primary flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-bgDark text-lg">D</div>
            DashFlow
          </div>
        </div>

        <nav className="flex-1 px-6 space-y-2">
          <NavLink to="/dashboard" label="Overview" />
          <NavLink to="/users" label="Users" />
          <NavLink to="/clients" label="Clients" />
          <NavLink to="/products" label="Products" />
          <NavLink to="/orders" label="Orders" />
          <NavLink to="/reports" label="Reports" />
          <NavLink to="/activity" label="Activity" />
        </nav>

        <div className="p-6 m-6 rounded-3xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-primary/20">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="overflow-hidden">
              <div className="font-black text-xs truncate tracking-tight">{user?.name || "User Name"}</div>
              <div className="text-[10px] text-textMuted font-bold truncate opacity-60 uppercase tracking-tighter">{user?.email || "user@dashflow.com"}</div>
            </div>
          </div>
        </div>
      </aside>

      {}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md md:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {}
      <aside
        className={`fixed z-[70] inset-y-0 left-0 w-80 bg-bgDark border-r border-white/10 transform transition-all duration-500 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0 opacity-100 shadow-[0_0_50px_rgba(0,0,0,0.5)]" : "-translate-x-full opacity-0"
        }`}
      >
        <div className="px-10 py-12 text-3xl font-black text-primary tracking-tighter flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-bgDark text-xl">D</div>
          DashFlow
        </div>
        <nav className="px-6 space-y-3">
          <NavLink to="/dashboard" label="Overview" />
          <NavLink to="/users" label="Users" />
          <NavLink to="/clients" label="Clients" />
          <NavLink to="/products" label="Products" />
          <NavLink to="/orders" label="Orders" />
          <NavLink to="/reports" label="Reports" />
          <NavLink to="/activity" label="Activity" />
        </nav>
      </aside>

      {}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-5 bg-bgDark/60 backdrop-blur-2xl border-b border-white/5">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-3 hover:bg-white/5 rounded-2xl transition-all active:scale-90"
          >
            <div className="w-6 h-0.5 bg-textDark mb-1.5 rounded-full" />
            <div className="w-4 h-0.5 bg-primary mb-1.5 rounded-full" />
            <div className="w-6 h-0.5 bg-textDark rounded-full" />
          </button>

          <div className="hidden md:block text-[10px] font-black uppercase tracking-[0.3em] text-textMuted opacity-40">
            System Operational V 1.0
          </div>

          <button
            onClick={onLogout}
            className="text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-2xl bg-white/5 hover:bg-red-500 hover:text-white transition-all duration-300 border border-white/5 shadow-sm active:scale-95"
          >
            Sign Out
          </button>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
          <div className="max-w-[1600px] mx-auto p-6 md:p-10 lg:p-16">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}