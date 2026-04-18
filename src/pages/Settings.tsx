import React from 'react';
import { Link } from 'react-router-dom';
import { User, Shield, Bell, Map, ArrowLeft, ChevronRight, Globe, Lock } from 'lucide-react';

const SettingsItem = ({ icon: Icon, title, desc, children }: any) => (
  <div className="flex items-center justify-between p-6 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-slate-700 transition-colors group">
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 group-hover:scale-110 transition-transform">
        <Icon size={20} />
      </div>
      <div>
        <h4 className="font-bold text-white">{title}</h4>
        <p className="text-sm text-slate-500">{desc}</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      {children}
      {!children && <ChevronRight size={20} className="text-slate-600 group-hover:text-white transition-colors" />}
    </div>
  </div>
);

export const SettingsPage = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header className="flex items-center gap-4">
        <Link to="/app" className="p-2 hover:bg-slate-900 rounded-lg text-slate-500 hover:text-white transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Settings</h1>
          <p className="text-slate-400">Manage your profile, notifications, and preferences.</p>
        </div>
      </header>

      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500 ml-2">Personalization</h3>
        <SettingsItem 
          icon={User} 
          title="Profile Information" 
          desc="Update your name, email, and dietary preferences."
        />
        <SettingsItem 
          icon={Lock} 
          title="Security & Privacy" 
          desc="Manage your password and active sessions."
        />
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500 ml-2">App Behavior</h3>
        <SettingsItem 
          icon={Bell} 
          title="Smart Notifications" 
          desc="Get alerted before food expires in your kitchen."
        >
          <div className="w-12 h-6 bg-emerald-500 rounded-full p-1 cursor-pointer">
            <div className="w-4 h-4 bg-white rounded-full ml-auto" />
          </div>
        </SettingsItem>
        <SettingsItem 
          icon={Map} 
          title="Donation Radius" 
          desc="Set the maximum distance for nearby donation alerts."
        >
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono font-bold text-emerald-400">10km</span>
            <input type="range" className="accent-emerald-500 h-1 w-24" min="1" max="50" defaultValue="10" />
          </div>
        </SettingsItem>
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500 ml-2">Danger Zone</h3>
        <button className="w-full p-6 border border-red-500/20 bg-red-500/5 text-red-400 font-bold rounded-2xl hover:bg-red-500/10 transition-colors text-left flex justify-between items-center group">
          <span>Delete My Account</span>
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
