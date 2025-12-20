import { useState } from "react";
import { motion } from "framer-motion";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    onLogin({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgDark px-4 selection:bg-primary/30">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-cardDark border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
      >
        {}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />

        <header className="relative z-10 text-center mb-10">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-bgDark text-3xl font-black mx-auto mb-6 shadow-lg shadow-primary/20">
            D
          </div>
          <h1 className="text-3xl font-black text-textDark tracking-tighter mb-2">
            DashFlow <span className="text-primary">PRO</span>
          </h1>
          <p className="text-xs font-bold text-textMuted uppercase tracking-[0.2em] opacity-60">
            Enterprise Management System
          </p>
        </header>

        <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-textMuted uppercase tracking-widest ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full rounded-2xl border border-white/5 bg-bgDark text-textDark px-5 py-4 text-sm outline-none focus:border-primary/50 transition-all shadow-inner placeholder:opacity-20"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-textMuted uppercase tracking-widest ml-1">
              Security Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-2xl border border-white/5 bg-bgDark text-textDark px-5 py-4 text-sm outline-none focus:border-primary/50 transition-all shadow-inner placeholder:opacity-20"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[11px] font-bold text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-center"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full mt-4 rounded-2xl bg-primary hover:bg-primaryHover text-white text-xs font-black uppercase tracking-[0.2em] py-4 transition-all shadow-lg shadow-primary/20 active:scale-[0.98]"
          >
            Sign In to Dashboard
          </button>
        </form>

        <footer className="relative z-10 mt-10 text-center">
          <p className="text-[10px] font-bold text-textMuted uppercase tracking-widest opacity-40">
            Authorized Personnel Only
          </p>
        </footer>
      </motion.div>
    </div>
  );
}