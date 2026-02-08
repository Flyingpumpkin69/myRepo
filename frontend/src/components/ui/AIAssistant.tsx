"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot } from "lucide-react";

type Message = {
    id: string;
    sender: "user" | "ai";
    text: string;
};

const initialMessages: Message[] = [
    { id: "1", sender: "ai", text: "Hi, I'm Yash's AI Assistant. Ask me about his projects, skills, or contact info." }
];

const rules: Record<string, string> = {
    skills: "Yash is proficient in Full Stack Development (React, Node.js, .Net) and Infrastructure (AWS, Docker).",
    projects: "Check out the missions section! Key projects include Chatwalk, Hanwha Vision, and more.",
    contact: "You can reach Yash via email at yashrajchauhan4319@gmail.com or find him on LinkedIn.",
    experience: "Yashraj has worked with SPEC-INDIA & GTPL. He bridges the gap between Dev and Ops.",
    default: "I'm still learning. Try asking about 'skills', 'projects', 'experience', or 'contact'."
};

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [inputValue, setInputValue] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            sender: "user",
            text: inputValue
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputValue("");

        // Simulate AI thinking delay
        setTimeout(() => {
            const lowerInput = userMsg.text.toLowerCase();
            let responseText = rules.default;

            if (lowerInput.includes("skill")) responseText = rules.skills;
            else if (lowerInput.includes("project") || lowerInput.includes("work")) responseText = rules.projects;
            else if (lowerInput.includes("contact") || lowerInput.includes("email")) responseText = rules.contact;
            else if (lowerInput.includes("exp") || lowerInput.includes("history")) responseText = rules.experience;

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                sender: "ai",
                text: responseText
            };
            setMessages((prev) => [...prev, aiMsg]);
        }, 600);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 w-80 md:w-96 bg-background/95 backdrop-blur-md border border-neon-cyan/50 shadow-[0_0_20px_rgba(0,255,255,0.1)] rounded-lg overflow-hidden z-50 flex flex-col h-96"
                    >
                        {/* Header */}
                        <div className="bg-slate-800/50 p-3 border-b border-slate-700 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Bot className="w-5 h-5 text-neon-cyan" />
                                <span className="text-sm font-mono text-neon-cyan">AI_COMPANION v1.0</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 text-xs md:text-sm rounded-lg ${msg.sender === "user"
                                                ? "bg-neon-green/10 border border-neon-green/30 text-neon-green"
                                                : "bg-slate-800 border border-slate-700 text-slate-300"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-3 border-t border-slate-700 bg-black/20 flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                placeholder="Ask query..."
                                className="flex-1 bg-transparent border-none outline-none text-sm text-white font-mono placeholder:text-slate-600"
                            />
                            <button onClick={handleSend} className="text-neon-cyan hover:text-white">
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 right-6 w-14 h-14 bg-black border border-neon-cyan rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,255,255,0.3)] z-50 group hover:bg-neon-cyan/10 transition-colors"
            >
                <div className="absolute inset-0 rounded-full border border-neon-cyan/50 animate-ping opacity-20" />
                {isOpen ? (
                    <X className="w-6 h-6 text-neon-cyan" />
                ) : (
                    <Bot className="w-6 h-6 text-neon-cyan group-hover:text-white transition-colors" />
                )}
            </motion.button>
        </>
    );
};

export default AIAssistant;
