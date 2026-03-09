'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function About() {
  const backgroundImages = [
    "/backgrounds/minecraft_bg4.png",
    "/backgrounds/minecraft_bg2.png", 
    "/backgrounds/minecraft_bg1.png",
    "/backgrounds/minecraft_bg3.png",
    "/backgrounds/minecraft_bg5.png",
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 15000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div className="min-h-screen bg-[#22190a] text-zinc-50">
      {/* Original borwn colour: #292010 */}
      <Navbar />

      <main className="mx-auto">
        <section className="relative flex min-h-[calc(100vh-56px)] items-center justify-center overflow-hidden px-6 py-10 bg-gradient-to-b from-[#22190a] to-[#032406]">
          <div className="absolute inset-0">
            <div className="hero-bg-slideshow absolute inset-0">
              {backgroundImages.map((src, index) => (
                <div
                  key={src}
                  className={`hero-bg-slide absolute inset-0 h-full w-full transition-all duration-2000 ease-in-out ${
                    index === currentBgIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <Image
                    src={src}
                    alt="Minecraft background"
                    fill
                    sizes="100vw"
                    priority={index === currentBgIndex}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
          </div> 

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <p className="inline-flex rounded-full bg-emerald-900/50 px-4 py-1.5 text-sm font-medium uppercase tracking-[0.2em] text-emerald-200 mb-8 [text-shadow:0_4px_8px_rgba(0,0,0,0.8)]">
              About This Project
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-white mb-8 sm:text-5xl [text-shadow:0_4px_8px_rgba(0,0,0,0.6)]">
              Helping modded Minecraft players thrive
            </h1>
          </div>
        </section>
        
        {/* Original borwn colour: #292010 */}
        <section className="scroll-mt-24 bg-gradient-to-b from-[#292010] via-black/50 to-[#032406] px-6 py-20 lg:py-32">
          <div className="mx-auto max-w-4xl">
            
            <div className="max-w-3xl mx-auto text-center mb-20">
              <h2 className="text-3xl font-semibold tracking-tight text-white mb-6 [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
                About This Project
              </h2>
              <div className="rounded-2xl border border-emerald-500/30 bg-black/40 p-8 backdrop-blur-sm">
                <p className="text-lg text-zinc-200 leading-relaxed [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
                  Our project focuses on helping both experienced and new players of modded Minecraft. 
                  The goal is to create an AI that can give recommendations and information about 
                  the mods the player currently has installed. The AI can be interacted with in game 
                  via chat or another UI.
                </p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto text-center mb-20">
              <h2 className="text-3xl font-semibold tracking-tight text-white mb-6 [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
                Our Vision
              </h2>
              <div className="rounded-2xl border border-emerald-500/30 bg-black/40 p-8 backdrop-blur-sm">
                <p className="text-lg text-zinc-200 leading-relaxed [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
                  Our ultimate goal is to create an immersive AI-integrated modification in a popular 
                  gaming environment through experimentation and purposeful discovery of emerging 
                  technologies. We, as a dedicated team of software developers, desire to provide 
                  Minecraft gamers with practical assistance and innovative capabilities as a 
                  culmination of our focused ideologies.
                </p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-white mb-6 [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
                Why It Matters
              </h2>
              <div className="rounded-2xl border border-emerald-500/30 bg-black/40 p-8 backdrop-blur-sm">
                <p className="text-lg text-zinc-200 leading-relaxed [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
                  This project reflects the emerging trend of human–AI collaboration, where AI systems 
                  act as embedded assistants rather than external tools. We believe that Minecraft 
                  players often struggle to understand mod mechanics due to their complexity, lack 
                  of standardization, and fragmented documentation.
                </p>
                <p className="mt-6 text-lg text-zinc-200 leading-relaxed [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
                  As a result, the project values accessibility, clarity, and user empowerment, 
                  guiding design decisions such as embedding the AI directly in-game, providing 
                  mod-specific and contextual explanations, and prioritizing clear, player-friendly 
                  language. Quality is defined by the AI&apos;s ability to consistently deliver accurate 
                  and helpful mod-related guidance that meaningfully improves player understanding 
                  in the majority of interactions.
                </p>
              </div>
            </div>

          </div>
        </section>

        <footer className="border-t border-black/60 bg-[#032406] px-6 py-8 text-xs text-zinc-400">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
            <p>© {new Date().getFullYear()} Craft Sensei. Not affiliated with Mojang or Microsoft.</p>
            <div className="flex gap-6">
              <Link href="/" className="hover:text-zinc-200">
                Back to Home ↪
              </Link>
              <Link 
                href="/#faq" 
                scroll={false}
                onClick={() => {
                  setTimeout(() => {
                    const faqEl = document.getElementById('faq');
                    if (faqEl) {
                      const offset = 96;
                      const rect = faqEl.getBoundingClientRect();
                      const targetY = rect.top + window.scrollY - offset;
                      window.scrollTo({
                        top: targetY,
                        behavior: 'smooth'
                      });
                    }
                  }, 300);
                }}
                className="hover:text-zinc-200"
              >
                FAQ
              </Link>
              <Link href="/support" className="hover:text-zinc-200">
                Support
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}





