import NoteCard from "./NoteCard";
import searchIcon from "../assets/images/icon-search.svg";

export default function Search({ value, onChange }) {
  return (
    <>
      <div className="relative flex items-center rounded-lg border border-neutral-300 bg-neutral-50 p-4">
        <input
          className="ml-10 h-full w-full text-sm leading-[1.3] text-neutral-950 focus:outline-none"
          type="text"
          placeholder="Dev"
          value={value}
          onChange={onChange}
        />
        <img
          className="absolute top-1/2 left-4 -translate-y-1/2"
          src={searchIcon}
          alt=""
        />
      </div>
      {value && (
        <p className="text-sm leading-[1.3] tracking-tight text-neutral-700">
          All notes matching <span className="text-neutral-950">"{value}"</span>{" "}
          are displayed below.
        </p>
      )}
      <section></section>
    </>
  );
}
