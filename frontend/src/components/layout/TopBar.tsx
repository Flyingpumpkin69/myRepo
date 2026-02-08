"use client";

import React, { useState, useEffect } from "react";
import { Battery, Wifi, Volume2, Menu } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";

interface TopBarProps {
    onMenuClick?: () => void;
}

const TopBar = ({ onMenuClick }: TopBarProps) => {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString("en-US", { hour12: false }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="fixed top-0 left-0 md:left-64 right-0 h-14 bg-background/80 backdrop-blur-md border-b-2 border-border-color z-30 flex items-center justify-between px-4 md:px-6 transition-colors duration-300">
            {/* Left System Info */}
            <div className="flex items-center gap-4 md:gap-6 text-xs font-mono text-slate-400">
                {/* Mobile Menu Button */}
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-1 hover:text-white hover:bg-white/10 rounded transition-colors"
                    aria-label="Toggle Menu"
                >
                    <Menu className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                    <span className="text-neon-green hidden sm:inline">SYSTEM ONLINE</span>
                    <span className="text-neon-green sm:hidden">ON</span>
                </div>
                <div className="hidden sm:block">
                    <span>LOC: </span>
                    <span className="text-white">AHMEDABAD, IN</span>
                </div>
                <div className="hidden sm:block">
                    <span>MODE: </span>
                    <span className="text-neon-purple">BUILD_V2</span>
                </div>
                <div className="flex items-center">
                    <span className="hidden sm:inline mr-2">THEME:</span>
                    <ThemeToggle />
                </div>
            </div>

            {/* Right Utility Icons */}
            <div className="flex items-center gap-4 text-slate-400">
                <span className="font-mono text-sm text-neon-cyan hidden xs:block">{time}</span>
                <div className="h-4 w-[1px] bg-slate-700 hidden xs:block" />
                <Wifi className="w-4 h-4" />
                <Volume2 className="w-4 h-4 cursor-pointer hover:text-white" />
                <Battery className="w-4 h-4" />
            </div>
        </header>
    );
};

export default TopBar;
