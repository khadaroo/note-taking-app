import { Link } from "react-router-dom";
import { useNotes } from "../context/NotesContext";
import logo from "../assets/images/logo.svg";
import homeIcon from "../assets/images/icon-home.svg";
import archiveIcon from "../assets/images/icon-archive.svg";
import chevronRightIcon from "../assets/images/icon-chevron-right.svg";
import tagIcon from "../assets/images/icon-tag.svg";

export default function Sidebar() {
  const { notes } = useNotes();

  const tags = [...new Set(notes.flatMap((note) => note.tags))].sort();

  return (
    <aside className="flex flex-col gap-4 border-r-1 border-neutral-200 px-4 py-3">
      <div className="flex h-14 w-60 items-center">
        <img className="h-7" src={logo} alt="logo" />
      </div>
      <div className="space-y-2 border-b-1 border-neutral-200 pb-2">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-lg bg-neutral-100 px-3 py-2.5"
        >
          <img src={homeIcon} alt="Home icon" />
          <span className="flex-1 font-medium text-neutral-950">All Notes</span>
          <img src={chevronRightIcon} />
        </Link>

        <Link
          to="/archive"
          className="flex items-center gap-2 rounded-lg px-3 py-2.5"
        >
          <img src={archiveIcon} alt="Home icon" />
          <span className="flex-1 font-medium text-neutral-950">
            Archived Notes
          </span>
          <img src={chevronRightIcon} alt="chevron right icon" />
        </Link>
      </div>
      <div className="">
        <h2 className="rounded-lg px-3 text-base font-medium text-neutral-500">
          Tags
        </h2>
        <ul className="">
          {tags.map((tag, i) => (
            <Link key={i} to={`/tags/${tag}`}>
              <li
                key={i}
                className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-neutral-700"
              >
                <img className="size-6" src={tagIcon} alt="" />
                <span>{tag}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </aside>
  );
}
