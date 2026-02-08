import type { Metadata } from "next";
import { Press_Start_2P, Rajdhani } from "next/font/google";
import ClientLayout from "@/components/layout/ClientLayout";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  variable: "--font-pixel",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yash | Retro Futuristic Portfolio",
  description: "A neo-retro portfolio showcasing development and infrastructure skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pressStart2P.variable} ${rajdhani.variable} antialiased bg-background text-foreground overflow-x-hidden`}
      >
        <ThemeProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
