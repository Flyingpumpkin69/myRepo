"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Code, Bug, Terminal, Database, Cpu, Trophy, RefreshCcw } from "lucide-react";

// Game Constants
const GRID_SIZE = 8;
const ICONS = [Server, Code, Bug, Terminal, Database, Cpu];
const COLORS = [
  "text-blue-500", // Server
  "text-green-500", // Code
  "text-red-500", // Bug
  "text-yellow-500", // Terminal
  "text-purple-500", // Database
  "text-cyan-500" // Cpu
];

const TARGET_SCORES = [1000, 1500, 2000, 2500, 3500, 4500, 6000, 8000, 10000, 15000];

type Cell = {
  id: number;
  type: number;
  isMatched: boolean;
};

const CyberCrush = () => {
  const [board, setBoard] = useState<Cell[]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [movesLeft, setMovesLeft] = useState(15);
  const [draggedCellId, setDraggedCellId] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // Initialize board
  const createBoard = useCallback(() => {
    const newBoard: Cell[] = [];
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
      newBoard.push({
        id: i,
        type: Math.floor(Math.random() * ICONS.length),
        isMatched: false,
      });
    }
    // Prevent initial matches (simplified)
    setBoard(newBoard);
  }, []);

  useEffect(() => {
    createBoard();
  }, [createBoard]);

  // Logic to find matches
  const checkMatches = useCallback((currentBoard: Cell[]) => {
    const newBoard = [...currentBoard];
    let isMatchFound = false;

    // Check rows
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
      if (i % GRID_SIZE < GRID_SIZE - 2) {
        const type = newBoard[i].type;
        if (type === -1) continue;
        if (
          newBoard[i + 1].type === type &&
          newBoard[i + 2].type === type
        ) {
          newBoard[i].isMatched = true;
          newBoard[i + 1].isMatched = true;
          newBoard[i + 2].isMatched = true;
          isMatchFound = true;
        }
      }
    }

    // Check columns
    for (let i = 0; i < GRID_SIZE * (GRID_SIZE - 2); i++) {
      const type = newBoard[i].type;
      if (type === -1) continue;
      if (
        newBoard[i + GRID_SIZE].type === type &&
        newBoard[i + GRID_SIZE * 2].type === type
      ) {
        newBoard[i].isMatched = true;
        newBoard[i + GRID_SIZE].isMatched = true;
        newBoard[i + GRID_SIZE * 2].isMatched = true;
        isMatchFound = true;
      }
    }

    return { newBoard, isMatchFound };
  }, []);

  // Remove matches and drop down
  const processMatches = useCallback((currentBoard: Cell[]) => {
    const newBoard = [...currentBoard];
    let matchCount = 0;

    // Count and clear matched cells
    newBoard.forEach(cell => {
      if (cell.isMatched) {
        matchCount++;
        cell.type = -1; // -1 means empty
        cell.isMatched = false;
      }
    });

    if (matchCount > 0) {
      setScore(prev => prev + matchCount * 10);
    }

    // Drop logic
    for (let col = 0; col < GRID_SIZE; col++) {
      let emptySlots = 0;
      for (let row = GRID_SIZE - 1; row >= 0; row--) {
        const index = row * GRID_SIZE + col;
        if (newBoard[index].type === -1) {
          emptySlots++;
        } else if (emptySlots > 0) {
          newBoard[(row + emptySlots) * GRID_SIZE + col].type = newBoard[index].type;
          newBoard[index].type = -1;
        }
      }
      // Fill top with new random
      for (let i = 0; i < emptySlots; i++) {
        newBoard[i * GRID_SIZE + col].type = Math.floor(Math.random() * ICONS.length);
      }
    }

    return newBoard;
  }, []);

  // Main game loop effect for continuous matching
  useEffect(() => {
    if (board.length === 0 || gameOver || gameWon) return;

    const timer = setTimeout(() => {
      const { newBoard, isMatchFound } = checkMatches(board);
      if (isMatchFound) {
        const processedBoard = processMatches(newBoard);
        setBoard(processedBoard);
      } else {
        // Check level up or game over condition when no matches are resolving
        if (score >= TARGET_SCORES[level - 1]) {
          if (level === 10) {
            setGameWon(true);
          } else {
            // Next Level
            setLevel(prev => prev + 1);
            setMovesLeft(15 + level * 2); // Add more moves for next level
            createBoard(); // Reset board
          }
        } else if (movesLeft <= 0) {
          setGameOver(true);
        }
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [board, checkMatches, processMatches, score, level, movesLeft, gameOver, gameWon, createBoard]);


  // Drag & Drop Handlers
  const handleDragStart = (id: number) => {
    if (gameOver || gameWon) return;
    setDraggedCellId(id);
  };

  const handleDrop = (id: number) => {
    if (draggedCellId === null || gameOver || gameWon) return;

    const dragId = draggedCellId;
    const dropId = id;

    // Check if adjacent
    const isAdjacent =
      dragId === dropId - 1 || // right
      dragId === dropId + 1 || // left
      dragId === dropId - GRID_SIZE || // down
      dragId === dropId + GRID_SIZE; // up

    if (!isAdjacent) {
      setDraggedCellId(null);
      return;
    }

    // Swap types (create deep copies of the cells we are modifying to avoid state mutation)
    const newBoard = [...board];
    const dragCell = { ...newBoard[dragId] };
    const dropCell = { ...newBoard[dropId] };

    const tempType = dragCell.type;
    dragCell.type = dropCell.type;
    dropCell.type = tempType;

    newBoard[dragId] = dragCell;
    newBoard[dropId] = dropCell;

    // Check if swap creates a match
    const { isMatchFound } = checkMatches(newBoard);

    if (isMatchFound) {
      setBoard(newBoard);
      setMovesLeft(prev => prev - 1);
    } else {
      // Invalid move, ignore swap visually (handled by not updating state with newBoard)
    }

    setDraggedCellId(null);
  };

  const restartGame = () => {
    setScore(0);
    setLevel(1);
    setMovesLeft(15);
    setGameOver(false);
    setGameWon(false);
    createBoard();
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col items-center justify-center min-h-[90vh] py-8 px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center w-full max-w-lg"
        >
          <h1 className="text-3xl md:text-5xl font-pixel text-neon-purple mb-4 text-shadow-purple">
            CYBER_CRUSH
          </h1>

          {/* Stats Bar */}
          <div className="bg-slate-900 border-2 border-slate-700 rounded-lg p-3 flex justify-between items-center font-mono">
            <div>
              <div className="text-xs text-slate-400">LEVEL</div>
              <div className="text-xl text-neon-cyan font-bold">{level}/10</div>
            </div>
            <div>
              <div className="text-xs text-slate-400">SCORE</div>
              <div className="text-xl text-neon-green font-bold">{score}</div>
              <div className="text-[10px] text-slate-500">Target: {TARGET_SCORES[level-1]}</div>
            </div>
            <div>
              <div className="text-xs text-slate-400">MOVES</div>
              <div className={`text-xl font-bold ${movesLeft < 5 ? 'text-red-500 animate-pulse' : 'text-slate-200'}`}>
                {movesLeft}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Game Area Container */}
        <div className="relative">

          {/* Main Board */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`bg-slate-900/80 backdrop-blur border-4 border-slate-700 rounded-xl p-2 md:p-4 shadow-[0_0_30px_rgba(168,85,247,0.15)] relative overflow-hidden transition-opacity duration-500 ${(gameOver || gameWon) ? 'opacity-30 pointer-events-none' : ''}`}
          >
            {/* Grid */}
            <div
              className="grid gap-1 md:gap-2"
              style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
            >
              {board.map((cell) => {
                const Icon = cell.type !== -1 ? ICONS[cell.type] : null;
                const colorClass = cell.type !== -1 ? COLORS[cell.type] : "";

                return (
                  <motion.div
                    key={cell.id}
                    draggable={cell.type !== -1}
                    onDragStart={(e: any) => {
                      if (e.dataTransfer) {
                        e.dataTransfer.setData("text/plain", ""); // Required for Firefox
                      }
                      handleDragStart(cell.id);
                    }}
                    onDragOver={(e: any) => e.preventDefault()}
                    onDrop={() => handleDrop(cell.id)}
                    layout // Animates position changes
                    initial={false}
                    animate={{
                      scale: cell.isMatched ? 0 : 1,
                      opacity: cell.isMatched ? 0 : 1
                    }}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-slate-800 rounded flex items-center justify-center cursor-grab active:cursor-grabbing border border-slate-700 hover:border-slate-500 transition-colors"
                  >
                    {Icon && (
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 ${colorClass} drop-shadow-[0_0_8px_currentColor]`} />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Overlays */}
          <AnimatePresence>
            {gameOver && !gameWon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                <div className="bg-slate-900/95 border-2 border-red-500 p-8 rounded-xl text-center shadow-[0_0_30px_rgba(239,68,68,0.5)]">
                  <h2 className="text-4xl font-pixel text-red-500 mb-2">SYSTEM FAILURE</h2>
                  <p className="font-mono text-slate-300 mb-6">Out of moves.</p>
                  <button
                    onClick={restartGame}
                    className="flex items-center gap-2 mx-auto px-6 py-3 bg-red-500/20 text-red-400 border border-red-500 rounded hover:bg-red-500/40 font-mono transition-colors"
                  >
                    <RefreshCcw size={18} /> REBOOT
                  </button>
                </div>
              </motion.div>
            )}

            {gameWon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                <div className="bg-slate-900/95 border-2 border-yellow-500 p-8 rounded-xl text-center shadow-[0_0_50px_rgba(234,179,8,0.5)] max-w-sm w-full">
                  <motion.div
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="flex justify-center mb-6"
                  >
                    <Trophy className="w-24 h-24 text-yellow-500 drop-shadow-[0_0_20px_rgba(234,179,8,1)]" />
                  </motion.div>
                  <h2 className="text-2xl md:text-3xl font-pixel text-yellow-500 mb-2 text-shadow-yellow leading-tight">ROOT ACCESS <br/>GRANTED</h2>
                  <p className="font-mono text-slate-300 mb-6">You have completed all 10 levels!</p>
                  <button
                    onClick={restartGame}
                    className="px-6 py-3 bg-yellow-500/20 text-yellow-400 border border-yellow-500 rounded hover:bg-yellow-500/40 font-mono transition-colors w-full"
                  >
                    PLAY AGAIN
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Instructions */}
        <p className="mt-8 font-mono text-xs text-slate-500 text-center max-w-md">
          Drag and drop adjacent icons to swap them. Match 3 or more to clear sectors. Reach the target score before running out of moves to advance.
        </p>

      </div>
    </div>
  );
};

export default CyberCrush;