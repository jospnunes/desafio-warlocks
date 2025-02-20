"use client";
import React from "react";
import LoginForm from "@/app/login/components/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--popover))]">
      <div className="w-full max-w-md p-8 shadow-lg rounded-lg bg-[hsl(var(--card))]">
        <h1 className="mb-6 text-2xl font-bold text-[hsl(var(--foreground))] text-center">
          Login
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
