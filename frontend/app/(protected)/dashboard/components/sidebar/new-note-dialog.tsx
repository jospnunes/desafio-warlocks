"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createNoteApi } from "@/services/notes";
import { useToast } from "@/hooks/use-toast";
import {useNotes} from "@/contexts/notes-context";

const createNoteSchema = z.object({
  title: z.string().nonempty({ message: "O título é obrigatório." }),
  description: z.string().optional(),
});

type CreateNoteFormData = z.infer<typeof createNoteSchema>;

export default function NewNoteDialog() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateNoteFormData>({
    resolver: zodResolver(createNoteSchema),
  });

  const { toast } = useToast();
  const { refreshNotes } = useNotes();

  const onSubmit = async (data: CreateNoteFormData) => {
    try {
      await createNoteApi(data.title, data.description || "");
      await refreshNotes();
      toast({
        title: "Nota criada com sucesso",
        variant: "default",
      });
      reset();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      toast({
        title: "Erro ao criar nota",
        description: errorMessage || "Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
          <PlusIcon className="mr-2 h-4 w-4" />
          Nova Nota
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/50" />
        <DialogContent className="fixed top-1/2 left-1/2 max-w-[425px] translate-x-[-50%] translate-y-[-50%] bg-[hsl(var(--card))] p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle>Criar nova nota</DialogTitle>
            <DialogDescription>
              Insira os detalhes para a sua nova nota.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Título
              </Label>
              <Input
                id="title"
                placeholder="Enter note title"
                className="col-span-3"
                {...register("title")}
              />
              {errors.title && (
                <p className="col-span-4 text-[hsl(var(--destructive))] text-sm">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right">
                Conteúdo
              </Label>
              <Textarea
                id="description"
                placeholder="Enter note content"
                className="col-span-3 min-h-[150px]"
                {...register("description")}
              />
              {errors.description && (
                <p className="col-span-4 text-[hsl(var(--destructive))] text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            <DialogFooter>
              <Button type="submit">Salvar Nota</Button>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
