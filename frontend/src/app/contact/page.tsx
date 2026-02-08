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

        try {
            const response = await fetch("https://myportfolio-yash.onrender.com/api/contact", {
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
        <div className="max-w-2xl mx-auto">
            <div className="mb-8 border-b border-slate-800 pb-4">
                <h1 className="text-3xl md:text-4xl text-neon-green mb-2 text-glow-green font-pixel">
                    TRANSMIT_MSG
                </h1>
                <p className="text-slate-400 font-mono text-sm">
                    ESTABLISH SECURE CONNECTION WITH YASHRAJ.SYS
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-card-bg p-6 border border-border-color rounded-lg relative overflow-hidden transition-colors duration-300">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 p-2">
                    <div className="w-16 h-16 border-t-2 border-r-2 border-neon-green/20 rounded-tr-lg" />
                </div>

                <div>
                    <label htmlFor="name" className="block text-neon-cyan font-mono text-xs mb-2">IDENTIFIER (NAME)</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-background/50 border border-border-color rounded p-3 text-foreground font-mono focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green transition-colors"
                        placeholder="ENTER_NAME"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-neon-cyan font-mono text-xs mb-2">CONTACT_FREQ (EMAIL)</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-background/50 border border-border-color rounded p-3 text-foreground font-mono focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green transition-colors"
                        placeholder="ENTER_EMAIL_WAVE"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-neon-cyan font-mono text-xs mb-2">DATA_PACKET (MESSAGE)</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full bg-background/50 border border-border-color rounded p-3 text-foreground font-mono focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green transition-colors resize-none"
                        placeholder="INPUT_MESSAGE_DATA..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === "SENDING" || status === "SUCCESS"}
                    className={`w-full py-3 px-6 rounded font-bold font-mono tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${status === "SUCCESS"
                        ? "bg-neon-green text-black cursor-default"
                        : "bg-slate-800 text-neon-green hover:bg-neon-green hover:text-black border border-neon-green"
                        }`}
                >
                    {status === "SENDING" ? (
                        <span className="animate-pulse">TRANSMITTING...</span>
                    ) : status === "SUCCESS" ? (
                        <>
                            <CheckCircle className="w-5 h-5" /> TRANSMISSION_COMPLETE
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4" /> INITIATE_TRANSFER
                        </>
                    )}
                </button>

                {status === "ERROR" && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="bg-red-900/20 border border-red-500/50 p-4 rounded text-red-400 text-sm font-mono flex items-center gap-2"
                    >
                        <AlertCircle className="w-4 h-4" />
                        ERROR: {errorMessage}
                    </motion.div>
                )}
            </form>
        </div>
    );
}
