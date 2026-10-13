"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Play } from "lucide-react";

// --- AUDIO SYSTEM (Web Audio API Synthesizer) ---
class RetroAudio {
  ctx: AudioContext | null = null;
  bgmOsc: OscillatorNode | null = null;
  bgmGain: GainNode | null = null;
  isPlaying = false;
  muted = false;

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.bgmGain) {
      this.bgmGain.gain.value = this.muted ? 0 : 0.05;
    }
  }

  playShoot() {
    if (!this.ctx || this.muted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "square";
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playExplosion() {
    if (!this.ctx || this.muted) return;
    const bufferSize = this.ctx.sampleRate * 0.2; // 0.2 seconds
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const gain = this.ctx.createGain();
    // lowpass filter for rumbling effect
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1000;

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);

    noise.start();
  }

  playBGM() {
    if (!this.ctx || this.isPlaying) return;
    this.isPlaying = true;

    // Simple arpeggio loop for retro vibe
    const notes = [220, 261.63, 329.63, 392.00, 440, 392.00, 329.63, 261.63];
    let noteIndex = 0;

    this.bgmOsc = this.ctx.createOscillator();
    this.bgmGain = this.ctx.createGain();
    this.bgmOsc.type = "triangle";

    this.bgmGain.gain.value = this.muted ? 0 : 0.05;

    this.bgmOsc.connect(this.bgmGain);
    this.bgmGain.connect(this.ctx.destination);

    this.bgmOsc.start();

    const playNextNote = () => {
      if (!this.isPlaying || !this.ctx) return;
      this.bgmOsc!.frequency.setValueAtTime(notes[noteIndex], this.ctx.currentTime);
      noteIndex = (noteIndex + 1) % notes.length;
      setTimeout(playNextNote, 150);
    };

    playNextNote();
  }

  stopBGM() {
    this.isPlaying = false;
    if (this.bgmOsc) {
      this.bgmOsc.stop();
      this.bgmOsc.disconnect();
      this.bgmOsc = null;
    }
    if (this.bgmGain) {
      this.bgmGain.disconnect();
      this.bgmGain = null;
    }
  }
}

const audio = new RetroAudio();

// --- GAME ENGINE ---
interface GameState {
  level: number;
  score: number;
  hp: number;
  gameOver: boolean;
  gameWon: boolean;
  kills: number;
}

class GameEngine {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  setUIState: (state: Partial<GameState>) => void;

  width: number = 800;
  height: number = 400;

  lastTime: number = 0;
  reqId: number = 0;

  keys: { [key: string]: boolean } = {};

  state: GameState = {
    level: 1,
    score: 0,
    hp: 3,
    gameOver: false,
    gameWon: false,
    kills: 0
  };

  // Entities
  player = {
    x: 50,
    y: 300,
    width: 30,
    height: 50,
    vx: 0,
    vy: 0,
    speed: 250,
    jumpForce: -400,
    color: "#0f0",
    grounded: false,
    facingRight: true,
    invulnerableTimer: 0,
    shootTimer: 0
  };

  bullets: any[] = [];
  enemies: any[] = [];
  particles: any[] = [];

  boss: any = null;

  gravity = 1200;
  floorY = 350;

  enemySpawnTimer = 0;
  enemySpawnRate = 2; // seconds

  constructor(canvas: HTMLCanvasElement, setUIState: (state: Partial<GameState>) => void) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.setUIState = setUIState;

    this.width = canvas.width;
    this.height = canvas.height;
    this.floorY = this.height - 50;
    this.player.y = this.floorY - this.player.height;

    // Bind events
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  cleanup() {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
    cancelAnimationFrame(this.reqId);
  }

