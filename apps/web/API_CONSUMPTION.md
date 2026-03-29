# API Consumption Components & Hooks

This document describes the API consumption components and custom hooks built for the Reunion web application.

## Overview

The web app includes a comprehensive set of TypeScript types, API client configuration, React hooks, and components for consuming the backend API endpoints.

## File Structure

```
apps/web/
├── types/api.ts              # TypeScript types for API requests/responses
├── lib/api-client.ts         # API client configuration
├── hooks/                    # Custom React hooks
│   ├── index.ts             # Barrel exports
│   ├── useAuth.ts           # Main authentication hook
│   ├── useLogin.ts          # Login-specific hook
│   ├── useRegister.ts       # Registration-specific hook
│   ├── useLogout.ts         # Logout-specific hook
│   ├── useUsers.ts          # Get all users
│   ├── useUser.ts           # Get specific user
│   ├── useCreateUser.ts     # Create user
│   ├── useUpdateUser.ts     # Update user
│   └── useDeleteUser.ts     # Delete user
├── contexts/
│   └── AuthContext.tsx      # Authentication context provider
└── components/
    ├── index.ts             # Barrel exports
    ├── registration_form.tsx # Updated registration form
    └── login_form.tsx       # New login form
```

## TypeScript Types

All API request and response types are defined in `types/api.ts`:

- `UserResponse` - User data returned from API
- `AuthResponse` - Authentication response with tokens
- `LoginRequest`, `RegisterRequest` - Authentication payloads
- `CreateUserRequest`, `UpdateUserRequest` - User management payloads
- `ExperienceLevel` enum - User experience levels
- `ApiError` - Standardized error format

## API Client

The `apiClient` in `lib/api-client.ts` provides:

- Automatic JWT token management
- Request/response interceptors
- Error handling
- Base URL configuration via environment variables

## Authentication Hooks

### useAuth

Comprehensive authentication state management:

```tsx
const {
  user,
  accessToken,
  isAuthenticated,
  isLoading,
  login,
  register,
  logout,
  refreshToken,
} = useAuth();
```

### Individual Authentication Hooks

- `useLogin` - Login functionality with loading/error states
- `useRegister` - Registration functionality
- `useLogout` - Logout functionality

## User Management Hooks

- `useUsers` - Fetch all users with auto-refresh
- `useUser` - Fetch specific user by ID
- `useCreateUser` - Create new user (admin)
- `useUpdateUser` - Update user data
- `useDeleteUser` - Delete user

## Authentication Context

Wrap your app with `AuthProvider` to provide authentication state globally:

```tsx
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <YourApp />
    </AuthProvider>
  );
}
```

Use the context in components:

```tsx
import { useAuthContext } from "./contexts/AuthContext";

function Profile() {
  const { user, isAuthenticated, logout } = useAuthContext();
  // ...
}
```

## Components

### RegistrationForm

Updated to use the `useRegister` hook with:

- Form state management
- Loading states
- Error handling
- Proper TypeScript types

### LoginForm

New component using `useLogin` hook with similar features.

## Usage Examples

### Authentication

```tsx
import { useLogin } from "../hooks/useLogin";

function LoginPage() {
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (credentials) => {
    try {
      await login(credentials);
      // Redirect or show success
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      {error && <div>{error.message}</div>}
      <button disabled={isLoading}>{isLoading ? "Loading..." : "Login"}</button>
    </form>
  );
}
```

### User Management

```tsx
import { useUsers } from "../hooks/useUsers";

function UsersList() {
  const { users, isLoading, error, refetch } = useUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.username}</div>
      ))}
    </div>
  );
}
```

## Environment Variables

Set the API base URL in your environment:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Features

- **Type Safety**: Full TypeScript support
- **Error Handling**: Consistent error handling across all hooks
- **Loading States**: Built-in loading state management
- **Token Management**: Automatic JWT token storage and refresh
- **Reactive**: Real-time state updates
- **Modular**: Individual hooks for specific operations
- **Context Support**: Global authentication state management
