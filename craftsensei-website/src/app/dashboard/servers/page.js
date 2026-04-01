'use client';

import { useState } from "react";
import { useAuth } from "@/app/context/authContext";

export default function ServersPage() {
  const { user } = useAuth();
  const [servers, setServers] = useState([]);
  const [form, setForm] = useState({
    serverName: "",
    ipAddress: "",
    version: "",
    ownerName: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const newServer = {
      id: Date.now(),
      ...form,
      createdAt: new Date().toLocaleString(),
      status: "Connected",
    };
    setServers([newServer, ...servers]);
    setForm({
      serverName: "",
      ipAddress: "",
      version: "",
      ownerName: "",
    });
  };

  const handleUnregister = (id) => {
    setServers(servers.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-10">
      <div>
        <p className="inline-flex rounded-full bg-emerald-900/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
          Server management
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">
          Manage your servers
        </h1>
        <p className="mt-2 max-w-xl text-zinc-300">
          Add, view, or remove Minecraft servers you’re managing under your Craft Sensei account.
        </p>
      </div>

      {/* Register new server form */}
      <div className="rounded-3xl border border-emerald-500/30 bg-black/60 p-6 backdrop-blur-xl">
        <h2 className="text-2xl font-semibold text-white mb-4">Register new server</h2>

        <form onSubmit={handleRegister} className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-semibold text-zinc-200">Server Name</label>
            <input
              name="serverName"
              value={form.serverName}
              onChange={handleChange}
              required
              placeholder="My Survival Realm"
              className="w-full rounded-xl border border-emerald-500/40 bg-black/70 px-4 py-3 text-zinc-100 placeholder-zinc-500 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-zinc-200">IP / Domain</label>
            <input
              name="ipAddress"
              value={form.ipAddress}
              onChange={handleChange}
              required
              placeholder="play.example.com"
              className="w-full rounded-xl border border-emerald-500/40 bg-black/70 px-4 py-3 text-zinc-100 placeholder-zinc-500 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-zinc-200">Version</label>
            <input
              name="version"
              value={form.version}
              onChange={handleChange}
              required
              placeholder="1.21.1"
              className="w-full rounded-xl border border-emerald-500/40 bg-black/70 px-4 py-3 text-zinc-100 placeholder-zinc-500 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-zinc-200">Owner Name</label>
            <input
              name="ownerName"
              value={form.ownerName}
              onChange={handleChange}
              required
              placeholder={user?.email?.split("@")[0] || "Steve"}
              className="w-full rounded-xl border border-emerald-500/40 bg-black/70 px-4 py-3 text-zinc-100 placeholder-zinc-500 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-emerald-950 hover:bg-emerald-400 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Register Server
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-3xl border border-emerald-500/30 bg-black/60 p-6 backdrop-blur-xl">
        <h2 className="text-2xl font-semibold text-white">Registered Servers</h2>

        {servers.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-emerald-500/30 bg-white/5 p-6 text-sm text-zinc-300">
            No servers registered yet. Add one above to get started!
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            {servers.map((server) => (
              <div
                key={server.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div>
                  <p className="text-lg font-semibold text-white">{server.serverName}</p>
                  <p className="text-sm text-zinc-300">
                    {server.ipAddress} • {server.version} • Owner: {server.ownerName}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">Registered at {server.createdAt}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                    {server.status}
                  </span>
                  <button
                    onClick={() => handleUnregister(server.id)}
                    className="rounded-full border border-rose-500/40 bg-rose-900/20 px-4 py-1.5 text-xs font-semibold text-rose-200 hover:bg-rose-700/40 hover:scale-105 active:scale-95 transition-all"
                  >
                    Unregister
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}



