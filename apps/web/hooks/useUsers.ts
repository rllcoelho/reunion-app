"use client";

import { useState, useEffect } from "react";
import { UserResponse, ApiError } from "../types/api";
import { apiClient } from "../lib/api-client";

export const useUsers = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await apiClient.get<UserResponse[]>("/users");
      setUsers(data);
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
    fetchUsers();
  }, []);

  return {
    users,
    isLoading,
    error,
    refetch: fetchUsers,
  };
};
