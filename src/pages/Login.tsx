import React from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Mail, Lock, EyeOff, Github, Chrome, ArrowLeft } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, perform auth here
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex selection:bg-emerald-500/30">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 items-center justify-center p-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-500/10 blur-[120px] rounded-full -mt-64 -ml-64 pointer-events-none" />
        <div className="relative z-10 w-full max-w-lg">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl font-black uppercase tracking-tight leading-[0.85] mb-8"
          >
            Efficiency <br />
            <span className="text-emerald-500">Meets</span> <br />
            Kindness.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-400 text-lg leading-relaxed italic"
          >
            "Intelli Food transformed how our restaurant manages surplus. We've cut waste by 40% and feed 50 extra people every week."
          </motion.p>
          <div className="mt-8 flex items-center gap-4">
            <img src="https://picsum.photos/seed/chef/64/64" className="w-12 h-12 rounded-full border border-white/10" alt="Avatar" />
            <div>
              <p className="font-bold text-white uppercase text-sm tracking-widest">Marcus Chen</p>
              <p className="text-xs text-slate-500 uppercase tracking-tighter">Chef de Cuisine, The Green Bistro</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-20 relative">
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-white transition-colors group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium uppercase tracking-widest">Back</span>
        </Link>

        <div className="w-full max-w-md space-y-12">
          <div className="text-center lg:text-left">
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-slate-950 mx-auto lg:mx-0 mb-6 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <Leaf size={24} />
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Welcome Back</h1>
            <p className="text-slate-400">Continue your journey to zero-waste cooking.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input 
                    type="email" 
                    placeholder="name@company.com"
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Password</label>
                  <a href="#" className="text-xs text-emerald-500 hover:text-emerald-400 font-bold uppercase underline underline-offset-4 decoration-emerald-500/20">Forgot?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-12 text-white focus:outline-none focus:border-emerald-500 transition-all font-mono"
                  />
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors">
                    <EyeOff size={18} />
                  </button>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-emerald-500 text-slate-950 font-bold rounded-2xl hover:bg-emerald-400 transition-all shadow-[0_4px_20px_rgba(16,185,129,0.2)]"
            >
              Sign In
            </button>
          </form>

          <div className="space-y-6">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-800"></span></div>
              <span className="relative bg-slate-950 px-4 text-xs font-bold uppercase tracking-widest text-slate-500">Or continue with</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 hover:bg-slate-800 transition-all font-bold text-sm">
                <Chrome size={18} /> Google
              </button>
              <button className="flex items-center justify-center gap-2 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 hover:bg-slate-800 transition-all font-bold text-sm">
                <Github size={18} /> Github
              </button>
            </div>

            <p className="text-center text-sm text-slate-500">
              New to Intelli Food? <Link to="/signup" className="text-emerald-500 font-bold underline underline-offset-4 decoration-emerald-500/20 hover:text-emerald-400">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
