
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useData } from "../context/DataContext.jsx";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import ProductModal from "./ProductModal.jsx";
import ConfirmDelete from "./ConfirmDelete.jsx";

export default function ProductsPage() {
  const { products, addProduct, editProduct, deleteProduct } = useData();

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const categories = ["All", "Services", "Subscriptions", "Software", "Equipment", "Tools"];
  const statuses = ["All", "Available", "Out of Stock"];

  const filteredProducts = useMemo(() => {
    let data = [...products];
    if (search.trim()) {
      data = data.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (filterCategory !== "All") data = data.filter((p) => p.category === filterCategory);
    if (filterStatus !== "All") {
        // Mapeo simple para compatibilidad con datos en español si existen
        data = data.filter((p) => (p.status === "Disponible" ? "Available" : "Out of Stock") === filterStatus);
    }
    return data;
  }, [products, search, filterCategory, filterStatus]);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredProducts);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Products");
    XLSX.writeFile(wb, "products_inventory.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Inventory Report", 14, 15);
    autoTable(doc, {
      head: [["Name", "Category", "Price", "Stock", "Status"]],
      body: filteredProducts.map((p) => [p.name, p.category, `$${p.price}`, p.stock, p.status]),
      startY: 25,
      headStyles: { fillColor: [249, 115, 22] }
    });
    doc.save("products_report.pdf");
  };

  const handleSaveProduct = (data) => {
    if (modalMode === "add") {
      addProduct({ ...data, date: new Date().toISOString().slice(0, 10) });
    } else {
      editProduct(selectedProduct.id, data);
    }
    setModalOpen(false);
  };

  return (
    <>
      <motion.div className="space-y-6" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-textDark tracking-tight">Products</h2>
            <p className="text-sm text-textMuted">Inventory management and stock control.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={exportToExcel} className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-xs font-medium transition-colors">Excel</button>
            <button onClick={exportToPDF} className="px-4 py-2 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10 text-xs font-medium transition-colors">PDF</button>
            <button onClick={() => { setSelectedProduct(null); setModalMode("add"); setModalOpen(true); }} className="px-5 py-2 rounded-xl bg-primary hover:bg-primaryHover text-white text-xs font-bold shadow-lg shadow-primary/20">+ New Product</button>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-cardDark p-4 rounded-2xl border border-white/5">
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="md:col-span-2 text-xs px-4 py-2.5 rounded-xl border border-white/10 bg-bgDark focus:border-primary outline-none"
          />
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="bg-bgDark border border-white/10 rounded-xl px-3 py-2 text-xs outline-none focus:border-primary cursor-pointer">
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="bg-bgDark border border-white/10 rounded-xl px-3 py-2 text-xs outline-none focus:border-primary cursor-pointer">
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </section>

        <div className="bg-cardDark rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-textMuted font-bold border-b border-white/5 bg-white/[0.01]">
                  <th className="px-6 py-4">Product Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="px-6 py-5 text-textDark font-semibold">{p.name}</td>
                    <td className="px-6 py-5 text-textMuted">{p.category}</td>
                    <td className="px-6 py-5 text-textDark font-bold">${p.price}</td>
                    <td className="px-6 py-5 text-textMuted">{p.stock} units</td>
                    <td className="px-6 py-5">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${p.status === "Disponible" || p.status === "Available" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>
                        {p.status === "Disponible" ? "AVAILABLE" : "OUT OF STOCK"}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right space-x-3">
                      <button onClick={() => { setSelectedProduct(p); setModalMode("edit"); setModalOpen(true); }} className="text-textMuted hover:text-primary transition-colors font-bold uppercase text-[10px]">Edit</button>
                      <button onClick={() => { setProductToDelete(p); setConfirmOpen(true); }} className="text-textMuted hover:text-red-500 transition-colors font-bold uppercase text-[10px]">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      <ProductModal open={modalOpen} mode={modalMode} initialProduct={selectedProduct} onClose={() => setModalOpen(false)} onSave={handleSaveProduct} />
      <ConfirmDelete open={confirmOpen} user={productToDelete} onCancel={() => setConfirmOpen(false)} onConfirm={() => { deleteProduct(productToDelete.id); setConfirmOpen(false); }} />
    </>
  );
}