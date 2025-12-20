import { useMemo } from "react";
import { useData } from "../context/DataContext.jsx";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ReportsPage() {
  const { orders, clients, products } = useData();
  const topProducts = useMemo(() => {
    const map = {};
    orders.forEach((o) => {
      if (o.items && Array.isArray(o.items)) {
        o.items.forEach(item => {
          if (!map[item.name]) map[item.name] = 0;
          map[item.name] += item.qty;
        });
      }
    });

    return Object.entries(map)
      .map(([name, qty]) => ({ name, qty }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5);
  }, [orders]);
  const topClients = useMemo(() => {
    const map = {};
    orders.forEach((o) => {
      if (!o.client?.name) return;
      if (!map[o.client.name]) map[o.client.name] = 0;
      map[o.client.name] += o.total;
    });

    return Object.entries(map)
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }, [orders]);
  const monthlyIncome = useMemo(() => {
    const map = {};
    orders.forEach((o) => {
      const month = o.date.slice(0, 7); 
      if (!map[month]) map[month] = 0;
      map[month] += o.total;
    });

    return Object.entries(map).map(([month, total]) => ({
      month,
      total,
    }));
  }, [orders]);

  const statusSummary = useMemo(() => {
    const map = { Paid: 0, Pending: 0, Canceled: 0 };
    orders.forEach((o) => {
      const status = (o.status === "Pagado" || o.status === "Paid") ? "Paid" : 
                     (o.status === "Pendiente" || o.status === "Pending") ? "Pending" : "Canceled";
      if (map[status] !== undefined) map[status]++;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [orders]);
  const totalIncome = orders.reduce((acc, o) => acc + o.total, 0);
  const totalOrders = orders.length;
  const activeClients = clients.filter((c) => c.status === "Active" || c.status === "Activo").length;

  const donutColors = ["#f97316", "#fbbf24", "#ef4444"];

  const exportPDF = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleString();

    doc.setFontSize(18);
    doc.setTextColor(249, 115, 22); 
    doc.text("Business Intelligence Report", 14, 15);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${date}`, 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [["Metric", "Value"]],
      body: [
        ["Total Revenue", `$${totalIncome.toFixed(2)}`],
        ["Total Orders", totalOrders],
        ["Active Clients", activeClients],
      ],
      headStyles: { fillColor: [249, 115, 22] }
    });

    doc.save("DashFlow_Report.pdf");
  };

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-textDark tracking-tight">Reports & Analytics</h2>
          <p className="text-sm text-textMuted">Advanced insights into your business performance.</p>
        </div>

        <button
          onClick={exportPDF}
          className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-xl bg-primary hover:bg-primaryHover text-white shadow-lg shadow-primary/20 transition-all active:scale-95"
        >
          Export PDF
        </button>
      </header>

      {}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard title="Total Revenue" value={`$${totalIncome.toFixed(2)}`} icon="💰" />
        <KpiCard title="Registered Orders" value={totalOrders} icon="📦" />
        <KpiCard title="Active Clients" value={activeClients} icon="👥" />
      </section>

      {}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ListCard title="Best Selling Products" data={topProducts} field="qty" />
        <ListCard title="Top Valuable Clients" data={topClients} field="total" />
      </section>

      {}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {}
        <div className="rounded-3xl p-8 border border-white/5 bg-cardDark shadow-2xl">
          <h3 className="text-xs font-black text-textDark uppercase tracking-[0.2em] mb-8">Monthly Revenue</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyIncome}>
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="#64748b" fontSize={11} axisLine={false} tickLine={false} />
                <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                    contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Bar dataKey="total" fill="#f97316" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {}
        <div className="rounded-3xl p-8 border border-white/5 bg-cardDark shadow-2xl">
          <h3 className="text-xs font-black text-textDark uppercase tracking-[0.2em] mb-8">Order Status Distribution</h3>
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusSummary}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  stroke="none" 
                >
                  {statusSummary.map((entry, i) => (
                    <Cell key={i} fill={donutColors[i % donutColors.length]} />
                  ))}
                </Pie>
                <Tooltip 
                    contentStyle={{ 
                        background: '#1a1a1a', 
                        border: '1px solid rgba(255,255,255,0.1)', 
                        borderRadius: '12px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                    }}
                    itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function KpiCard({ title, value, icon }) {
  return (
    <div className="p-8 rounded-3xl border border-white/5 bg-cardDark shadow-xl group hover:border-primary/20 transition-all">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-black text-textMuted uppercase tracking-widest">{title}</span>
        <span className="text-xl opacity-50 group-hover:opacity-100 transition-opacity">{icon}</span>
      </div>
      <p className="text-3xl font-black text-textDark tracking-tighter">{value}</p>
    </div>
  );
}

function ListCard({ title, data, field }) {
  return (
    <div className="p-8 rounded-3xl border border-white/5 bg-cardDark shadow-xl">
      <h3 className="text-xs font-black text-textDark uppercase tracking-[0.2em] mb-6">{title}</h3>
      <ul className="space-y-4 font-bold">
        {data.map((item, i) => (
          <li key={i} className="flex justify-between items-center group">
            <span className="text-sm text-textMuted group-hover:text-textDark transition-colors">{item.name}</span>
            <span className="text-sm text-primary tabular-nums bg-primary/10 px-3 py-1 rounded-lg">
              {field === "total" ? `$${item[field].toFixed(2)}` : item[field]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}