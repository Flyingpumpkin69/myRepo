"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Zap } from "lucide-react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`ml-2 px-2 py-[2px] rounded-md border text-[10px] font-mono flex items-center gap-1 transition-all
        ${theme === "RETRO"
                    ? "border-neon-green text-neon-green bg-black/40 shadow-[0_0_6px_rgba(0,255,0,0.25)]"
                    : "border-neon-cyan text-neon-cyan bg-white/10 shadow-[0_0_6px_rgba(0,255,255,0.25)]"
                }
      `}
        >
            {theme === "RETRO" ? (
                <>
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                    <span>RETRO</span>
                </>
            ) : (
                <>
                    <Zap className="w-3 h-3" />
                    <span>FUTURE</span>
                </>
            )}
        </motion.button>
    );
};
export default ThemeToggle;
