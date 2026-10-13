"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const CalculatorPage = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumClick = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOpClick = (op: string) => {
    if (operator && previousValue && !waitingForNewValue) {
      calculate();
    } else {
      setPreviousValue(display);
    }
    setOperator(op);
    setWaitingForNewValue(true);
  };

  const calculate = () => {
    if (!operator || !previousValue) return;

    let result = 0;
    const prev = parseFloat(previousValue);
    const curr = parseFloat(display);

    switch (operator) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "*":
        result = prev * curr;
        break;
      case "/":
        if (curr === 0) {
          setDisplay("ERR_DIV_ZERO");
          setOperator(null);
          setPreviousValue(null);
          setWaitingForNewValue(true);
          return;
        }
        result = prev / curr;
        break;
    }

    // Format to avoid super long decimals
    const resultStr = parseFloat(result.toPrecision(12)).toString();
    setDisplay(resultStr);
    setPreviousValue(resultStr);
    setOperator(null);
    setWaitingForNewValue(true);
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay("0.");
      setWaitingForNewValue(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl md:text-5xl font-pixel text-neon-cyan mb-4 text-shadow-cyan">
            CALC_UNIT
          </h1>
          <div className="h-1 w-full bg-slate-800 rounded overflow-hidden">
            <div className="h-full bg-neon-cyan/50 animate-pulse w-full"></div>
          </div>
        </motion.div>

        {/* Calculator Widget */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900 border-4 border-slate-700 rounded-xl p-4 md:p-6 w-full max-w-sm shadow-[0_0_30px_rgba(0,255,255,0.15)] relative overflow-hidden group"
        >
          {/* Cyberpunk accent lines */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-green via-neon-cyan to-neon-purple opacity-50"></div>

          {/* Display screen */}
          <div className="bg-black border-2 border-slate-800 rounded-md p-4 mb-6 shadow-inner relative overflow-hidden flex flex-col items-end justify-end h-24">
            {/* Scanline effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.05)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none z-10" />

            {/* Previous op text */}
            <div className="text-neon-cyan/50 font-mono text-sm h-6">
              {previousValue && operator ? `${previousValue} ${operator}` : ""}
            </div>

            {/* Current value */}
            <div className={`font-mono text-3xl md:text-4xl text-neon-green text-shadow-green break-all text-right z-0 ${display === "ERR_DIV_ZERO" ? "text-red-500 text-shadow-none text-xl" : ""}`}>
              {display}
            </div>
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-4 gap-3">
            {/* Row 1 */}
            <button onClick={clear} className="col-span-3 py-3 md:py-4 bg-slate-800 border-2 border-red-900/50 hover:border-red-500 rounded text-red-400 font-mono font-bold text-xl hover:bg-slate-700 hover:text-red-300 transition-all shadow-[0_4px_0_rgb(15,23,42)] active:shadow-[0_0px_0_rgb(15,23,42)] active:translate-y-1">
              CLR
            </button>
            <button onClick={() => handleOpClick("/")} className="py-3 md:py-4 bg-slate-800 border-2 border-slate-700 hover:border-neon-purple rounded text-neon-purple font-mono font-bold text-xl hover:bg-slate-700 transition-all shadow-[0_4px_0_rgb(15,23,42)] active:shadow-[0_0px_0_rgb(15,23,42)] active:translate-y-1">
              /
            </button>

            {/* Row 2 */}
            <button onClick={() => handleNumClick("7")} className="py-3 md:py-4 bg-slate-800 border-2 border-slate-700 hover:border-neon-cyan rounded text-slate-300 font-mono font-bold text-xl hover:bg-slate-700 transition-all shadow-[0_4px_0_rgb(15,23,42)] active:shadow-[0_0px_0_rgb(15,23,42)] active:translate-y-1">7</button>
            <button onClick={() => handleNumClick("8")} className="py-3 md:py-4 bg-slate-800 border-2 border-slate-700 hover:border-neon-cyan rounded text-slate-300 font-mono font-bold text-xl hover:bg-slate-700 transition-all shadow-[0_4px_0_rgb(15,23,42)] active:shadow-[0_0px_0_rgb(15,23,42)] active:translate-y-1">8</button>
            <button onClick={() => handleNumClick("9")} className="py-3 md:py-4 bg-slate-800 border-2 border-slate-700 hover:border-neon-cyan rounded text-slate-300 font-mono font-bold text-xl hover:bg-slate-700 transition-all shadow-[0_4px_0_rgb(15,23,42)] active:shadow-[0_0px_0_rgb(15,23,42)] active:translate-y-1">9</button>
            <button onClick={() => handleOpClick("*")} className="py-3 md:py-4 bg-slate-800 border-2 border-slate-700 hover:border-neon-purple rounded text-neon-purple font-mono font-bold text-xl hover:bg-slate-700 transition-all shadow-[0_4px_0_rgb(15,23,42)] active:shadow-[0_0px_0_rgb(15,23,42)] active:translate-y-1">
              *
            </button>

            {/* Row 3 */}
            <button onClick={() => handleNumClick("4")} className="py-3 md:py-4 bg-slate-800 border-2 border-slate-700 hover:border-neon-cyan rounded text-slate-300 font-mono font-bold text-xl hover:bg-slate-700 transition-all shadow-[0_4px_0_rgb(15,23,42)] active:shadow-[0_0px_0_rgb(15,23,42)] active:translate-y-1">4</button>
            <button onClick={() => handleNumClick("5")} className="py-3 md:py-4 bg-slate-800 border-2 border-slate-700 hover:border-neon-cyan rounded text-slate-300 font-mono font-bold text-xl hover:bg-slate-700 transition-all shadow-[0_4px_0_rgb(15,23,42)] active:shadow-[0_0px_0_rgb(15,23,42)] active:translate-y-1">5</button>
            <button onClick={() => handleNumClick("6")} className="py-3 md:py-4 bg-slate-800 border-2 border-slate-700 hover:border-neon-cyan rounded text-slate-300 font-mono font-bold text-xl hover:bg-slate-700 transition-all shadow-[0_4px_0_rgb(15,23,42)] active:shadow-[0_0px_0_rgb(15,23,42)] active:translate-y-1">6</button>
            <button onClick={() => handleOpClick("-")} className="py-3 md:py-4 bg-slate-800 border-2 border-slate-700 hover:border-neon-purple rounded text-neon-purple font-mono font-bold text-xl hover:bg-slate-700 transition-all shadow-[0_4px_0_rgb(15,23,42)] active:shadow-[0_0px_0_rgb(15,23,42)] active:translate-y-1">
              -
            </button>

            {/* Row 4 */}
            <button onClick={() => handleNumClick("1")} className="py-3 md:py-4 bg-slate-800 border-2 border-slate-700 hover:border-neon-cyan rounded text-slate-300 font-mono font-bold text-xl hover:bg-slate-700 transition-all shadow-[0_4px_0_rgb(15,23,42)] active:shadow-[0_0px_0_rgb(15,23,42)] active:translate-y-1">1</button>
            <button onClick={() => handleNumClick("2")} className="py-3 md:py-4 bg-slate-800 border-2 border-slate-700 hover:border-neon-cyan rounded text-slate-300 font-mono font-bold text-xl hover:bg-slate-700 transition-all shadow-[0_4px_0_rgb(15,23,42)] active:shadow-[0_0px_0_rgb(15,23,42)] active:translate-y-1">2</button>
            <button onClick={() => handleNumClick("3")} className="py-3 md:py-4 bg-slate-800 border-2 border-slate-700 hover:border-neon-cyan rounded text-slate-300 font-mono font-bold text-xl hover:bg-slate-700 transition-all shadow-[0_4px_0_rgb(15,23,42)] active:shadow-[0_0px_0_rgb(15,23,42)] active:translate-y-1">3</button>
            <button onClick={() => handleOpClick("+")} className="py-3 md:py-4 bg-slate-800 border-2 border-slate-700 hover:border-neon-purple rounded text-neon-purple font-mono font-bold text-xl hover:bg-slate-700 transition-all shadow-[0_4px_0_rgb(15,23,42)] active:shadow-[0_0px_0_rgb(15,23,42)] active:translate-y-1">
              +
            </button>

            {/* Row 5 */}
            <button onClick={() => handleNumClick("0")} className="col-span-2 py-3 md:py-4 bg-slate-800 border-2 border-slate-700 hover:border-neon-cyan rounded text-slate-300 font-mono font-bold text-xl hover:bg-slate-700 transition-all shadow-[0_4px_0_rgb(15,23,42)] active:shadow-[0_0px_0_rgb(15,23,42)] active:translate-y-1">0</button>
            <button onClick={handleDecimal} className="py-3 md:py-4 bg-slate-800 border-2 border-slate-700 hover:border-neon-cyan rounded text-slate-300 font-mono font-bold text-xl hover:bg-slate-700 transition-all shadow-[0_4px_0_rgb(15,23,42)] active:shadow-[0_0px_0_rgb(15,23,42)] active:translate-y-1">.</button>
            <button onClick={calculate} className="py-3 md:py-4 bg-neon-green/20 border-2 border-neon-green/50 hover:border-neon-green rounded text-neon-green font-mono font-bold text-xl hover:bg-neon-green/30 transition-all shadow-[0_4px_0_rgb(15,23,42)] active:shadow-[0_0px_0_rgb(15,23,42)] active:translate-y-1 text-shadow-green">
              =
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default CalculatorPage;