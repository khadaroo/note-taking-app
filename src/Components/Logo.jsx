import logo from "../assets/images/logo.svg";

export default function Logo({ position }) {
  return (
    <div
      className={`flex h-9 items-center ${position === "left" ? "justify-start" : "justify-center"}`}
    >
      <img className="h-7" src={logo} alt="logo" />
    </div>
  );
}
