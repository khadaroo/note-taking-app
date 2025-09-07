import { Link } from "react-router";

export default function AuthSwitch({ message, path, linkText }) {
  return (
    <p className="text-center text-sm font-light text-neutral-600">
      {message}
      <Link to={path} className="text-neutral-950 hover:text-blue-500">
        {linkText}
      </Link>
    </p>
  );
}
