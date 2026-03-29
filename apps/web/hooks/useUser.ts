"use client";

import { useState, useEffect } from "react";
import { UserResponse, ApiError } from "../types/api";
import { apiClient } from "../lib/api-client";

export const useUser = (id: string) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchUser = async () => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await apiClient.get<UserResponse>(`/users/${id}`);
      setUser(data);
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError);
      throw apiError;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    user,
    isLoading,
    error,
    refetch: fetchUser,
  };
};
