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

  // Temporary logout for front end
// async function logout() {
//   // Clear local state immediately
//   setUser(null);
  
//   // Clear cookies client-side
//   document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
//   document.cookie = 'csrf-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  
//   // Optional: call API if needed
//   try {
//     await fetch('/api/auth/logout', { 
//       method: 'POST', 
//       credentials: 'include' 
//     });
//   } catch (e) {
//     // Ignore API errors - local clearout is enough
//   }
// }

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