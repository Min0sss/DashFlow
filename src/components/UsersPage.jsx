import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { supabase } from "../supabase/client"; 

import UserModal from "./UserModal.jsx";
import ConfirmDelete from "./ConfirmDelete.jsx";

const roles = ["All", "Analyst", "Operator", "Manager", "Admin"];
const statuses = ["All", "Active", "Suspended"];

export default function UsersPage() {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 

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
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('users') 
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;

      
      const formattedData = data.map(user => ({
        ...user,
        lastLogin: user.last_login || user.lastLogin || "Never"
      }));

      setUsers(formattedData);
    } catch (error) {
      console.error("Error cargando usuarios:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', userToDelete.id);

    if (error) {
      alert("Error al eliminar: " + error.message);
    } else {
      setUsers(users.filter(u => u.id !== userToDelete.id));
      setConfirmOpen(false);
    }
  };
  
  const handleSaveUser = async (formData) => {

    setLoading(true);

    try {
      if (modalMode === "add") {
        const { error } = await supabase
          .from('users')
          .insert([
            {
              name: formData.name,
              email: formData.email,
              role: formData.role,
              status: formData.status,
              last_login: new Date().toISOString() 
            }
          ]);

        if (error) throw error;

      } else {

        const { error } = await supabase
          .from('users')
          .update({
            name: formData.name,
            email: formData.email,
            role: formData.role,
            status: formData.status
          })
          .eq('id', selectedUser.id); 

        if (error) throw error;
      }
      await fetchUsers();
      setModalOpen(false);
      
    } catch (error) {
      console.error("Error al guardar:", error.message);
      alert("Error al guardar en base de datos: " + error.message);
    } finally {
      setLoading(false);
    }
  };

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
      data = data.filter(u => u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q));
    }
    if (filterRole !== "All") data = data.filter(u => u.role === filterRole);
    if (filterStatus !== "All") data = data.filter(u => u.status === filterStatus);

    data.sort((a, b) => {
      const A = String(a[sortField] || "").toLowerCase();
      const B = String(b[sortField] || "").toLowerCase();
      if (A < B) return sortDirection === "asc" ? -1 : 1;
      if (A > B) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    return data;
  }, [users, search, filterRole, filterStatus, sortField, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filteredSortedUsers.length / pageSize));
  const pageUsers = filteredSortedUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-textDark">Team Management</h2>
<p className="text-sm text-textMuted">Manage your team members and their roles.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={exportExcel} className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-xs text-textMuted">Excel</button>
          <button onClick={exportPDF} className="px-4 py-2 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10 text-xs">PDF</button>
          <button onClick={() => { setModalMode("add"); setSelectedUser(null); setModalOpen(true); }} className="px-4 py-2 rounded-xl bg-primary hover:bg-primaryHover text-white text-xs font-bold">+ New Member</button>
        </div>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-cardDark p-4 rounded-2xl border border-white/5">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          className="md:col-span-2 text-xs px-4 py-2.5 rounded-xl bg-bgDark border border-white/10 focus:border-primary outline-none text-textDark"
        />
        <select value={filterRole} onChange={(e) => { setFilterRole(e.target.value); setCurrentPage(1); }} className="bg-bgDark border border-white/10 rounded-xl px-3 py-2 text-xs outline-none focus:border-primary cursor-pointer text-textMuted">
          {roles.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }} className="bg-bgDark border border-white/10 rounded-xl px-3 py-2 text-xs outline-none focus:border-primary cursor-pointer text-textMuted">
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </section>
      <div className="bg-cardDark rounded-2xl border border-white/5 overflow-hidden min-h-[300px]">
        {loading ? (
          <div className="flex justify-center items-center h-40 text-textMuted text-sm">
            Cargando datos de Supabase...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-[10px] uppercase tfracking-widest text-textMuted font-bold border-b border-white/5">
                  <th className="px-6 py-4 cursor-pointer hover:text-primary transition-colors" onClick={() => { setSortField("name"); setSortDirection(sortDirection === "asc" ? "desc" : "asc"); }}>Name</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Last Access</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {pageUsers.length > 0 ? pageUsers.map(u => (
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
                )) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-textMuted">No team members found. Start by adding one.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <footer className="flex items-center justify-between text-[11px] text-textMuted font-medium pt-2">
        <span>Page {currentPage} of {totalPages}</span>
        <div className="flex gap-2">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="px-4 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-30 transition-colors">Prev</button>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="px-4 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-30 transition-colors">Next</button>
        </div>
      </footer>

      <UserModal open={modalOpen} mode={modalMode} initialUser={selectedUser} onClose={() => setModalOpen(false)} onSave={handleSaveUser} isSaving={loading} />
      
      <ConfirmDelete 
        open={confirmOpen} 
        user={userToDelete} 
        onCancel={() => setConfirmOpen(false)} 
        onConfirm={handleDeleteConfirm} 
      />
    </motion.div>
  );
}