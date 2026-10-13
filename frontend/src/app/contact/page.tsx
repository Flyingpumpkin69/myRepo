"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, AlertCircle, CheckCircle } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [status, setStatus] = useState<"IDLE" | "SENDING" | "SUCCESS" | "ERROR">("IDLE");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("SENDING");
        setErrorMessage("");

        // Dynamically get the backend URL (assumes you will pass an env var, or defaults to the hosted one)
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://myportfolio-yash.onrender.com";

        try {
            const response = await fetch(`${backendUrl}/api/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus("SUCCESS");
                setFormData({ name: "", email: "", message: "" });
                setTimeout(() => setStatus("IDLE"), 5000);
            } else {
                setStatus("ERROR");
                setErrorMessage(data.error || "Failed to transmit message.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            setStatus("ERROR");
            setErrorMessage("Network error. Backend unreachable.");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
        >
            <div className="mb-8 border-b border-border-color pb-4">
                <h1 className="text-3xl md:text-5xl text-neon-green mb-4 text-glow-green font-pixel">
                    TRANSMIT_MSG
                </h1>
                <p className="text-slate-400 font-mono text-sm md:text-base border-l-2 border-neon-green pl-3">
                    ESTABLISH SECURE CONNECTION WITH YASHRAJ.SYS
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-card-bg/60 p-8 border border-border-color rounded-xl relative overflow-hidden transition-all duration-300 hover:border-neon-green/50 hover:shadow-[0_0_20px_rgba(0,255,136,0.1)] backdrop-blur-sm">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none">
                    <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-neon-green/30 rounded-tr-xl" />
                    <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-neon-cyan/20 rounded-tr-lg" />
                </div>
                <div className="absolute bottom-0 left-0 w-24 h-24 pointer-events-none">
                    <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-neon-purple/30 rounded-bl-xl" />
                </div>

                <div className="relative z-10">
                    <label htmlFor="name" className="block text-neon-cyan font-mono text-xs mb-2">IDENTIFIER (NAME)</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-background/80 border border-border-color rounded-lg p-4 text-foreground font-mono focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green transition-all shadow-inner"
                        placeholder="ENTER_NAME"
                    />
                </div>

                <div className="relative z-10">
                    <label htmlFor="email" className="block text-neon-cyan font-mono text-xs mb-2">CONTACT_FREQ (EMAIL)</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-background/80 border border-border-color rounded-lg p-4 text-foreground font-mono focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green transition-all shadow-inner"
                        placeholder="ENTER_EMAIL_WAVE"
                    />
                </div>

                <div className="relative z-10">
                    <label htmlFor="message" className="block text-neon-cyan font-mono text-xs mb-2">DATA_PACKET (MESSAGE)</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full bg-background/80 border border-border-color rounded-lg p-4 text-foreground font-mono focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green transition-all shadow-inner resize-none"
                        placeholder="INPUT_MESSAGE_DATA..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === "SENDING" || status === "SUCCESS"}
                    className={`relative z-10 w-full py-4 px-6 rounded-lg font-bold font-mono tracking-widest transition-all duration-300 flex items-center justify-center gap-3 ${
                        status === "SUCCESS"
                        ? "bg-neon-green text-black cursor-default shadow-[0_0_15px_rgba(0,255,136,0.5)]"
                        : "bg-slate-800 text-neon-green hover:bg-neon-green hover:text-black border border-neon-green shadow-[0_0_10px_rgba(0,255,136,0.2)] hover:shadow-[0_0_20px_rgba(0,255,136,0.6)]"
                    }`}
                >
                    {status === "SENDING" ? (
                        <span className="animate-pulse flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-neon-green border-t-transparent rounded-full animate-spin" />
                            TRANSMITTING...
                        </span>
                    ) : status === "SUCCESS" ? (
                        <>
                            <CheckCircle className="w-5 h-5" /> TRANSMISSION_COMPLETE
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> INITIATE_TRANSFER
                        </>
                    )}
                </button>

                {status === "ERROR" && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative z-10 bg-red-900/20 border border-red-500/50 p-4 rounded-lg text-red-400 text-sm font-mono flex items-center gap-3 shadow-[0_0_10px_rgba(255,0,0,0.1)]"
                    >
                        <AlertCircle className="w-5 h-5" />
                        ERROR: {errorMessage}
                    </motion.div>
                )}
            </form>
        </motion.div>
    );
}
