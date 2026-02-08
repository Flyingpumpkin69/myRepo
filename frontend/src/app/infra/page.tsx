"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Server, Activity, Database, Shield } from "lucide-react";

export default function InfraPage() {
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        const newLog = `[${new Date().toLocaleTimeString()}] SYSTEM_CHECK: OK`;
        setLogs([newLog]);

        const interval = setInterval(() => {
            const actions = ["PING", "TRACE", "AUTH", "SYNC", "ACK"];
            const targets = ["192.168.1.10", "DB_SHARD_01", "GATEWAY_N", "AUTH_SVC"];
            const statuses = ["SUCCESS", "PENDING", "COMPLETED", "VERIFIED"];

            const timestamp = new Date().toLocaleTimeString();
            const action = actions[Math.floor(Math.random() * actions.length)];
            const target = targets[Math.floor(Math.random() * targets.length)];
            const status = statuses[Math.floor(Math.random() * statuses.length)];

            const logLine = `[${timestamp}] ${action} -> ${target} : ${status}`;

            setLogs((prev) => [logLine, ...prev].slice(0, 8));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                    <h1 className="text-3xl md:text-4xl text-neon-purple mb-2 text-glow-purple font-pixel">
                        INFRA_MONITOR
                    </h1>
                    <p className="text-slate-400 font-mono text-sm">
                        REAL-TIME SYSTEM DIAGNOSTICS & TELEMETRY
                    </p>
                </div>
                <div className="flex gap-2">
                    <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse shadow-[0_0_10px_#0f0]" />
                    <span className="text-xs text-neon-green font-mono">LIVE_FEED</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Metric Card 1 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 bg-card-bg border border-border-color rounded-lg relative overflow-hidden transition-colors duration-300"
                >
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-slate-400 font-mono text-xs">CPU_LOAD</span>
                        <Server className="w-4 h-4 text-neon-cyan" />
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-2 font-mono">24.5%</div>
                    {/* Fake Graph */}
                    <div className="flex items-end gap-1 h-12">
                        {[40, 60, 30, 80, 50, 70, 45, 60, 90, 50].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: "20%" }}
                                animate={{ height: `${h}%` }}
                                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", delay: i * 0.1 }}
                                className="flex-1 bg-neon-cyan/50 rounded-t-sm"
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Metric Card 2 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="p-6 bg-card-bg border border-border-color rounded-lg transition-colors duration-300"
                >
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-slate-400 font-mono text-xs">MEMORY_USAGE</span>
                        <Database className="w-4 h-4 text-neon-purple" />
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-2 font-mono">64GB / 128GB</div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-4">
                        <div className="h-full bg-neon-purple w-[50%] animate-pulse" />
                    </div>
                </motion.div>

                {/* Metric Card 3 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 bg-card-bg border border-border-color rounded-lg transition-colors duration-300"
                >
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-slate-400 font-mono text-xs">SECURITY_STATUS</span>
                        <Shield className="w-4 h-4 text-neon-green" />
                    </div>
                    <div className="text-2xl font-bold text-neon-green mb-2 font-mono">NORMAL</div>
                    <p className="text-xs text-slate-500 mt-2">No anomalies detected in last 24h.</p>
                </motion.div>
            </div>

            {/* Logs Console */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="border border-border-color bg-black/80 rounded-lg p-4 font-mono text-xs md:text-sm h-64 overflow-hidden relative"
            >
                <div className="absolute top-2 right-2 px-2 py-1 bg-background border border-border-color text-[10px] text-slate-400 rounded">
                    TERMINAL_OUT
                </div>
                <div className="flex flex-col justify-end h-full gap-1">
                    {logs.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1 - (i * 0.1), x: 0 }}
                            className="text-neon-green"
                        >
                            <span className="text-slate-600 mr-2">{">"}</span>
                            {log}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
