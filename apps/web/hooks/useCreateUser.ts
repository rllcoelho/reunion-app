"use client";

import { useState } from "react";
import { UserResponse, CreateUserRequest, ApiError } from "../types/api";
import { apiClient } from "../lib/api-client";

export const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const createUser = async (
    userData: CreateUserRequest,
  ): Promise<UserResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.post<UserResponse>("/users", userData);
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
    createUser,
    isLoading,
    error,
  };
};
