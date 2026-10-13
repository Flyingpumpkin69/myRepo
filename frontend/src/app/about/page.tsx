"use client";

import React from "react";
import Timeline from "@/components/ui/Timeline";
import SkillScanner from "@/components/ui/SkillScanner";
import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-card-bg/50 border border-border-color p-8 rounded-xl backdrop-blur-sm relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-1 h-full bg-neon-green" />
                <h1 className="text-3xl md:text-5xl text-neon-green mb-4 text-glow-green font-pixel">
                    <span className="mr-4 animate-pulse opacity-70">{">"}</span>
                    PROFILE_MODULE
                </h1>
                <p className="text-slate-300 font-mono text-sm md:text-lg max-w-3xl leading-relaxed">
                    Full Stack Developer with a passion for building scalable infrastructure and immersive web experiences with spices of A.I.
                    I specialize in turning complex problems into elegant, futuristic solutions.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column: Skills */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="flex items-center gap-3 mb-8 border-b border-border-color pb-4">
                        <div className="w-3 h-3 bg-neon-purple rounded-sm animate-pulse shadow-[0_0_10px_#b026ff]" />
                        <h2 className="text-2xl font-bold text-foreground font-pixel tracking-wider">SKILL_MATRIX</h2>
                    </div>

                    <div className="bg-card-bg/40 p-6 rounded-xl border border-border-color/50 mb-8">
                        <SkillScanner />
                    </div>

                    <div className="p-6 border border-neon-cyan/30 bg-card-bg/60 rounded-xl hover:border-neon-cyan/70 transition-colors duration-300 group">
                        <h3 className="text-neon-cyan font-mono mb-4 text-sm flex items-center gap-2">
                            <span className="inline-block w-2 h-2 bg-neon-cyan rounded-full"></span>
                            CERTIFICATIONS
                        </h3>
                        <ul className="space-y-3 text-sm text-slate-300 font-mono">
                            <li className="flex items-center gap-3 group-hover:translate-x-1 transition-transform">
                                <span className="text-neon-green shadow-[0_0_5px_#0f0] rounded-full px-1">✔</span>
                                AWS Certified Solutions Architect
                            </li>
                            <li className="flex items-center gap-3 group-hover:translate-x-1 transition-transform delay-75">
                                <span className="text-neon-green shadow-[0_0_5px_#0f0] rounded-full px-1">✔</span>
                                Certified Kubernetes Administrator (CKA)
                            </li>
                            <li className="flex items-center gap-3 group-hover:translate-x-1 transition-transform delay-150">
                                <span className="text-neon-green shadow-[0_0_5px_#0f0] rounded-full px-1">✔</span>
                                Docker Certified Associate
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* Right Column: Experience */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <div className="flex items-center gap-3 mb-8 border-b border-border-color pb-4">
                        <div className="w-3 h-3 bg-neon-cyan rounded-sm animate-pulse shadow-[0_0_10px_#0ff]" />
                        <h2 className="text-2xl font-bold text-foreground font-pixel tracking-wider">MISSION_TIMELINE</h2>
                    </div>

                    <div className="bg-card-bg/40 p-6 rounded-xl border border-border-color/50">
                        <Timeline />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
