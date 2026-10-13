"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl md:text-5xl font-pixel text-neon-green mb-4 text-shadow-green">
            CALENDAR_SYS
          </h1>
          <div className="h-1 w-full bg-slate-800 rounded overflow-hidden">
            <div className="h-full bg-neon-green/50 animate-pulse w-full"></div>
          </div>
        </motion.div>

        {/* Calendar Widget */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/80 border-2 border-slate-700 rounded-lg p-6 w-full max-w-2xl shadow-[0_0_20px_rgba(0,255,0,0.15)] relative overflow-hidden group"
        >
          {/* Cyberpunk accent lines */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-green via-neon-cyan to-neon-purple opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-green opacity-50"></div>

          {/* Controls */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={prevMonth}
              className="p-2 border border-slate-600 rounded bg-slate-800 hover:bg-slate-700 hover:text-neon-cyan hover:border-neon-cyan transition-all text-slate-300"
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-2xl font-bold font-mono text-neon-cyan tracking-widest text-shadow-cyan uppercase">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 border border-slate-600 rounded bg-slate-800 hover:bg-slate-700 hover:text-neon-cyan hover:border-neon-cyan transition-all text-slate-300"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center font-mono text-slate-400 text-xs md:text-sm font-bold">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {/* Empty slots for offset */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="h-10 md:h-14 bg-slate-800/30 rounded border border-slate-800/50"></div>
            ))}

            {/* Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const isToday = dayNum === currentDay && currentDate.getMonth() === currentMonth && currentDate.getFullYear() === currentYear;

              return (
                <div
                  key={`day-${i}`}
                  className={`
                    flex items-center justify-center h-10 md:h-14 font-mono text-sm md:text-base border rounded relative cursor-default
                    transition-all duration-300 hover:scale-[1.05]
                    ${isToday
                      ? 'bg-neon-green/20 border-neon-green text-neon-green font-bold shadow-[0_0_10px_rgba(0,255,0,0.5)]'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-neon-cyan hover:text-white'
                    }
                  `}
                >
                  {isToday && (
                    <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-neon-green animate-ping"></div>
                  )}
                  {dayNum}
                </div>
              );
            })}
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default CalendarPage;