import React from 'react';
import { 
  TrendingDown, 
  Package, 
  Bell, 
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const wasteData = [
  { name: 'Mon', original: 4.5, saved: 3.2 },
  { name: 'Tue', original: 5.2, saved: 4.1 },
  { name: 'Wed', original: 4.8, saved: 4.0 },
  { name: 'Thu', original: 6.1, saved: 5.5 },
  { name: 'Fri', original: 5.5, saved: 4.8 },
  { name: 'Sat', original: 3.2, saved: 3.0 },
  { name: 'Sun', original: 2.8, saved: 2.7 },
];

const inventoryAlerts = [
  { id: 1, item: 'Milk (1L)', date: 'Expiring tomorrow', type: 'danger' },
  { id: 2, item: 'Spinach', date: 'Expiring in 2 days', type: 'warning' },
  { id: 3, item: 'Greek Yogurt', date: 'Expiring in 3 days', type: 'warning' },
];

const StatCard = ({ title, value, subvalue, icon: Icon, color }: any) => (
  <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group">
    <div className={`absolute top-0 right-0 p-3 bg-${color}-500/10 text-${color}-400 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity`}>
      <ArrowUpRight size={16} />
    </div>
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-slate-950 border border-slate-800 text-${color}-400`}>
        <Icon size={24} />
      </div>
    </div>
    <h3 className="text-slate-400 text-sm font-medium mb-1 uppercase tracking-wider">{title}</h3>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-bold text-white">{value}</span>
      {subvalue && <span className="text-emerald-400 text-sm font-medium">{subvalue}</span>}
    </div>
  </div>
);

export const Dashboard = () => {
  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row gap-6 sm:items-end justify-between transition-all">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-2 italic">Kitchen Overview</h1>
          <p className="text-slate-400 text-sm md:text-base">Welcome back, your food waste is <span className="text-emerald-400 font-semibold text-lg italic tracking-tight">down 24%</span> this week.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex-1 sm:flex-none p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors flex items-center justify-center">
            <Bell size={20} />
          </button>
          <button className="flex-[2] sm:flex-none px-6 py-3 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <Package size={20} />
            <span className="uppercase tracking-tighter">Add Items</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Inventory" value="42" subvalue="+3" icon={Package} color="emerald" />
        <StatCard title="Items Expiring" value="3" subvalue="Action req." icon={Clock} color="orange" />
        <StatCard title="Food Saved" value="12.4kg" subvalue="Awesome!" icon={CheckCircle2} color="blue" />
        <StatCard title="Waste Reduced" value="24%" subvalue="vs last month" icon={TrendingDown} color="emerald" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-white mb-6">Waste Reduction Analytics</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={wasteData}>
                <defs>
                  <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Area type="monotone" dataKey="saved" stroke="#10b981" fillOpacity={1} fill="url(#colorSaved)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-white mb-6">Critical Alerts</h3>
          <div className="space-y-4">
            {inventoryAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center gap-4 p-4 bg-slate-950/50 border border-slate-800 rounded-2xl group cursor-pointer hover:border-slate-700 transition-colors">
                <div className={`p-2.5 rounded-xl ${alert.type === 'danger' ? 'bg-red-500/10 text-red-400' : 'bg-orange-500/10 text-orange-400'}`}>
                  {alert.type === 'danger' ? <AlertCircle size={20} /> : <Clock size={20} />}
                </div>
                <div>
                  <h4 className="font-bold text-slate-200">{alert.item}</h4>
                  <p className="text-sm text-slate-500">{alert.date}</p>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20">Fix</button>
                </div>
              </div>
            ))}
            <button className="w-full py-4 text-sm font-semibold text-slate-400 hover:text-white transition-colors border-t border-slate-800 mt-2">
              View all inventory →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
