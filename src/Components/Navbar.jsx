import HorizontalDivider from "./HorizontalDivider";
import NavBarItem from "./NavBarItem";
import homeIcon from "../assets/images/icon-home.svg";
import searchIcon from "../assets/images/icon-search.svg";
import archiveIcon from "../assets/images/icon-archive.svg";
import tagIcon from "../assets/images/icon-tag.svg";
import settingIcon from "../assets/images/icon-settings.svg";

export default function Navbar() {
  return (
    <nav className="grid grid-cols-5 md:grid-cols-9 md:place-items-center">
      <NavBarItem path="/" imageSrc={homeIcon} label="Home" />

      <HorizontalDivider />

      <NavBarItem path="/search" imageSrc={searchIcon} label="Search" />

      <HorizontalDivider />

      <NavBarItem path="/archive" imageSrc={archiveIcon} label="Archived" />

      <HorizontalDivider />

      <NavBarItem path="/tags" imageSrc={tagIcon} label="Tags" />

      <HorizontalDivider />

      <NavBarItem path="/setting" imageSrc={settingIcon} label="Setting" />
    </nav>
  );
}
