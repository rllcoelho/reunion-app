"use client";

import { useState } from "react";
import { AuthResponse, RegisterRequest, ApiError } from "../types/api";
import { apiClient } from "../lib/api-client";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const register = async (userData: RegisterRequest): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);

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

      return response;
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError);
      throw apiError;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    isLoading,
    error,
  };
};
