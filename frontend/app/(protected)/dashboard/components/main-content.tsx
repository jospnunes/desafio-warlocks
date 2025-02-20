"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theming/mode-toggle";
import { Note } from "@/services/notes";
import LogoutButton from "@/app/(protected)/dashboard/components/logout-button";
import { updateNoteApi } from "@/services/notes";
import { useNotes } from "@/contexts/notes-context";
import { useToast } from "@/hooks/use-toast";

interface MainContentProps {
  note: Note | null;
}

export default function MainContent({ note }: MainContentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const { refreshNotes } = useNotes();
  const { toast } = useToast();

  useEffect(() => {
    if (note) {
      setEditTitle(note.title);
      setEditDescription(note.description);
    }
  }, [note]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (note) {
      setEditTitle(note.title);
      setEditDescription(note.description);
    }
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim()){
        toast({
            title: "Título não pode ser vazio",
            description: "Insira um título para a nota.",
            variant: "destructive",
        });
        return;
    }
    if (note) {
      try {
        await updateNoteApi(note.id, editTitle, editDescription);
        toast({
          title: "Nota atualizada com sucesso",
          variant: "default",
        });
        setIsEditing(false);
        await refreshNotes();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
        toast({
          title: "Erro ao atualizar nota",
          description: errorMessage || "Tente novamente.",
          variant: "destructive",
        });
      }
    }
  };


  return (
    <div className="flex flex-col">
      <header className="flex h-[60px] items-center border-b bg-[hsl(var(--popover))] px-6">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
          {note ? note.title : "Selecione uma Nota"}
        </h2>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <LogoutButton />
        </div>
      </header>
      <main className="flex-1 overflow-auto p-6 bg-[hsl(var(--background))]">
        {note ? (
          <div className="max-w-none">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  className="w-full p-2 border rounded min-h-[150px]"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <div className="flex gap-2">
                  <Button onClick={handleSaveEdit}>Salvar</Button>
                  <Button variant="outline" onClick={handleCancelEdit}>
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-[hsl(var(--foreground))]">{note.title}</h1>
                <p className="text-[hsl(var(--foreground))]">{note.description}</p>
                <div className="mt-6 flex gap-2">
                  <Button
                    variant="outline"
                    className="border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]"
                    onClick={handleEditClick}
                  >
                    Editar
                  </Button>
                </div>
              </>
            )}
          </div>
        ) : (
          <p className="text-[hsl(var(--foreground))]">
            Selecione uma nota para visualizar o conteúdo.
          </p>
        )}
      </main>
    </div>
  );
}
