import { createContext, createElement, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { clearToken, getToken } from "../../../../core/auth/authTokenStorage";
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
      if (savedToken) {
        useCases
          .getCurrentUserUseCase(savedToken)
          .then((userData) => {
            setUser(userData);
            setTokenState(savedToken);
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
      const session = await useCases.postLoginUseCase(rut, password);
      setTokenState(session.token);
      setUser(session.user);
    };

    const register = async (data: RegisterDataModel) => {
      const session = await useCases.postRegisterUseCase(data);
      setTokenState(session.token);
      setUser(session.user);
    };

    const logout = () => {
      clearToken();
      localStorage.removeItem("isLoggedIn");
      setTokenState(null);
      setUser(null);
    };

    // NUEVO: Llama al backend y luego actualiza el estado global de React
    const actualizarPerfil = async (datos: { correo?: string, telefono?: string; direccion?: string }) => {
      // 1. Enviamos la petición al backend a través del caso de uso
      await useCases.actualizarPerfilUseCase(datos);
      
      // 2. Si es exitoso, actualizamos el estado local (user) para que la UI cambie instantáneamente
      setUser((prevUser) => prevUser ? { ...prevUser, ...datos } : null);
    };

    // NUEVO: Agregamos 'actualizarPerfil' al value
    const value: AuthContextType = { user, token, loading, login, register, logout, actualizarPerfil };

    return createElement(AuthContext.Provider, { value }, children);
  };
}

export const useAuth = () => useContext(AuthContext);