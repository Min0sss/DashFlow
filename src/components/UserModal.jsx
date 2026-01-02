import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function UserModal({ open, mode, initialUser, onClose, onSave, isSaving }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Analyst",
    status: "Active",
  });

  useEffect(() => {
    if (open && initialUser) {
      setFormData(initialUser);
    } else if (open) {
      setFormData({
        name: "",
        email: "",
        role: "Analyst",
        status: "Active",
      });
    }
  }, [open, initialUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-md bg-cardDark border border-white/10 rounded-2xl p-6 shadow-2xl"
          >
            <h3 className="text-lg font-bold mb-4 text-textDark">
              {mode === "edit" ? "Edit Member" : "Add Team Member"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full name"
                className="w-full px-4 py-2 rounded-xl bg-bgDark border border-white/10 outline-none text-textDark"
                required
                disabled={isSaving} 
              />

              <input
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
                type="email"
                className="w-full px-4 py-2 rounded-xl bg-bgDark border border-white/10 outline-none text-textDark"
                required
                disabled={isSaving}
              />

              <div className="grid grid-cols-2 gap-3">
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-bgDark border border-white/10 text-textMuted cursor-pointer"
                  disabled={isSaving}
                >
                  <option>Analyst</option>
                  <option>Operator</option>
                  <option>Manager</option>
                  <option>Admin</option>
                </select>

                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-bgDark border border-white/10 text-textMuted cursor-pointer"
                  disabled={isSaving}
                >
                  <option>Active</option>
                  <option>Suspended</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-textMuted hover:text-textDark disabled:opacity-50"
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-primary hover:bg-primaryHover text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}