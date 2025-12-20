import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useData } from "../context/DataContext.jsx";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import ClientModal from "./ClientModal.jsx";
import ConfirmDelete from "./ConfirmDelete.jsx";

export default function ClientsPage() {
  const { clients, addClient, editClient, deleteClient } = useData();
  
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedClient, setSelectedClient] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  const statusOptions = ["All", "Active", "Inactive"];

  const filteredClients = useMemo(() => {
    let data = [...clients];
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.email.toLowerCase().includes(q)
      );
    }
    if (filterStatus !== "All") {
      data = data.filter(c => (c.status === "Active" || c.status === "Activo" ? "Active" : "Inactive") === filterStatus);
    }
    return data;
  }, [clients, search, filterStatus]);

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredClients);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Clients");
    XLSX.writeFile(wb, "clients_report.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Name", "Email", "Phone", "Status"]],
      body: filteredClients.map(c => [c.name, c.email, c.phone, c.status]),
      headStyles: { fillColor: [249, 115, 22] } // Color Naranja Pro
    });
    doc.save("clients_report.pdf");
  };
  const handleSaveClient = (data) => {
    if (modalMode === "add") {
      addClient({ ...data, lastPurchase: new Date().toISOString().slice(0, 10) });
    } else {
      editClient(selectedClient.id, data);
    }
    setModalOpen(false);
  };

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-textDark tracking-tight">Clients</h2>
          <p className="text-sm text-textMuted font-bold uppercase tracking-widest opacity-60">Customer Database</p>
        </div>
        <div className="flex gap-2">
          {}
          <button onClick={exportExcel} className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold transition-all">Excel</button>
          <button onClick={exportPDF} className="px-4 py-2 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary text-xs font-bold transition-all">PDF</button>
          <button onClick={() => { setSelectedClient(null); setModalMode("add"); setModalOpen(true); }} className="px-5 py-2 rounded-xl bg-primary hover:bg-primaryHover text-white text-xs font-black shadow-lg shadow-primary/20 transition-all">+ NEW CLIENT</button>
        </div>
      </header>

      {}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-cardDark p-4 rounded-3xl border border-white/5">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:col-span-2 text-sm px-5 py-3 rounded-2xl bg-bgDark border border-white/5 focus:border-primary/50 outline-none text-textDark placeholder:opacity-30"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 rounded-2xl bg-bgDark border border-white/5 text-sm font-bold text-textDark outline-none cursor-pointer"
        >
          {statusOptions.map(s => <option key={s} value={s} className="bg-cardDark">{s}</option>)}
        </select>
      </section>

      {}
      <div className="bg-cardDark rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-textMuted text-[10px] uppercase tracking-[0.2em] font-black opacity-50">
              <th className="px-8 py-4">Client Info</th>
              <th className="px-8 py-4">Status</th>
              <th className="px-8 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((c) => (
              <tr key={c.id} className="group hover:bg-white/[0.02] transition-all">
                <td className="px-8 py-5 rounded-l-2xl border-y border-l border-white/5 font-bold">
                  <div className="text-textDark text-sm">{c.name}</div>
                  <div className="text-[10px] text-textMuted opacity-60 font-medium">{c.email}</div>
                </td>
                <td className="px-8 py-5 border-y border-white/5">
                  <span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                    c.status === "Active" || c.status === "Activo" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                  }`}>
                    {c.status === "Active" || c.status === "Activo" ? "ACTIVE" : "INACTIVE"}
                  </span>
                </td>
                <td className="px-8 py-5 rounded-r-2xl border-y border-r border-white/5 text-right space-x-4">
                  <button onClick={() => { setSelectedClient(c); setModalMode("edit"); setModalOpen(true); }} className="text-[10px] font-black uppercase text-textMuted hover:text-primary transition-colors">Edit</button>
                  <button onClick={() => { setClientToDelete(c); setConfirmOpen(true); }} className="text-[10px] font-black uppercase text-textMuted hover:text-red-500 transition-colors">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ClientModal 
        open={modalOpen} 
        mode={modalMode} 
        initialClient={selectedClient} 
        onClose={() => setModalOpen(false)} 
        onSave={handleSaveClient} 
      />

      <ConfirmDelete 
        open={confirmOpen} 
        user={clientToDelete} 
        onCancel={() => setConfirmOpen(false)} 
        onConfirm={() => { deleteClient(clientToDelete.id); setConfirmOpen(false); }} 
      />
    </motion.div>
  );
}