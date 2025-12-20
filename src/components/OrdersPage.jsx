import { useState } from "react";
import { motion } from "framer-motion";
import { useData } from "../context/DataContext.jsx";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import OrderModal from "./OrderModal.jsx";
import ConfirmDelete from "./ConfirmDelete.jsx";

export default function OrdersPage() {
  const { orders, deleteOrder } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const enrichedOrders = orders.map((o) => ({
    ...o,
    items: Array.isArray(o.items) ? o.items : [],
  }));

  const exportToExcel = () => {
    const rows = enrichedOrders.map((o) => ({
      ID: o.id,
      Client: o.client?.name || "—",
      Items: o.items.map((i) => `${i.name} (x${i.qty})`).join(", "),
      Total: o.total,
      Status: o.status,
      Date: o.date,
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");
    XLSX.writeFile(wb, "orders_report.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Orders Report", 14, 15);
    autoTable(doc, {
      head: [["ID", "Client", "Items", "Total", "Status", "Date"]],
      body: enrichedOrders.map((o) => [
        o.id,
        o.client?.name || "—",
        o.items.map((i) => `${i.name} (x${i.qty})`).join(", "),
        "$" + o.total,
        o.status,
        o.date,
      ]),
      startY: 25,
      headStyles: { fillColor: [249, 115, 22] }
    });
    doc.save("orders_report.pdf");
  };

  return (
    <>
      <motion.div className="space-y-6" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-textDark tracking-tight">Orders</h2>
            <p className="text-sm text-textMuted">Monitor and manage all customer transactions.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={exportToExcel} className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-xs font-medium transition-colors">Excel</button>
            <button onClick={exportToPDF} className="px-4 py-2 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10 text-xs font-medium transition-colors">PDF</button>
            <button onClick={() => setModalOpen(true)} className="px-5 py-2 rounded-xl bg-primary hover:bg-primaryHover text-white text-xs font-bold shadow-lg shadow-primary/20 transition-all">+ New Order</button>
          </div>
        </header>

        <div className="bg-cardDark rounded-2xl border border-white/5 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="text-[10px] text-textMuted uppercase tracking-widest border-b border-white/5 bg-white/[0.01]">
                  <th className="px-6 py-4 font-bold">ID</th>
                  <th className="px-6 py-4 font-bold">Client</th>
                  <th className="px-6 py-4 font-bold">Items</th>
                  <th className="px-6 py-4 font-bold">Total</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium">
                {enrichedOrders.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-textMuted">No orders recorded.</td></tr>
                ) : (
                  enrichedOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-5 text-primary font-bold">#{o.id}</td>
                      <td className="px-6 py-5 text-textDark">{o.client?.name}</td>
                      <td className="px-6 py-5 text-textMuted max-w-xs truncate">
                        {o.items.map((i, idx) => (
                          <span key={idx}>{i.name} (x{i.qty}){idx < o.items.length - 1 ? ", " : ""}</span>
                        ))}
                      </td>
                      <td className="px-6 py-5 text-textDark font-bold">${o.total}</td>
                      <td className="px-6 py-5">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide ${
                          o.status === "Pagado" || o.status === "Paid" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                        }`}>
                          {o.status === "Pagado" ? "PAID" : "PENDING"}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button onClick={() => { setOrderToDelete(o); setConfirmOpen(true); }} className="text-textMuted hover:text-red-500 transition-colors font-bold uppercase text-[10px]">Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      <OrderModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <ConfirmDelete open={confirmOpen} user={{name: `Order #${orderToDelete?.id}`}} onCancel={() => setConfirmOpen(false)} onConfirm={() => { deleteOrder(orderToDelete.id); setConfirmOpen(false); }} />
    </>
  );
}