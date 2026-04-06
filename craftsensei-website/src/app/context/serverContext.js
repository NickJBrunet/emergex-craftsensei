"use client";

import { createContext, useContext, useState, useEffect } from "react";
import getUserServers from "@/utils/servers/getUserServers";
import createUserServer from "@/utils/servers/createUserServer";
import deleteUserServer from "@/utils/servers/deleteUserServer";
import updateUserServer from "@/utils/servers/updateUserServer";
import rotateServerKey from "@/utils/servers/rotateServerKey";

const ServerContext = createContext();

export function ServerProvider({ children }) {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all servers
  async function fetchServers() {
    try {
      const data = await getUserServers();
      setServers(data);
    } catch {
      setServers([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchServers();
  }, []);

  // Create
  async function createServer(payload) {
    await createUserServer(payload);
    await fetchServers();
  }

  // Update
  async function updateServer(serverId, payload) {
    await updateUserServer(serverId, payload);
    await fetchServers();
  }

  // Delete
  async function removeServer(serverId) {
    await deleteUserServer(serverId);
    await fetchServers();
  }

  // Rotate API key
  async function rotateKey(serverId) {
    await rotateServerKey(serverId);
    await fetchServers();
  }

  return (
    <ServerContext.Provider
      value={{
        servers,
        loading,
        fetchServers,
        createServer,
        updateServer,
        removeServer,
        rotateKey,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
}

export function useServers() {
  return useContext(ServerContext);
}