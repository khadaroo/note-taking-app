import { NavLink } from "react-router-dom";

export default function NavBarItem({ path, imageSrc, label }) {
  return (
    <NavLink
      to={path}
      className="flex flex-col items-center justify-center gap-1 rounded-sm py-1 md:w-1/2"
    >
      <img src={imageSrc} />
      <label className="hidden text-xs text-neutral-600 md:block">
        {label}
      </label>
    </NavLink>
  );
}
