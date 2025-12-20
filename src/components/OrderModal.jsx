import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../context/DataContext.jsx";

export default function OrderModal({ open, onClose }) {
  const { clients, products, addOrder } = useData();
  const [clientId, setClientId] = useState("");
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("Pending");

  if (!open) return null;

  const addItem = () => setItems([...items, { productId: "", qty: 1 }]);
  const removeItem = (idx) => setItems(items.filter((_, i) => i !== idx));
  const updateItem = (index, key, value) => {
    const updated = [...items];
    updated[index][key] = value;
    setItems(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const client = clients.find((c) => c.id == clientId);
    const fullItems = items.map((i) => {
      const prod = products.find((p) => p.id == i.productId);
      return { name: prod.name, qty: Number(i.qty), price: prod.price };
    });
    const total = fullItems.reduce((acc, it) => acc + it.qty * it.price, 0);

    addOrder({
      client: { name: client.name },
      items: fullItems,
      total,
      status,
      date: new Date().toISOString().slice(0, 10),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-lg bg-cardDark border border-white/10 rounded-2xl p-6 shadow-2xl">
        <h3 className="text-xl font-bold mb-6 text-textDark">Create New Order</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest text-textMuted font-bold">Select Client</label>
            <select required value={clientId} onChange={(e) => setClientId(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-bgDark border border-white/10 text-sm outline-none focus:border-primary cursor-pointer">
              <option value="">Choose a client...</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-widest text-textMuted font-bold">Order Items</label>
            {items.map((it, idx) => (
              <div key={idx} className="flex gap-2 animate-in fade-in slide-in-from-left-2">
                <select required value={it.productId} onChange={(e) => updateItem(idx, "productId", e.target.value)} className="flex-1 px-3 py-2 rounded-xl bg-bgDark border border-white/10 text-xs outline-none focus:border-primary">
                  <option value="">Product...</option>
                  {products.map(p => <option key={p.id} value={p.id}>{p.name} (${p.price})</option>)}
                </select>
                <input type="number" min="1" value={it.qty} onChange={(e) => updateItem(idx, "qty", e.target.value)} className="w-20 px-3 py-2 rounded-xl bg-bgDark border border-white/10 text-xs outline-none focus:border-primary" />
                <button type="button" onClick={() => removeItem(idx)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors">✕</button>
              </div>
            ))}
            <button type="button" onClick={addItem} className="text-[10px] font-bold uppercase tracking-widest text-primary hover:text-primaryHover transition-colors">+ Add Item</button>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest text-textMuted font-bold">Payment Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-bgDark border border-white/10 text-sm outline-none focus:border-primary cursor-pointer">
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-textMuted hover:text-textDark">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-primary hover:bg-primaryHover text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20">Save Order</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}