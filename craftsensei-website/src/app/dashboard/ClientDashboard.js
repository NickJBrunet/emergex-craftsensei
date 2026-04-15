'use client';

import { useMemo, useState } from "react";
import Link from "next/link";
import {useServers} from "@/app/context/serverContext";
import DeleteServerModal from "@/app/components/DeleteServerModal";
import ServerInfoModal from "@/app/components/ServerInfoModal";
import { usePing } from '@/utils/servers/usePing';

function ServerCard({ server, onView, onDelete }) {
    const { ping } = usePing(server.id);

    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-lg font-semibold text-white">{server.name}</p>
                    <p className="text-sm text-zinc-300">
                        Owner: {server.owner_ign}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                {/* Ping badge — dot only carries color, text is neutral */}
                <div className="flex items-center gap-1.5 rounded-md bg-white/5 px-2.5 py-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${ping.dot}`} />
                    <span className="text-xs text-zinc-400">{ping.label}</span>
                </div>

                <button
                    onClick={() => onView(server)}
                    className="rounded-md bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300 hover:bg-white/10 hover:text-white hover:cursor-pointer transition-all"
                >
                    View
                </button>
                <button
                    onClick={() => onDelete(server)}
                    className="rounded-md bg-white/5 px-3 py-1 text-xs font-medium text-zinc-400 hover:bg-red-500/15 hover:text-red-400 hover:cursor-pointer transition-all"
                >
                    Delete
                </button>
            </div>
            </div>
            <p className="mt-3 text-xs text-zinc-500">
                Registered at {new Date(server.created_at).toLocaleString()}
            </p>
        </div>
    );
}