  handleKeyDown = (e: KeyboardEvent) => {
    this.keys[e.code] = true;

    // Jump
    if ((e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") && this.player.grounded) {
      this.player.vy = this.player.jumpForce;
      this.player.grounded = false;
    }
  };

  handleKeyUp = (e: KeyboardEvent) => {
    this.keys[e.code] = false;
  };

  start() {
    this.lastTime = performance.now();
    this.reqId = requestAnimationFrame(this.loop);
    this.updateUI();
  }

  updateUI() {
    this.setUIState({ ...this.state });
  }

  spawnEnemy() {
    const isLevel2 = this.state.level === 2;
    const isLevel3 = this.state.level === 3;

    if (isLevel3 && this.boss) {
      // Spawn mini bosses / minions
      this.enemies.push({
        x: this.boss.x,
        y: this.floorY - 30,
        width: 20,
        height: 30,
        vx: -150,
        vy: 0,
        color: "#f0f",
        hp: 1,
        type: "minion"
      });
      return;
    }

    if (!isLevel3) {
      const fromLeft = isLevel2 ? Math.random() > 0.5 : false;
      this.enemies.push({
        x: fromLeft ? -30 : this.width,
        y: this.floorY - 40,
        width: 30,
        height: 40,
        vx: fromLeft ? 100 : -100,
        vy: 0,
        color: "#f00",
        hp: 1,
        type: "basic",
        shootTimer: Math.random() * 2
      });
    }
  }

  spawnBoss() {
    this.boss = {
      x: this.width - 150,
      y: this.floorY - 150,
      width: 100,
      height: 150,
      vx: 0,
      vy: 0,
      color: "#f00",
      hp: 50,
      type: "boss",
      attackTimer: 0,
      moveDir: -1
    };
  }

  createExplosion(x: number, y: number, color: string) {
    audio.playExplosion();
    for (let i = 0; i < 15; i++) {
      this.particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 400,
        vy: (Math.random() - 0.5) * 400,
        life: 0.5 + Math.random() * 0.5,
        color
      });
    }
  }

  takeDamage() {
    if (this.player.invulnerableTimer > 0) return;
    this.state.hp -= 1;
    this.player.invulnerableTimer = 2; // 2 seconds iframes
    audio.playExplosion();
    if (this.state.hp <= 0) {
      this.state.gameOver = true;
    }
    this.updateUI();
  }

  checkCollision(rect1: any, rect2: any) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }

  loop = (time: number) => {
    if (this.state.gameOver || this.state.gameWon) return;

    const dt = (time - this.lastTime) / 1000;
    this.lastTime = time;

    this.update(dt);
    this.draw();

    this.reqId = requestAnimationFrame(this.loop);
  };

  update(dt: number) {
    // Player Movement
    if (this.keys["ArrowLeft"] || this.keys["KeyA"]) {
      this.player.vx = -this.player.speed;
      this.player.facingRight = false;
    } else if (this.keys["ArrowRight"] || this.keys["KeyD"]) {
      this.player.vx = this.player.speed;
      this.player.facingRight = true;
    } else {
      this.player.vx = 0;
    }

    // Player Physics
    this.player.vy += this.gravity * dt;
    this.player.x += this.player.vx * dt;
    this.player.y += this.player.vy * dt;

    // Boundaries
    if (this.player.y + this.player.height > this.floorY) {
      this.player.y = this.floorY - this.player.height;
      this.player.vy = 0;
      this.player.grounded = true;
    }
    if (this.player.x < 0) this.player.x = 0;
    if (this.player.x + this.player.width > this.width) this.player.x = this.width - this.player.width;

    // Timers
    if (this.player.invulnerableTimer > 0) {
      this.player.invulnerableTimer -= dt;
    }
    if (this.player.shootTimer > 0) {
      this.player.shootTimer -= dt;
    }

    // Shooting
    if (this.keys["KeyJ"] && this.player.shootTimer <= 0) {
      this.player.shootTimer = 0.15; // Fire rate
      audio.playShoot();
      this.bullets.push({
        x: this.player.facingRight ? this.player.x + this.player.width : this.player.x,
        y: this.player.y + 20,
        width: 10,
        height: 4,
        vx: this.player.facingRight ? 800 : -800,
        vy: 0,
        isPlayer: true,
        color: "#0ff"
      });
    }

    // Level progression
    if (this.state.level === 1 && this.state.kills >= 10) {
      this.state.level = 2;
      this.state.kills = 0;
      this.enemies = [];
      this.bullets = [];
      this.enemySpawnRate = 1.2;
      this.updateUI();
    } else if (this.state.level === 2 && this.state.kills >= 20) {
      this.state.level = 3;
      this.state.kills = 0;
      this.enemies = [];
      this.bullets = [];
      this.spawnBoss();
      this.enemySpawnRate = 3;
      this.updateUI();
    }

    // Enemy spawning
    this.enemySpawnTimer -= dt;
    if (this.enemySpawnTimer <= 0) {
      this.spawnEnemy();
      this.enemySpawnTimer = this.enemySpawnRate;
    }

    // Boss Logic
    if (this.boss && this.state.level === 3) {
      this.boss.y += Math.sin(timeNow() * 2) * 50 * dt; // hover effect
      this.boss.attackTimer -= dt;
      if (this.boss.attackTimer <= 0) {
        this.boss.attackTimer = 1.5;
        // Boss shoots big slow bullet
        this.bullets.push({
          x: this.boss.x,
          y: this.boss.y + this.boss.height / 2,
          width: 20,
          height: 20,
          vx: -300,
          vy: (this.player.y - (this.boss.y + this.boss.height / 2)) * 0.5,
          isPlayer: false,
          color: "#f0f"
        });
      }

      // Boss collision with player
      if (this.checkCollision(this.player, this.boss)) {
        this.takeDamage();
      }
    }

    // Bullets update
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const b = this.bullets[i];
      b.x += b.vx * dt;
      b.y += b.vy * dt;

      // Offscreen remove
      if (b.x < 0 || b.x > this.width || b.y < 0 || b.y > this.height) {
        this.bullets.splice(i, 1);
        continue;
      }

      // Check bullet collisions
      if (b.isPlayer) {
        // Hit boss
        if (this.boss && this.checkCollision(b, this.boss)) {
          this.bullets.splice(i, 1);
          this.boss.hp -= 1;
          this.createExplosion(b.x, b.y, "#ff0");
          this.state.score += 10;
          this.updateUI();

          if (this.boss.hp <= 0) {
            this.createExplosion(this.boss.x + 50, this.boss.y + 50, "#f00");
            this.createExplosion(this.boss.x, this.boss.y + 100, "#ff0");
            this.boss = null;
            this.state.gameWon = true;
            this.updateUI();
          }
          continue;
        }

        // Hit enemies
        let hitEnemy = false;
        for (let j = this.enemies.length - 1; j >= 0; j--) {
          const e = this.enemies[j];
          if (this.checkCollision(b, e)) {
            this.createExplosion(e.x + e.width/2, e.y + e.height/2, e.color);
            this.enemies.splice(j, 1);
            this.bullets.splice(i, 1);
            hitEnemy = true;
            this.state.kills += 1;
            this.state.score += 50;
            this.updateUI();
            break;
          }
        }
        if (hitEnemy) continue;
      } else {
        // Enemy bullet hitting player
        if (this.checkCollision(b, this.player)) {
          this.bullets.splice(i, 1);
          this.takeDamage();
          continue;
        }
      }
    }

    // Enemies update
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i];
      e.x += e.vx * dt;
      e.y += e.vy * dt;

      if (e.type === "basic" && this.state.level === 2) {
        e.shootTimer -= dt;
        if (e.shootTimer <= 0) {
          e.shootTimer = 2 + Math.random();
          // shoot towards player loosely
          const dirX = this.player.x < e.x ? -1 : 1;
          this.bullets.push({
            x: dirX === -1 ? e.x : e.x + e.width,
            y: e.y + 10,
            width: 8,
            height: 4,
            vx: dirX * 300,
            vy: 0,
            isPlayer: false,
            color: "#f00"
          });
        }
      }

      // Check collision with player
      if (this.checkCollision(this.player, e)) {
        this.takeDamage();
      }

      if (e.x < -100 || e.x > this.width + 100) {
        this.enemies.splice(i, 1);
      }
    }

    // Particles update
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  draw() {
    // Clear
    this.ctx.fillStyle = "#0f172a"; // slate-900
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Grid background
    this.ctx.strokeStyle = "#1e293b";
    this.ctx.lineWidth = 1;
    for(let x=0; x<this.width; x+=40) {
      this.ctx.beginPath(); this.ctx.moveTo(x,0); this.ctx.lineTo(x,this.height); this.ctx.stroke();
    }
    for(let y=0; y<this.height; y+=40) {
      this.ctx.beginPath(); this.ctx.moveTo(0,y); this.ctx.lineTo(this.width,y); this.ctx.stroke();
    }

    // Floor
    this.ctx.fillStyle = "#1e293b"; // slate-800
    this.ctx.fillRect(0, this.floorY, this.width, this.height - this.floorY);
    this.ctx.strokeStyle = "#334155";
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.floorY);
    this.ctx.lineTo(this.width, this.floorY);
    this.ctx.stroke();

    // Player
    if (this.player.invulnerableTimer <= 0 || Math.floor(this.player.invulnerableTimer * 10) % 2 === 0) {
      this.ctx.fillStyle = this.player.color;
      this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);

      // Eye/visor
      this.ctx.fillStyle = "#000";
      if (this.player.facingRight) {
        this.ctx.fillRect(this.player.x + 20, this.player.y + 10, 10, 5);
      } else {
        this.ctx.fillRect(this.player.x, this.player.y + 10, 10, 5);
      }
    }

    // Boss
    if (this.boss && this.state.level === 3) {
      this.ctx.fillStyle = this.boss.color;
      this.ctx.fillRect(this.boss.x, this.boss.y, this.boss.width, this.boss.height);
      // Boss eye
      this.ctx.fillStyle = "#ff0";
      this.ctx.fillRect(this.boss.x + 10, this.boss.y + 20, 20, 20);

      // Boss HP bar
      this.ctx.fillStyle = "#550000";
      this.ctx.fillRect(this.boss.x, this.boss.y - 15, this.boss.width, 8);
      this.ctx.fillStyle = "#f00";
      this.ctx.fillRect(this.boss.x, this.boss.y - 15, this.boss.width * (this.boss.hp / 50), 8);
    }

    // Enemies
    for (const e of this.enemies) {
      this.ctx.fillStyle = e.color;
      this.ctx.fillRect(e.x, e.y, e.width, e.height);
    }

    // Bullets
    for (const b of this.bullets) {
      this.ctx.fillStyle = b.color;
      this.ctx.fillRect(b.x, b.y, b.width, b.height);
    }

    // Particles
    for (const p of this.particles) {
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.life;
      this.ctx.fillRect(p.x, p.y, 4, 4);
    }
    this.ctx.globalAlpha = 1.0;
  }
}

