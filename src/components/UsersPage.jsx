import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import UserModal from "./UserModal.jsx";
import ConfirmDelete from "./ConfirmDelete.jsx";
const initialUsers = [
  { 
    id: 1, 
    name: "Juan Perez", 
    email: "juan.perez@empresa.com", 
    role: "Analyst", 
    status: "Active", 
    lastLogin: "2025-12-01" 
  },
  { 
    id: 2, 
    name: "María López", 
    email: "maria.lopez@empresa.com", 
    role: "Manager", 
    status: "Active", 
    lastLogin: "2025-11-30" 
  },
  { 
    id: 3, 
    name: "Carlos Díaz", 
    email: "carlos.diaz@empresa.com", 
    role: "Operator", 
    status: "Suspended", 
    lastLogin: "2025-11-15" 
  },
  { 
    id: 4, 
    name: "Ana Torres", 
    email: "ana.torres@empresa.com", 
    role: "Analyst", 
    status: "Active", 
    lastLogin: "2025-11-28" 
  },
  { 
    id: 5, 
    name: "Guillermo Contreras", 
    email: "g.contreras@dashflow.pro", 
    role: "Admin", 
    status: "Active", 
    lastLogin: "2025-12-19" 
  },
  { 
    id: 6, 
    name: "Laura Schmidt", 
    email: "l.schmidt@empresa.com", 
    role: "Manager", 
    status: "Active", 
    lastLogin: "2025-12-10" 
  },
  { 
    id: 7, 
    name: "Ricardo Gomez", 
    email: "r.gomez@empresa.com", 
    role: "Operator", 
    status: "Active", 
    lastLogin: "2025-12-05" 
  },
  { 
    id: 8, 
    name: "Elena Vance", 
    email: "e.vance@empresa.com", 
    role: "Analyst", 
    status: "Suspended", 
    lastLogin: "2025-10-20" 
  },
  { 
    id: 9, 
    name: "Marcus Holloway", 
    email: "m.holloway@empresa.com", 
    role: "Operator", 
    status: "Active", 
    lastLogin: "2025-12-15" 
  },
  { 
    id: 10, 
    name: "Sarah Connor", 
    email: "s.connor@empresa.com", 
    role: "Admin", 
    status: "Active", 
    lastLogin: "2025-12-18" 
  }
];

const roles = ["All", "Analyst", "Operator", "Manager", "Admin"];
const statuses = ["All", "Active", "Suspended"];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(users);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, "users_list.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Name", "Email", "Role", "Status", "Last Access"]],
      body: users.map((u) => [u.name, u.email, u.role, u.status, u.lastLogin]),
      startY: 15,
      headStyles: { fillColor: [249, 115, 22] }
    });
    doc.save("users_list.pdf");
  };

  const filteredSortedUsers = useMemo(() => {
    let data = [...users];
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }
    if (filterRole !== "All") data = data.filter(u => u.role === filterRole);
    if (filterStatus !== "All") data = data.filter(u => u.status === filterStatus);

    data.sort((a, b) => {
      const A = String(a[sortField]).toLowerCase();
      const B = String(b[sortField]).toLowerCase();
      if (A < B) return sortDirection === "asc" ? -1 : 1;
      if (A > B) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    return data;
  }, [users, search, filterRole, filterStatus, sortField, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filteredSortedUsers.length / pageSize));
  const pageUsers = filteredSortedUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSaveUser = (data) => {
    if (modalMode === "add") {
      const nextId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
      setUsers([...users, { ...data, id: nextId, lastLogin: "Never" }]);
    } else {
      setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...data } : u));
    }
    setModalOpen(false);
  };

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-textDark">User Management</h2>
          <p className="text-sm text-textMuted">Control access levels and system permissions.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={exportExcel} className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-xs">Excel</button>
          <button onClick={exportPDF} className="px-4 py-2 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10 text-xs">PDF</button>
          <button onClick={() => { setModalMode("add"); setSelectedUser(null); setModalOpen(true); }} className="px-4 py-2 rounded-xl bg-primary hover:bg-primaryHover text-white text-xs font-bold">+ New User</button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-cardDark p-4 rounded-2xl border border-white/5">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          className="md:col-span-2 text-xs px-4 py-2.5 rounded-xl bg-bgDark border border-white/10 focus:border-primary outline-none"
        />
        <select value={filterRole} onChange={(e) => { setFilterRole(e.target.value); setCurrentPage(1); }} className="bg-bgDark border border-white/10 rounded-xl px-3 py-2 text-xs outline-none focus:border-primary cursor-pointer">
          {roles.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }} className="bg-bgDark border border-white/10 rounded-xl px-3 py-2 text-xs outline-none focus:border-primary cursor-pointer">
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </section>

      <div className="bg-cardDark rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-textMuted font-bold border-b border-white/5">
                <th className="px-6 py-4 cursor-pointer hover:text-primary transition-colors" onClick={() => { setSortField("name"); setSortDirection(sortDirection === "asc" ? "desc" : "asc"); }}>Name</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Access</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {pageUsers.map(u => (
                <tr key={u.id} className="hover:bg-white/[0.01] transition-colors">
                  <td className="px-6 py-4 font-medium text-textDark">{u.name}<br/><span className="text-[10px] text-textMuted">{u.email}</span></td>
                  <td className="px-6 py-4 text-textMuted">{u.role}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${u.status === "Active" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>{u.status}</span>
                  </td>
                  <td className="px-6 py-4 text-textMuted">{u.lastLogin}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button onClick={() => { setModalMode("edit"); setSelectedUser(u); setModalOpen(true); }} className="text-textMuted hover:text-primary transition-colors">Edit</button>
                    <button onClick={() => { setUserToDelete(u); setConfirmOpen(true); }} className="text-textMuted hover:text-red-500 transition-colors">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="flex items-center justify-between text-[11px] text-textMuted font-medium pt-2">
        <span>Page {currentPage} of {totalPages}</span>
        <div className="flex gap-2">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="px-4 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-30 transition-colors">Prev</button>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="px-4 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-30 transition-colors">Next</button>
        </div>
      </footer>

      <UserModal open={modalOpen} mode={modalMode} initialUser={selectedUser} onClose={() => setModalOpen(false)} onSave={handleSaveUser} />
      <ConfirmDelete open={confirmOpen} user={userToDelete} onCancel={() => setConfirmOpen(false)} onConfirm={() => { setUsers(users.filter(u => u.id !== userToDelete.id)); setConfirmOpen(false); }} />
    </motion.div>
  );
}