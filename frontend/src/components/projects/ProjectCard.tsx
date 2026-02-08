"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Terminal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProjectProps {
    id: string;
    title: string;
    description: string;
    tech: string[];
    image: string; // URL or path
    demoLink?: string;
    repoLink?: string;
    status: "COMPLETED" | "IN_PROGRESS" | "ARCHIVED";
}

const ProjectCard = ({ project, index }: { project: ProjectProps; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-card-bg border border-border-color rounded-lg overflow-hidden hover:border-neon-green/50 transition-colors duration-300"
        >
            {/* Active State Overlay (Scanline) */}
            <div className="absolute inset-0 bg-neon-green/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-0" />

            {/* Top Bar */}
            <div className="flex justify-between items-center px-4 py-2 border-b border-border-color bg-black/40 text-xs font-mono text-slate-500 z-10 relative">
                <span className="flex items-center gap-2">
                    <Terminal className="w-3 h-3" />
                    MISSION_{project.id}
                </span>
                <span className={project.status === "COMPLETED" ? "text-neon-green" : "text-neon-cyan"}>
                    [{project.status}]
                </span>
            </div>

            {/* Image Placeholder */}
            <div className="relative h-48 w-full bg-slate-800 overflow-hidden z-10">
                {project.image ? (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600 font-mono">
                        [IMAGE_DATA_PENDING]
                    </div>
                    // <Image src={project.image} alt={project.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600 font-mono">
                        [NO_SIGNAL]
                    </div>
                )}

                {/* Hover Overlay Text */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-neon-green font-mono tracking-widest border border-neon-green px-4 py-2 bg-black/80">
                        MISSION ACTIVE
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 relative z-10">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-neon-green transition-colors font-pixel">
                    {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                        <span key={t} className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-neon-cyan">
                            {t}
                        </span>
                    ))}
                </div>

                <div className="flex gap-4">
                    {project.demoLink && (
                        <Link href={project.demoLink} target="_blank" className="flex items-center gap-2 text-sm text-foreground hover:text-neon-green transition-colors">
                            <ExternalLink className="w-4 h-4" /> Live Demo
                        </Link>
                    )}
                    {project.repoLink && (
                        <Link href={project.repoLink} target="_blank" className="flex items-center gap-2 text-sm text-slate-400 hover:text-foreground transition-colors">
                            <Github className="w-4 h-4" /> Source
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
