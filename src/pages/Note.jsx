import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import useIsDesktop from "../hooks/useIsDesktop";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import arrowLeftIcon from "../assets/images/icon-arrow-left.svg";
import archiveIcon from "../assets/images/icon-archive.svg";
import deleteIcon from "../assets/images/icon-delete.svg";
import restoreIcon from "../assets/images/icon-restore.svg";
import tagIcon from "../assets/images/icon-tag.svg";
import clockIcon from "../assets/images/icon-clock.svg";
import { useNotes } from "../context/NotesContext";
import ConfirmModal from "../Components/ConfirmModal";

export default function Note({ isCreating, onClose }) {
  const [note, setNote] = useState(null);
  const { addNote, updateNote, archiveNote, deleteNote } = useNotes();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
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
        .eq("user_id", userId)
        .single();

      if (error) {
        console.error("Error fetching note:", error);
        return;
      }

      setNote(data);
    };
    loadNote();
  }, [noteId, isCreating, userId]);

  const handleSave = async () => {
    const now = new Date().toISOString();
    if (isCreating) {
      await addNote({
        title,
        content,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        updated_at: now,
      });
      showToast("Note saved successfully!");
      setIsEditing(false);
      if (onClose) onClose();
      return;
    }

    if (isEditing) {
      await updateNote(note.id, {
        title,
        content,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        updated_at: now,
      });
      showToast("Note updated successfully!");
      setIsEditing(false);
      return;
    }

    setIsEditing(true);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);

  const handleArchive = async () => {
    if (!note) return;
    setModalAction("archive");
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!note) return;
    setModalAction("delete");
    setModalOpen(true);
  };

  const confirmModal = async () => {
    if (!note || !modalAction) return;

    if (modalAction === "archive") {
      await archiveNote(note.id, !note.is_archived);
      showToast(note.is_archived ? "Note restored." : "Note archived.");
      if (!note.is_archived && onClose) onClose();
      setNote((prev) => ({ ...prev, is_archived: !prev.is_archived }));
    }

    if (modalAction === "delete") {
      await deleteNote(note.id);
      showToast("Note deleted permanently.");
      if (onClose) onClose();
    }

    setModalOpen(false);
    setModalAction(null);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalAction(null);
  };

  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setTags(
        Array.isArray(note.tags) ? note.tags.join(", ") : note.tags || "",
      );
      setLastEdited(note.updated_at ? note.updated_at.split("T")[0] : "");
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

  const isNoteArchived = note?.is_archived;

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
                  <button
                    onClick={handleDelete}
                    className="cursor-pointer"
                    type="button"
                  >
                    <img
                      className="size-4.5"
                      src={deleteIcon}
                      alt="delete icon"
                    />
                  </button>
                  <button
                    onClick={handleArchive}
                    className="cursor-pointer"
                    type="button"
                  >
                    <img
                      className="size-4.5"
                      src={archiveIcon}
                      alt="archive icon"
                    />
                  </button>
                </>
              )}

              <button
                onClick={onClose}
                className="cursor-pointer rounded-lg text-sm text-neutral-600 md:text-base"
                type="button"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="bg-accent text-accent-text cursor-pointer rounded-lg px-4 py-3 text-sm md:text-base"
                type="button"
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
        />

        <div className="border-b border-neutral-200"></div>

        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="bg-accent cursor-pointer rounded-lg px-4 py-3 text-white"
            type="button"
          >
            {buttonText}
          </button>
          <button
            onClick={onClose}
            className="cursor-pointer rounded-lg bg-neutral-100 px-4 py-3 text-neutral-600"
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>

      {isDesktop && !isCreating && note && (
        <div className="flex min-w-64 flex-col gap-4 py-5 pr-8 pl-4">
          <button
            onClick={handleArchive}
            className="flex cursor-pointer gap-2 rounded-lg border border-neutral-300 px-4 py-3"
            type="button"
          >
            <img
              src={note.is_archived ? restoreIcon : archiveIcon}
              alt="Archive icon"
            />
            {note.is_archived ? "Restore Note" : "Archive Note"}
          </button>
          <button
            onClick={handleDelete}
            className="flex cursor-pointer gap-2 rounded-lg border border-neutral-300 px-4 py-3"
            type="button"
          >
            <img src={deleteIcon} alt="Delete icon" />
            Delete Note
          </button>
        </div>
      )}

      <ConfirmModal
        open={modalOpen}
        title={modalAction === "delete" ? "Delete note?" : "Archive note?"}
        message={
          modalAction === "delete"
            ? "This note will be deleted permanently. This cannot be undone."
            : note?.is_archived
              ? "Restore this note from archive?"
              : "Archive this note?"
        }
        confirmLabel={
          modalAction === "delete"
            ? "Delete"
            : note?.is_archived
              ? "Restore"
              : "Archive"
        }
        cancelLabel="Cancel"
        onConfirm={confirmModal}
        onClose={closeModal}
      />
    </>
  );
}
