import { Link } from "react-router";
import TagItem from "../components/TagItem";
import { useNotes } from "../context.jsx/NotesContext";

export default function Tags() {
  const { notes } = useNotes();

  const tags = [...new Set(notes.flatMap((note) => note.tags))].sort();

  return (
    <div className="xl:hidden">
      <h1 className="text-2xl font-bold tracking-tight text-neutral-950">
        Tags
      </h1>
      <ul>
        {tags.map((tag, i) => (
          <TagItem key={i} tag={tag} />
        ))}
      </ul>
    </div>
  );
}