export default function ClientDashboard() {

  const { user } = useAuth();
  const displayName = user?.displayName || 
                     user?.email?.split('@')[0] || 
                     'Minecraft User';

  const { servers, createServer, removeServer } = useServers()

  // All your existing state + logic stays the same
  const [serverForm, setServerForm] = useState({
    serverName: "",
    ownerName: "",
  });

  const [generatedApiKey, setGeneratedApiKey] = useState("");
  const [copied, setCopied] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null); // holds server object to delete
  const [infoTarget, setInfoTarget] = useState(null);

  const [serverError, setServerError] = useState('');
  const [serverLoading, setServerLoading] = useState(false);

  const stats = [
    { label: "Registered Servers", value: (servers?.length || 0).toString() },
    { label: "API Keys", value: generatedApiKey ? "1" : "0" },
    // { label: "Active Chat Sessions", value: "0" },
    { label: "Uptime", value: "85%" },
  ];

  // const recentActivity = useMemo(
  //   () => [
  //     {
  //       title: "Dashboard created",
  //       desc: "Your account is ready to register a Minecraft server.",
  //       time: "Just now",
  //     },
  //     {
  //       title: "API key generated",
  //       desc: "Use this key later when backend integration is added.",
  //       time: "Just now",
  //     },
  //   ],
  //   []
  // );

  const handleChange = (e) => {
    setServerForm({
      ...serverForm,
      [e.target.name]: e.target.value,
    });
  };

  const generateApiKey = () => {
    const key =
      "cs_" +
      Array.from(crypto.getRandomValues(new Uint8Array(24)))
        .map((n) => n.toString(16).padStart(2, "0"))
        .join("");
    setGeneratedApiKey(key);
    setCopied(false);
  };

  const handleRegisterServer = (e) => {
    e.preventDefault();
    setServerError('');
    setServerLoading(true);

    createServer({
      name: serverForm.serverName,
      owner_ign: serverForm.ownerName,
      // minecraft_version: serverForm.version,
      // server_ip: serverForm.ipAddress,
    })
      .then(() => {
        setServerForm({ serverName: '', ownerName: '' });
      })
      .catch((err) => {
        console.log(err)
        if (err.message.includes('401')) {
          setServerError('You must be logged in to register a server.');
        } else if (err.message.includes('422')) {
          setServerError('Invalid server details. Please check all fields and try again.');
        } else if (err.message.includes('500')) {
          setServerError('Server error. Please try again later.');
        } else {
          setServerError('Failed to register server. Please try again.');
        }
      })
      .finally(() => {
        setServerLoading(false);
      });
  };

  const copyApiKey = async () => {
    if (!generatedApiKey) return;
    await navigator.clipboard.writeText(generatedApiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Welcome back, {displayName}!
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-200">
            Register your Minecraft server, generate an API key, and prepare your Craft Sensei setup.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full border border-zinc-500 bg-black/30 px-5 py-2.5 text-sm font-medium text-zinc-100 hover:bg-white/5"
          >
            Back Home
          </Link>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        {/* Left column - Stats + Forms */}
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-emerald-500/20 bg-black/60 p-5 backdrop-blur-xl"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-emerald-300">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Server Registration Form - Exact same */}
          <div className="rounded-3xl border border-emerald-500/30 bg-black/60 p-6 backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-white">Register your server</h2>
            <form onSubmit={handleRegisterServer} className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-200">Server Name</label>
                <input
                  type="text"
                  name="serverName"
                  value={serverForm.serverName}
                  onChange={handleChange}
                  required
                  placeholder="My Survival Realm"
                  className="w-full rounded-xl border border-emerald-500/40 bg-black/70 px-4 py-3 text-zinc-100 outline-none placeholder-zinc-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-200">Owner Name</label>
                <input
                  type="text"
                  name="ownerName"
                  value={serverForm.ownerName}
                  onChange={handleChange}
                  required
                  placeholder="Steve"
                  className="w-full rounded-xl border border-emerald-500/40 bg-black/70 px-4 py-3 text-zinc-100 outline-none placeholder-zinc-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
                />
              </div>
              <div className="md:col-span-2 flex flex-col gap-3">
                {serverError && (
                  <div className="rounded-xl bg-red-500/20 border border-red-500/50 px-4 py-3 text-sm text-red-300">
                    {serverError}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={serverLoading}
                  className="hover:cursor-pointer rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-emerald-950 hover:bg-emerald-400 hover:scale-[1.01] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {serverLoading ? 'Registering...' : 'Register Server'}
                </button>
              </div>
            </form>
          </div>

          <div className="rounded-3xl border border-emerald-500/30 bg-black/60 p-6 backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-white">Registered servers</h2>
            {!servers || servers.length === 0 ? (
              <div className="mt-5 rounded-2xl border border-dashed border-emerald-500/30 bg-white/5 p-6 text-sm text-zinc-300">
                No servers registered yet. Add your first one above.
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                {servers.map((server) => (
                  <ServerCard
                    key={server.id}
                    server={server}
                    onView={setInfoTarget}
                    onDelete={setDeleteTarget}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column - API Key + Activity */}
        {/*<div className="space-y-6">*/}
        {/*  <div className="rounded-3xl border border-emerald-500/30 bg-black/60 p-6 backdrop-blur-xl">*/}
        {/*    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">API Key</p>*/}
        {/*    <h2 className="mt-2 text-2xl font-semibold text-white">Your server key</h2>*/}
        {/*    <p className="mt-2 text-sm text-zinc-300">*/}
        {/*      This is generated locally for now. Later you can replace this with a backend-issued key.*/}
        {/*    </p>*/}
        {/*    <div className="mt-5 h-18 rounded-2xl border border-emerald-500/20 bg-zinc-950 p-4 font-mono text-sm text-emerald-200 break-all">*/}
        {/*      {generatedApiKey || "No API key generated yet."}*/}
        {/*    </div>*/}
        {/*    <div className="mt-4 flex flex-wrap gap-3">*/}
        {/*      <button*/}
        {/*        onClick={generateApiKey}*/}
        {/*        className="hover:cursor-pointer rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-emerald-950 hover:bg-emerald-400"*/}
        {/*      >*/}
        {/*        Regenerate*/}
        {/*      </button>*/}
        {/*      <button*/}
        {/*        onClick={copyApiKey}*/}
        {/*        disabled={!generatedApiKey}*/}
        {/*        className="hover:cursor-pointer rounded-full border border-emerald-200/60 px-5 py-2.5 text-sm font-medium text-emerald-50 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-emerald-900/40"*/}
        {/*      >*/}
        {/*        {copied ? "Copied!" : "Copy Key"}*/}
        {/*      </button>*/}
        {/*    </div>*/}
        {/*  </div>*/}

        {/*  <div className="rounded-3xl border border-emerald-500/30 bg-black/60 p-6 backdrop-blur-xl">*/}
        {/*    <h2 className="text-2xl font-semibold text-white">Recent activity</h2>*/}
        {/*    <div className="mt-5 space-y-4">*/}
        {/*      {recentActivity.map((item) => (*/}
        {/*        <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">*/}
        {/*          <p className="font-medium text-white">{item.title}</p>*/}
        {/*          <p className="mt-1 text-sm text-zinc-300">{item.desc}</p>*/}
        {/*          <p className="mt-2 text-xs text-zinc-500">{item.time}</p>*/}
        {/*        </div>*/}
        {/*      ))}*/}
        {/*    </div>*/}
        {/*  </div>*/}

        {/*  <div className="rounded-3xl border border-emerald-500/30 bg-black/60 p-6 backdrop-blur-xl">*/}
        {/*    <p className="text-sm font-semibold text-white">Next steps</p>*/}
        {/*    <ul className="mt-4 space-y-3 text-sm text-zinc-300">*/}
        {/*      <li>• Connect this form to your backend API.</li>*/}
        {/*      <li>• Save server registrations per user account.</li>*/}
        {/*      <li>• Generate persistent API keys server-side.</li>*/}
        {/*      <li>• Add a revoke/reset key option.</li>*/}
        {/*    </ul>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
      <DeleteServerModal
        server={deleteTarget}
        onConfirm={(id) => {
          removeServer(id);
          setDeleteTarget(null);
        }}
        onCancel={() => setDeleteTarget(null)}
      />
      <ServerInfoModal
        server={infoTarget}
        onClose={() => setInfoTarget(null)}
      />
    </>
  );
}


