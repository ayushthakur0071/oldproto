import React from 'react';
import { 
  Plus, 
  Clock, 
  Flame, 
  ChefHat,
  Heart,
  Search,
  Zap
} from 'lucide-react';

const recipes = [
  {
    id: 1,
    title: 'Veggie Frittata',
    image: 'https://picsum.photos/seed/veggie/800/600',
    time: '20 min',
    cals: '320',
    match: 92,
    ingredients: ['Spinach', 'Milk', 'Eggs']
  },
  {
    id: 2,
    title: 'Mediterranean Salad',
    image: 'https://picsum.photos/seed/salad/800/600',
    time: '12 min',
    cals: '280',
    match: 85,
    ingredients: ['Avocado', 'Spinach', 'Lemon']
  },
  {
    id: 3,
    title: 'Creamy Pasta',
    image: 'https://picsum.photos/seed/pasta/800/600',
    time: '25 min',
    cals: '540',
    match: 78,
    ingredients: ['Milk', 'Pasta', 'Cheese']
  },
];

export const Recipes = () => {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Smart Recipes</h1>
          <p className="text-slate-400">Recipes curated based on your <span className="text-emerald-400 font-bold italic underline underline-offset-4 decoration-emerald-500/30">expiring items</span>.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search recipes..."
              className="bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-emerald-500/50 w-full md:w-64 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 border border-slate-800 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
            <ChefHat size={20} />
            <span>AI Cook Assist</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-slate-900/50 border border-slate-800 rounded-[2rem] overflow-hidden group cursor-pointer hover:border-slate-700 transition-all flex flex-col">
            <div className="relative h-56 overflow-hidden">
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded-lg text-emerald-400 text-xs font-bold border border-white/10 flex items-center gap-1.5">
                  <Zap size={12} fill="currentColor" />
                  {recipe.match}% Match
                </div>
              </div>
              <button className="absolute bottom-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                <Heart size={18} />
              </button>
            </div>
            
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-4">{recipe.title}</h3>
              
              <div className="flex gap-6 mb-6">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Clock size={16} />
                  <span>{recipe.time}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Flame size={16} />
                  <span>{recipe.cals} kcal</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {recipe.ingredients.map((ing, i) => (
                  <span key={i} className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1.5 py-0.5 border-b border-slate-800">
                    {ing}
                  </span>
                ))}
              </div>

              <button className="mt-auto w-full py-4 bg-slate-800 text-white font-bold rounded-2xl group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all flex items-center justify-center gap-2">
                Start Cooking
                <Plus size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/5 blur-[100px] pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tight italic">Want a custom recipe?</h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-10 text-lg">Tell us what's in your pantry and our Chef-AI will generate a unique recipe just for you.</p>
          <div className="flex flex-col sm:flex-row max-w-2xl mx-auto gap-4">
             <input 
              type="text" 
              placeholder="I have beef, potatoes and half an onion..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-slate-200 focus:outline-none focus:border-emerald-500 transition-all font-medium"
            />
            <button className="px-10 py-4 bg-emerald-500 text-slate-950 font-black rounded-2xl hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] uppercase tracking-tighter">
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
