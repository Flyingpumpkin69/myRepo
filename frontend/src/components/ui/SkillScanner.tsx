"use client";

import React from "react";
import { motion } from "framer-motion";

const skills = [
    { name: "Frontend Architecture", level: 80, color: "bg-neon-green", shadow: "shadow-[0_0_10px_#0f0]" },
    { name: "Backend Logic", level: 95, color: "bg-neon-purple", shadow: "shadow-[0_0_10px_#b026ff]" },
    { name: "Cloud Infra (AWS)", level: 85, color: "bg-neon-cyan", shadow: "shadow-[0_0_10px_#0ff]" },
    { name: "DevOps & CI/CD", level: 70, color: "bg-neon-pink", shadow: "shadow-[0_0_10px_#ff00ff]" },
    { name: "UI/UX Design", level: 60, color: "bg-orange-600", shadow: "shadow-[0_0_10px_#ff5500]" },
];

const SkillScanner = () => {
    return (
        <div className="space-y-6">
            {skills.map((skill, index) => (
                <div key={skill.name} className="relative">
                    <div className="flex justify-between items-end mb-1">
                        <span className="font-mono text-sm text-slate-300">{skill.name}</span>
                        <span className="font-mono text-xs text-slate-500">ANALYZING... {skill.level}%</span>
                    </div>

                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden relative">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className={`h-full ${skill.color} ${skill.shadow} relative`}
                        >
                            <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white opacity-50 animate-pulse" />
                        </motion.div>
                    </div>
                </div>
            ))}

            <div className="mt-8 p-4 border border-border-color bg-card-bg text-xs font-mono text-slate-500 text-center transition-colors duration-300">
                SYSTEM ANALYSIS COMPLETE. ALL MODULES OPTIMIZED.
            </div>
        </div>
    );
};

export default SkillScanner;
