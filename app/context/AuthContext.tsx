"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  userId?: number;
  email?: string;
  exp?: number;
};

type AuthContextType = {
  user: DecodedToken | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUser(decoded);
    } catch {
        localStorage.removeItem("token");
        setUser(null);
    } finally {
        setIsLoading(false);
    }

    // try {
    //   const decoded = jwtDecode<DecodedToken>(token);

    // //   const isExpired =
    // //     decoded.exp !== undefined && decoded.exp * 1000 < Date.now();

    //   if (isExpired) {
    //     localStorage.removeItem("token");
    //     setUser(null);
    //   } else {
    //     setUser(decoded);
    //   }
    // } catch {
    //   localStorage.removeItem("token");
    //   setUser(null);
    // } finally {
    //   setIsLoading(false);
    // }
  }, []);

  function login(token: string) {
    localStorage.setItem("token", token);
    setUser(jwtDecode<DecodedToken>(token));
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: user !== null,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
}