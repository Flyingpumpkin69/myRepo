"use client";

import React from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import { motion } from "framer-motion";

const projects = [
    {
        id: "01",
        title: "Chatwalk",
        description: "Real-time communication platform built with WebSockets and Redis. Features persistent chat history, media sharing, and group calls.",
        tech: ["React", "Node.js", "WebRTC", "Socket.io"],
        image: "",
        status: "COMPLETED" as const,
        demoLink: "#",
        repoLink: "#"
    },
    {
        id: "02",
        title: "Hanwha Vision",
        description: "Surveillance analytics dashboard for processing video feeds using AI models. Optimized for low-latency streaming.",
        tech: [".Net", "Dell-Idrac", "Mongodb","React.js", "Zabbix"],
        image: "",
        status: "COMPLETED" as const,
        demoLink: "#"
    },
    {
        id: "03",
        title: "InfraMonitor Suite",
        description: "Custom monitoring solution for tracking server health metrics across distributed clusters. Interfaced with Zabbix and Prometheus.",
        tech: ["Mongodb", ".Net", "Zabbix"],
        image: "",
        status: "IN_PROGRESS" as const,
        repoLink: "#"
    },
    {
        id: "04",
        title: "Portfolio v2",
        description: "This futuristic portfolio site. Built to demonstrate advanced frontend animations and theme management.",
        tech: ["Next.js", "Tailwind CSS", "Framer Motion","Mongodb"],
        image: "",
        status: "In_PROGRESS" as const, // typo fix later
        repoLink: "#"
    }
];

export default function ProjectsPage() {
    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8 border-b border-slate-800 pb-4 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl md:text-4xl text-neon-green mb-2 text-glow-green">
                        MISSION_LOG
                    </h1>
                    <p className="text-slate-400 font-mono text-sm">
                        SELECT A MISSION TO VIEW DETAILS
                    </p>
                </div>
                <div className="hidden md:flex gap-4 font-mono text-xs text-slate-500">
                    <span>TOTAL_MISSIONS: {projects.length}</span>
                    <span>STATUS: ALL_SYSTEMS_GO</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={{ ...project, status: project.status as "COMPLETED" | "IN_PROGRESS" | "ARCHIVED" }} index={index} />
                ))}
            </div>
        </div>
    );
}
