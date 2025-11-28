"use client";

import { useState } from "react";
import { useRegister } from "../hooks/useRegister";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    username: "",
  });

  const { register, isLoading, error } = useRegister();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        debugger;
      await register({
        email: formData.email,
        password: formData.password,
        username: formData.username,
        fullName: formData.fullName || undefined,
      });

      // Registration successful - you can redirect or show success message here
      console.log("Registration successful!");
    } catch (error) {
      // Error is handled by the hook
      debugger;
      console.error("Registration failed:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-sm"
    >
      <input
        type="text"
        name="fullName"
        placeholder="Nome completo"
        value={formData.fullName}
        onChange={handleChange}
        className="w-full rounded-md border border-zinc-300 bg-white px-4 py-2 text-zinc-900 placeholder-zinc-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500"
      />
      <input
        type="text"
        name="username"
        placeholder="Nome de usuário"
        value={formData.username}
        onChange={handleChange}
        required
        className="w-full rounded-md border border-zinc-300 bg-white px-4 py-2 text-zinc-900 placeholder-zinc-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full rounded-md border border-zinc-300 bg-white px-4 py-2 text-zinc-900 placeholder-zinc-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500"
      />
      <input
        type="password"
        name="password"
        placeholder="Senha"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full rounded-md border border-zinc-300 bg-white px-4 py-2 text-zinc-900 placeholder-zinc-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500"
      />

      {error && <div className="text-red-500 text-sm">{error.message}</div>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Criando conta..." : "Criar Conta"}
      </button>
    </form>
  );
}
