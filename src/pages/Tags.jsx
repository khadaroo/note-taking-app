import TagItem from "../Components/TagItem";
import { useNotes } from "../context/NotesContext";

export default function Tags() {
  const { tags } = useNotes();

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
