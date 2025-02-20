"use client";
import React from "react";
import Sidebar from "@/app/(protected)/dashboard/components/sidebar";
import MainContent from "@/app/(protected)/dashboard/components/main-content";
import { useNotes } from "@/contexts/notes-context";
import {deleteNoteApi, Note} from "@/services/notes";

export default function Dashboard() {
  const { notes, selectedNote, setSelectedNote, refreshNotes } = useNotes();

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
  };

  const handleDeleteNote = async (id: string) => {
    await deleteNoteApi(id);
    await refreshNotes();
  };

  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr]">
      <Sidebar
        notes={notes}
        selectedNote={selectedNote}
        onSelectNote={handleSelectNote}
        onDeleteNote={handleDeleteNote}
      />
      <MainContent note={selectedNote} />
    </div>
  );
}
