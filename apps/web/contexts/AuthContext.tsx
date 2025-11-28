"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useAuth, AuthState } from "../hooks/useAuth";
import { AuthResponse, LoginRequest, RegisterRequest } from "../types/api";

interface AuthContextType extends Omit<AuthState, "refreshToken"> {
  login: (credentials: LoginRequest) => Promise<AuthResponse>;
  register: (userData: RegisterRequest) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<AuthResponse>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
