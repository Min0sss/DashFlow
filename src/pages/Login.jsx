import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; 
import { supabase } from "../supabase/client"; 

export default function Login() { 
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); 
  
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); 
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!username || !password || (isSignUp && !email)) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (authError) throw new Error(authError.message);
        if (!authData.user) throw new Error("Registration failed. Please try again.");
        const { error: profileError } = await supabase
          .from('users')
          .insert([{ 
            id: authData.user.id, 
            email: email,
            username: username,
            name: username,
            role: 'Admin',
            status: 'Active',
            owner_id: authData.user.id
          }]);
            
        if (profileError) {
          
          await supabase.auth.signOut();
          throw new Error("Database Error: " + profileError.message);
        }

        await supabase.auth.signOut();

        setSuccess("Account created successfully! Please sign in.");
        setIsSignUp(false); 
        setPassword("");    

      } else {

        const { data: emailData, error: rpcError } = await supabase
          .rpc('get_email_by_username', { username_input: username });

        if (rpcError) throw new Error("System Error: " + rpcError.message);
        
        if (!emailData) {
          throw new Error("Username not found. Please register first.");
        }

        const result = await supabase.auth.signInWithPassword({
          email: emailData,
          password,
        });

        if (result.error) throw new Error("Incorrect password.");
        
        navigate("/"); 
      }

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgDark px-4 selection:bg-primary/30">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-cardDark border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
      >
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
            {isSignUp ? "Create New Access" : "Enterprise Management System"}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-textMuted uppercase tracking-widest ml-1">
              Username
            </label>
            <input
              type="text"
              placeholder="e.g. admin_master"
              className="w-full rounded-2xl border border-white/5 bg-bgDark text-textDark px-5 py-4 text-sm outline-none focus:border-primary/50 transition-all shadow-inner placeholder:opacity-20"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              autoFocus
            />
          </div>
          <AnimatePresence>
            {isSignUp && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-2 overflow-hidden"
              >
                <label className="text-[10px] font-black text-textMuted uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full rounded-2xl border border-white/5 bg-bgDark text-textDark px-5 py-4 text-sm outline-none focus:border-primary/50 transition-all shadow-inner placeholder:opacity-20"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </motion.div>
            )}
          </AnimatePresence>

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
              disabled={loading}
            />
          </div>
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-center"
              >
                <p className="text-[11px] font-bold text-red-500">{error}</p>
              </motion.div>
            )}

            {success && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center"
              >
                <p className="text-[11px] font-bold text-emerald-400">{success}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 rounded-2xl bg-primary hover:bg-primaryHover text-white text-xs font-black uppercase tracking-[0.2em] py-4 transition-all shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "PROCESSING..." : (isSignUp ? "CREATE ACCOUNT" : "SIGN IN TO DASHBOARD")}
          </button>
        </form>

        <footer className="relative z-10 mt-8 text-center space-y-4">
          <button 
            onClick={() => { 
                setIsSignUp(!isSignUp); 
                setError(""); 
                setSuccess("");
            }}
            className="text-[10px] font-bold text-textMuted hover:text-primary uppercase tracking-wider transition-colors"
          >
            {isSignUp ? "Already have an ID? Sign In" : "Don't have an account? Create one"}
          </button>

          <p className="text-[10px] text-textMuted opacity-50 mt-8">
    © 2026 DashFlow System • Developed by <a href="https://dash-flow-eight.vercel.app/" target="_blank" className="text-primary hover:underline">Guillermo Contreras</a>
  </p>
          
        </footer>
      </motion.div>
    </div>
  );
}