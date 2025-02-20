"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {useToast} from "@/hooks/use-toast";
import {registerApi} from "@/services/auth";

const registerFormSchema = z
  .object({
    email: z.string().email({ message: "Insira um email válido" }),
    password: z
      .string()
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    confirmPassword: z
      .string()
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type RegisterFormSchema = z.infer<typeof registerFormSchema>;

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

    const {toast} = useToast();
    const router = useRouter();
  const handleRegister = async (data: RegisterFormSchema) => {
      try {
          const result = await registerApi(data.email, data.password, data.confirmPassword);
          console.log("Registrado com sucesso:", result);
          toast({
              title: "Registrado com sucesso",
              description: "Você será redirecionado para o dashboard.",
              variant: "default",
          });
          router.push("/dashboard");
      } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
          toast({
              title: "Erro ao registrar",
              description: errorMessage || "Falha ao registrar. Tente novamente.",
              variant: "destructive",
          });
      }
  };

  return (
    <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
      <div className="grid grid-cols-1 gap-2">
        <Label htmlFor="email" className="text-sm">
          Email
        </Label>
        <Input placeholder="Seu email" {...register("email")} required />
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
      <div className="grid grid-cols-1 gap-2">
        <Label htmlFor="confirmPassword" className="text-sm">
          Confirmar Senha
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirme sua senha"
          {...register("confirmPassword")}
          required
        />
        {errors.confirmPassword && (
          <p className="text-[hsl(var(--destructive))] text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <Button
        type="submit"
        className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
      >
        Registrar
      </Button>
    </form>
  );
}
