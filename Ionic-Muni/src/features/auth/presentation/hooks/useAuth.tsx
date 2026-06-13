import { createContext, createElement, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { clearToken, getToken } from "../../../../core/auth/authTokenStorage";
import { clearUserProfile, loadUserProfile, saveUserProfile } from "../../../../core/auth/userProfileStorage";
import type { AuthUserModel } from "../../domain/entities/AuthUserModel";
import type { RegisterDataModel } from "../../domain/entities/RegisterDataModel";
import type { AuthUseCasesProtocol } from "../../domain/useCases/protocols/authUseCasesProtocol";

export interface AuthContextType {
  user: AuthUserModel | null;
  token: string | null;
  loading: boolean;
  login: (rut: string, password: string) => Promise<void>;
  register: (data: RegisterDataModel) => Promise<void>;
  logout: () => void;
  // NUEVO: Firma para exponer la actualización del perfil a toda la app
  actualizarPerfil: (datos: { telefono?: string; direccion?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type AuthProviderProps = {
  children: ReactNode;
};

export function createAuthProvider(useCases: AuthUseCasesProtocol) {
  return function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<AuthUserModel | null>(null);
    const [token, setTokenState] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const savedToken = getToken();
      if (!savedToken) {
        setLoading(false);
        return;
      }

      // Muestra perfil cacheado de inmediato mientras se verifica el token
      const cached = loadUserProfile();
      if (cached) {
        setUser(cached);
        setTokenState(savedToken);
      }

      // Verificación del token en background — controla el estado de carga
      useCases
        .getCurrentUserUseCase(savedToken)
        .then((userData) => {
          setUser(userData);
          setTokenState(savedToken);
          saveUserProfile(userData);
        })
        .catch(() => {
          clearToken();
          clearUserProfile();
          setUser(null);
          setTokenState(null);
        })
        .finally(() => setLoading(false));
    }, []);

    const login = async (rut: string, password: string) => {
      const session = await useCases.postLoginUseCase(rut, password);
      setTokenState(session.token);
      setUser(session.user);
      saveUserProfile(session.user);
    };

    const register = async (data: RegisterDataModel) => {
      const session = await useCases.postRegisterUseCase(data);
      setTokenState(session.token);
      setUser(session.user);
      saveUserProfile(session.user);
    };

    const logout = () => {
      clearToken();
      clearUserProfile();
      localStorage.removeItem("isLoggedIn");
      setTokenState(null);
      setUser(null);
    };

    const actualizarPerfil = async (datos: { correo?: string, telefono?: string; direccion?: string }) => {
      await useCases.actualizarPerfilUseCase(datos);
      setUser((prevUser) => {
        const updated = prevUser ? { ...prevUser, ...datos } : null;
        if (updated) saveUserProfile(updated);
        return updated;
      });
    };

    const value: AuthContextType = { user, token, loading, login, register, logout, actualizarPerfil };

    return createElement(AuthContext.Provider, { value }, children);
  };
}

export const useAuth = () => useContext(AuthContext);