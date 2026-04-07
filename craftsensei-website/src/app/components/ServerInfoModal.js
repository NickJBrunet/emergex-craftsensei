'use client';

import { usePing } from '@/utils/servers/usePing';

export default function ServerInfoModal({ server, onClose }) {
    const { pingStatus, lastSeen, ping } = usePing(server?.id);

    if (!server) return null;

    const fields = [
        { label: 'Server Name',       value: server.name },
        { label: 'Server IP',         value: server.server_ip },
        { label: 'Minecraft Version', value: server.minecraft_version },
        { label: 'Owner IGN',         value: server.owner_ign },
        { label: 'Server ID',         value: server.id },
        { label: 'API Key',           value: server.api_key },
        { label: 'Registered',        value: new Date(server.created_at).toLocaleString() },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="rounded-2xl border border-emerald-500/30 bg-black/80 p-8 max-w-lg w-full mx-4 backdrop-blur-xl">

                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300 mb-1">
                            Server Info
                        </p>
                        <h2 className="text-2xl font-semibold text-white">{server.name}</h2>
                    </div>

                    {/* Ping indicator */}
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                        <span className={`w-2 h-2 rounded-full ${ping.dot}`} />
                        <span className={`text-xs font-semibold ${ping.text}`}>{ping.label}</span>
                    </div>
                </div>

                {/* Fields */}
                <div className="space-y-3">
                    {fields.map(({ label, value }) => (
                        <div key={label} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                            <p className="text-xs uppercase tracking-[0.15em] text-emerald-300 mb-1">{label}</p>
                            <p className="text-sm text-zinc-100 font-mono break-all">{value}</p>
                        </div>
                    ))}
                </div>

                {/* Last seen */}
                {lastSeen && pingStatus === 'disconnected' && (
                    <p className="mt-4 text-xs text-zinc-500 text-center">
                        Last seen: {new Date(lastSeen).toLocaleString()}
                    </p>
                )}

                {/* Close */}
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="rounded-xl border border-zinc-500 px-5 py-2.5 text-sm text-zinc-200 hover:bg-white/5 hover:cursor-pointer transition-all"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}