import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "../lib/supabase";

const NotesContext = createContext();

const getTagsFromNotes = (notes) => {
  return [
    ...new Set(
      notes
        .filter((note) => !note.is_archived)
        .flatMap((note) => {
          if (Array.isArray(note.tags)) {
            return note.tags.map((tag) => tag?.trim());
          }

          if (typeof note.tags === "string") {
            return note.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean);
          }

          return [];
        }),
    ),
  ]
    .filter((tag) => typeof tag === "string" && tag.length > 0)
    .sort();
};

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const { session } = useAuth();

  const tags = useMemo(() => getTagsFromNotes(notes), [notes]);
  const userId = session?.user?.id;

  const addNote = async (note) => {
    const payload = {
      ...note,
      is_archived: false,
      user_id: userId,
    };

    const { data, error } = await supabase
      .from("notes")
      .insert(payload)
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

  const archiveNote = async (id, isArchived = true) => {
    const { data, error } = await supabase
      .from("notes")
      .update({ is_archived: isArchived })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Archive note error:", error);
      return;
    }

    setNotes((prev) => prev.map((note) => (note.id === id ? data : note)));
    return data;
  };

  const deleteNote = async (id) => {
    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (error) {
      console.error("Delete note error:", error);
      return;
    }
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  useEffect(() => {
    if (!userId) return;

    const loadNotes = async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Load notes error:", error);
        return;
      }

      setNotes(data);
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

          if (eventType === "INSERT" && newRow) {
            setNotes((prev) => [newRow, ...prev]);
          } else if (eventType === "UPDATE" && newRow) {
            setNotes((prev) =>
              prev.map((note) => (note.id === newRow.id ? newRow : note)),
            );
          } else if (eventType === "DELETE" && oldRow) {
            setNotes((prev) => prev.filter((note) => note.id !== oldRow.id));
          }
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [userId]);

  return (
    <NotesContext.Provider
      value={{ notes, tags, addNote, updateNote, archiveNote, deleteNote }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}
