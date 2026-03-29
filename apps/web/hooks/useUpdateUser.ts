"use client";

import { useState } from "react";
import { UserResponse, UpdateUserRequest, ApiError } from "../types/api";
import { apiClient } from "../lib/api-client";

export const useUpdateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const updateUser = async (
    id: string,
    userData: UpdateUserRequest,
  ): Promise<UserResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.patch<UserResponse>(
        `/users/${id}`,
        userData,
      );
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
    updateUser,
    isLoading,
    error,
  };
};
