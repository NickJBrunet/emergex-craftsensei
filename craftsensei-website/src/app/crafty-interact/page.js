'use client';

import { useRef, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";

export default function CraftyInteract() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    let frame = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0,255,128,0.3)";
      ctx.beginPath();
      ctx.arc(200 + Math.sin(frame / 10) * 20, 150, 50, 0, Math.PI * 2);
      ctx.fill();
      frame++;
      requestAnimationFrame(render);
    };
    render();
  }, []);

  const triggerAnimation = (type) => {
    console.log(`Crafty animating: ${type}`);
    // TODO: hook into Crafty animation state or canvas effect
  };

  const animations = ["Wink", "Mad", "Sad", "Books", "Flower", "Bounce", "Talk"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#22190a] via-black/70 to-[#032406] text-zinc-50">
      <Navbar />

      <main className="relative flex flex-col items-center justify-center min-h-[calc(100vh-56px)] px-6 py-20 overflow-hidden">
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-8">
          <p className="inline-flex rounded-full bg-emerald-900/50 px-4 py-1 text-sm font-medium uppercase tracking-[0.2em] text-emerald-200 [text-shadow:0_4px_8px_rgba(0,0,0,0.8)]">
            Interact with Crafty
          </p>

          <h1 className="text-4xl font-semibold text-white [text-shadow:0_4px_8px_rgba(0,0,0,0.5)]">
            Animate Crafty’s Emotions
          </h1>

          <p className="max-w-lg text-zinc-300 [text-shadow:0_2px_4px_rgba(0,0,0,0.6)]">
            Play with Crafty’s expressions and movements in real‑time. Each button triggers a unique animation designed for Minecraft’s AI companion.
          </p>

          <div className="relative rounded-3xl border border-emerald-500/30 bg-black/50 p-6 backdrop-blur-lg shadow-xl">
            <canvas
              ref={canvasRef}
              width={400}
              height={300}
              className="rounded-xl bg-zinc-900/70 shadow-inner"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {animations.map((anim) => (
              <button
                key={anim}
                onClick={() => triggerAnimation(anim.toLowerCase())}
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-emerald-950 bg-emerald-500 hover:bg-emerald-400 active:scale-95 shadow-lg transition transform hover:scale-105 hover:cursor-pointer"
              >
                {anim}
              </button>
            ))}
          </div>
        </div>

        <div className="absolute bottom-6 text-xs text-zinc-400">
          © {new Date().getFullYear()} Craft Sensei • Not affiliated with Mojang or Microsoft
        </div>
      </main>
    </div>
  );
}

