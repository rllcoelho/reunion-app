export enum ExperienceLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  ELITE = "ELITE",
}

export interface UserResponse {
  id: string;
  email: string;
  username: string;
  fullName?: string;
  bio?: string;
  avatarUrl?: string;
  experienceLevel?: ExperienceLevel;
  typicalGrade?: string;
  location?: unknown;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token?: string;
  user: UserResponse;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
  fullName?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface CreateUserRequest {
  email: string;
  username: string;
  password: string;
  fullName?: string;
  bio?: string;
  avatarUrl?: string;
  experienceLevel?: ExperienceLevel;
  typicalGrade?: string;
  location?: unknown;
}

export interface UpdateUserRequest {
  email?: string;
  username?: string;
  password?: string;
  fullName?: string;
  bio?: string;
  avatarUrl?: string;
  experienceLevel?: ExperienceLevel;
  typicalGrade?: string;
  location?: unknown;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}
