import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PackageSearch, 
  Camera, 
  Utensils, 
  HeartHandshake, 
  User,
  Settings,
  HelpCircle,
  Leaf,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/app' },
  { icon: PackageSearch, label: 'Inventory', path: '/app/inventory' },
  { icon: Utensils, label: 'Recipes', path: '/app/recipes' },
  { icon: Camera, label: 'AI Scanner', path: '/app/scan' },
  { icon: HeartHandshake, label: 'Donation & Map', path: '/app/donate' },
  { icon: User, label: 'Profile', path: '/app/profile' },
  { icon: Settings, label: 'Settings', path: '/app/settings' },
  { icon: HelpCircle, label: 'Support', path: '/app/support' },
];

export const Sidebar = ({ isCollapsed, setIsCollapsed }: { isCollapsed: boolean, setIsCollapsed: (v: boolean) => void }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Perform any cleanup here
    navigate('/');
  };

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-slate-950 text-slate-200 border-r border-slate-800 z-50 hidden md:flex flex-col transition-all duration-500 ease-[0.22, 1, 0.36, 1]",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className={cn("p-6 flex items-center h-20 shrink-0", isCollapsed ? "justify-center" : "gap-3")}>
        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)] shrink-0">
          <Leaf size={24} />
        </div>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-xl font-bold tracking-tight text-white italic whitespace-nowrap"
            >
              Intelli Food
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-24 w-6 h-6 bg-slate-800 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors z-50"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
      
      <nav className="flex-1 mt-6 px-4 space-y-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/app'}
            className={({ isActive }) => cn(
              "flex items-center rounded-xl transition-all duration-300 group overflow-hidden h-12",
              isCollapsed ? "justify-center px-0" : "gap-3 px-4",
              isActive 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]' 
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900 border border-transparent'
            )}
          >
            <item.icon size={20} className={cn("transition-transform group-hover:scale-110 shrink-0")} />
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-semibold text-sm whitespace-nowrap"
              >
                {item.label}
              </motion.span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={handleSignOut}
          className={cn(
            "w-full flex items-center rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all group h-12",
            isCollapsed ? "justify-center px-0" : "gap-3 px-4"
          )}
        >
          <LogOut size={20} className="shrink-0" />
          {!isCollapsed && <span className="font-semibold text-sm">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};

export const MobileNav = () => {
  const [showMore, setShowMore] = React.useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setShowMore(false);
    navigate('/');
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 z-50 md:hidden flex items-center justify-around px-2 pb-safe">
        {navItems.slice(0, 4).map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/app'}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center p-2 rounded-lg transition-all flex-1 min-w-0",
              isActive ? 'text-emerald-400' : 'text-slate-500'
            )}
          >
            <item.icon size={22} />
            <span className="text-[10px] mt-1 font-bold uppercase tracking-tighter truncate w-full text-center">{item.label.split(' ')[0]}</span>
          </NavLink>
        ))}
        <button 
          onClick={() => setShowMore(!showMore)}
          className={cn(
            "flex flex-col items-center justify-center p-2 rounded-lg transition-all flex-1 min-w-0",
            showMore ? 'text-emerald-400' : 'text-slate-500'
          )}
        >
          <Menu size={22} />
          <span className="text-[10px] mt-1 font-bold uppercase tracking-tighter">More</span>
        </button>
      </nav>

      {/* Mobile More Menu Overlay */}
      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 bg-slate-900 border-t border-slate-800 rounded-t-[2.5rem] p-8 pb-32 z-[60] md:hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="w-12 h-1.5 bg-slate-800 rounded-full mx-auto mb-8" />
            
            <div className="grid grid-cols-2 gap-4">
              {navItems.slice(4).map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setShowMore(false)}
                  className={({ isActive }) => cn(
                    "flex flex-col items-center justify-center gap-3 p-6 rounded-3xl border transition-all",
                    isActive 
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_10px_30px_rgba(16,185,129,0.1)]" 
                      : "bg-slate-950/50 border-white/5 text-slate-400"
                  )}
                >
                  <item.icon size={24} />
                  <span className="font-bold text-xs uppercase tracking-widest">{item.label}</span>
                </NavLink>
              ))}
              <button 
                onClick={handleSignOut}
                className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl border bg-red-500/5 border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all"
              >
                <LogOut size={24} />
                <span className="font-bold text-xs uppercase tracking-widest">Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for More Menu */}
      <AnimatePresence>
        {showMore && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMore(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[55] md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};
