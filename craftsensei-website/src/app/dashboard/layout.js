'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {useEffect, useState} from "react";
import { useAuth } from "@/app/context/authContext";
import {ServerProvider} from "@/app/context/serverContext";
import handleRefresh from "@/utils/auth/handleRefresh";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const navItems = [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/servers", label: "Servers" },
    { href: "/dashboard/api", label: "API Keys" },
    { href: "/dashboard/settings", label: "Settings" },
  ];

  const { logout, isAuthenticated, loading, fetchUser } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout().then(() => {

        router.push("/");

    }).catch((err) => {

        console.error(err.message);

    });
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    window.touchStartX = touch.clientX;
  };

  const handleTouchMove = (e) => {
    if (!window.touchStartX) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - window.touchStartX;
    
    // Only open sidebar on left swipe (negative deltaX) and only if close to left edge
    if (window.touchStartX < 50 && deltaX < -30) {
      setIsMobileSidebarOpen(true);
    }
  };

  const handleTouchEnd = () => {
    window.touchStartX = null;
  };

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/");
    }
  }, [loading, isAuthenticated, router]);

  return (
    <>
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <div className="stick min-h-screen bg-[#0b0f0c] text-zinc-50 z-10 ">
        <div className="flex min-h-screen">
          {/* Desktop Sidebar - always visible */}
          <aside className="hidden lg:flex lg:flex-col w-72 h-screen sticky top-0 shrink-0 border-r border-emerald-500/20 bg-black/70 px-5 py-6 backdrop-blur-xl">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
                Craft Sensei
              </p>
              <h1 className="mt-2 text-2xl font-bold text-white">User Dashboard</h1>
              <p className="mt-2 text-sm text-zinc-400">
                Manage your server and API access.
              </p>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const active =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
                      active
                        ? "bg-emerald-500 text-emerald-950 shadow"
                        : "text-zinc-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        active ? "bg-emerald-950" : "bg-emerald-400"
                      }`}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto rounded-3xl border border-emerald-500/20 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">
                Account
              </p>
              <p className="mt-2 text-sm font-medium text-white">Logged in user</p>

              <button
                onClick={handleLogout}
                className="mt-4 w-full rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-100 hover:bg-rose-500/20 hover:border-rose-400 hover:text-rose-200 hover:cursor-pointer transition-all hover:scale-105 active:scale-95"
              >
                Log Out
              </button>
            </div>
          </aside>

          <aside className={`
            fixed inset-y-0 left-0 z-50 w-72 border-r border-emerald-500/20 
            bg-black/90 backdrop-blur-2xl px-5 py-6 
            h-full flex flex-col lg:hidden    /* ← ADD THESE */
            transform
            ${isMobileSidebarOpen 
              ? 'translate-x-0' 
              : '-translate-x-full'
            }
            transition-transform duration-300 ease-in-out
          `}>
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
                Craft Sensei
              </p>
              <h1 className="mt-2 text-2xl font-bold text-white">User Dashboard</h1>
              <p className="mt-2 text-sm text-zinc-400">
                Manage your server and API access.
              </p>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const active =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
                      active
                        ? "bg-emerald-500 text-emerald-950 shadow"
                        : "text-zinc-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        active ? "bg-emerald-950" : "bg-emerald-400"
                      }`}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto rounded-3xl border border-emerald-500/20 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">
                Account
              </p>
              <p className="mt-2 text-sm font-medium text-white">Logged in user</p>

              <button
                onClick={handleLogout}
                className="mt-4 w-full rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-100 hover:bg-rose-500/20 hover:border-rose-400 hover:text-rose-200 hover:cursor-pointer transition-all hover:scale-105 active:scale-95"
              >
                Log Out
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div 
            className="flex min-w-0 flex-1 flex-col lg:ml-0"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <header className="sticky top-0 z-30 border-b border-emerald-500/20 bg-black/60 px-4 py-4 backdrop-blur-xl sm:px-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Mobile Menu Button */}
                  <button
                    onClick={() => setIsMobileSidebarOpen(true)}
                    className="lg:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-emerald-500/30 transition-all hover:scale-105 active:scale-95"
                    aria-label="Open menu"
                  >
                    <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-emerald-300 lg:hidden">
                      Craft Sensei
                    </p>
                    <h2 className="text-lg font-semibold text-white sm:text-xl">
                      Dashboard
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href="/dashboard/settings"
                    className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-950 hover:bg-emerald-400"
                  >
                    Settings
                  </Link>
                </div>
              </div>
            </header>

            <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
              <div className="mx-auto w-full max-w-7xl">
                <ServerProvider>
                  {children}
                </ServerProvider>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
