import { Link } from "react-router";

export default function NoteCard({ note }) {
  return (
    <Link to={`?note_id=${note.id}`}>
      <div className="flex flex-col gap-3 border-b border-neutral-200 p-2">
        <h2 className="text-base font-semibold tracking-tight text-neutral-950">
          {note.title}
        </h2>
        <div className="flex gap-2">
          {note.tags.map((tag, i) => (
            <p
              key={i}
              className="rounded-sm bg-neutral-200 px-1.5 py-0.5 text-xs tracking-tight"
            >
              {tag}
            </p>
          ))}
        </div>
        <p className="text-xs tracking-tight text-neutral-700">
          {note.lastEdited.split("T")[0]}
        </p>
      </div>
    </Link>
  );
}
