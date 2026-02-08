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
            >
                <h1 className="text-3xl md:text-4xl text-neon-green mb-2 text-glow-green">
                    <span className="mr-4">{">"}</span>
                    PROFILE_MODULE
                </h1>
                <p className="text-slate-400 font-mono text-sm md:text-base max-w-2xl">
                 Full Stack Developer with a passion for building scalable infrastructure and immersive web experiences With Spices of A.I.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column: Skills */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-2">
                        <div className="w-2 h-2 bg-neon-purple animate-pulse" />
                        <h2 className="text-xl font-bold text-foreground">SKILL_MATRIX</h2>
                    </div>
                    <SkillScanner />

                    <div className="mt-12 p-6 border border-slate-800 bg-black/40 rounded-lg">
                        <h3 className="text-neon-cyan font-mono mb-2 text-sm">CERTIFICATIONS</h3>
                        <ul className="space-y-2 text-sm text-slate-400 font-mono">
                            <li className="flex items-center gap-2">
                                <span className="text-neon-green">✔</span> AWS Certified Solutions Architect
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-neon-green">✔</span> Certified Kubernetes Administrator (CKA)
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-neon-green">✔</span> Docker Certified Associate
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
                    <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-2">
                        <div className="w-2 h-2 bg-neon-cyan animate-pulse" />
                        <h2 className="text-xl font-bold text-foreground">MISSION_TIMELINE</h2>
                    </div>
                    <Timeline />
                </motion.div>
            </div>
        </div>
    );
}
