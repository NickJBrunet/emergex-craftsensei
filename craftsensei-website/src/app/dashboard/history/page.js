'use client';

import { useState } from 'react';
import { useAuth } from '@/app/context/authContext';

export default function ChatLogsPage() {
  const { user } = useAuth();

  const [chatLogs, setChatLogs] = useState(() => {
    const now = Date.now();
    return [
      {
        id: 1,
        serverName: 'Survival Realm',
        query: 'How do I craft diamond armor?',
        botResponse:
          'You need 24 diamonds. Open the crafting table and use the pattern shown in your guide.',
        timestamp: new Date(now).toLocaleString(),
      },
      {
        id: 2,
        serverName: 'Nether Base',
        query: 'Why are piglins attacking me?',
        botResponse:
          'They become aggressive if you aren’t wearing gold armor or if you opened a chest near them.',
        timestamp: new Date(now - 1000 * 60 * 20).toLocaleString(),
      },
    ];
  });

  const handleClearLogs = () => setChatLogs([]);

  return (
    <div className="space-y-10">
      <div>
        <p className="inline-flex rounded-full bg-emerald-900/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
          Chat History
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">
          Your Conversations With Crafty
        </h1>
        <p className="mt-2 max-w-2xl text-zinc-300">
          View conversations between you and your Minecraft bot Crafty across your registered servers.
        </p>
      </div>

      <div className="rounded-3xl border border-emerald-500/30 bg-black/60 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Chat Log History</h2>
          {chatLogs.length > 0 && (
            <button
              onClick={handleClearLogs}
              className="rounded-full border border-rose-500/40 bg-rose-900/20 px-4 py-1.5 text-xs font-semibold text-rose-200 hover:bg-rose-700/40 transition-all"
            >
              Clear Logs
            </button>
          )}
        </div>

        {chatLogs.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-emerald-500/30 bg-white/5 p-6 text-sm text-zinc-300">
            No chat logs yet. Interact with Crafty to view history here.
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {chatLogs.map((log) => (
              <div key={log.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-lg font-semibold text-white">{log.serverName}</p>
                  <span className="text-xs text-zinc-500">{log.timestamp}</span>
                </div>

                <div className="mt-3 space-y-3">
                  <div>
                    <p className="text-sm font-medium text-emerald-300">You</p>
                    <p className="mt-1 rounded-lg border border-emerald-500/20 bg-zinc-900/50 p-3 text-sm text-zinc-100">
                      {log.query}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-emerald-300">Bot</p>
                    <p className="mt-1 rounded-lg border border-emerald-500/10 bg-zinc-900/30 p-3 text-sm text-zinc-100">
                      {log.botResponse}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}