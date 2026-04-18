import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Twitter, Github, Linkedin, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        {/* Brand & Mission */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-slate-950">
              <Leaf size={18} />
            </div>
            <span className="text-xl font-bold tracking-tight italic">Intelli Food</span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed italic">
            Revolutionizing food management through artificial intelligence. Join our mission to eliminate global food waste and build a sustainable future for all.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-all"><Twitter size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-all"><Github size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-all"><Instagram size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-all"><Linkedin size={18} /></a>
          </div>
        </div>

        {/* Product Links */}
        <div className="space-y-6">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Platform</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li><Link to="/ai-power" className="hover:text-emerald-400 transition-colors">AI Processing</Link></li>
            <li><Link to="/app/scan" className="hover:text-emerald-400 transition-colors">Inventory Scanner</Link></li>
            <li><Link to="/app/recipes" className="hover:text-emerald-400 transition-colors">Recipe Optimization</Link></li>
            <li><Link to="/charity-hub" className="hover:text-emerald-400 transition-colors">Charity Network</Link></li>
            <li><Link to="/app/donate" className="hover:text-emerald-400 transition-colors">Donation Map</Link></li>
          </ul>
        </div>

        {/* Resources & Support */}
        <div className="space-y-6">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Company</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li><Link to="/our-mission" className="hover:text-emerald-400 transition-colors">Our Mission</Link></li>
            <li><Link to="/app/support" className="hover:text-emerald-400 transition-colors">Help Center</Link></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Sustainability Report</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Partner Program</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Press Kit</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Contact</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex gap-3">
              <MapPin size={18} className="text-emerald-500 shrink-0" />
              <span>123 Sustainability Way, Green District, CA 94103</span>
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="text-emerald-500 shrink-0" />
              <span>hello@intellifood.ai</span>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="text-emerald-500 shrink-0" />
              <span>+1 (888) INTELLI-FOOD</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-600 text-[10px] uppercase font-bold tracking-[0.3em]">
        <p>© 2026 Intelli Food AI Systems. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
        </div>
      </div>

      {/* Decorative background element */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-full -mr-32 -mb-32 pointer-events-none" />
    </footer>
  );
};
