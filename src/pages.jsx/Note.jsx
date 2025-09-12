import { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router";
import useIsDesktop from "../hooks/useIsDesktop";

export default function Note({ notes }) {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [lastEdited, setLastEdited] = useState("");
  const [content, setContent] = useState("");

  const isDesktop = useIsDesktop();
  const [searchParams] = useSearchParams();
  const noteId = searchParams.get("note_id");

  const note = noteId ? notes.find((n) => n.id == noteId) : null;

  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      <div
        className={`flex min-h-full flex-1 flex-col gap-4 ${isDesktop ? "border-r border-neutral-200 px-6 py-5" : ""}`}
      >
        {!isDesktop && (
          <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
            <Link to={pathname} className="flex gap-1">
              <img
                src="../src/assets/images/icon-arrow-left.svg"
                alt="Left arrow icon"
              />
              <span className="text-neutral-600">Go Back</span>
            </Link>
            <div className="flex items-center gap-4">
              <button>
                <img
                  className="size-4.5"
                  src="../src/assets/images/icon-delete.svg"
                  alt="delete icon"
                />
              </button>

              <button>
                <img
                  className="size-4.5"
                  src="../src/assets/images/icon-archive.svg"
                  alt="delete icon"
                />
              </button>

              <button className="rounded-lg text-sm text-neutral-600 md:text-base">
                Cancel
              </button>

              <button className="text-sm text-blue-500 md:text-base">
                Save Note
              </button>
            </div>
          </div>
        )}

        <div>
          <input
            className="w-full text-2xl font-bold text-neutral-950 placeholder:text-neutral-950"
            type="text"
            placeholder="Enter a title..."
            value={note ? note.title : title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <div className="flex w-28 items-center gap-1.5 text-neutral-700">
              <img
                className="size-4"
                src="../src/assets/images/icon-tag.svg"
                alt="tag icon"
              />
              <span className="text-sm">Tags</span>
            </div>
            <input
              className="flex-1 text-sm text-neutral-950 placeholder:text-neutral-400 focus:outline-none"
              type="text"
              placeholder="Add tags separated by commas (e.g Work, Planning)"
              value={note ? note.tags : tags}
              onChange={(e) => setTags(e.target.value.split(","))}
            />
          </div>
          <div className="flex items-center">
            <div className="flex w-28 items-center gap-1.5 text-neutral-700">
              <img
                className="size-4"
                src="../src/assets/images/icon-clock.svg"
                alt="clock icon"
              />
              <span className="text-sm">Last Edited</span>
            </div>
            <input
              className="s flex-1 text-sm text-neutral-950 placeholder:text-neutral-400 focus:outline-none"
              type="text"
              placeholder="Not yet saved."
              value={note ? note.lastEdited.split("T")[0] : lastEdited}
              onChange={() => setLastEdited(Date.now)}
            />
          </div>
        </div>

        <div className="border-b border-neutral-200"></div>

        <textarea
          className="flex-1 resize-none text-sm font-normal text-neutral-700 placeholder:text-neutral-700 focus:outline-none"
          spellCheck="false"
          placeholder="Start typing your note here..."
          value={note ? note.content : content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <div className="border-b border-neutral-200"></div>

        <div className="flex gap-4">
          <button className="cursor-pointer rounded-lg bg-blue-500 px-4 py-3 text-white">
            Save Note
          </button>
          <button className="cursor-pointer rounded-lg bg-neutral-100 px-4 py-3 text-neutral-600">
            Cancel
          </button>
        </div>
      </div>
      {isDesktop && (
        <div className="flex min-w-64 flex-col gap-4 py-5 pr-8 pl-4">
          <button className="flex cursor-pointer gap-2 rounded-lg border border-neutral-300 px-4 py-3">
            <img src="src/assets/images/icon-archive.svg" alt="Archive icon" />
            Archived Note
          </button>
          <button className="flex cursor-pointer gap-2 rounded-lg border border-neutral-300 px-4 py-3">
            <img src="src/assets/images/icon-delete.svg" alt="Delete icon" />
            Delete Note
          </button>
        </div>
      )}
    </>
  );
}
