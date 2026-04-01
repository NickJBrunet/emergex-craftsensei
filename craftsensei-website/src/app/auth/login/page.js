'use client';
import { Suspense } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useState } from 'react';
import handleLogin from '@/utils/auth/handleLogin'

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginContent() {
  const [formData, setFormData] = useState({ email: '', password: '', loading: false, error: '', });
  const router = useRouter();
  const searchParams = useSearchParams();

  const message = searchParams.get('message')

// Add after form, before "Don't have account" div:
{message && (
  <div className="rounded-xl bg-emerald-500/20 border border-emerald-500/50 p-4 text-emerald-200 mb-6 mt-10">
    Account created! You can now sign in.
  </div>
)}

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, loading: true, error: '' });

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push('/dashboard');
      } else {
        setFormData({ ...formData, error: data.error || 'Login failed' });
      }
    } catch (err) {
      setFormData({ ...formData, error: 'Login failed' });
    } finally {
      setFormData({ ...formData, loading: false });
    }

    handleLogin(formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err.message);
      });

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

          {/* Login Form */}
          <div className="relative z-10 w-full max-w-md">
            <div className="rounded-2xl border border-emerald-500/40 bg-black/70 p-8 backdrop-blur-xl">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-['Silkscreen'] tracking-[-0.05em] text-white [text-shadow:1px_1px_0_#059669,2px_2px_0_#047857,3px_3px_0_#065f46,4px_4px_0_rgba(6,95,70,0.9)] scale-105 text-center mb-2">
                  Welcome Back!
                </h1>
                <p className="text-emerald-300 text-lg font-medium">
                  Sign in to your Craft Sensei account
                </p>
              </div>


              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-zinc-200 mb-3 uppercase tracking-wide">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    maxLength={35}
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

                <button
                  type="submit"
                  className="w-full rounded-xl bg-emerald-500 px-6 py-4 text-base font-semibold text-emerald-950 shadow-lg hover:scale-105 active:scale-95 transition-all hover:cursor-pointer hover:bg-black hover:text-white hover:border-emerald-500/50 hover:border-2 max-h-14"
                >
                  Sign In
                </button>
              </form>

              {message && (
                <div className="rounded-xl bg-emerald-500/20 border border-emerald-500/50 p-4 text-emerald-200 mb-6 mt-4">
                  Account created! You can now sign in.
                </div>
              )}

              <div className="mt-8 text-center">
                <p className="text-zinc-400 text-sm">
                  Don&apos;t have an account?{' '}
                  <Link href="/auth/signup" className="text-emerald-300 hover:text-emerald-200 font-semibold hover:underline transition-colors">
                    Sign up
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


export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}

