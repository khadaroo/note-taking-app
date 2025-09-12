import { createContext, useContext, useEffect, useState } from "react";

const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch("/data.json");
      if (!response.ok) {
        console.log("Error about fetching notes");
        return;
      }
      const data = await response.json();

      setNotes(data);
    };

    fetchNotes();
  }, []);

  return (
    <NotesContext.Provider value={{ notes }}>{children}</NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}
