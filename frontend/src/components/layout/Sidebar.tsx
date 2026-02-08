"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, User, Code, Server, Mail } from "lucide-react";
import { clsx } from "clsx";

const navItems = [
    { name: "HOME", path: "/", icon: Home },
    { name: "ABOUT", path: "/about", icon: User },
    { name: "PROJECTS", path: "/projects", icon: Code },
    { name: "INFRA", path: "/infra", icon: Server },
    { name: "CONTACT", path: "/contact", icon: Mail },
];

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-full w-20 md:w-64 bg-background border-r-2 border-border-color z-40 hidden md:flex flex-col transition-colors duration-300">
            {/* Header / Logo Area */}
            <div className="p-6 border-b-2 border-border-color">
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-neon-green to-neon-cyan bg-clip-text text-transparent animate-pulse">
                    YASHRAJ.SYS
                </h1>
                <p className="text-xs text-slate-500 mt-1 font-mono">v2.0.4 ONLINE</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-8 flex flex-col gap-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link key={item.path} href={item.path}>
                            <motion.div
                                className={clsx(
                                    "relative flex items-center gap-4 px-6 py-3 cursor-pointer group overflow-hidden transition-all duration-300",
                                    isActive ? "text-neon-green" : "text-slate-400 hover:text-white"
                                )}
                                whileHover={{ x: 5 }}
                            >
                                {/* Active Indicator Scanline */}
                                {isActive && (
                                    <motion.div
                                        layoutId="active-nav"
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-neon-green shadow-[0_0_10px_#0f0]"
                                    />
                                )}

                                {/* Hover Background Glow */}
                                <div className="absolute inset-0 bg-neon-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <item.icon className={clsx("w-5 h-5 z-10", isActive && "animate-pulse")} />

                                <span className="font-mono text-sm tracking-wider z-10 hidden md:block group-hover:text-shadow-green">
                                    {item.name}
                                </span>

                                {/* Decorative Pixel Grid on Hover */}
                                <div className="absolute right-2 opacity-0 group-hover:opacity-50 transition-opacity">
                                    <div className="w-2 h-2 bg-current" />
                                </div>
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Status */}
            <div className="p-4 border-t-2 border-slate-800 text-[10px] text-slate-600 font-mono">
                <div className="flex justify-between items-center mb-2">
                    <span>CPU</span>
                    <div className="w-10 h-1 bg-slate-800 overflow-hidden">
                        <div className="h-full bg-neon-purple animate-[width_2s_infinite] w-[40%]" />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span>MEM</span>
                    <div className="w-20 h-1 bg-slate-800 overflow-hidden">
                        <div className="h-full bg-neon-cyan animate-[width_3s_infinite] w-[60%]" />
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
