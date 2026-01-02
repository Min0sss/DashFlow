import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { supabase } from "../supabase/client";

export default function DashboardHome() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    activeClients: 0,
    avgTicket: 0
  });
  const dataChart = [
    { name: 'Mon', value: 4000 },
    { name: 'Tue', value: 3000 },
    { name: 'Wed', value: 5000 },
    { name: 'Thu', value: 2780 },
    { name: 'Fri', value: 1890 },
    { name: 'Sat', value: 2390 },
    { name: 'Sun', value: 3490 },
  ];

  useEffect(() => {
    const fetchQuickStats = async () => {
      const { data: orders } = await supabase.from('orders').select('total');
      const { count: clientsCount } = await supabase.from('clients').select('*', { count: 'exact' });
      
      const totalRev = orders?.reduce((acc, o) => acc + o.total, 0) || 0;
      const totalOrd = orders?.length || 0;
      
      setStats({
        totalRevenue: totalRev,
        totalOrders: totalOrd,
        activeClients: clientsCount || 0,
        avgTicket: totalOrd > 0 ? totalRev / totalOrd : 0
      });
    };
    fetchQuickStats();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-6"
    >
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Dashboard</h2>
          <p className="text-textMuted text-sm">Overview of your activity - Last 7 days</p>
        </div>
        <div className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
          {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard 
          title="Total Sales" 
          value={`$${stats.totalRevenue.toFixed(2)}`} 
          trend="+12.5%" 
          isPositive={true} 
          icon="💰"
        />
        <GlassCard 
          title="Total Orders" 
          value={stats.totalOrders} 
          trend="+5.2%" 
          isPositive={true} 
          icon="📦"
        />
        <GlassCard 
          title="Active Clients" 
          value={stats.activeClients} 
          trend="+2 New" 
          isPositive={true} 
          icon="👥"
        />
        <GlassCard 
          title="Avg. Ticket" 
          value={`$${stats.avgTicket.toFixed(2)}`} 
          trend="-1.4%" 
          isPositive={false} 
          icon="🎟️"
        />
      </div>
      <div className="bg-[#111] border border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
        
        <h3 className="text-lg font-bold text-white mb-6 relative z-10">Revenue Analytics</h3>
        
        <div className="h-[300px] w-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dataChart}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="#555" tick={{fill: '#666', fontSize: 12}} axisLine={false} tickLine={false} />
              <YAxis stroke="#555" tick={{fill: '#666', fontSize: 12}} axisLine={false} tickLine={false} prefix="$" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#f97316" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}

function GlassCard({ title, value, trend, isPositive, icon }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-6 rounded-2xl bg-[#111] border border-white/5 relative overflow-hidden group"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-textMuted text-xs font-bold uppercase tracking-wider">{title}</span>
        <span className="text-xl opacity-30 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0">{icon}</span>
      </div>
      
      <div className="flex items-end gap-3">
        <span className="text-2xl font-black text-white tracking-tight">{value}</span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 ${
          isPositive 
            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
            : 'bg-red-500/10 text-red-400 border border-red-500/20'
        }`}>
          {trend}
        </span>
      </div>
    </motion.div>
  );

function GlassCard({ title, value, trend, isPositive, icon }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}

      className="p-8 rounded-[2rem] bg-cardDark border border-white/10 shadow-lg shadow-black/20 relative overflow-hidden group"
    >
      <div className="flex justify-between items-start mb-6">

        <span className="text-textMuted text-sm font-bold uppercase tracking-wider">{title}</span>
        <span className="text-2xl opacity-30 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0">{icon}</span>
      </div>
      
      <div className="flex items-end gap-4">

        <span className="text-4xl font-black text-white tracking-tight">{value}</span>

        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg mb-1.5 border ${
          isPositive 
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
            : 'bg-red-500/10 text-red-400 border-red-500/20'
        }`}>
          {trend}
        </span>
      </div>
    </motion.div>
  );
}
}