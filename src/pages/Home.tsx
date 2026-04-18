import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Globe, Zap, Users, Camera, Utensils, HeartHandshake, Sparkles, MoveDown, Leaf } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string, key?: React.Key }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

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

const FloatingElement = ({ children, delay = 0, duration = 4 }: { children: React.ReactNode, delay?: number, duration?: number }) => (
  <motion.div
    animate={{ 
      y: [0, -20, 0],
      rotateZ: [-2, 2, -2]
    }}
    transition={{ 
      duration, 
      repeat: Infinity, 
      ease: "easeInOut",
      delay 
    }}
  >
    {children}
  </motion.div>
);

export const Home = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scrollWidth = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);
  const heroRotateX = useTransform(scrollYProgress, [0, 0.15], [0, 10]);
  const heroSkewX = useTransform(scrollYProgress, [0, 0.15], [0, 5]);

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <div ref={containerRef} className="bg-slate-950 text-white min-h-screen selection:bg-emerald-500/30 overflow-x-hidden perspective-[1500px]">
      <Navbar />

      {/* Scroll Progress Bar */}
      <motion.div 
        style={{ scaleX: scrollWidth }}
        className="fixed top-20 left-0 right-0 h-1 bg-emerald-500 z-[60] origin-left shadow-[0_0_15px_rgba(16,185,129,0.5)]"
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden min-h-screen flex items-center justify-center">
        <motion.div 
          style={{ 
            opacity: heroOpacity, 
            scale: heroScale, 
            rotateX: heroRotateX,
            skewX: heroSkewX,
          }}
          className="max-w-7xl mx-auto text-center relative z-20 pointer-events-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateX: 60, translateZ: -200 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, translateZ: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] md:leading-[0.8] uppercase mb-12 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              Save Food,<br />
              <span className="text-emerald-500 inline-block relative">
                Heal the
                <motion.div 
                  className="absolute -bottom-4 left-0 w-full h-4 bg-indigo-500/20 -z-10 skew-x-[-20deg]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 1 }}
                />
              </span><br />
              Planet.
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-2xl mx-auto text-xl md:text-2xl text-slate-400 mb-14 leading-relaxed font-medium italic"
          >
            Predictive AI for your kitchen. Eliminate waste before it happens.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/signup" className="w-full sm:w-auto px-10 py-5 bg-emerald-500 text-slate-950 text-xl font-black rounded-3xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-3 group shadow-[0_0_50px_rgba(16,185,129,0.3)] ring-4 ring-emerald-500/20">
              Get Started
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <button className="w-full sm:w-auto px-10 py-5 bg-slate-900/50 backdrop-blur-xl text-white text-xl font-black rounded-3xl hover:bg-slate-800 transition-all border border-white/10 flex items-center justify-center gap-3">
              Watch Demo
              <div className="w-4 h-4 rounded-full bg-blue-500 animate-ping" />
            </button>
          </motion.div>

          <motion.div 
            style={{ opacity: heroOpacity }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-24 flex flex-col items-center gap-2 text-slate-500"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Explore Deeply</span>
            <MoveDown size={20} />
          </motion.div>
        </motion.div>

        {/* Multi-layered 3D Background */}
        <motion.div 
          style={{ y: bgY, rotate: bgRotate }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <div className="absolute top-[10%] left-[5%] w-[800px] h-[800px] bg-emerald-500/10 blur-[180px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-[20%] right-[10%] w-[1000px] h-[1000px] bg-indigo-500/10 blur-[200px] rounded-full mix-blend-screen" />
          
          {/* Floating Geometric 3D Objects */}
          <div className="absolute top-[20%] right-[20%] opacity-20 hidden lg:block translate-z-20">
             <FloatingElement duration={5}>
                <div className="w-32 h-32 border border-emerald-500/40 rounded-3xl rotate-45 backdrop-blur-sm" />
             </FloatingElement>
          </div>
          <div className="absolute bottom-[30%] left-[15%] opacity-20 hidden lg:block -translate-z-20">
             <FloatingElement delay={1} duration={6}>
                <div className="w-48 h-48 border border-indigo-500/40 rounded-full backdrop-blur-sm" />
             </FloatingElement>
          </div>
        </motion.div>

        {/* Glass Overlay Grid */}
        <div className="absolute inset-0 z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent)] opacity-[0.03] pointer-events-none">
           <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:5rem_5rem]" />
        </div>
      </section>

      {/* Features Grid with Scroll Reveal */}
      <section id="features" className="py-40 px-6 border-t border-white/5 relative z-10 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, rotateX: 45, y: 100 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-32"
          >
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic text-white/5 absolute -top-20 left-1/2 -translate-x-1/2 w-full">Innovation</h2>
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-emerald-500 relative z-10">Neural Capabilities</h3>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { title: "Visual Recognition", desc: "Edge-computed vision system that identifies perishable assets with 99.4% precision.", icon: Zap, color: "emerald", delay: 0 },
              { title: "Predictive Analytics", desc: "Advanced LLM integration that forecasts household demand and suggests micro-decisions.", icon: ShieldCheck, color: "blue", delay: 0.2 },
              { title: "Eco-Redistribution", desc: "A decentralized network connecting surplus with community hotspots in real-time.", icon: Globe, color: "indigo", delay: 0.4 }
            ].map((f, i) => (
              <TiltCard key={i} className={`p-10 bg-slate-900/40 border border-white/5 rounded-[3.5rem] group hover:border-${f.color}-500/30 transition-all duration-700 shadow-2xl`}>
                <div className="space-y-10">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotateZ: 10 }}
                    className={`w-20 h-20 bg-${f.color === "emerald" ? "emerald" : f.color === "blue" ? "blue" : "indigo"}-500/10 text-${f.color === "emerald" ? "emerald" : f.color === "blue" ? "blue" : "indigo"}-400 rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-${f.color === "emerald" ? "emerald" : f.color === "blue" ? "blue" : "indigo"}-500/20`}
                  >
                    <f.icon size={36} />
                  </motion.div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black uppercase tracking-tight italic text-white group-hover:text-emerald-400 transition-colors">{f.title}</h3>
                    <p className="text-slate-400 leading-relaxed font-medium text-lg">{f.desc}</p>
                  </div>
                  <div className="pt-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-600 group-hover:text-white transition-colors">
                     Learn Science <ArrowRight size={14} />
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section with Enhanced Depth */}
      <section id="impact" className="py-40 px-6 bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24">
          <motion.div 
            initial={{ opacity: 0, rotateY: -20, x: -100 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-1/2 space-y-12"
          >
            <div className="space-y-4">
               <span className="text-emerald-500 font-black uppercase tracking-[0.5em] text-sm italic">The Impact Matrix</span>
               <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
                Micro Change, <br />
                <span className="text-white/20 italic">Planet Impact.</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-2 gap-12">
              {[
                { val: "1.3B", label: "Tons Saved", sub: "Annual Target" },
                { val: "22%", label: "CO2 Reduction", sub: "Verified Link" }
              ].map((stat, i) => (
                <div key={i} className="group cursor-default">
                  <p className="text-6xl font-black text-white mb-3 group-hover:text-emerald-500 transition-colors duration-500">{stat.val}</p>
                  <div className="space-y-1">
                    <p className="text-sm text-slate-300 font-black uppercase tracking-widest">{stat.label}</p>
                    <p className="text-[10px] text-slate-600 uppercase tracking-[0.2em] italic">{stat.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-xl text-slate-400 leading-relaxed font-medium max-w-xl italic">
              "We don't just track food; we map the future of sustainable consumption through autonomous intelligence."
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, rotateY: 45, scale: 0.8, translateZ: -200 }}
            whileInView={{ opacity: 1, rotateY: 0, scale: 1, translateZ: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-1/2 relative perspective-[2000px]"
          >
            <div className="relative bg-emerald-500/5 p-4 rounded-[5rem] border border-white/5 overflow-hidden group shadow-3xl shadow-emerald-500/10">
               <div className="aspect-[4/5] bg-slate-900 rounded-[4.5rem] border border-white/10 flex items-center justify-center relative overflow-hidden shadow-inner">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-indigo-500/20" />
                  <img src="https://picsum.photos/seed/future/1000/1200" alt="Future Kitchen" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-110 transition-transform duration-2000" referrerPolicy="no-referrer" />
                  
                  {/* Floating Elements in Image Depth */}
                  <motion.div 
                    initial={{ y: 0 }}
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-12 right-12 p-4 bg-emerald-500/20 backdrop-blur-3xl rounded-3xl border border-white/20 shadow-2xl"
                  >
                     <Zap className="text-emerald-400" size={32} />
                  </motion.div>

                  <div className="absolute inset-x-8 bottom-8 p-10 bg-slate-950/60 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-2xl transform-gpu">
                     <p className="text-xs font-black uppercase tracking-[0.4em] mb-4 text-emerald-500 italic">Core Metric Engine</p>
                     <p className="text-4xl font-black text-white italic tracking-tighter leading-none mb-2">98.2%</p>
                     <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Algorithm Efficiency Score</p>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section with Isometric Effect */}
      <section className="py-40 px-6 overflow-hidden relative bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32 space-y-4">
             <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: 100 }}
               className="h-1 bg-emerald-500 mx-auto rounded-full"
             />
             <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter text-white inline-block">The Intelligence Arc</h2>
             <p className="text-slate-500 font-mono text-sm uppercase tracking-[0.3em]">Version 2.0 // Decentralized Architecture</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { step: "01", title: "Neural Scan", desc: "Instant multispectral analysis of your pantry content.", icon: Camera, shadow: "emerald" },
              { step: "02", title: "Delta Tracking", desc: "Minute-by-minute freshness monitoring via AI core.", icon: Zap, shadow: "blue" },
              { step: "03", title: "Synthesis", desc: "AI creates molecular recipes based on availability.", icon: Utensils, shadow: "indigo" },
              { step: "04", title: "Allocation", desc: "Autonomous redistribution of surplus to local nodes.", icon: HeartHandshake, shadow: "emerald" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, rotateX: 20, z: -100 }}
                whileInView={{ opacity: 1, rotateX: 0, z: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative perspective-[1200px]"
              >
                <div className={`p-10 lg:p-12 bg-slate-900 border border-white/5 rounded-[4rem] group-hover:bg-slate-800 transition-all duration-700 group-hover:-translate-y-6 shadow-2xl relative overflow-hidden ring-1 ring-white/5 group-hover:ring-emerald-500/20`}>
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-${item.shadow}-500/5 blur-[50px] -translate-y-16 translate-x-16 group-hover:bg-${item.shadow}-500/20 transition-all`} />
                  <span className="text-8xl font-black text-white/[0.03] group-hover:text-emerald-500/5 transition-colors block mb-6 leading-none italic">{item.step}</span>
                  <div className="w-16 h-16 bg-slate-950 text-emerald-500 rounded-[1.5rem] flex items-center justify-center mb-10 shadow-xl border border-white/5 group-hover:scale-110 transition-transform">
                    <item.icon size={32} />
                  </div>
                  <h4 className="text-3xl font-black mb-6 text-white uppercase tracking-tighter italic leading-none">{item.title}</h4>
                  <p className="text-slate-400 font-medium leading-relaxed italic text-lg">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Section with Floating Cards */}
      <section className="py-40 px-6 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-32 gap-12 text-center md:text-left">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter text-white drop-shadow-2xl">The Global <br /><span className="text-emerald-500 italic">Validation</span></h2>
            </div>
            <div className="max-w-xs space-y-6">
               <p className="text-slate-400 font-medium text-xl leading-snug">"The most intelligent consumer product for the sustainability era."</p>
               <div className="w-20 h-1 bg-white/20 rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4 md:px-0">
            {[
              { name: "S. Jenkins", role: "Sustainability Lead", text: "Integrating Intelli Food into our ecosystem reduced waste overhead by 40% within 60 days.", image: "https://i.pravatar.cc/150?u=s" },
              { name: "R. Chen", role: "AI Researcher", text: "The vision model's speed on edge devices is unprecedented. It feels like magic in your kitchen.", image: "https://i.pravatar.cc/150?u=r" },
              { name: "M. Taylor", role: "Executive Chef", text: "Finally, an inventory system that thinks like a chef. The recipe generation is inspired.", image: "https://i.pravatar.cc/150?u=m" }
            ].map((review, i) => (
              <TiltCard key={i} className="group h-full">
                <div className="p-12 bg-slate-900 border border-white/10 rounded-[4rem] shadow-3xl h-full flex flex-col relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/5 blur-[60px] rounded-full" />
                  <div className="flex gap-2 mb-10">
                    {[1,2,3,4,5].map(s => <Sparkles key={s} size={16} className="text-emerald-500" />)}
                  </div>
                  <p className="text-2xl text-slate-100 font-black italic mb-14 leading-[1.3] group-hover:text-emerald-400 transition-colors">
                    "{review.text}"
                  </p>
                  <div className="mt-auto pt-10 border-t border-white/5 flex items-center gap-6">
                    <img src={review.image} alt={review.name} className="w-16 h-16 rounded-[1.5rem] object-cover border-2 border-white/10 group-hover:border-emerald-500 transition-colors shadow-2xl" referrerPolicy="no-referrer" />
                    <div>
                      <p className="font-black text-white text-xl uppercase tracking-tighter italic">{review.name}</p>
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 italic mt-1">{review.role}</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Extreme CTA Section */}
      <section className="py-40 px-6">
        <motion.div 
          initial={{ opacity: 0, rotateX: 60, scale: 0.8 }}
          whileInView={{ opacity: 1, rotateX: 0, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto bg-slate-900/50 backdrop-blur-3xl border border-white/10 rounded-[5rem] p-16 lg:p-32 text-center relative overflow-hidden shadow-edge group"
        >
           <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-blue-500/10" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[160px] rounded-full -z-10 group-hover:bg-emerald-500/10 transition-colors duration-1000" />
           
           <div className="relative z-10 space-y-14">
              <motion.div 
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 bg-emerald-500/20 rounded-[2rem] mx-auto flex items-center justify-center mb-10 border border-emerald-500/30"
              >
                 <Leaf className="text-emerald-400" size={40} />
              </motion.div>
              
              <h2 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter text-white leading-[0.8] mb-8">
                The Next Era <br />
                <span className="text-emerald-500">Begins Now</span>
              </h2>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                 <Link to="/signup" className="w-full sm:w-auto px-14 py-7 bg-white text-slate-950 text-2xl font-black rounded-[2.5rem] uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-[0_20px_60px_rgba(0,0,0,0.5)] group text-center">
                    Claim Access
                    <ArrowRight size={28} className="inline-block ml-4 group-hover:translate-x-3 transition-transform" />
                 </Link>
                 <button className="text-white/40 text-sm font-black uppercase tracking-[0.5em] hover:text-white transition-colors underline decoration-white/20 underline-offset-8">
                    View Enterprise Solutions
                 </button>
              </div>
           </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};
