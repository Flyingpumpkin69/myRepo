"use client";

import React, { useEffect, useState } from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface GithubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    homepage: string;
    language: string;
    topics: string[];
    updated_at: string;
}

// Keeping the original important projects to display them first or prominently
const featuredProjects = [
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
        status: "IN_PROGRESS" as const,
        repoLink: "#"
    }
];

export default function ProjectsPage() {
    const [repos, setRepos] = useState<GithubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch("https://api.github.com/users/Flyingpumpkin69/repos?sort=updated&per_page=12");
                if (!response.ok) {
                    throw new Error("Failed to fetch repositories");
                }
                const data = await response.json();
                // Filter out forks if desired, or keep all. Let's keep all for now.
                setRepos(data);
            } catch (err) {
                console.error(err);
                setError("FAILED TO CONNECT TO GITHUB MAINFRAME");
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, []);

    // Format GitHub repos to match our ProjectCard props format
    const githubProjects = repos.map((repo) => ({
        id: `GH-${repo.id.toString().substring(0, 4)}`,
        title: repo.name,
        description: repo.description || "No description provided in the repository.",
        tech: repo.topics && repo.topics.length > 0
            ? repo.topics
            : (repo.language ? [repo.language] : ["Various"]),
        image: "",
        status: "COMPLETED" as const, // We assume past repos are completed
        demoLink: repo.homepage || undefined,
        repoLink: repo.html_url
    }));

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8 border-b border-slate-800 pb-4 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl md:text-4xl text-neon-green mb-2 text-glow-green font-pixel">
                        MISSION_LOG
                    </h1>
                    <p className="text-slate-400 font-mono text-sm">
                        SELECT A MISSION TO VIEW DETAILS
                    </p>
                </div>
                <div className="hidden md:flex gap-4 font-mono text-xs text-slate-500">
                    <span>TOTAL_MISSIONS: {featuredProjects.length + repos.length}</span>
                    <span>STATUS: {loading ? "SCANNING..." : "ALL_SYSTEMS_GO"}</span>
                </div>
            </div>

            {/* Featured Projects Section */}
            <div className="mb-12">
                <h2 className="text-2xl text-neon-cyan mb-6 font-mono border-l-4 border-neon-cyan pl-3">CORE_DIRECTIVES (FEATURED)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>

            {/* GitHub Repositories Section */}
            <div>
                <h2 className="text-2xl text-neon-purple mb-6 font-mono border-l-4 border-neon-purple pl-3">PUBLIC_ARCHIVE (GITHUB)</h2>

                {loading ? (
                    <div className="flex justify-center items-center py-20 text-neon-green font-mono">
                        <Loader2 className="w-8 h-8 animate-spin mr-3" />
                        UPLOADING DATA FROM EXTERNAL SERVERS...
                    </div>
                ) : error ? (
                    <div className="p-6 border border-red-500 bg-red-900/20 text-red-400 font-mono rounded">
                        [ERROR] {error}
                    </div>
                ) : githubProjects.length === 0 ? (
                    <div className="p-6 border border-slate-700 bg-slate-900/50 text-slate-400 font-mono rounded">
                        [NO_RECORDS_FOUND]
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {githubProjects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index + featuredProjects.length} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
