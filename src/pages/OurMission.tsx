import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { Link } from 'react-router-dom';
import { Leaf, Globe, Shield, Target, Users, ArrowRight, Compass, Heart, Award } from 'lucide-react';
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

const ParallaxSection = ({ children, direction = "left" }: { children: React.ReactNode, direction?: "left" | "right" }) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        rotateX: 20,
        y: 100,
        z: -200
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

export const OurMission = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroRotate = useTransform(scrollYProgress, [0, 0.2], [0, 15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div ref={containerRef} className="bg-slate-950 text-white min-h-screen selection:bg-emerald-500/30 overflow-x-hidden perspective-[1500px]">
      <Navbar />

      <section className="pt-48 pb-32 px-6 relative overflow-hidden min-h-[80vh] flex items-center">
        <motion.div
          style={{ y: heroY, rotateX: heroRotate, opacity: heroOpacity }}
          className="max-w-6xl mx-auto text-center md:text-left relative z-20 w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <motion.div 
                initial={{ scale: 0, rotate: 45, translateZ: -100 }}
                animate={{ scale: 1, rotate: 0, translateZ: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 10 }}
                className="w-24 h-24 bg-blue-500/10 text-blue-500 rounded-[2.5rem] flex items-center justify-center mb-12 shadow-[0_30px_60px_rgba(59,130,246,0.1)] border border-blue-500/20 mx-auto md:mx-0"
              >
                <Globe size={48} className="drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]" />
              </motion.div>
              <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] italic drop-shadow-3xl">
                Our <br /><span className="text-emerald-500 relative">
                  Mission
                  <motion.div 
                    className="absolute -bottom-4 left-0 w-full h-6 bg-blue-500/10 skew-x-[-20deg] -z-10"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 1 }}
                  />
                </span>
              </h1>
              <p className="text-2xl text-slate-400 leading-relaxed italic max-w-xl mx-auto md:mx-0 font-medium tracking-tight">
                "We are technologists, environmentalists, and neighbors working together to erase food waste from the map."
              </p>
            </div>

            <div className="relative perspective-[2000px] hidden lg:block">
               <motion.div 
                 animate={{ rotateY: [0, 360], y: [0, -20, 0] }}
                 transition={{ rotateY: { duration: 30, repeat: Infinity, ease: "linear" }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
                 className="relative z-10 w-full"
               >
                 <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-500/5 to-emerald-500/5 border border-white/5 backdrop-blur-3xl p-12 flex items-center justify-center shadow-edge">
                    <Globe size={280} className="text-blue-500 opacity-20 drop-shadow-[0_0_100px_rgba(59,130,246,0.3)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent)]" />
                 </div>
               </motion.div>
            </div>
          </div>
        </motion.div>

        {/* 3D background effects */}
        <motion.div 
          style={{ y: bgY }}
          className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
        >
           <div className="absolute top-1/4 left-1/4 w-[1200px] h-[1200px] bg-emerald-500/5 blur-[200px] rounded-full" />
           <div className="absolute bottom-1/4 right-1/4 w-[1400px] h-[1400px] bg-blue-500/5 blur-[250px] rounded-full" />
           <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/stars/1920/1080')] opacity-[0.03] mix-blend-screen scale-110" />
        </motion.div>
      </section>

      <section className="pb-48 px-6">
        <div className="max-w-6xl mx-auto space-y-48">
          
          {/* Section 1: The Crisis */}
          <ParallaxSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-5 text-red-500">
                  <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/20 shadow-xl"><Shield size={28} /></div>
                  <h3 className="text-sm font-black uppercase tracking-[0.5em] font-mono italic">Critical Status</h3>
                </div>
                <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.8] uppercase tracking-tighter italic">The Silent <br /><span className="text-red-500/50">Emergency</span></h2>
                <p className="text-2xl text-slate-400 leading-relaxed font-medium italic">
                  Millions of tons of edible assets are liquidated annually, fueling a climate crisis that remains invisible until it's too late.
                </p>
                <div className="pt-6">
                   <Link to="/ai-power" className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.4em] text-red-400 hover:text-white transition-colors group">
                      Analyze Data Trace <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                   </Link>
                </div>
              </div>
              <TiltCard className="relative perspective-[2000px]">
                <div className="bg-slate-900 border border-white/5 rounded-[5rem] p-20 text-center shadow-3xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-red-500/5 transition-all duration-700 group-hover:opacity-20" />
                  <motion.p 
                    initial={{ scale: 0.8, y: 30 }}
                    whileInView={{ scale: 1, y: 0 }}
                    className="text-7xl sm:text-8xl font-black text-white italic leading-none mb-6 relative z-10 drop-shadow-2xl text-center mx-auto"
                  >
                    1.3B
                  </motion.p>
                  <p className="text-sm uppercase tracking-[0.5em] font-black text-slate-500 relative z-10 italic text-center">Metric Tons Liquidated / Yr</p>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-500/10 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                </div>
              </TiltCard>
            </div>
          </ParallaxSection>

          {/* Section 2: The Solution Architecture */}
          <ParallaxSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <TiltCard className="bg-slate-900 border border-white/10 rounded-[5rem] p-24 order-2 lg:order-1 flex items-center justify-center shadow-3xl relative overflow-hidden group perspective-[2000px]">
                <div className="absolute inset-0 bg-emerald-500/5 transition-opacity group-hover:opacity-10" />
                <Target size={240} className="text-emerald-500/10 group-hover:rotate-12 transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/20 blur-[100px] rounded-full" />
                <Compass size={80} className="text-emerald-500 absolute z-10 drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
              </TiltCard>
              <div className="space-y-12 order-1 lg:order-2 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-5 text-emerald-400">
                  <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 shadow-xl"><Leaf size={28} /></div>
                  <h3 className="text-sm font-black uppercase tracking-[0.5em] font-mono italic">Strategic Design</h3>
                </div>
                <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.8] uppercase tracking-tighter italic">Precision <br /><span className="text-emerald-500">Utilization</span></h2>
                <p className="text-2xl text-slate-400 leading-relaxed font-medium italic">
                  We empower users to reclaim control through algorithmic transparency. Our system turns passivity into active sustainability.
                </p>
              </div>
            </div>
          </ParallaxSection>

          {/* Section 3: Community Grid - 3D Layout */}
          <ParallaxSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                <div className="flex items-center gap-5 text-blue-500">
                  <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 shadow-xl"><Users size={28} /></div>
                  <h3 className="text-sm font-black uppercase tracking-[0.5em] font-mono italic">Network Effect</h3>
                </div>
                <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.8] uppercase tracking-tighter italic">Deep <br /><span className="text-blue-500">Symbiosis</span></h2>
                <p className="text-2xl text-slate-400 leading-relaxed font-medium italic">
                   The solution isn't individual; it's structural. We connect the nodes of surplus with the clusters of need in a seamless 3D logic.
                </p>
              </div>
              <div className="relative aspect-square rounded-[5rem] overflow-hidden border border-white/10 shadow-3xl group perspective-[2000px]">
                <img src="https://picsum.photos/seed/symbiosis/1200/1200" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-125 group-hover:rotate-1" alt="Symbiosis" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                <div className="absolute bottom-12 left-12 right-12 space-y-4">
                   <div className="flex gap-2">
                      {[1,2,3].map(i => <div key={i} className="w-12 h-1.5 bg-blue-500/40 rounded-full" />)}
                   </div>
                   <p className="text-3xl font-black uppercase tracking-tight italic text-white drop-shadow-xl">Restoring Balance.</p>
                </div>
              </div>
            </div>
          </ParallaxSection>

          {/* Final Vision Manifesto */}
          <motion.div 
             initial={{ opacity: 0, rotateX: 40, y: 150 }}
             whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
             viewport={{ once: true }}
             className="bg-blue-500/[0.04] border border-white/5 backdrop-blur-3xl rounded-[6rem] p-20 lg:p-40 space-y-16 relative overflow-hidden group shadow-edge"
          >
            <div className="absolute -bottom-40 -right-40 p-40 opacity-[0.02] group-hover:opacity-10 transition-opacity duration-[2000ms] pointer-events-none">
               <Globe size={600} />
            </div>
            
            <div className="space-y-8 text-center relative z-10 w-full">
               <h3 className="text-sm font-black uppercase tracking-[0.8em] text-blue-500 italic">The Manifesto</h3>
               <h2 className="text-5xl md:text-8xl lg:text-9xl font-black text-center text-white leading-[0.85] uppercase tracking-tighter italic drop-shadow-3xl mx-auto">
                "Design for <br />
                <span className="text-emerald-500">The Eternal."</span>
              </h2>
            </div>
            
            <div className="pt-12 flex flex-col items-center gap-10 relative z-10">
              <p className="text-2xl text-slate-400 max-w-4xl text-center font-medium leading-[1.4] italic font-serif">
                 The architecture of Intelli Food is built on the belief that waste is simply a failure of intelligence. We are here to fix that failure.
              </p>
              
              <div className="flex gap-12 items-center">
                 {[
                   { icon: Heart, label: "Empathy" },
                   { icon: Award, label: "Excellence" },
                   { icon: Globe, label: "Impact" }
                 ].map((pill, i) => (
                   <div key={i} className="flex flex-col items-center gap-3 group/pill">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover/pill:bg-white/10 transition-colors">
                         <pill.icon size={20} className="text-blue-400" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{pill.label}</span>
                   </div>
                 ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
