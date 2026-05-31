import React, { useState, useEffect } from "react";
import { authService, AuthUser, RegisterData } from "../services/authService";
import { clearToken } from "../services/http";
import { AuthContext } from "./AuthContextCore";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      authService
        .getMe(savedToken)
        .then((userData) => {
          setUser(userData);
          setToken(savedToken);
        })
        .catch(() => {
          clearToken();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (rut: string, password: string) => {
    const { token: t, user: u } = await authService.login(rut, password);
    setToken(t);
    setUser(u);
  };

  const register = async (data: RegisterData) => {
    const { token: t, user: u } = await authService.register(data);
    setToken(t);
    setUser(u);
  };

  const logout = () => {
    clearToken();
    localStorage.removeItem("isLoggedIn");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
