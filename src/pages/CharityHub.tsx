import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { Link } from 'react-router-dom';
import { Heart, Users, MapPin, Building2, Calendar, ShieldCheck, ArrowRight, HandHeart, Gift } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <div 
        style={{
          transform: "translateZ(60px)",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};

const RevealSection = ({ children, direction = "left" }: { children: React.ReactNode, direction?: "left" | "right" }) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        rotateX: 15,
        y: 80,
        z: -150
      }}
      whileInView={{ 
        opacity: 1, 
        rotateX: 0, 
        y: 0,
        z: 0
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="perspective-[2000px]"
    >
      {children}
    </motion.div>
  );
};

export const CharityHub = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroRotate = useTransform(scrollYProgress, [0, 0.2], [0, -10]);

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <div ref={containerRef} className="bg-slate-950 text-white min-h-screen selection:bg-emerald-500/30 overflow-x-hidden perspective-[1500px]">
      <Navbar />

      <section className="pt-48 pb-32 px-6 relative overflow-hidden min-h-[85vh] flex items-center">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, rotateX: heroRotate }}
          className="max-w-6xl mx-auto relative z-10 w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <motion.div 
                 initial={{ scale: 0, rotate: -45, translateZ: -100 }}
                 animate={{ scale: 1, rotate: 0, translateZ: 0 }}
                 transition={{ type: "spring", stiffness: 100, damping: 10 }}
                 className="w-24 h-24 bg-red-500/10 text-red-500 rounded-[3rem] flex items-center justify-center mb-12 shadow-[0_30px_60px_rgba(239,68,68,0.15)] border border-red-500/20 mx-auto md:mx-0"
              >
                <Heart size={48} className="drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
              </motion.div>
              <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] italic drop-shadow-3xl">
                Charity <br /><span className="text-red-500 relative">
                  Hub
                  <motion.div 
                    className="absolute -bottom-4 left-0 w-full h-8 bg-white/5 skew-x-[-20deg] -z-10"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1, duration: 1 }}
                  />
                </span>
              </h1>
              <p className="text-2xl text-slate-400 leading-relaxed italic max-w-xl mx-auto md:mx-0 font-medium">
                "We're turning logistics into compassion. Bridging the gap between abundance and necessity through decentralization."
              </p>
            </div>

            <div className="relative perspective-[2000px] hidden lg:block">
               <motion.div 
                 animate={{ y: [0, -25, 0], rotateZ: [-2, 2, -2] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                 className="relative z-10 w-full flex justify-center"
               >
                 <div className="w-[450px] h-[450px] bg-red-500/[0.03] rounded-[6rem] border border-red-500/10 backdrop-blur-3xl flex items-center justify-center p-16 shadow-edge relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.05),transparent)]" />
                    <HandHeart size={260} className="text-red-500 opacity-20 drop-shadow-[0_0_80px_rgba(239,68,68,0.3)] group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-8 right-8 pointer-events-none">
                       <div className="p-3 bg-red-500/20 rounded-2xl border border-white/10 animate-pulse">
                          <Gift size={20} className="text-red-400" />
                       </div>
                    </div>
                 </div>
               </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Floating background gradient */}
        <motion.div 
          style={{ y: bgY }}
          className="absolute inset-0 -z-10 w-full h-full pointer-events-none overflow-hidden"
        >
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen bg-gradient-radial from-red-500/5 to-transparent blur-[120px]" />
           <div className="absolute -bottom-20 -right-20 w-[1000px] h-[1000px] bg-indigo-500/[0.03] blur-[150px] rounded-full" />
           <div className="absolute top-0 right-0 p-32 opacity-[0.02] mix-blend-overlay rotate-12 scale-125">
              <Users size={600} />
           </div>
        </motion.div>
      </section>

      <section className="pb-48 px-6">
        <div className="max-w-6xl mx-auto space-y-48">
          
          {/* Section 1: Local Redistribution */}
          <RevealSection direction="left">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-10">
                <div className="flex items-center gap-5 text-emerald-400">
                  <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 shadow-xl"><MapPin size={28} /></div>
                  <h3 className="text-sm font-black uppercase tracking-[0.5em] font-mono italic">Geo-Location Nodes</h3>
                </div>
                <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.8] uppercase tracking-tighter italic">Peer-to-Peer <br /><span className="text-emerald-500">Logistics</span></h2>
                <p className="text-2xl text-slate-400 leading-relaxed font-medium italic">
                   Donate excess assets to localized nodes through our responsive sharing system. We've simplified the last-mile problem of compassion.
                </p>
                <div className="pt-6">
                   <Link to="/inventory" className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] text-emerald-400 hover:text-white transition-colors group">
                      Initialize Share <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                   </Link>
                </div>
              </div>
              <TiltCard className="relative group perspective-[2000px]">
                <div className="bg-slate-900 border border-white/10 rounded-[5rem] p-4 aspect-square flex items-center justify-center shadow-3xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors duration-2000" />
                  <Users size={220} className="text-emerald-500 opacity-10 group-hover:scale-125 group-hover:rotate-6 transition-transform duration-[2000ms]" />
                  <div className="absolute inset-x-12 bottom-12 p-10 bg-slate-950/80 backdrop-blur-2xl border border-white/5 rounded-[3rem] shadow-3xl">
                     <p className="text-lg font-black uppercase tracking-[0.3em] text-emerald-500 text-center font-mono italic">2.4K Nodes Activated</p>
                     <p className="text-[10px] text-slate-500 text-center mt-3 uppercase tracking-widest font-black">Syncing Global Distribution...</p>
                  </div>
                </div>
              </TiltCard>
            </div>
          </RevealSection>

          {/* Section 2: Institutional NGO Pipeline */}
          <RevealSection direction="right">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <TiltCard className="bg-slate-900 border border-white/10 rounded-[5rem] p-4 aspect-square flex items-center justify-center order-2 lg:order-1 shadow-3xl relative overflow-hidden group perspective-[2000px]">
                <div className="absolute inset-0 bg-red-500/5" />
                <div className="relative z-10 space-y-12 flex flex-col items-center">
                   <Building2 size={180} className="text-red-500 opacity-20 drop-shadow-[0_0_50px_rgba(239,68,68,0.2)]" />
                   <div className="w-56 h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-1/2 h-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                      />
                   </div>
                </div>
                <div className="absolute inset-x-12 top-12 p-10 bg-slate-950/80 backdrop-blur-2xl border border-white/5 rounded-[3rem] shadow-3xl">
                   <p className="text-sm font-black uppercase tracking-[0.4em] text-red-400 text-center font-mono italic underline decoration-red-500/40 underline-offset-8 leading-relaxed">NGO VALIDATION PHASE 04</p>
                </div>
              </TiltCard>
              <div className="space-y-10 order-1 lg:order-2 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-5 text-red-500">
                  <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/20 shadow-xl"><Heart size={28} /></div>
                  <h3 className="text-sm font-black uppercase tracking-[0.5em] font-mono italic">Institutional Pipe</h3>
                </div>
                <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.8] uppercase tracking-tighter italic">NGO System <br /><span className="text-red-500">Integration</span></h2>
                <p className="text-2xl text-slate-400 leading-relaxed font-medium italic">
                   Developing a verified pipeline for bulk redistribution. Connecting high-yield surplus centers with certified non-governmental entities.
                </p>
              </div>
            </div>
          </RevealSection>

          {/* Section 3: National Infrastructure Reveal */}
          <RevealSection direction="left">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-10 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-5 text-indigo-400">
                  <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/20 shadow-xl"><ShieldCheck size={28} /></div>
                  <h3 className="text-sm font-black uppercase tracking-[0.5em] font-mono italic">Macro Framework</h3>
                </div>
                <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.8] uppercase tracking-tighter italic">Continental <br /><span className="text-indigo-500">Eco-Grid</span></h2>
                <p className="text-2xl text-slate-400 leading-relaxed font-medium italic">
                  Collaboration with government nodes, retail conglomerates, and logistic hubs to form a nationwide sustainable ecosystem by 2026.
                </p>
              </div>
              <div className="relative aspect-[4/5] rounded-[5rem] overflow-hidden border border-white/10 shadow-3xl group perspective-[2000px]">
                <img src="https://picsum.photos/seed/future_society/1000/1250" className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-[2000ms] group-hover:scale-110" alt="Future Society" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-red-500/20 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-16 left-0 right-0 text-center space-y-4">
                   <Calendar size={80} className="text-white/20 mx-auto drop-shadow-2xl" />
                   <p className="text-sm font-black uppercase tracking-[0.8em] italic text-slate-400">Projected Alignment: 2026</p>
                   <div className="h-px w-24 bg-white/10 mx-auto rounded-full" />
                </div>
              </div>
            </div>
          </RevealSection>

          {/* Final Community Mission Statement */}
          <motion.div 
             initial={{ opacity: 0, rotateX: 45, y: 150 }}
             whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
             viewport={{ once: true }}
             className="bg-red-500/[0.03] border border-white/5 backdrop-blur-3xl rounded-[6rem] p-24 lg:p-48 space-y-16 relative overflow-hidden group shadow-edge border-t-red-500/10"
          >
            <div className="absolute -top-40 -left-40 p-40 opacity-[0.02] group-hover:opacity-10 transition-opacity duration-[3000ms] pointer-events-none">
               <Heart size={600} />
            </div>
            
            <div className="space-y-10 text-center relative z-10 w-full">
               <h3 className="text-sm font-black uppercase tracking-[1em] text-red-500 italic">The Collective Path</h3>
               <h2 className="text-6xl md:text-9xl font-black text-center text-white leading-[0.85] uppercase tracking-tighter italic drop-shadow-3xl mx-auto">
                "Zero Waste, <br />
                <span className="text-red-500">Zero Hunger."</span>
              </h2>
            </div>
            
            <div className="pt-12 flex flex-col items-center gap-12 relative z-10">
              <p className="text-2xl text-slate-400 max-w-4xl text-center font-medium leading-[1.4] italic font-serif">
                 The Charity Hub isn't just a platform; it's the nervous system of a more compassionate society. Together, we reclaim what was lost.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-8">
                 <Link to="/signup" className="px-14 py-7 bg-red-500 text-slate-950 font-black uppercase tracking-[0.4em] rounded-[2.5rem] shadow-3xl hover:bg-red-400 transition-all border border-red-400/20 group/btn">
                    Register Hub Node <ArrowRight size={24} className="inline-block ml-4 group-hover/btn:translate-x-3 transition-transform" />
                 </Link>
                 <button className="px-14 py-7 bg-white/5 text-white font-black uppercase tracking-[0.4em] rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all">
                    Partner Inquiry
                 </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
