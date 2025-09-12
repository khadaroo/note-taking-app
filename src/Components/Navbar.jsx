import HorizontalDivider from "./HorizontalDivider";
import NavBarItem from "./NavBarItem";

export default function Navbar() {
  return (
    <nav className="grid grid-cols-5 md:grid-cols-9 md:place-items-center">
      <NavBarItem
        path="/"
        imageSrc="src/assets/images/icon-home.svg"
        label="Home"
      />

      <HorizontalDivider />

      <NavBarItem
        path="/search"
        imageSrc="src/assets/images/icon-search.svg"
        label="Search"
      />

      <HorizontalDivider />

      <NavBarItem
        path="/archive"
        imageSrc="src/assets/images/icon-archive.svg"
        label="Archived"
      />

      <HorizontalDivider />

      <NavBarItem
        path="/tags"
        imageSrc="src/assets/images/icon-tag.svg"
        label="Tags"
      />

      <HorizontalDivider />

      <NavBarItem
        path="/settings"
        imageSrc="src/assets/images/icon-settings.svg"
        label="Setting"
      />
    </nav>
  );
}
