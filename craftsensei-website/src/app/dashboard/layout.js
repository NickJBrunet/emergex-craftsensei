'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/servers", label: "Servers" },
    { href: "/dashboard/api", label: "API Keys" },
    { href: "/dashboard/settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f0c] text-zinc-50">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-emerald-500/20 bg-black/70 px-5 py-6 backdrop-blur-xl lg:flex lg:flex-col">
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
            <p className="text-xs text-zinc-400">Local demo mode</p>

            <Link
              href="/"
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-100 hover:bg-white/5"
            >
              Back Home
            </Link>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-emerald-500/20 bg-black/60 px-4 py-4 backdrop-blur-xl sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-300 lg:hidden">
                  Craft Sensei
                </p>
                <h2 className="text-lg font-semibold text-white sm:text-xl">
                  Dashboard
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200 sm:inline-flex">
                  Local demo
                </span>
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
            <div className="mx-auto w-full max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}


