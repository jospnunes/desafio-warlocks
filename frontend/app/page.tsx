"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theming/mode-toggle";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] flex flex-col items-center justify-center">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Gerenciador de Notas</h1>
        <p className="mt-2 text-lg">
          Bem-vindo! Faça login ou registre-se para continuar.
        </p>
      </header>
      <div className="flex gap-4">
        <Link href="/login" passHref>
          <Button>Login</Button>
        </Link>
        <Link href="/register" passHref>
          <Button variant="outline">Registrar</Button>
        </Link>
      </div>
    </div>
  );
}
