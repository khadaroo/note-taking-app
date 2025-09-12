import { Link } from "react-router";

export default function TagItem({ tag }) {
  return (
    <Link to={`/tags/${tag}`}>
      <div className="flex items-center gap-2 border-b border-neutral-200 py-4">
        <img src="src/assets/images/icon-tag.svg" alt="" />
        <span className="text-sm leading-[1.2] font-medium text-neutral-700">
          {tag}
        </span>
      </div>
    </Link>
  );
}
