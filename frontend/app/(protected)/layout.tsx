import { NotesProvider } from "@/contexts/notes-context";
import React from "react";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <NotesProvider>{children}</NotesProvider>;
}
