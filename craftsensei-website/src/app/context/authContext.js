"use client";

import { createContext, useContext, useState, useEffect } from "react";
import handleLogin from "@/utils/auth/handleLogin";
import handleLogout from "@/utils/auth/handleLogout";
import { apiRequest } from "@/utils/api/apiRequestHandler";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (cookie exists)
  async function fetchUser() {
    try {
      const data = await apiRequest("/api/auth/me");
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  // Login
  async function login(accountProp) {
    await handleLogin(accountProp);
    await fetchUser();
  }

  // Logout
  async function logout() {
    await fetchUser();
    await handleLogout();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}