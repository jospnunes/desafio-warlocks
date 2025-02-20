'use client'
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Note, getNotesApi } from "@/services/notes";
import { useToast } from "@/hooks/use-toast";

interface NotesContextData {
  notes: Note[];
  selectedNote: Note | null;
  setNotes: (notes: Note[]) => void;
  setSelectedNote: (note: Note | null) => void;
  refreshNotes: () => Promise<void>;
}

const NotesContext = createContext<NotesContextData | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const { toast } = useToast();

  const refreshNotes = async () => {
    try {
      const fetchedNotes = await getNotesApi();
      setNotes(fetchedNotes);
      setSelectedNote(fetchedNotes[0] || null);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar notas",
        description: error.message || "Tente novamente.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
   void refreshNotes();
  }, []);

  return (
    <NotesContext.Provider
      value={{ notes, selectedNote, setNotes, setSelectedNote, refreshNotes }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
}
