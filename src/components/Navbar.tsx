import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'AI Power', path: '/ai-power' },
    { name: 'Our Mission', path: '/our-mission' },
    { name: 'Charity Hub', path: '/charity-hub' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-slate-950">
            <Leaf size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight italic">Intelli Food</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-slate-400">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`hover:text-emerald-400 transition-colors ${location.pathname === link.path ? 'text-emerald-400 font-bold' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium hover:text-emerald-400 transition-colors text-slate-400">Log in</Link>
            <Link to="/signup" className="px-5 py-2.5 bg-emerald-500 text-slate-950 text-sm font-bold rounded-full hover:bg-emerald-400 transition-all">
              Join for Free
            </Link>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: '100vh' }}
        exit={{ opacity: 0, height: 0 }}
        className="md:hidden bg-slate-950 border-b border-white/5 overflow-y-auto"
      >
        <div className="px-6 py-12 flex flex-col gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-3xl font-black uppercase tracking-tighter italic ${location.pathname === link.path ? 'text-emerald-400' : 'text-slate-400'}`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-10 border-t border-white/5 flex flex-col gap-6">
            <Link 
              to="/login" 
              onClick={() => setIsOpen(false)}
              className="text-center py-5 text-slate-200 text-xl font-black uppercase tracking-widest border border-white/10 rounded-3xl"
            >
              Log in
            </Link>
            <Link 
              to="/signup" 
              onClick={() => setIsOpen(false)}
              className="text-center py-5 bg-emerald-500 text-slate-950 text-xl font-black rounded-3xl uppercase tracking-widest"
            >
              Join for Free
            </Link>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
    </nav>
  );
};
