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

    const value: AuthContextType = { user, token, loading, login, register, logout };

    return createElement(AuthContext.Provider, { value }, children);
  };
}

export const useAuth = () => useContext(AuthContext);
