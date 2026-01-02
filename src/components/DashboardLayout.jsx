import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({ children, user, onLogout }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: "Overview", path: "/dashboard", icon: "📊" },
    { name: "Team", path: "/users", icon: "🛡️" },
    { name: "Clients", path: "/clients", icon: "👥" },
    { name: "Products", path: "/products", icon: "📦" },
    { name: "Orders", path: "/orders", icon: "🛒" },
    { name: "Reports", path: "/reports", icon: "📈" },
    { name: "Activity", path: "/activity", icon: "🔔" },
  ];
  const SidebarContent = () => (
    <>
      <div className="p-8 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-black font-black text-lg shadow-glow">
            D
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">DashFlow</h1>
        </div>
        <p className="text-xs text-textMuted mt-3 ml-1 tracking-widest uppercase opacity-60">
          System Operational v 2.0
        </p>
        <div className="mt-4 pt-4 border-t border-white/5 text-center">
  <p className="text-[10px] text-textMuted opacity-40">
    Designed & Built by <span className="text-primary font-bold hover:text-white transition-colors cursor-pointer">Guillermo Contreras</span>
  </p>
</div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path}
              onClick={() => setMobileMenuOpen(false)} 
            >
              <div 
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-200 group relative
                  ${isActive 
                    ? "text-white bg-white/5" 
                    : "text-textMuted hover:text-white hover:bg-white/[0.02]"
                  }
                `}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute left-0 w-1.5 h-8 bg-primary rounded-r-full"
                  />
                )}
                <span className={`text-xl opacity-70 ${isActive ? "opacity-100" : "group-hover:opacity-100"}`}>
                  {item.icon}
                </span>
                {item.name}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/5 bg-black/20">
        <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-orange-900 flex items-center justify-center text-sm font-bold text-white border-2 border-white/10 group-hover:border-primary/50 transition-colors">
            {user.name?.substring(0, 2).toUpperCase() || "U"}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-white truncate">{user.name}</p>
            <p className="text-xs text-textMuted truncate opacity-60 group-hover:opacity-100">{user.email}</p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full mt-4 py-3 text-xs font-black uppercase tracking-widest text-red-500/70 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
        >
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen text-textDark font-sans selection:bg-primary/30">
      <aside className="hidden md:flex w-72 bg-black/50 backdrop-blur-xl border-r border-white/5 flex-col fixed h-full z-20">
        <SidebarContent />
      </aside>
      <div className="md:hidden fixed top-0 left-0 right-0 h-20 bg-[#09090b]/95 backdrop-blur-xl border-b border-white/5 z-40 flex items-center px-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-black font-black text-sm">D</div>
          <h1 className="text-xl font-bold text-white">DashFlow</h1>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 z-50 md:hidden backdrop-blur-sm"
            />
            
            <motion.aside 
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-80 bg-[#09090b] border-r border-white/10 z-[60] md:hidden flex flex-col shadow-2xl"
            >
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                className="absolute top-6 right-6 p-2 text-white/50 hover:text-white bg-white/5 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              
              <div className="mt-4 h-full flex flex-col">
                 <SidebarContent />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      <main className="flex-1 ml-0 md:ml-72 p-6 md:p-10 pt-28 md:pt-10 relative w-full overflow-x-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="w-full max-w-none relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}