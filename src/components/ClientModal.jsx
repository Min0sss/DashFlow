import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ClientModal({ open, mode, initialClient, onClose, onSave, isSaving }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "Peru",
    status: "Active"
  });

  useEffect(() => {
    if (initialClient) {
      setFormData(initialClient);
    } else {
      setFormData({ 
        name: "", 
        email: "", 
        phone: "", 
        country: "Peru", 
        status: "Active" 
      });
    }
  }, [initialClient, open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-md bg-cardDark border border-white/10 rounded-2xl p-6 shadow-2xl"
        >
          <header className="mb-6">
            <h3 className="text-xl font-bold text-textDark">
              {mode === "edit" ? "Update Client Info" : "Register New Client"}
            </h3>
            <p className="text-xs text-textMuted">Please fill in the required information below.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-textMuted font-bold block ml-1">Full Name</label>
              <input 
                type="text" 
                required 
                value={formData.name || ""} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                placeholder="e.g. John Doe"
                disabled={isSaving}
                className="w-full px-4 py-2.5 rounded-xl bg-bgDark border border-white/10 focus:border-primary outline-none text-sm text-textDark transition-all disabled:opacity-50" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-textMuted font-bold block ml-1">Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={formData.email || ""} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  placeholder="john@example.com"
                  disabled={isSaving}
                  className="w-full px-4 py-2.5 rounded-xl bg-bgDark border border-white/10 focus:border-primary outline-none text-sm text-textDark transition-all disabled:opacity-50" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-textMuted font-bold block ml-1">Phone Number</label>
                <input 
                  type="text" 
                  value={formData.phone || ""} 
                  onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                  placeholder="+51 999..."
                  disabled={isSaving}
                  className="w-full px-4 py-2.5 rounded-xl bg-bgDark border border-white/10 focus:border-primary outline-none text-sm text-textDark transition-all disabled:opacity-50" 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-textMuted font-bold block ml-1">Country</label>
                <input 
                  type="text" 
                  value={formData.country || ""} 
                  onChange={(e) => setFormData({...formData, country: e.target.value})} 
                  disabled={isSaving}
                  className="w-full px-4 py-2.5 rounded-xl bg-bgDark border border-white/10 focus:border-primary outline-none text-sm text-textDark disabled:opacity-50" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-textMuted font-bold block ml-1">Status</label>
                <select 
                  value={formData.status || "Active"} 
                  onChange={(e) => setFormData({...formData, status: e.target.value})} 
                  disabled={isSaving}
                  className="w-full px-4 py-2.5 rounded-xl bg-bgDark border border-white/10 focus:border-primary outline-none text-sm text-textDark cursor-pointer appearance-none disabled:opacity-50"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-white/5 mt-4">
              <button 
                type="button" 
                onClick={onClose} 
                disabled={isSaving}
                className="px-5 py-2 text-sm font-medium text-textMuted hover:text-textDark transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={isSaving}
                className="px-6 py-2 bg-primary hover:bg-primaryHover text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSaving ? "Saving..." : (mode === "edit" ? "Save Changes" : "Create Client")}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}