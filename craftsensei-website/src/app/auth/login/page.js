'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', formData);
    // Handle login logic
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-black">
    <div className="bg-black min-h-screen max-w-2xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent mb-4">
          Craft Sensei
        </h1>
        <p className="text-zinc-300 text-lg">Welcome back</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-zinc-200 mb-3">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-4 rounded-2xl bg-black/50 border border-emerald-500/40 text-zinc-100 backdrop-blur-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-lg"
            placeholder="player@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-zinc-200 mb-3">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-4 rounded-2xl bg-black/50 border border-emerald-500/40 text-zinc-100 backdrop-blur-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-lg"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-4 rounded-2xl text-lg font-semibold text-emerald-950 shadow-xl hover:scale-105 active:scale-95 hover:from-emerald-400 hover:to-emerald-500 transition-all"
        >
          Sign In
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-zinc-400">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="text-emerald-400 hover:text-emerald-300 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
}

