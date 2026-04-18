import React from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Mail, Lock, User, ShieldCheck, ArrowLeft, Check } from 'lucide-react';

export const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex selection:bg-emerald-500/30">
      {/* Visual Side */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 items-center justify-center p-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-500/10 blur-[150px] rounded-full -mb-64 -mr-64 pointer-events-none" />
        <div className="relative z-10 w-full max-w-lg space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-7xl font-black uppercase tracking-tight leading-[0.85] mb-8">
              Join the <br />
              <span className="text-emerald-500">Green</span> <br />
              Movement.
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-12">
              Start your journey today and help us build a world where no good food goes to waste.
            </p>
          </motion.div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-1">
                <Check size={16} />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm uppercase tracking-widest">Free for Individuals</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Personal kitchen tracking and recipes are always free.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-1">
                <Check size={16} />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm uppercase tracking-widest">Global Impact Community</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Connect with thousands of zero-waste experts and local charities.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-20 relative overflow-y-auto">
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-white transition-colors group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium uppercase tracking-widest">Back</span>
        </Link>

        <div className="w-full max-w-md py-12">
          <div className="text-center lg:text-left mb-10">
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-slate-950 mx-auto lg:mx-0 mb-6">
              <Leaf size={24} />
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Create Account</h1>
            <p className="text-slate-400">Join 50,000+ users saving food and the planet.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">First Name</label>
                <input 
                  type="text" 
                  placeholder="Jane"
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-emerald-500 transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Doe"
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-emerald-500 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                <input 
                  type="email" 
                  placeholder="jane@example.com"
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                <input 
                  type="password" 
                  placeholder="Min. 8 characters"
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500 transition-all font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                <input 
                  type="password" 
                  placeholder="Re-enter password"
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500 transition-all font-mono"
                />
              </div>
            </div>

            <div className="flex items-start gap-3 py-2">
              <input type="checkbox" required className="mt-1 accent-emerald-500 w-4 h-4" />
              <p className="text-sm text-slate-500 leading-tight">
                I agree to the <a href="#" className="text-emerald-500 hover:text-emerald-400 font-bold">Terms of Service</a> and <a href="#" className="text-emerald-500 hover:text-emerald-400 font-bold">Privacy Policy</a>.
              </p>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-emerald-500 text-slate-950 font-bold rounded-2xl hover:bg-emerald-400 transition-all shadow-xl flex items-center justify-center gap-2 group"
            >
              <ShieldCheck size={20} className="group-hover:scale-110 transition-transform" />
              Create My Account
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Already have an account? <Link to="/login" className="text-emerald-500 font-bold underline underline-offset-4 decoration-emerald-500/20 hover:text-emerald-400">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
