'use client';

import { useState, useMemo } from 'react';
import { useAuth } from '@/app/context/authContext';

export default function ApiKeysPage() {
  const { user } = useAuth();

  const [apiKey, setApiKey] = useState('');
  const [copied, setCopied] = useState(false);
  const [keyHistory, setKeyHistory] = useState([]);

  const stats = useMemo(
    () => [
      { label: 'API Keys Generated', value: keyHistory.length.toString() },
      { label: 'Current Key Status', value: apiKey ? 'Active' : 'None' },
      { label: 'Last Generated', value: apiKey ? 'Just now' : 'Never' },
      { label: 'Uptime for Demo', value: '99.9%' },
    ],
    [keyHistory.length, apiKey]
  );

  const generateApiKey = () => {
    const newKey =
      'cs_' +
      Array.from(crypto.getRandomValues(new Uint8Array(24)))
        .map((n) => n.toString(16).padStart(2, '0'))
        .join('');

    setApiKey(newKey);
    setKeyHistory((prev) => [
      { id: Date.now(), key: newKey, createdAt: new Date().toLocaleString() },
      ...prev,
    ]);
    setCopied(false);
  };

  const regenerateApiKey = () => {
    generateApiKey();
  };

  const copyApiKey = async () => {
    if (!apiKey) return;
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const resetKeyHistory = () => {
    setKeyHistory([]);
    setApiKey('');
  };

  return (
    <div className="space-y-10">
      <div>
        <p className="inline-flex rounded-full bg-emerald-900/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
          API Keys
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">
          Manage API keys
        </h1>
        <p className="mt-2 max-w-2xl text-zinc-300">
          Generate and manage keys for your Craft Sensei integrations.
        </p>
      </div>

      {/* Key stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-emerald-500/20 bg-black/60 p-5 backdrop-blur-xl"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-emerald-300">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-emerald-500/30 bg-black/60 p-6 backdrop-blur-xl">
        <h2 className="text-2xl font-semibold text-white mb-4">Your API key</h2>
        <p className="text-sm text-zinc-300 mb-5">
          Use this key to authenticate your Minecraft server or bots with Craft Sensei.
        </p>

        <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-zinc-950 p-4 font-mono text-sm text-emerald-200 break-all">
          {apiKey || 'No API key generated yet.'}
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={generateApiKey}
            disabled={!!apiKey}
            className="hover:cursor-pointer rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-emerald-950 hover:bg-emerald-400 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {apiKey ? 'API key already exists' : 'Generate API Key'}
          </button>

          <button
            onClick={regenerateApiKey}
            disabled={!apiKey}
            className="hover:cursor-pointer rounded-full border border-emerald-300 px-5 py-2.5 text-sm font-medium text-emerald-50 hover:bg-emerald-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Regenerate
          </button>

          <button
            onClick={copyApiKey}
            disabled={!apiKey}
            className="rounded-full border border-emerald-200/60 px-5 py-2.5 text-sm font-medium text-emerald-50 hover:bg-emerald-900/40 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {copied ? 'Copied!' : 'Copy Key'}
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-emerald-500/30 bg-black/60 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Key analytics</h2>
          {keyHistory.length > 0 && (
            <button
              onClick={resetKeyHistory}
              className="rounded-full border border-rose-500/40 bg-rose-900/20 px-4 py-1.5 text-xs font-semibold text-rose-200 hover:bg-rose-700/40 transition-all"
            >
              Clear history
            </button>
          )}
        </div>

        {keyHistory.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-emerald-500/30 bg-white/5 p-6 text-sm text-zinc-300">
            No keys generated yet. Use the “Generate API Key” button above.
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            {keyHistory.map((record) => (
              <div
                key={record.id}
                className={`rounded-2xl border border-white/10 bg-white/5 p-4 text-sm ${
                  record.key === apiKey ? 'ring-2 ring-emerald-500/30' : ''
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="font-mono text-emerald-200 break-all">
                    {record.key.slice(0, 4)}••••••••••••{record.key.slice(-6)}
                  </div>
                  <div className="text-xs text-zinc-500 flex-shrink-0">
                    Generated at {record.createdAt}
                  </div>
                </div>
                {record.key === apiKey && (
                  <p className="mt-1 text-xs text-emerald-300">● Current active key</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