// Global time helper
const timeNow = () => performance.now() / 1000;


export default function ContraGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);

  const [gameState, setGameState] = useState<Partial<GameState>>({
    level: 1,
    score: 0,
    hp: 3,
    gameOver: false,
    gameWon: false,
    kills: 0
  });

  const [hasStarted, setHasStarted] = useState(false);
  const [muted, setMuted] = useState(audio.muted);

  useEffect(() => {
    return () => {
      if (engineRef.current) engineRef.current.cleanup();
      audio.stopBGM();
    };
  }, []);

  const handleStart = () => {
    if (!canvasRef.current) return;

    audio.init();
    audio.playBGM();

    engineRef.current = new GameEngine(canvasRef.current, (s) => setGameState(prev => ({...prev, ...s})));
    engineRef.current.start();

    setHasStarted(true);
  };

  const handleRestart = () => {
    if (engineRef.current) {
      engineRef.current.cleanup();
    }
    engineRef.current = new GameEngine(canvasRef.current!, (s) => setGameState(prev => ({...prev, ...s})));
    engineRef.current.start();
  };

  const toggleMute = () => {
    audio.toggleMute();
    setMuted(audio.muted);
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col items-center justify-center min-h-[90vh] py-8 px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center w-full max-w-4xl flex justify-between items-end"
        >
          <div className="text-left">
            <h1 className="text-3xl md:text-5xl font-pixel text-red-500 mb-2 text-shadow-red">
              CYBER_COMMANDO
            </h1>
            <p className="font-mono text-slate-400 text-sm">A / D to move | W to jump | J to shoot</p>
          </div>

          <div className="flex gap-4 items-end">
            <button onClick={toggleMute} className="p-2 border border-slate-600 bg-slate-800 rounded hover:bg-slate-700 text-slate-300">
              {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        </motion.div>

        {/* Game Container */}
        <div className="relative border-4 border-slate-700 rounded-lg shadow-[0_0_30px_rgba(239,68,68,0.2)] bg-slate-900 overflow-hidden" style={{ width: 800, maxWidth: '100%' }}>

          {/* Top HUD */}
          {hasStarted && (
            <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start font-mono text-white z-10 pointer-events-none text-shadow-black">
              <div className="flex gap-6">
                <div>
                  <div className="text-xs text-red-400">HP</div>
                  <div className="text-xl font-bold flex gap-1 mt-1">
                    {Array.from({ length: Math.max(0, gameState.hp || 0) }).map((_, i) => (
                      <div key={i} className="w-4 h-4 bg-red-500 shadow-[0_0_8px_#f00]"></div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-neon-cyan">LEVEL</div>
                  <div className="text-xl font-bold">{gameState.level}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-neon-green">SCORE</div>
                <div className="text-xl font-bold">{gameState.score}</div>
                {gameState.level !== 3 && (
                   <div className="text-[10px] text-slate-400">KILLS: {gameState.kills} / {gameState.level === 1 ? 10 : 20}</div>
                )}
              </div>
            </div>
          )}

          <canvas
            ref={canvasRef}
            width={800}
            height={400}
            className="block w-full h-auto bg-slate-900"
            style={{ imageRendering: 'pixelated' }}
          />

          {/* Overlays */}
          <AnimatePresence>
            {!hasStarted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center z-20"
              >
                <button
                  onClick={handleStart}
                  className="flex items-center gap-3 px-8 py-4 bg-red-500/20 text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white rounded font-pixel text-xl transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                >
                  <Play size={24} /> INITIALIZE
                </button>
              </motion.div>
            )}

            {gameState.gameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-red-900/90 flex flex-col items-center justify-center z-20 backdrop-blur-sm"
              >
                <h2 className="text-5xl font-pixel text-white mb-4 text-shadow-black">M.I.A.</h2>
                <p className="font-mono text-xl text-red-200 mb-8">Score: {gameState.score}</p>
                <button
                  onClick={handleRestart}
                  className="px-6 py-3 bg-slate-900 text-white border-2 border-white hover:bg-white hover:text-black rounded font-pixel transition-colors"
                >
                  CONTINUE?
                </button>
              </motion.div>
            )}

            {gameState.gameWon && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-green-900/90 flex flex-col items-center justify-center z-20 backdrop-blur-sm"
              >
                <h2 className="text-5xl font-pixel text-white mb-4 text-shadow-black leading-tight text-center">MISSION<br/>ACCOMPLISHED</h2>
                <p className="font-mono text-xl text-green-200 mb-8">Final Score: {gameState.score}</p>
                <button
                  onClick={handleRestart}
                  className="px-6 py-3 bg-slate-900 text-white border-2 border-white hover:bg-white hover:text-black rounded font-pixel transition-colors"
                >
                  REPLAY
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}