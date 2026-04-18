import React from 'react';
import { 
  Trophy, 
  MapPin, 
  Flame, 
  Heart,
  ArrowRight,
  Edit2,
  Calendar,
  ShieldCheck,
  Star
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const activityData = [
  { name: 'W1', saved: 12 },
  { name: 'W2', saved: 18 },
  { name: 'W3', saved: 15 },
  { name: 'W4', saved: 25 },
];

export const Profile = () => {
  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* Header / Identity */}
      <header className="relative p-10 bg-slate-900/40 border border-slate-800 rounded-[3rem] overflow-hidden group">
        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
          <Star size={200} fill="currentColor" />
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="relative">
            <div className="w-40 h-40 rounded-[2.5rem] bg-emerald-500/10 border-4 border-emerald-500 p-1">
              <img 
                src="https://picsum.photos/seed/user123/300/300" 
                className="w-full h-full object-cover rounded-[2rem]" 
                alt="Profile"
                referrerPolicy="no-referrer"
              />
            </div>
            <button className="absolute -bottom-2 -right-2 p-3 bg-white text-slate-900 rounded-2xl shadow-xl hover:scale-110 transition-transform">
              <Edit2 size={16} />
            </button>
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight">Ayush Pratap</h1>
              <p className="text-slate-500 font-mono text-[10px] sm:text-xs md:text-sm tracking-widest">ECO-WARRIOR LEVEL 14</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3">
              <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-bold border border-emerald-500/20">Vegetarian</span>
              <span className="px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-xs font-bold border border-blue-500/20">Zero Waste Pro</span>
              <span className="px-4 py-1.5 bg-slate-800 text-slate-400 rounded-full text-xs font-bold">Joined April 2026</span>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 text-center min-w-[160px]">
            <Trophy className="text-yellow-500 mx-auto mb-2" size={32} fill="currentColor" />
            <p className="text-3xl font-black text-white">#12</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Global Ranking</p>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl group hover:border-emerald-500/30 transition-colors">
          <Heart className="text-red-500 mb-4" size={32} fill="currentColor" />
          <p className="text-4xl font-black text-white">42kg</p>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-1">Total Food Saved</p>
        </div>
        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl group hover:border-blue-500/30 transition-colors">
          <MapPin className="text-blue-500 mb-4" size={32} />
          <p className="text-4xl font-black text-white">12</p>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-1">Donations Made</p>
        </div>
        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl group hover:border-orange-500/30 transition-colors">
          <Flame className="text-orange-500 mb-4" size={32} fill="currentColor" />
          <p className="text-4xl font-black text-white">14.5k</p>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-1">Daily Points</p>
        </div>
      </div>

      {/* Charts & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[2.5rem]">
          <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Savings Growth
          </h3>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" tick={{fontSize: 12}} dy={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                />
                <Line type="monotone" dataKey="saved" stroke="#10b981" strokeWidth={4} dot={{ r: 6, fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[2.5rem] space-y-6">
          <h3 className="text-xl font-bold text-white mb-2">Sustainability Badges</h3>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="aspect-square bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center text-emerald-500/20 hover:text-emerald-500 hover:bg-emerald-500/5 transition-all cursor-help relative group">
                <ShieldCheck size={32} />
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-slate-950 text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                  Badge {i} unlocked
                </div>
              </div>
            ))}
            <div className="aspect-square bg-slate-950/20 rounded-2xl border border-dashed border-slate-800 flex items-center justify-center text-slate-800">
               <span className="text-xs font-bold">+12</span>
            </div>
          </div>
          
          <div className="pt-6 border-t border-slate-800">
            <div className="flex justify-between items-center mb-4">
               <h4 className="font-bold text-slate-400 text-sm uppercase tracking-widest">Daily Progress</h4>
               <span className="text-emerald-400 font-mono font-bold italic">75%</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
               <div className="h-full bg-emerald-500 w-3/4 shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all duration-1000" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
