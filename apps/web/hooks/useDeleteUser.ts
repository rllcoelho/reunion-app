"use client";

import { useState } from "react";
import { ApiError } from "../types/api";
import { apiClient } from "../lib/api-client";

export const useDeleteUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const deleteUser = async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await apiClient.delete(`/users/${id}`);
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError);
      throw apiError;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteUser,
    isLoading,
    error,
  };
};
