"use client";

import {createContext, useContext, useState, useEffect, useCallback} from "react";
import handleLogin from "@/utils/auth/handleLogin";
import handleLogout from "@/utils/auth/handleLogout";
import { apiRequest } from "@/utils/api/apiRequestHandler";
import handleRefresh from "@/utils/auth/handleRefresh";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {

    try {
      const data = await apiRequest("/api/auth/me");
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }

  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Login
  async function login(accountProp) {
    console.log("LOGIN FUNCTION CALLED");

    const data = await handleLogin(accountProp);

    console.log("LOGIN RESPONSE:", data);

    localStorage.setItem("access", data.access);

    console.log("AFTER SET:", localStorage.getItem("access"));

    await fetchUser();
  }

  // Logout
  async function logout() {
    await handleLogout();
    setUser(null);

    if (typeof window !== "undefined") {
      localStorage.setItem("access", data.access);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        fetchUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}