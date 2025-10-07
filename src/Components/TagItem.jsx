import { Link } from "react-router-dom";
import tagIcon from "../assets/images/icon-tag.svg";

export default function TagItem({ tag }) {
  return (
    <Link to={`/tags/${tag}`}>
      <div className="flex items-center gap-2 border-b border-neutral-200 py-4">
        <img src={tagIcon} alt="" />
        <span className="text-sm leading-[1.2] font-medium text-neutral-700">
          {tag}
        </span>
      </div>
    </Link>
  );
}
