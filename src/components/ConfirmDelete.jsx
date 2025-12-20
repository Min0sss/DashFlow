import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmDelete({ open, user, onCancel, onConfirm }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-sm rounded-3xl bg-cardDark border border-red-500/10 p-8 shadow-2xl text-center"
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Warning Icon Container */}
            <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-10 w-10" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                />
              </svg>
            </div>

            <h3 className="text-2xl font-bold text-textDark mb-3 tracking-tight">
              Are you sure?
            </h3>

            <p className="text-sm text-textMuted mb-8 leading-relaxed">
              You are about to delete <span className="text-textDark font-bold">{user?.name || "this item"}</span>. 
              This action is permanent and cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 px-4 py-3 rounded-2xl border border-white/5 text-sm font-bold hover:bg-white/5 text-textMuted hover:text-textDark transition-all active:scale-95"
              >
                Cancel
              </button>

              <button
                onClick={onConfirm}
                className="flex-1 px-4 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white text-sm font-black shadow-lg shadow-red-600/20 transition-all active:scale-95"
              >
                Yes, Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}