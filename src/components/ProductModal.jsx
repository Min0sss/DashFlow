import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Agregamos 'isSaving' a las props
export default function ProductModal({ open, mode, initialProduct, onClose, onSave, isSaving }) {
  const [formData, setFormData] = useState({ name: "", category: "Services", price: 0, stock: 0, status: "Disponible" });

  useEffect(() => {
    if (initialProduct) setFormData(initialProduct);
    else setFormData({ name: "", category: "Services", price: 0, stock: 0, status: "Disponible" });
  }, [initialProduct, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md bg-cardDark border border-white/10 rounded-3xl p-8 shadow-2xl">
        <h3 className="text-xl font-black mb-6 text-textDark tracking-tight">{mode === "edit" ? "Edit Product" : "New Product"}</h3>
        
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest text-textMuted font-black">Product Name</label>
            <input 
              required 
              type="text" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              disabled={isSaving}
              className="w-full px-4 py-3 rounded-2xl bg-bgDark border border-white/5 focus:border-primary outline-none text-sm transition-all shadow-inner disabled:opacity-50" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest text-textMuted font-black">Category</label>
            <select 
              value={formData.category} 
              onChange={(e) => setFormData({...formData, category: e.target.value})} 
              disabled={isSaving}
              className="w-full px-4 py-3 rounded-2xl bg-bgDark border border-white/5 focus:border-primary outline-none text-sm cursor-pointer appearance-none disabled:opacity-50"
            >
              {["Services", "Subscriptions", "Software", "Equipment", "Tools"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-textMuted font-black">Price ($)</label>
              <input 
                required 
                type="number" 
                step="0.01" 
                value={formData.price} 
                onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})} 
                disabled={isSaving}
                className="w-full px-4 py-3 rounded-2xl bg-bgDark border border-white/5 focus:border-primary outline-none text-sm shadow-inner disabled:opacity-50" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-textMuted font-black">Stock</label>
              <input 
                required 
                type="number" 
                value={formData.stock} 
                onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})} 
                disabled={isSaving}
                className="w-full px-4 py-3 rounded-2xl bg-bgDark border border-white/5 focus:border-primary outline-none text-sm shadow-inner disabled:opacity-50" 
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest text-textMuted font-black">Inventory Status</label>
            <select 
              value={formData.status} 
              onChange={(e) => setFormData({...formData, status: e.target.value})} 
              disabled={isSaving}
              className="w-full px-4 py-3 rounded-2xl bg-bgDark border border-white/5 focus:border-primary outline-none text-sm cursor-pointer disabled:opacity-50"
            >
              <option value="Disponible">Available</option>
              <option value="Agotado">Out of Stock</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-white/5">
            <button 
              type="button" 
              onClick={onClose} 
              disabled={isSaving}
              className="px-5 py-2 text-sm font-bold text-textMuted hover:text-textDark transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSaving}
              className="px-8 py-2.5 bg-primary hover:bg-primaryHover text-white rounded-2xl text-sm font-black shadow-lg shadow-primary/20 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSaving ? "Saving..." : (mode === "edit" ? "Save Changes" : "Create Product")}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}