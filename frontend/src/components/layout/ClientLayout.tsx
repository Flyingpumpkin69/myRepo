"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import BootSequence from "./BootSequence";
import CRTOverlay from "../ui/CRTOverlay";
import AIAssistant from "../ui/AIAssistant";
import Footer from "./Footer";
import { useTheme } from "@/context/ThemeContext";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isBooting, setIsBooting] = useState(true);
    const pathname = usePathname();
    const { theme } = useTheme();

    const handleBootComplete = () => {
        setIsBooting(false);
    };

    // Disable boot sequence if we are in FUTURE mode (optional choice, keeps it clean)
    useEffect(() => {
        if (theme === "FUTURE") {
            setIsBooting(false);
        }
    }, [theme]);

    return (
        <>
            {theme === "RETRO" && <CRTOverlay />}



            {isBooting && theme === "RETRO" && <BootSequence onComplete={handleBootComplete} />}

            <div className={`flex min-h-screen transition-opacity duration-1000 ${isBooting && theme === "RETRO" ? 'opacity-0' : 'opacity-100'}`}>
                <Sidebar />
                <div className="flex-1 flex flex-col md:ml-64 relative transition-colors duration-500 bg-background">
                    <TopBar />
                    <main className="flex-1 p-6 mt-14 overflow-y-auto flex flex-col">
                        <div className="flex-1">
                            {children}
                        </div>
                        <Footer />
                    </main>
                    <AIAssistant />
                </div>
            </div>
        </>
    );
}
