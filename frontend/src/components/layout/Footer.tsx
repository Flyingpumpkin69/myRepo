"use client";

import React from "react";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const socialLinks = [
    { name: "GITHUB", icon: Github, href: "https://github.com/Flyingpumpkin69", color: "hover:text-neon-purple" },
    { name: "LINKEDIN", icon: Linkedin, href: "https://in.linkedin.com/in/yashrajsinh-chauhan%E2%8F%AA-b01676246", color: "hover:text-neon-cyan" },
    //{ name: "TWITTER", icon: Twitter, href: "https://twitter.com", color: "hover:text-neon-green" },
    { name: "EMAIL", icon: Mail, href: "mailto:yashrajchauhan4319@gmail.com", color: "hover:text-white" },
];

const Footer = () => {
    return (
        <footer className="w-full border-t-2 border-border-color bg-background/80 backdrop-blur-md p-6 mt-12 z-40 relative transition-colors duration-300">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Left: Terminal Input Style */}
                <div className="font-mono text-sm text-slate-500">
                    <span className="text-neon-green mr-2">{">"}</span>
                    <span className="text-slate-300">CONNECT_WITH_ME</span>
                    <span className="animate-pulse">_</span>
                </div>

                {/* Center: Social Links */}
                <div className="flex gap-6">
                    {socialLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            target="_blank"
                            className={`flex items-center gap-2 text-xs md:text-sm text-slate-400 transition-colors ${link.color} font-mono group`}
                        >
                            <link.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            <span className="hidden sm:inline">{link.name}</span>
                        </Link>
                    ))}
                </div>

                {/* Right: Status */}
                <div className="flex flex-col items-end text-xs font-mono">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-slate-500">STATUS:</span>
                        <span className="text-neon-green bg-neon-green/10 px-2 py-0.5 rounded border border-neon-green/20 animate-pulse">
                            OPEN TO OPPORTUNITIES
                        </span>
                    </div>
                    <span className="text-slate-600">© 2026 YASH.SYS // ALL RIGHTS RESERVED</span>
                </div>
            </div>
            {/* Decorative Bottom Line */}
            <motion.div
                className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 2 }}
                viewport={{ once: true }}
            />
        </footer>
    );
};

export default Footer;
