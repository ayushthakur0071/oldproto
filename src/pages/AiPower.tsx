import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { Link } from 'react-router-dom';
import { Zap, Cpu, Brain, Sparkles, Layout, Scan, Database, Activity, Code } from 'lucide-react';
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
          transform: "translateZ(50px)",
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
        rotateY: direction === "left" ? 25 : -25, 
        x: direction === "left" ? -100 : 100,
        z: -200
      }}
      whileInView={{ 
        opacity: 1, 
        rotateY: 0, 
        x: 0,
        z: 0
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="perspective-[1500px]"
    >
      {children}
    </motion.div>
  );
};

export const AiPower = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroRotate = useTransform(scrollYProgress, [0, 0.2], [0, 10]);
  
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scanLineY = useSpring(useTransform(scrollYProgress, [0.4, 0.7], ["0%", "100%"]), { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} className="bg-slate-950 text-white min-h-screen selection:bg-emerald-500/30 overflow-x-hidden perspective-[1500px]">
      <Navbar />

      {/* Parallax Hero */}
      <section className="pt-48 pb-32 px-6 relative overflow-hidden min-h-[90vh] flex items-center">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, rotateX: heroRotate }}
          className="max-w-6xl mx-auto relative z-20 w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <motion.div 
                initial={{ scale: 0, rotate: -180, translateZ: -100 }}
                animate={{ scale: 1, rotate: 0, translateZ: 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 120 }}
                className="w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 text-emerald-500 rounded-[2.5rem] flex items-center justify-center mb-12 shadow-[0_30px_60px_rgba(16,185,129,0.1)] border border-emerald-500/20"
              >
                <Zap size={48} className="drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
              </motion.div>
              
              <div className="space-y-4">
                 <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] italic drop-shadow-3xl">
                  AI <span className="text-emerald-500 relative">
                    Power
                    <motion.div 
                      className="absolute -bottom-2 left-0 w-full h-4 bg-indigo-500/10 skew-x-[-20deg] -z-10"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.8, duration: 1 }}
                    />
                  </span>
                </h1>
                <p className="text-2xl text-slate-400 leading-relaxed italic max-w-xl font-medium">
                  The semantic engine behind Intelli Food. Synthesizing data into survival strategy for the planet.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                 {[
                   { label: "Vision Core", icon: Scan },
                   { label: "Neural Engine", icon: Brain },
                   { label: "Real-time Node", icon: Activity }
                 ].map((tag, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 1 + i*0.1 }}
                     className="px-5 py-2.5 bg-slate-900 border border-white/5 rounded-full flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400"
                   >
                     <tag.icon size={14} className="text-emerald-500" />
                     {tag.label}
                   </motion.div>
                 ))}
              </div>
            </div>

            <div className="relative perspective-[1000px] hidden lg:block">
               <motion.div
                 initial={{ opacity: 0, rotateY: 30, scale: 0.8 }}
                 animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                 transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                 className="relative z-10"
               >
                 <div className="w-[500px] h-[500px] bg-emerald-500/5 rounded-[5rem] border border-emerald-500/10 backdrop-blur-3xl flex items-center justify-center p-12 overflow-hidden shadow-edge">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent)]" />
                    <Brain size={240} className="text-emerald-500 opacity-20 drop-shadow-[0_0_80px_rgba(16,185,129,0.4)]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                       <div className="absolute top-4 left-4 p-4 bg-slate-950/50 rounded-2xl border border-white/10 font-mono text-[8px] text-emerald-500/50">
                          LOG: NEURAL_CORE_ACTIVE<br />UPTIME: 99.999%<br />LOAD: 12.4%
                       </div>
                    </div>
                 </div>
               </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Background */}
        <motion.div 
          style={{ rotate: bgRotate }}
          className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
        >
           <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-emerald-500/5 blur-[150px] rounded-full animate-pulse" />
           <div className="absolute bottom-0 left-1/4 w-[1000px] h-[1000px] bg-indigo-500/5 blur-[200px] rounded-full" />
           <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/1080')] opacity-[0.02] mix-blend-overlay scale-110" />
        </motion.div>
      </section>

      {/* Technical Detail Sections */}
      <section className="pb-48 px-6 relative">
        <div className="max-w-6xl mx-auto space-y-48">
          
          {/* Section 1: Expiry Analytics */}
          <RevealSection direction="left">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-10">
                <div className="flex items-center gap-5 text-emerald-400">
                  <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 shadow-xl"><Cpu size={28} /></div>
                  <h3 className="text-sm font-black uppercase tracking-[0.4em] font-mono italic">Edge Computation</h3>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.85] uppercase tracking-tighter italic">Delta Freshness <br /><span className="text-emerald-500">Analytics</span></h2>
                <p className="text-xl text-slate-400 leading-relaxed font-medium italic">
                  Advanced temporal monitoring. Our AI core doesn't just watch dates; it calculates molecular degradation models to predict the exact moment of utility loss.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-6">
                   <div className="p-6 bg-slate-900/50 border border-white/5 rounded-3xl">
                      <p className="text-3xl font-black text-white mb-1 tracking-tighter">0.02s</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Sync Latency</p>
                   </div>
                   <div className="p-6 bg-slate-900/50 border border-white/5 rounded-3xl">
                      <p className="text-3xl font-black text-white mb-1 tracking-tighter">94%</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Forecast Accuracy</p>
                   </div>
                </div>
              </div>
              <TiltCard className="relative group perspective-[2000px]">
                <div className="bg-slate-900 border border-white/10 rounded-[4.5rem] p-16 aspect-square flex items-center justify-center shadow-3xl overflow-hidden relative">
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05),transparent)]" />
                   <Database size={160} className="text-emerald-500 opacity-20 relative z-10 animate-pulse" />
                   <div className="absolute inset-10 border-2 border-emerald-500/10 rounded-[3rem] border-dashed" />
                   
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-20 border border-indigo-500/10 rounded-full"
                   />
                </div>
              </TiltCard>
            </div>
          </RevealSection>

          {/* Section 2: Recipe Engine */}
          <RevealSection direction="right">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <TiltCard className="relative order-2 lg:order-1 perspective-[2000px]">
                <div className="bg-slate-900 border border-white/10 rounded-[4.5rem] p-16 aspect-square flex items-center justify-center shadow-3xl overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent" />
                   <Code size={160} className="text-blue-500 opacity-20 relative z-10" />
                   <div className="absolute bottom-12 left-12 right-12 p-8 bg-blue-500/5 backdrop-blur-xl border border-blue-500/20 rounded-3xl">
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                           animate={{ x: ["-100%", "100%"] }}
                           transition={{ duration: 2, repeat: Infinity }}
                           className="w-1/3 h-full bg-blue-500"
                         />
                      </div>
                      <p className="text-[10px] text-blue-400 font-mono mt-4 uppercase tracking-widest text-center">Synthesis Engine Mapping...</p>
                   </div>
                </div>
              </TiltCard>
              <div className="space-y-10 order-1 lg:order-2">
                <div className="flex items-center gap-5 text-blue-400">
                  <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 shadow-xl"><Layout size={28} /></div>
                  <h3 className="text-sm font-black uppercase tracking-[0.4em] font-mono italic">Semantic Synthesis</h3>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.85] uppercase tracking-tighter italic">Molecular <br /><span className="text-blue-500">Recipe Logic</span></h2>
                <p className="text-xl text-slate-400 leading-relaxed font-medium italic">
                   Integration of large language models that understand the chemistry of flavors. We don't just recommend recipes; we synthesize meals that optimize for ingredient longevity.
                </p>
              </div>
            </div>
          </RevealSection>

          {/* Section 3: Vision System with Scanning Effect */}
          <RevealSection direction="left">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-10 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-5 text-purple-400">
                  <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20 shadow-xl"><Scan size={28} /></div>
                  <h3 className="text-sm font-black uppercase tracking-[0.4em] font-mono italic">Computer Vision</h3>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.85] uppercase tracking-tighter italic">Autonomous <br /><span className="text-purple-500">Vision Hub</span></h2>
                <p className="text-xl text-slate-400 leading-relaxed font-medium italic">
                   Leveraging TensorFlow.js for client-side edge inference. Identifying thousands of unique food permutations with real-time semantic labeling.
                </p>
              </div>
              <div className="relative group perspective-[2000px]">
                 <div className="bg-slate-900 border border-white/10 rounded-[4.5rem] p-4 aspect-square flex items-center justify-center relative shadow-3xl overflow-hidden group">
                    <img src="https://picsum.photos/seed/vision_ai/1000/1000" className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" alt="Vision AI" referrerPolicy="no-referrer" />
                    
                    {/* Scanning Line Effect */}
                    <motion.div 
                      style={{ top: scanLineY }}
                      className="absolute left-0 right-0 h-1 bg-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.8)] z-20 pointer-events-none"
                    />
                    
                    <div className="relative z-10 p-10 bg-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-3xl border-2 border-dashed border-emerald-500/30">
                       <p className="text-lg font-black uppercase tracking-[0.3em] text-emerald-500 font-mono text-center">Neural Identify</p>
                       <div className="mt-4 space-y-2">
                          {[
                            { label: "Avocado", conf: 0.98 },
                            { label: "Sprouts", conf: 0.85 },
                            { label: "Citrus", conf: 0.94 }
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between gap-8 font-mono text-[10px]">
                               <span className="text-slate-400 uppercase tracking-widest">{item.label}</span>
                               <span className="text-emerald-500 font-black">{(item.conf * 100).toFixed(0)}%</span>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </RevealSection>

          {/* Infrastructure Callout */}
          <motion.div 
             initial={{ opacity: 0, rotateX: 30, y: 100 }}
             whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
             viewport={{ once: true }}
             className="bg-gradient-to-br from-emerald-500/[0.07] to-indigo-500/[0.07] border border-white/5 rounded-[5rem] p-16 lg:p-32 space-y-12 relative overflow-hidden group shadow-edge"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05),transparent)] pointer-events-none" />
            <div className="absolute top-0 right-0 p-16 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-1000 pointer-events-none">
               <Brain size={400} />
            </div>
            
            <div className="text-center space-y-8 relative z-10 w-full">
               <h3 className="text-sm font-black uppercase tracking-[0.6em] text-emerald-500 italic">Evolution Architecture</h3>
               <h2 className="text-5xl md:text-8xl font-black text-slate-100 leading-[0.8] uppercase tracking-tighter italic mx-auto">"Decentralized Intelligence."</h2>
               <p className="text-xl md:text-2xl text-slate-500 max-w-4xl mx-auto font-medium leading-relaxed italic">
                 The future of Intelli Food is a mesh network of predictive kitchen nodes, integrating with global logistics to eliminate food waste at the source.
               </p>
            </div>

            <div className="flex justify-center gap-12 pt-12 relative z-10">
               {[1,2,3].map(i => (
                 <motion.div 
                   key={i}
                   animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
                   transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                   className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]"
                 />
               ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
