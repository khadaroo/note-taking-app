import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "../lib/supabase";

const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const { session } = useAuth();

  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;

    const loadNotes = async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("author_id", userId)
        .order("created_at", { ascending: false });

      if (error) console.error("Load notes error:", error);
      else setNotes(data);
    };
    loadNotes();
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel("notes-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notes" },
        (payload) => {
          const { eventType, new: newRow, old: oldRow } = payload;
          console.log("📡 Payload event:", payload.eventType);

          if (eventType === "INSERT") {
            setNotes((prev) => [...prev, newRow]);
          } else if (eventType === "UPDATE") {
            setNotes((prev) =>
              prev.map((note) => (note.id === newRow.id ? newRow : note)),
            );
          } else if (eventType === "DELETE") {
            setNotes((prev) => prev.filter((note) => note.id !== oldRow.id));
          }
        },
      )
      .subscribe((status) => {
        console.log("Channel status:", status);
      });

    return () => supabase.removeChannel(channel);
  }, [userId]);

  return (
    <NotesContext.Provider value={{ notes }}>{children}</NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}
