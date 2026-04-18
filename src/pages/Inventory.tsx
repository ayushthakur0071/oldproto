import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Trash2, 
  ChevronRight,
  Refrigerator,
  Flame,
  Scale,
  Package
} from 'lucide-react';

const initialInventory = [
  { id: 1, name: 'Fresh Milk', category: 'Dairy', qty: '800ml', exp: '2024-05-20', freshness: 80 },
  { id: 2, name: 'Organic Spinach', category: 'Produce', qty: '200g', exp: '2024-05-18', freshness: 40 },
  { id: 3, name: 'Greek Yogurt', category: 'Dairy', qty: '500g', exp: '2024-05-19', freshness: 60 },
  { id: 4, name: 'Chicken Breast', category: 'Meat', qty: '400g', exp: '2024-05-22', freshness: 95 },
  { id: 5, name: 'Avocado', category: 'Produce', qty: '2 units', exp: '2024-05-17', freshness: 20 },
];

export const Inventory = () => {
  const [items, setItems] = useState(initialInventory);
  const [searchTerm, setSearchTerm] = useState('');

  const getFreshnessColor = (percent: number) => {
    if (percent > 70) return 'bg-emerald-500';
    if (percent > 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-2 italic">Food Inventory</h1>
          <p className="text-slate-400 text-sm md:text-base">Manage and track your kitchen supplies to prevent waste.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search items..."
              className="bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-emerald-500/50 w-full sm:w-48 lg:w-64 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="flex-1 sm:flex-none p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors flex items-center justify-center">
              <Filter size={20} />
            </button>
            <button className="flex-[2] sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition-all shadow-[0_4px_15px_rgba(16,185,129,0.3)]">
              <Plus size={20} />
              <span className="uppercase tracking-tighter">Add Item</span>
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
            <Refrigerator size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Storage Status</p>
            <p className="text-xl font-bold text-white">65% Capacity</p>
          </div>
        </div>
        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Scale size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Weekly Input</p>
            <p className="text-xl font-bold text-white">14.2 kg</p>
          </div>
        </div>
        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400">
            <Flame size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Calories Saved</p>
            <p className="text-xl font-bold text-white">12,400 kcal</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left min-w-[800px] lg:min-w-0">
            <thead>
            <tr className="border-bottom border-slate-800 bg-slate-950/30 text-slate-400 text-xs uppercase tracking-widest font-bold">
              <th className="px-8 py-4">Item Name</th>
              <th className="px-8 py-4">Category</th>
              <th className="px-8 py-4">Quantity</th>
              <th className="px-8 py-4">Expiry</th>
              <th className="px-8 py-4">Freshness</th>
              <th className="px-8 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {items.map((item) => (
              <tr key={item.id} className="group hover:bg-slate-900/30 transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-slate-700 transition-colors">
                      <Package size={16} />
                    </div>
                    <span className="font-bold text-slate-200">{item.name}</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-sm px-2.5 py-1 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                    {item.category}
                  </span>
                </td>
                <td className="px-8 py-5 font-mono text-sm text-slate-400">{item.qty}</td>
                <td className="px-8 py-5 text-sm text-slate-400 italic">{item.exp}</td>
                <td className="px-8 py-5">
                  <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getFreshnessColor(item.freshness)} transition-all duration-1000`} 
                      style={{ width: `${item.freshness}%` }}
                    />
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:text-red-400 text-slate-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                    <button className="p-2 hover:text-emerald-400 text-slate-500 transition-colors">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
};
