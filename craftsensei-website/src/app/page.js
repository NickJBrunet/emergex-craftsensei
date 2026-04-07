'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

export default function Home() {

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

  // Need this for the scroll positioning cuz ts is not working fml
  const scrollToSection = (id, offset = 80) => {
  const el = document.getElementById(id);
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const scrollTop = window.scrollY || window.pageYOffset;
  const targetY = rect.top + scrollTop - offset;

  window.scrollTo({
    top: targetY,
    behavior: "smooth",
  });
};



  return (
    <div className="min-h-screen bg-[#292010] text-zinc-50">
      {/* Dark forest green: #002D04
          Night woods: #013220
          Dark green: #06402B

      */}
      <Navbar />



      <main className="mx-auto">
        <section
          className="relative flex min-h-[calc(100vh-56px)] items-center justify-center overflow-hidden px-6 py-10"
        >

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
      
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
          </div> 

          <div className="relative z-10 flex w-full flex-col items-center gap-8 text-center md:flex-row md:items-center md:justify-between md:text-left lg:ml-30">

            {/* <div className="max-w-xl space-y-5 backdrop-blur-sm bg-black/40 rounded-2xl border border-emerald-500/40 p-8"> */}
            <div className="max-w-xl space-y-5">
              <p className="inline-flex rounded-full bg-emerald-900/50 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-emerald-200 [text-shadow:0_4px_8px_rgba(0,0,0,0.8)]">
                AI companion for Minecraft
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl sm:[text-shadow:0_4px_8px_rgba(0,0,0,0.4)]">
                Chat with your world, not just your friends.
              </h1>
              <p className="text-base text-zinc-200 sm:text-lg [text-shadow:0_4px_8px_rgba(0,0,0,0.8)]">
                Craft Sensei Mod brings an intelligent chat bot <span className="">Crafty</span> into your
                Minecraft server to answer crafting questions, suggest builds,
                and help you survive the night.
              </p>

              {/* <p className="text-base font-semibold text-zinc-200 sm:text-lg [text-shadow:0_4px_8px_rgba(0,0,0,0.8)]">
                Craft Sensei Mod brings an intelligent chat bot <span className="font-['Silkscreen'] tracking-[-0.05em] text-white [text-shadow:1px_1px_0_#059669,2px_2px_0_#047857,3px_3px_0_#065f46,4px_4px_0_rgba(6,95,70,0.9)] pb-2">Crafty</span> into your
                Minecraft server to answer crafting questions, suggest builds,
                and help you survive the night.
              </p> */}


              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => scrollToSection("meet-crafty", 60)}
                  className="rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-emerald-950 shadow hover:scale-110 active:scale-100 hover:bg-emerald-400 hover:cursor-pointer"
                >
                  Meet Crafty
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection("showcase", 100)}
                  className="rounded-full bg-emerald-900 px-5 py-2.5 text-sm font-semibold text-white shadow hover:scale-110 active:scale-100 hover:cursor-pointer"
                >
                  View projects
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection("faq", 96)}
                  className="rounded-full border border-emerald-200/60 px-5 py-2.5 text-sm font-medium bg-emerald-900/20 text-emerald-50 hover:bg-emerald-900/50 [text-shadow:0_4px_8px_rgba(0,0,0,0.8)] hover:cursor-pointer"
                >
                  Read FAQs
                </button>

              </div>
              <p className="text-xs text-zinc-300">
                Works with popular server setups and supports both survival and
                creative gameplay.
              </p>
            </div>

            <div className="mt-8 w-full max-w-md rounded-2xl border border-emerald-500/40 bg-black/50 p-5 backdrop-blur md:mt-0 lg:mr-20">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                In‑game preview
              </p>
              <div className="rounded-xl bg-zinc-900/70 p-4 text-sm font-mono text-zinc-100">
                <div className="mb-2 text-[11px] text-emerald-300">
                  [Server] You installed Craft Sensei Mod.
                </div>
                <div className="space-y-1">
                  <p>
                    <span className="text-sky-300">[You]</span> How do I craft
                    an enchantment table?
                  </p>
                  <p>
                    <span className="text-amber-300">[Crafty]</span> You need 4
                    obsidian, 2 diamonds, and 1 book. Place obsidian in a T
                    shape, book in the top middle, diamonds on the sides.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="meet-crafty"
          className="scroll-mt-24 bg-gradient-to-b from-[#22190a] via-black/50 to-[#032406] px-6 py-16 lg:py-20"
        >
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <div className="space-y-6">
                <p className="inline-flex rounded-full bg-emerald-500/20 px-4 py-1.5 text-sm font-medium uppercase tracking-wide text-emerald-200 [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
                  Meet your AI companion
                </p>
                <h2 className="text-4xl font-semibold tracking-tight text-white lg:text-5xl [text-shadow:0_4px_8px_rgba(0,0,0,0.6)]">
                  Crafty lives in your chat
                </h2>
                <p className="text-lg text-zinc-200 leading-relaxed [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
                  Crafty is your always-on Minecraft expert who understands crafting recipes, 
                  block properties, redstone mechanics, and survival strategies. 
                  No more alt-tabbing or googling—get instant answers directly in-game.
                </p>
                <ul className="mt-6 space-y-3 text-zinc-300">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 h-2 w-2 rounded-full bg-emerald-400" />
                    <span>1.2M+ recipes & mechanics memorized</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 h-2 w-2 rounded-full bg-emerald-400" />
                    <span>Works offline after initial setup</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 h-2 w-2 rounded-full bg-emerald-400" />
                    <span>Customizable response style & permissions</span>
                  </li>
                </ul>
              </div>

              {/* Make Crafty bot bounce on click maybe also flip horizontally or spin while bouncing 
              Also removed gradient in bottom right corner so the bounce effect doesnt just look like a ong floating
              
              */}
              <div className="relative h-96 w-full rounded-3xl bg-gradient-to-br from-emerald-900/30 via-black/50 to-emerald-900/20 p-8 lg:h-[500px] backdrop-blur-xl border border-emerald-500/30 top-17">
                <Image
                  src="/images/finalCrafty2.png" 
                  alt="Meet Crafty - Your Minecraft AI companion"
                  fill
                  draggable="false"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain rounded-2xl animate-bounce hover:cursor-grab active:animate-none active:cursor-grabbing"
                />
                {/* Temp will fix with usestate and handler for onclick */}
                {/* animate-bounce hover:cursor-grab active:animate-none active:cursor-grabbing */}

                {/* Not needed */}
                {/* <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-transparent to-emerald-500/20 rounded-3xl blur opacity-75" /> */}
              </div>
            </div>
          </div>
        </section>
 

        <section
          id="showcase"
          className="scroll-mt-24 bg-gradient-to-b from-[#032406] via-black to-[#22190a] px-6 py-16 lg:pt-30 lg:pb-45"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Project showcases
            </h2>
            <p className="mt-3 text-zinc-300">
              See how servers are using the AI chat bot to build smarter,
              safer, and more creative worlds.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <article className="flex flex-col rounded-2xl border border-emerald-500/30 bg-black/40 p-4">
                <div className="relative mb-3 h-32 w-full overflow-hidden rounded-xl">
                  <Image
                    src="/images/minecraft_creeper.png"
                    alt="Survival helper"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="text-base font-semibold text-white">
                  Survival helper
                </h3>
                <p className="mt-1 text-xs text-zinc-300">
                  Players ask for crafting recipes, mob weaknesses, and
                  exploration tips without tabbing out.
                </p>
              </article>

              <article className="flex flex-col rounded-2xl border border-emerald-500/30 bg-black/40 p-4">
                <div className="relative mb-3 h-32 w-full overflow-hidden rounded-xl">
                  <Image
                    src="/images/minecraft_creative2.jpg"
                    alt="Creative build assistant"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="text-base font-semibold text-white">
                  Creative build assistant
                </h3>
                <p className="mt-1 text-xs text-zinc-300">
                  Get block palette ideas, structure prompts, and layout
                  suggestions while you build.
                </p>
              </article>

              <article className="flex flex-col rounded-2xl border border-emerald-500/30 bg-black/40 p-4">
                <div className="relative mb-3 h-32 w-full overflow-hidden rounded-xl">
                  <Image
                    src="/images/minecraft_admin.png"
                    alt="Server admin tools"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="text-base font-semibold text-white">
                  Admin command shortcuts
                </h3>
                <p className="mt-1 text-xs text-zinc-300">
                  Ask the bot for command templates and quick explanations to
                  speed up server management.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="scroll-mt-24 bg-[#22190a] px-6 pb-30 pt-10"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-zinc-300">
              Answers to common questions about installing and using the Crafty mod.
            </p>

            <div className="mt-8 space-y-6">
              <details className="group rounded-2xl shadow-lg bg-black p-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-white">
                  <span>Which Minecraft versions are supported?</span>
                  <span className="text-emerald-300 transition-transform group-open:rotate-90">
                    ▸
                  </span>
                </summary>
                <p className="mt-3 text-sm text-zinc-300">
                  The mod is built for modern Java Edition server versions. Check
                  the documentation for the exact version range and updates.
                </p>
              </details>

              <details className="group rounded-2xl shadow-lg bg-black p-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-white">
                  <span>Does every player need an API key?</span>
                  <span className="text-emerald-300 transition-transform group-open:rotate-90">
                    ▸
                  </span>
                </summary>
                <p className="mt-3 text-sm text-zinc-300">
                  No. The server owner configures a single API connection, and
                  all in‑game chat requests are routed through that integration.
                </p>
              </details>

              <details className="group rounded-2xl shadow-lg bg-black p-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-white">
                  <span>Will this lag my server?</span>
                  <span className="text-emerald-300 transition-transform group-open:rotate-90">
                    ▸
                  </span>
                </summary>
                <p className="mt-3 text-sm text-zinc-300">
                  Requests are processed asynchronously, and responses stream
                  back into chat. You can configure rate limits and cooldowns to
                  match your server capacity.
                </p>
              </details>
            </div>
          </div>
        </section>


        <footer className="border-t border-black/60 bg-black px-6 py-6 text-xs text-zinc-400">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
            <p>© {new Date().getFullYear()} Craft Sensei. Not affiliated with Mojang or Microsoft.</p>
            <div className="flex gap-4">
              <Link href="/" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })} className="hover:text-zinc-200">
                Back to top ↪
              </Link>
              <Link href="/about" className="hover:text-zinc-200">
                About
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




/**     ********* TODO *********
 * 
 * Change the position of the id tags so it scrolls to a specific position on the page
 * 
 * Create more FAQ section questions
 * 
 * (We have logo this stuff is good)
 * Find a good font for title (8bit style)
 * Maybe stylize dot in i as a heart * 
 * 
 * 
 * ======= DONE =========
 * Create a log in/signup page - done
 * 
 * Create an about the developers page - done
 * 
 * Create a support page (users can fill out form) - done
 * 
 * Add a back home button to login and signup pages
 * 
 * 
 * 
 * 
 */
