"use client";

import { useState, useEffect, useCallback } from "react";
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  ApiError,
} from "../types/api";
import { apiClient } from "../lib/api-client";

export interface AuthState {
  user: AuthResponse["user"] | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const userStr = localStorage.getItem("user");

        if (accessToken && userStr) {
          const user = JSON.parse(userStr);
          apiClient.setToken(accessToken);
          setAuthState({
            user,
            accessToken,
            refreshToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setAuthState((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        setAuthState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(
    async (credentials: LoginRequest): Promise<AuthResponse> => {
      try {
        const response = await apiClient.post<AuthResponse>(
          "/auth/login",
          credentials,
        );

        localStorage.setItem("accessToken", response.access_token);
        if (response.refresh_token) {
          localStorage.setItem("refreshToken", response.refresh_token);
        }
        localStorage.setItem("user", JSON.stringify(response.user));

        apiClient.setToken(response.access_token);

        setAuthState({
          user: response.user,
          accessToken: response.access_token,
          refreshToken: response.refresh_token || null,
          isAuthenticated: true,
          isLoading: false,
        });

        return response;
      } catch (error) {
        throw error as ApiError;
      }
    },
    [],
  );

  const register = useCallback(
    async (userData: RegisterRequest): Promise<AuthResponse> => {
      try {
        const response = await apiClient.post<AuthResponse>(
          "/auth/register",
          userData,
        );

        localStorage.setItem("accessToken", response.access_token);
        if (response.refresh_token) {
          localStorage.setItem("refreshToken", response.refresh_token);
        }
        localStorage.setItem("user", JSON.stringify(response.user));

        apiClient.setToken(response.access_token);

        setAuthState({
          user: response.user,
          accessToken: response.access_token,
          refreshToken: response.refresh_token || null,
          isAuthenticated: true,
          isLoading: false,
        });

        return response;
      } catch (error) {
        throw error as ApiError;
      }
    },
    [],
  );

  const logout = useCallback(async (): Promise<void> => {
    try {
      if (authState.accessToken) {
        await apiClient.post("/auth/logout");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      apiClient.setToken(null);

      setAuthState({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, [authState.accessToken]);

  const refreshToken = useCallback(async (): Promise<AuthResponse> => {
    const currentRefreshToken = localStorage.getItem("refreshToken");
    if (!currentRefreshToken) {
      throw new Error("No refresh token available");
    }

    try {
      const response = await apiClient.post<AuthResponse>("/auth/refresh", {
        refreshToken: currentRefreshToken,
      });

      localStorage.setItem("accessToken", response.access_token);
      if (response.refresh_token) {
        localStorage.setItem("refreshToken", response.refresh_token);
      }

      apiClient.setToken(response.access_token);

      setAuthState((prev) => ({
        ...prev,
        accessToken: response.access_token,
        refreshToken: response.refresh_token || null,
      }));

      return response;
    } catch (error) {
      await logout();
      throw error as ApiError;
    }
  }, [logout]);

  return {
    ...authState,
    login,
    register,
    logout,
    refreshToken,
  };
};
