'use client';
import Image from "next/image";
import Link from 'next/link';
import { useState } from 'react';

export default function Signup() {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Signup:', formData);
    // Handle signup logic
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#292010] text-zinc-50">
      
      <main className="mx-auto">
        <section className="relative flex min-h-[calc(100vh-56px)] items-center justify-center px-6 py-10">
          <div className="absolute inset-0">
            <div className="hero-bg-slideshow absolute inset-0">
                <div
                  className={`hero-bg-slide absolute inset-0 h-full min-h-screen w-full transition-all duration-2000 ease-in-out
                    opacity-100 z-10`}
                >
                  <Image
                    src="/backgrounds/minecraft_bg2.png"
                    alt="Minecraft background"
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>

            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/50" />
          </div>

          {/* Signup Form */}
          <div className="relative z-10 w-full max-w-md">            
            <div className="rounded-2xl border border-emerald-500/40 bg-black/70 p-8 backdrop-blur-xl">

              <div className="text-center mb-8">
                <h1 className="text-4xl font-['Silkscreen'] tracking-[-0.05em] text-white [text-shadow:1px_1px_0_#059669,2px_2px_0_#047857,3px_3px_0_#065f46,4px_4px_0_rgba(6,95,70,0.9)] scale-105 text-center mb-4">
                  Join the Adventure
                </h1>
                <p className="text-emerald-300 text-lg">
                  Create your Craft Sensei account
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-zinc-200 mb-3 uppercase tracking-wide">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    maxLength={35}
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 rounded-xl bg-black/70 border border-emerald-500/50 text-zinc-100 backdrop-blur-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-base placeholder-zinc-400"
                    placeholder="Steve"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-200 mb-3 uppercase tracking-wide">
                    Email
                  </label>
                  <input
                    type="email"
                    maxLength={35}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 rounded-xl bg-black/70 border border-emerald-500/50 text-zinc-100 backdrop-blur-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-base placeholder-zinc-400"
                    placeholder="player@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-200 mb-3 uppercase tracking-wide">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    maxLength={50}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 rounded-xl bg-black/70 border border-emerald-500/50 text-zinc-100 backdrop-blur-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-base placeholder-zinc-400"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-200 mb-3 uppercase tracking-wide">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    maxLength={50}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 rounded-xl bg-black/70 border border-emerald-500/50 text-zinc-100 backdrop-blur-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-base placeholder-zinc-400"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-emerald-500 px-6 py-4 text-base font-semibold text-emerald-950 shadow-lg hover:scale-105 active:scale-95 transition-all hover:cursor-pointer hover:bg-black hover:text-white hover:border-emerald-500/50 hover:border-2 max-h-14"
                >
                  Create Account
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-zinc-400 text-sm">
                  Already have an account?{' '}
                  <Link href="/auth/login" className="text-emerald-300 hover:text-emerald-200 font-semibold hover:underline transition-colors">
                    Sign in
                  </Link>
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-emerald-500/30">
                <Link 
                  href="/" 
                  className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200 text-sm font-medium transition-colors group"
                >
                  ← Back to Home
                  <span className="w-4 h-4 border border-emerald-300 rounded-full group-hover:scale-110 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}



