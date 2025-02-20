"use client";
import React from "react";
import RegisterForm from "@/app/register/components/register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--popover))]">
      <div className="w-full max-w-md p-8 shadow-lg rounded-lg bg-[hsl(var(--card))]">
        <h1 className="mb-6 text-2xl font-bold text-[hsl(var(--foreground))] text-center">
          Registrar
        </h1>
        <RegisterForm />
      </div>
    </div>
  );
}
