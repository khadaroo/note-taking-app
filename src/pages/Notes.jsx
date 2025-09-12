import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";
import NoteCard from "../components/NoteCard";
import Note from "./Note";
import useIsDesktop from "../hooks/useIsDesktop";
import Search from "../components/Search";
import { useNotes } from "../context/NotesContext";

export default function Notes({ filter }) {
  const { notes } = useNotes();
  const { tag } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const isDesktop = useIsDesktop();
  const navigate = useNavigate();
  const location = useLocation();
  const isSearchPath = location.pathname.startsWith("/search");
  const [isCreating, setIsCreating] = useState(false);

  const hasNote = searchParams.has("note_id");

  useEffect(() => {
    if (hasNote) setIsCreating(false);
  }, [hasNote]);

  const handleCreate = () => {
    setIsCreating(true);
    navigate(location.pathname, { replace: true });
  };

  const handleChange = (e) => {
    const value = e.target.value;

    if (value) {
      navigate(`/search?search=${encodeURIComponent(value)}`);
    } else {
      navigate(window.location.pathname);
    }
  };

  const getFilteredNotes = () => {
    if (filter === "archive") return notes.filter((n) => n.isArchived);
    if (filter === "tag") return notes.filter((n) => n.tags.includes(tag));
    if (filter === "search") {
      if (!searchQuery) return [];

      const search = searchQuery.toLowerCase();
      return notes.filter(
        (note) =>
          note.title.toLowerCase().includes(search) ||
          note.content.toLowerCase().includes(search) ||
          note.tags.some((t) => t.toLowerCase().includes(search)),
      );
    }
    return notes;
  };

  const filteredNotes = getFilteredNotes();

  const titles = {
    archive: "Archived Notes",
    tag: `Notes Tagged: ${tag}`,
    search: isDesktop ? `Showing results for: ${searchQuery}` : "Search",
    all: "All Notes",
  };

  const title = titles[filter] || "All Notes";

  if (!isDesktop && (hasNote || isCreating))
    return (
      <Note
        isCreating={isCreating}
        onClose={() => {
          setIsCreating(false);
          navigate(location.pathname, { replace: true });
        }}
      />
    );

  if (!isDesktop && (!hasNote || !isCreating))
    return (
      <div className="relative flex h-screen flex-col gap-4">
        {filter === "tag" && (
          <Link to="/tags" className="flex items-center gap-1">
            <img
              className="size-4.5"
              src="../src/assets/images/icon-arrow-left.svg"
              alt="Left arrow icon"
            />
            <span className="text-sm text-neutral-600">Go Back</span>
          </Link>
        )}

        <h1 className="text-2xl font-bold tracking-tight text-neutral-950">
          {title}
        </h1>

        {filter === "tag" && (
          <p className="text-sm text-neutral-700 md:text-base">
            All notes with <span className="text-neutral-950">"{tag}"</span> tag
            are shown here.
          </p>
        )}

        {isSearchPath && <Search value={searchQuery} onChange={handleChange} />}

        {filter === "archive" && (
          <p className="mt-2 text-sm text-neutral-700">
            All your archived notes are stored here. You can restore or delete
            them anytime.
          </p>
        )}

        {notes.length === 0 && (
          <div className="mt-2 rounded-lg border-1 border-neutral-200 bg-neutral-100 p-2 text-sm leading-normal tracking-tight text-neutral-950">
            {filter === "all" ? (
              <span>
                You don't have any notes yet. Start a new note to capture your
                thoughts and ideas.
              </span>
            ) : (
              <span>
                No notes have been archived yet. Move notes here for
                safekeeping, or <button>create a new note</button>.
              </span>
            )}
          </div>
        )}

        <section className="space-y-2">
          <div>
            {filteredNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </section>

        <button
          onClick={handleCreate}
          className="fixed right-10 bottom-25 flex size-12 cursor-pointer items-center justify-center rounded-full bg-blue-500 md:bottom-30 md:size-16"
        >
          <img
            className="size-8"
            src="src/assets/images/icon-plus.svg"
            alt="plus icon"
          />
        </button>
      </div>
    );

  if (isDesktop)
    return (
      <>
        <section className="col-span-2 flex items-center gap-6 border-b-1 border-neutral-200 px-8">
          <h1 className="flex-2 text-2xl font-bold text-neutral-950">
            {title}
          </h1>
          <div className="relative flex flex-1 items-center rounded-lg border-1 border-neutral-300 px-4 py-3 drop-shadow">
            <img
              className="absolute size-5"
              src="src/assets/images/icon-search.svg"
              alt=""
            />
            <input
              className="w-full pl-6 text-sm leading-normal font-normal text-neutral-900 focus:outline-none"
              type="text"
              placeholder="Search by title, content, or tags..."
              value={searchQuery}
              onChange={handleChange}
            />
          </div>
          <Link to="/setting">
            <img
              className="size-6"
              src="src/assets/images/icon-settings.svg"
              alt=""
            />
          </Link>
        </section>
        <section className="flex flex-col gap-2 overflow-auto border-r-1 border-neutral-200 py-5 pr-4 pl-8">
          <button
            onClick={handleCreate}
            className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-blue-500 px-4 py-3 text-sm leading-normal font-medium tracking-wide text-white"
          >
            <img
              className="size-5"
              src="src/assets/images/icon-plus.svg"
              alt="Plus icon"
            />
            Create New Note
          </button>

          {filter === "archive" && (
            <p className="mt-2 text-sm text-neutral-700">
              All your archived notes are stored here. You can restore or delete
              them anytime.
            </p>
          )}

          {notes.length === 0 &&
            filter ===
              "all"(
                <div className="mt-2 rounded-lg border-1 border-neutral-200 bg-neutral-100 p-2 text-sm leading-normal tracking-tight text-neutral-950">
                  <span>
                    You don't have any notes yet. Start a new note to capture
                    your thoughts and ideas.
                  </span>
                </div>,
              )}

          {notes.filter((note) => note.isArchived).length === 0 &&
            filter === "archive" && (
              <div className="mt-2 rounded-lg border-1 border-neutral-200 bg-neutral-100 p-2 text-sm leading-normal tracking-tight text-neutral-950">
                <span>
                  No notes have been archived yet. Move notes here for
                  safekeeping, or
                  <button onClick={handleCreate} className="underline">
                    create a new note
                  </button>
                  .
                </span>
              </div>
            )}

          <div>
            {filteredNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </section>

        {isDesktop && (hasNote || isCreating) && (
          <section className="flex">
            <Note
              key={isCreating ? "new " : "existing"}
              isCreating={isCreating}
              onClose={() => {
                setIsCreating(false);
                navigate(location.pathname, { replace: true });
              }}
            />
          </section>
        )}
      </>
    );
}
