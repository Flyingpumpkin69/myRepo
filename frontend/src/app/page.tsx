"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
      {/* Welcome Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="col-span-1 md:col-span-2 lg:col-span-3 p-8 border border-neon-green/40 bg-card-bg/80 backdrop-blur-md rounded-xl shadow-[0_0_15px_rgba(0,255,136,0.15)] relative overflow-hidden group hover:border-neon-green hover:shadow-[0_0_30px_rgba(0,255,136,0.3)] transition-all duration-500"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <h1 className="text-3xl md:text-5xl text-neon-green mb-4 text-glow-green font-pixel">
          WELCOME, HUMAN.
        </h1>
        <p className="text-slate-300 font-mono text-sm md:text-lg max-w-2xl">
          SYSTEM INITIALIZED. ACCESS LEVEL: GUEST.
        </p>
        <p className="text-slate-400 font-mono text-xs md:text-sm mt-4 border-l-2 border-neon-green pl-3">
          I am a Full Stack Developer & Infrastructure Engineer building the next generation of digital experiences.
        </p>

        {/* Animated radar/spinner in the corner */}
        <div className="absolute -top-10 -right-10 w-40 h-40 opacity-20 pointer-events-none">
          <div className="absolute inset-0 border-2 border-neon-green/50 rounded-full animate-[spin_4s_linear_infinite] border-t-neon-green" />
          <div className="absolute inset-4 border border-neon-green/30 rounded-full animate-[spin_6s_linear_infinite_reverse] border-b-neon-green" />
          <div className="absolute inset-0 bg-neon-green/10 rounded-full animate-pulse blur-xl" />
        </div>
      </motion.div>

      {/* Stats Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="p-6 border border-border-color bg-card-bg/60 rounded-xl hover:border-neon-cyan/50 hover:shadow-[0_0_15px_rgba(0,255,255,0.15)] transition-all duration-300"
      >
        <h2 className="text-neon-cyan font-mono mb-6 text-sm flex items-center gap-2">
          <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
          SYSTEM_STATUS
        </h2>
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>UPTIME</span>
              <span className="text-white">99.99%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-neon-cyan w-full shadow-[0_0_10px_#0ff]" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>CPU_LOAD</span>
              <span className="text-white">12%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-neon-cyan w-[12%] opacity-80" />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="p-6 border border-border-color bg-card-bg/60 rounded-xl hover:border-neon-purple/50 hover:shadow-[0_0_15px_rgba(176,38,255,0.15)] transition-all duration-300"
      >
        <h2 className="text-neon-purple font-mono mb-6 text-sm flex items-center gap-2">
          <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse" />
          ACTIVE_MISSIONS
        </h2>
        <div className="text-4xl font-pixel text-white mb-2">04</div>
        <p className="text-sm text-slate-400 font-mono mt-4 border-t border-slate-800 pt-4">Latest: Portfolio v2</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="p-6 border border-border-color bg-card-bg/60 rounded-xl hover:border-neon-pink/50 hover:shadow-[0_0_15px_rgba(255,0,255,0.15)] transition-all duration-300"
      >
        <h2 className="text-neon-pink font-mono mb-6 text-sm flex items-center gap-2">
          <div className="w-2 h-2 bg-neon-pink rounded-full animate-pulse" />
          INFRA_HEALTH
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {['API', 'DB', 'CDN', 'AUTH'].map((item) => (
            <div key={item} className="px-3 py-2 bg-neon-pink/5 border border-neon-pink/20 text-xs font-mono text-neon-pink rounded text-center hover:bg-neon-pink/10 transition-colors">
              {item}: OK
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
