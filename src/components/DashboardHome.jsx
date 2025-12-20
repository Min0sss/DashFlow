import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { motion } from "framer-motion";

export default function DashboardHome() {
  const monthlyData = [
    { month: "Jan", sales: 12000, expenses: 8000 },
    { month: "Feb", sales: 14500, expenses: 9000 },
    { month: "Mar", sales: 16800, expenses: 9200 },
    { month: "Apr", sales: 15900, expenses: 9400 },
    { month: "May", sales: 18200, expenses: 11000 },
    { month: "Jun", sales: 21000, expenses: 12000 },
  ];

  const users = [
    { id: 1, name: "John Doe", role: "Analyst", status: "Active", lastLogin: "2025-12-01" },
    { id: 2, name: "Maria Lopez", role: "Manager", status: "Active", lastLogin: "2025-11-30" },
    { id: 3, name: "Carlos Diaz", role: "Operator", status: "Suspended", lastLogin: "2025-11-15" },
    { id: 4, name: "Ana Torres", role: "Analyst", status: "Active", lastLogin: "2025-11-28" },
  ];

  const kpis = [
    { label: "Monthly Revenue", value: "$21,000", badge: "+12% vs last month" },
    { label: "New Users", value: "48", badge: "+9 this month" },
    { label: "Pending Tasks", value: "17", badge: "5 critical" },
    { label: "Compliance Rate", value: "92%", badge: "+4 pts" },
  ];

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-3xl bg-cardDark border border-white/5 p-6 shadow-xl"
          >
            <p className="text-[10px] font-black text-textMuted uppercase tracking-[0.2em]">{kpi.label}</p>
            <p className="mt-3 text-4xl font-black text-textDark tracking-tighter">
              {kpi.value}
            </p>
            <div className="mt-4">
              <span className="inline-flex text-[10px] font-black px-3 py-1.5 rounded-xl bg-primary/10 text-primary border border-primary/10 uppercase tracking-wider">
                {kpi.badge}
              </span>
            </div>
          </motion.div>
        ))}
      </section>

      {}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <motion.div
          className="xl:col-span-2 rounded-3xl bg-cardDark border border-white/5 p-8 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xs font-black text-textDark uppercase tracking-[0.25em]">Sales Evolution</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-[10px] text-textMuted font-bold uppercase">Sales</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <span className="text-[10px] text-textMuted font-bold uppercase">Expenses</span>
              </div>
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid stroke="#ffffff05" strokeDasharray="0" vertical={false} />
                <XAxis dataKey="month" stroke="#4b5563" fontSize={10} fontWeight={800} tickLine={false} axisLine={false} dy={15} />
                <YAxis stroke="#4b5563" fontSize={10} fontWeight={800} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ stroke: 'rgba(249, 115, 22, 0.2)', strokeWidth: 2 }}
                  contentStyle={{
                    background: "#0f0f0f",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "16px",
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
                    padding: "12px"
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#f97316"
                  strokeWidth={4}
                  dot={{ r: 0 }}
                  activeDot={{ r: 6, fill: "#f97316", stroke: "#0f0f0f", strokeWidth: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          className="rounded-3xl bg-cardDark border border-white/5 p-8 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xs font-black text-textDark uppercase tracking-[0.25em]">Monthly Revenue</h2>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="month" stroke="#4b5563" fontSize={10} fontWeight={800} axisLine={false} tickLine={false} dy={15} />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  contentStyle={{
                    background: "#0f0f0f",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "16px"
                  }}
                />
                <Bar dataKey="sales" fill="#f97316" radius={[8, 8, 4, 4]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </section>

      {/* Users Section */}
      <motion.section
        className="rounded-3xl bg-cardDark border border-white/5 p-8 shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <h2 className="text-xs font-black text-textDark uppercase tracking-[0.25em]">System Access</h2>
            <p className="text-[10px] font-bold text-textMuted mt-1 uppercase opacity-60">Real-time user monitoring</p>
          </div>

          <input
            type="text"
            placeholder="Search active sessions..."
            className="text-[11px] font-bold px-5 py-3 rounded-2xl bg-bgDark border border-white/5 text-textDark outline-none focus:border-primary/50 transition-all w-full md:w-80 shadow-inner"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-textMuted text-[9px] uppercase tracking-[0.2em] font-black opacity-50">
                <th className="pb-4 px-4">User</th>
                <th className="pb-4 px-4">Permission</th>
                <th className="pb-4 px-4">Account Status</th>
                <th className="pb-4 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="group transition-all hover:bg-white/[0.02]">
                  <td className="py-5 px-4 rounded-l-2xl border-y border-l border-white/5 font-black text-textDark text-xs">{u.name}</td>
                  <td className="py-5 px-4 border-y border-white/5 text-[10px] font-bold text-textMuted uppercase">{u.role}</td>
                  <td className="py-5 px-4 border-y border-white/5">
                    <span
                      className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                        u.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/10"
                          : "bg-red-500/10 text-red-500 border border-red-500/10"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="py-5 px-4 rounded-r-2xl border-y border-r border-white/5 text-right text-[10px] font-bold text-textMuted tabular-nums opacity-60">
                    {u.lastLogin}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </motion.div>
  );
}