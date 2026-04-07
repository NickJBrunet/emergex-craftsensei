import { useState, useEffect } from 'react';
import pingServer from '@/utils/servers/pingServer';

export const pingStyles = {
    checking:     { dot: 'bg-zinc-500 animate-pulse',      text: 'text-zinc-400',  label: 'Checking...' },
    connected:    { dot: 'bg-emerald-500 animate-pulse',   text: 'text-zinc-300',  label: 'Connected' },
    disconnected: { dot: 'bg-red-500',                     text: 'text-zinc-400',  label: 'Not Connected' },
};

export function usePing(serverId) {
    const [pingStatus, setPingStatus] = useState('checking');
    const [lastSeen, setLastSeen] = useState(null);

    useEffect(() => {
        if (!serverId) return;

        const checkPing = async () => {
            setPingStatus('checking');
            try {
                const data = await pingServer(serverId);
                setPingStatus(data.connected ? 'connected' : 'disconnected');
                setLastSeen(data.last_seen);
            } catch {
                setPingStatus('disconnected');
            }
        };

        checkPing();
    }, [serverId]);

    return { pingStatus, lastSeen, ping: pingStyles[pingStatus] };
}