import React from "react";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import {Note} from "@/services/notes";

interface SidebarNoteProps {
  note: Note;
  isSelected: boolean;
  onSelect: (note: Note) => void;
  onDelete: (id: string) => void;
}

export default function SidebarNote({
  note,
  isSelected,
  onSelect,
  onDelete,
}: SidebarNoteProps) {
  return (
    <div
      onClick={() => onSelect(note)}
      className={`flex items-start gap-3 rounded-lg p-3 text-sm transition-colors cursor-pointer 
        ${isSelected ? "bg-[hsl(var(--muted))]" : "bg-[hsl(var(--card))]"} 
        hover:bg-[hsl(var(--muted))]`}
    >
      <div className="flex-1 space-y-1">
        <h3 className="font-medium text-[hsl(var(--foreground))]">
          {note.title}
        </h3>
        <p className="line-clamp-2 text-[hsl(var(--foreground))]">
          {note.description}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-[hsl(var(--foreground))] hover:text-[hsl(var(--destructive))]"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(note.id);
        }}
      >
        <TrashIcon className="h-5 w-5" />
        <span className="sr-only">Deletar</span>
      </Button>
    </div>
  );
}
