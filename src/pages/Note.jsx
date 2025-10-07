import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import useIsDesktop from "../hooks/useIsDesktop";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import arrowLeftIcon from "../assets/images/icon-arrow-left.svg";
import archiveIcon from "../assets/images/icon-archive.svg";
import deleteIcon from "../assets/images/icon-delete.svg";
import tagIcon from "../assets/images/icon-tag.svg";
import clockIcon from "../assets/images/icon-clock.svg";

export default function Note({ isCreating, onClose }) {
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [lastEdited, setLastEdited] = useState("");
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const isDesktop = useIsDesktop();
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const noteId = searchParams.get("note_id");
  const location = useLocation();
  const pathname = location.pathname;
  const { session } = useAuth();
  const userId = session?.user?.id;

  useEffect(() => {
    if (!noteId || isCreating) return;

    const loadNote = async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("id", noteId)
        .single();

      if (error) {
        console.error(("Error fetching note:", error));
        return;
      }

      setNote(data);
    };
    loadNote();
  }, [noteId, isCreating]);

  const handleSave = async () => {
    const now = new Date().toISOString();
    const formattedTags = tags.split(",").map((tag) => tag.trim());
    if (isCreating) {
      await supabase.from("notes").insert([
        {
          title,
          content,
          tags: formattedTags,
          author_id: userId,
          lastEdited: now,
        },
      ]);
      showToast("Note saved successfully!");
      setIsEditing(false);
    } else if (isEditing) {
      await supabase
        .from("notes")
        .update({ title, content, tags, lastEdited: now })
        .eq("id", note.id)
        .eq("author_id", userId);
      showToast("Note updated successfully!");
    } else {
      setIsEditing(true);
      return;
    }

    if (onClose) onClose();
  };

  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setTags(note.tags ? note.tags.join(", ") : "");
      setLastEdited(note.lastEdited ? note.lastEdited.split("T")[0] : "");
      setContent(note.content || "");
      setIsEditing(false);
    } else if (isCreating) {
      setTitle("");
      setTags("");
      setLastEdited("");
      setContent("");
      setIsEditing(true);
    }
  }, [note, isCreating]);

  const buttonText = isCreating
    ? "Save Note"
    : isEditing
      ? "Update Note"
      : "Edit Note";

  return (
    <>
      <div
        className={`flex min-h-full flex-1 flex-col gap-4 ${isDesktop ? "border-r border-neutral-200 px-6 py-5" : ""}`}
      >
        {!isDesktop && (
          <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
            <Link onClick={onClose} to={pathname} className="flex gap-1">
              <img src={arrowLeftIcon} alt="Left arrow icon" />
              <span className="text-neutral-600">Go Back</span>
            </Link>
            <div className="flex items-center gap-4">
              {!isCreating && (
                <>
                  <button className="cursor-pointer">
                    <img
                      className="size-4.5"
                      src={deleteIcon}
                      alt="delete icon"
                    />
                  </button>

                  <button className="cursor-pointer">
                    <img
                      className="size-4.5"
                      src={archiveIcon}
                      alt="delete icon"
                    />
                  </button>
                </>
              )}

              <button
                onClick={onClose}
                className="cursor-pointer rounded-lg text-sm text-neutral-600 md:text-base"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="cursor-pointer text-sm text-blue-500 md:text-base"
              >
                {buttonText}
              </button>
            </div>
          </div>
        )}

        <div>
          <input
            className="w-full text-2xl font-bold text-neutral-950 placeholder:text-neutral-950"
            type="text"
            placeholder="Enter a title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <div className="flex w-28 items-center gap-1.5 text-neutral-700">
              <img className="size-4" src={tagIcon} alt="tag icon" />
              <span className="text-sm">Tags</span>
            </div>
            <input
              className="flex-1 text-sm text-neutral-950 placeholder:text-neutral-400 focus:outline-none"
              type="text"
              placeholder="Add tags separated by commas (e.g Work, Planning)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="flex items-center">
            <div className="flex w-28 items-center gap-1.5 text-neutral-700">
              <img className="size-4" src={clockIcon} alt="clock icon" />
              <span className="text-sm">Last Edited</span>
            </div>
            <input
              className="s flex-1 text-sm text-neutral-950 placeholder:text-neutral-400 focus:outline-none"
              type="text"
              placeholder="Not yet saved"
              value={lastEdited ? new Date(lastEdited).toLocaleString() : ""}
              disabled
            />
          </div>
        </div>

        <div className="border-b border-neutral-200"></div>

        <textarea
          className="flex-1 resize-none text-sm font-normal text-neutral-700 placeholder:text-neutral-700 focus:outline-none"
          spellCheck="false"
          placeholder="Start typing your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={!isEditing}
        ></textarea>

        <div className="border-b border-neutral-200"></div>

        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="cursor-pointer rounded-lg bg-blue-500 px-4 py-3 text-white"
          >
            {buttonText}
          </button>
          <button
            onClick={onclose}
            className="cursor-pointer rounded-lg bg-neutral-100 px-4 py-3 text-neutral-600"
          >
            Cancel
          </button>
        </div>
      </div>

      {isDesktop && (
        <div className="flex min-w-64 flex-col gap-4 py-5 pr-8 pl-4">
          {!isCreating && (
            <>
              <button className="flex cursor-pointer gap-2 rounded-lg border border-neutral-300 px-4 py-3">
                <img src={archiveIcon} alt="Archive icon" />
                Archived Note
              </button>
              <button className="flex cursor-pointer gap-2 rounded-lg border border-neutral-300 px-4 py-3">
                <img src={deleteIcon} alt="Delete icon" />
                Delete Note
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
