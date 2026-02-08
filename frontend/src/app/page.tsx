export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
      {/* Welcome Widget */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 p-6 border border-neon-green/30 bg-black/40 backdrop-blur-sm rounded-lg relative overflow-hidden group hover:border-neon-green/60 transition-colors">
        <h1 className="text-2xl md:text-4xl text-neon-green mb-2 text-glow-green">
          WELCOME,HUMAN.
        </h1>
        <p className="text-slate-400 font-mono text-sm md:text-base">
          SYSTEM INITIALIZED. ACCESS LEVEL: Guest.
        </p>
        <div className="absolute top-0 right-0 p-4 opacity-500">
          <div className="w-16 h-16 border-2 border-neon-green/20 rounded-full animate-spin border-t-neon-green" />
        </div>
      </div>

      {/* Stats Placeholder */}
      <div className="p-6 border border-slate-800 bg-black/40 rounded-lg">
        <h2 className="text-neon-cyan font-mono mb-4 text-sm">SYSTEM_STATUS</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-500">
            <span>UPTIME</span>
            <span className="text-white">99.9%</span>
          </div>
          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-neon-cyan w-full animate-pulse" />
          </div>
        </div>
      </div>

      <div className="p-6 border border-slate-800 bg-black/40 rounded-lg">
        <h2 className="text-neon-purple font-mono mb-4 text-sm">ACTIVE_PROJECTS</h2>
        <div className="text-2xl font-bold text-white">04</div>
        <p className="text-xs text-slate-500 mt-2">Latest: Portfolio v2</p>
      </div>

      <div className="p-6 border border-slate-800 bg-black/40 rounded-lg">
        <h2 className="text-neon-pink font-mono mb-4 text-sm">INFRA_HEALTH</h2>
        <div className="flex gap-2">
          {['API', 'DB', 'CDN'].map((item) => (
            <div key={item} className="px-2 py-1 bg-neon-pink/10 border border-neon-pink/30 text-[10px] text-neon-pink rounded">
              {item}: OK
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
