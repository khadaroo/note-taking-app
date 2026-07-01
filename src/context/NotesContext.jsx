import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "../lib/supabase";

const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const { session } = useAuth();

  const userId = session?.user?.id;

  const addNote = async (note) => {
    const { data, error } = await supabase
      .from("notes")
      .insert(note)
      .select()
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setNotes((prev) => [data, ...prev]);

    return data;
  };

  const updateNote = async (id, updates) => {
    const { data, error } = await supabase
      .from("notes")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Update note error:", error);
      return;
    }

    setNotes((prev) => prev.map((note) => (note.id === id ? data : note)));

    return data;
  };

  useEffect(() => {
    if (!userId) return;

    const loadNotes = async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("user_id", userId)
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
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [userId]);

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}
