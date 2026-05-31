import React, { createContext, useContext, useState, useEffect } from "react";
import { authService, AuthUser, RegisterData } from "../services/authService";

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (rut: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

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
          localStorage.removeItem("token");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (rut: string, password: string) => {
    const { token: t, user: u } = await authService.login(rut, password);
    localStorage.setItem("token", t);
    setToken(t);
    setUser(u);
  };

  const register = async (data: RegisterData) => {
    const { token: t, user: u } = await authService.register(data);
    localStorage.setItem("token", t);
    setToken(t);
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem("token");
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
