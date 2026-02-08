"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

type Experience = {
    id: string;
    role: string;
    company: string;
    period: string;
    description: string;
    tech: string[];
};

const careerData: Experience[] = [
    {
        id: "1",
        role: "Senior Full Stack Developer",
        company: "TechCorp Industries",
        period: "2024 - PRESENT",
        description: "Leading development of scalable cloud-native applications. Optimized CI/CD pipelines reducing deployment time by 40%.",
        tech: ["Next.js", "AWS", "Docker", "Node.js"]
    },
    {
        id: "2",
        role: "Software Engineer",
        company: "InnovateX Solutions",
        period: "2021 - 2024",
        description: "Developed real-time collaboration tools. Implemented microservices architecture using Go and gRPC.",
        tech: ["React", "Go", "MongoDB", "Redis"]
    },
    {
        id: "3",
        role: "Junior Web Developer",
        company: "StartUp Alpha",
        period: "2019 - 2021",
        description: "Built responsive UI components and integrated REST APIs. Assisted in database schema design.",
        tech: ["Vue.js", "Laravel", "MySQL"]
    }
];

const Timeline = () => {
    // The new code uses 'timelineData' and 'item.tags', 'item.year'
    // Let's adapt careerData to match the new structure expected by the new JSX.
    // Assuming 'period' maps to 'year' and 'tech' maps to 'tags'.
    const timelineData = careerData.map(exp => ({
        role: exp.role,
        company: exp.company,
        year: exp.period, // Mapping 'period' to 'year'
        description: exp.description,
        tags: exp.tech // Mapping 'tech' to 'tags'
    }));

    return (
        <div className="relative pl-8 border-l border-slate-800">
            {timelineData.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="mb-8 relative"
                >
                    {/* Dot */}
                    <div className={`absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-slate-900 ${index === 0 ? "bg-neon-green shadow-[0_0_10px_#0f0]" : "bg-slate-700"}`} />

                    <div className="bg-card-bg border border-border-color p-4 rounded-lg hover:border-neon-cyan/50 transition-colors duration-300 group">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-foreground font-bold group-hover:text-neon-cyan transition-colors">{item.role}</h3>
                            <span className="text-xs font-mono text-slate-500 bg-background/50 px-2 py-1 rounded border border-border-color">{item.year}</span>
                        </div>
                        <div className="text-sm text-neon-purple mb-2 font-mono">{item.company}</div>
                        <p className="text-slate-400 text-sm mb-3">
                            {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {item.tags.map(tag => (
                                <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-background/50 rounded text-slate-500 border border-slate-800">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ))}

            {/* Decorative Bottom Node */}
            <div className="absolute -bottom-2 -left-[9px] w-4 h-4 bg-slate-800 rounded-full border-2 border-slate-600" />
        </div>
    );
};

export default Timeline;
