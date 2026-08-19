'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Support() {
  const backgroundImages = [
    "/backgrounds/minecraft_bg4.png",
    "/backgrounds/minecraft_bg2.png", 
    "/backgrounds/minecraft_bg1.png",
    "/backgrounds/minecraft_bg3.png",
    "/backgrounds/minecraft_bg5.png",
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 15000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send to your backend/API
    console.log('Support form submitted:', formData);
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#292010] text-zinc-50">
    <Navbar />

      <main className="mx-auto">
        <section className="relative flex min-h-[calc(100vh-56px)] items-center justify-center overflow-hidden px-6 py-10 bg-gradient-to-b from-[#292010] to-[#032406]">
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
              Need Help?
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-white mb-8 sm:text-5xl [text-shadow:0_4px_8px_rgba(0,0,0,0.6)]">
              Support & Contact
            </h1>
          </div>
        </section>

        <section className="scroll-mt-24 bg-gradient-to-b from-[#292010] via-black/50 to-[#032406] px-6 py-20 lg:py-32">
          <div className="mx-auto max-w-2xl">
            {submitted ? (
              <div className="text-center">
                <div className="mx-auto w-24 h-24 rounded-2xl bg-emerald-500/20 border-4 border-emerald-500/50 mb-8 flex items-center justify-center">
                  <span className="text-3xl font-mono">✓</span>
                </div>
                <h2 className="text-3xl font-semibold tracking-tight text-white mb-6 [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
                  Ticket Sent!
                </h2>
                <p className="text-lg text-zinc-200 mb-8 [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
                  We&apos;ve received your support request and will get back to you within 24 hours.
                </p>
                <Link 
                  href="/" 
                  className="rounded-full bg-emerald-500 px-8 py-3 text-sm font-semibold text-emerald-950 shadow hover:scale-105 active:scale-95 hover:bg-emerald-400"
                >
                  Back to Home
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-emerald-200 mb-2 [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-emerald-500/40 bg-black/50 p-4 text-zinc-100 backdrop-blur-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    placeholder="Steve"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-emerald-200 mb-2 [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-emerald-500/40 bg-black/50 p-4 text-zinc-100 backdrop-blur-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    placeholder="player@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-emerald-200 mb-2 [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-emerald-500/40 bg-black/50 p-4 text-zinc-100 backdrop-blur-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    placeholder="Installation issue / Feature request"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-emerald-200 mb-2 [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-emerald-500/40 bg-black/50 p-6 text-zinc-100 backdrop-blur-sm font-mono resize-vertical focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    placeholder="Describe your issue or question..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-emerald-500 px-8 py-4 text-lg font-semibold text-emerald-950 shadow-lg hover:scale-105 active:scale-95 transition-all hover:cursor-pointer hover:bg-black hover:text-white hover:border-emerald-500/50 hover:border-2 max-h-15"
                >
                  Send Support Request
                </button>
              </form>
            )}
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
              <Link href="/about" className="hover:text-zinc-200">
                About
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

