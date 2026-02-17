"use client";

import { useState } from "react";
import { apiClient } from "../lib/api-client";

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const logout = async (): Promise<void> => {
    setIsLoading(true);

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        apiClient.setToken(accessToken);
        await apiClient.post("/auth/logout");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      apiClient.setToken(null);
      setIsLoading(false);
    }
  };

  return {
    logout,
    isLoading,
  };
};
