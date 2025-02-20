"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {loginApi} from "@/services/auth";
import {useToast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Insira um email válido" }),
  password: z.string().min(6),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });
  const {toast} = useToast();
  const router = useRouter();
  const handleLogin = async (data: LoginFormSchema) => {
    try {
      const result = await loginApi(data.email, data.password);
      console.log("Login efetuado com sucesso:", result);
        toast({
            title: "Login efetuado com sucesso",
            description: "Você será redirecionado para o dashboard.",
            variant: "default",
        });
        router.push("/dashboard");
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      toast({
        title: "Erro ao fazer login",
        description: errorMessage || "Falha ao fazer login. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
      <div className="grid grid-cols-1 gap-2 texc">
        <Label htmlFor="email" className="text-sm">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Seu email"
          {...register("email")}
          required
        />
        {errors.email && (
          <p className="text-[hsl(var(--destructive))] text-sm">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 gap-2">
        <Label htmlFor="password" className="text-sm">
          Senha
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Sua senha"
          {...register("password")}
          required
        />
        {errors.password && (
          <p className="text-[hsl(var(--destructive))] text-sm">
            {errors.password.message}
          </p>
        )}
      </div>
      <Button
        type="submit"
        className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
      >
        Login
      </Button>
      <p className="text-center text-sm">
        Não tem uma conta? <a href="/register">Registre-se</a>
      </p>
    </form>
  );
}
