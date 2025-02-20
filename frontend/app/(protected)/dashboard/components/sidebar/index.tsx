import React from "react";
import SidebarNote from "./sidebar-note";
import NewNoteDialog from "./new-note-dialog";
import { Note } from "@/services/notes";

interface SidebarProps {
  notes: Note[];
  selectedNote: Note | null;
  onSelectNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
}

export default function Sidebar({
  notes,
  selectedNote,
  onSelectNote,
  onDeleteNote,
}: SidebarProps) {
  return (
    <div className="border-r bg-[hsl(var(--popover))]">
      <div className="flex h-full max-h-screen flex-col">
        <header className="flex h-[60px] items-center border-b px-6">
          <h1 className="text-lg font-semibold text-[hsl(var(--foreground))]">
            Notas
          </h1>
        </header>
        <div className="flex-1 overflow-auto py-2">
          <div className="grid gap-2 px-4">
            {notes.map((note) => (
              <SidebarNote
                key={note.id}
                note={note}
                isSelected={selectedNote?.id === note.id}
                onSelect={onSelectNote}
                onDelete={onDeleteNote}
              />
            ))}
          </div>
        </div>
        <div className="mt-auto p-4">
          <NewNoteDialog />
        </div>
      </div>
    </div>
  );
}
