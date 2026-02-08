"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
    "INITIALIZING SYSTEM...",
    "LOADING CORE MODULES...",
    "VERIFYING SECURITY PROTOCOLS...",
    "ESTABLISHING NEURAL LINK...",
    "SYSTEM ONLINE."
];

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
    const [currentLine, setCurrentLine] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Progress bar animation
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 1;
            });
        }, 30);

        // Text lines animation
        if (currentLine < bootLines.length) {
            const timeout = setTimeout(() => {
                setCurrentLine((prev) => prev + 1);
            }, 800);
            return () => clearTimeout(timeout);
        } else {
            // Small delay after last line before finishing
            const finishTimeout = setTimeout(() => {
                onComplete();
            }, 1000);
            return () => clearTimeout(finishTimeout);
        }

        return () => clearInterval(progressInterval);
    }, [currentLine, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 bg-background z-[100] flex flex-col items-center justify-center font-mono text-neon-green"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            <div className="w-full max-w-md px-6">
                <div className="mb-8 h-32">
                    {bootLines.slice(0, currentLine + 1).map((line, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-2 text-sm md:text-base"
                        >
                            <span className="mr-2">{">"}</span>
                            {line}
                        </motion.div>
                    ))}
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-4 relative">
                    <div className="absolute inset-0 bg-neon-green/20" />
                    <motion.div
                        className="h-full bg-neon-green shadow-[0_0_10px_#0f0]"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex justify-between items-center text-xs text-slate-500">
                    <span>LOADING... {progress}%</span>
                    <span>MEM: 64KB OK</span>
                </div>

                {/* Skip Button */}
                <button
                    onClick={onComplete}
                    className="mt-12 text-xs text-slate-600 hover:text-white border border-transparent hover:border-slate-600 px-4 py-2 transition-colors uppercase tracking-widest"
                >
                    [ Skip Intro ]
                </button>
            </div>

            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-neon-green" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-neon-green" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-neon-green" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-neon-green" />
        </motion.div>
    );
};

export default BootSequence;
