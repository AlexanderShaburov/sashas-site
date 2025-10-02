import MenuIcon from "../assets/icons/MenuIcon";
import Logo from "./Logo";
import ThemeSwitcher from "./ThemeSwitcher";
import { InstagramLink } from "./InstagramLink";

export default function Header() {
  return (
    <div className="headerContainer">
      <MenuIcon className="menuButton" size={24} />
      <Logo />
      <ThemeSwitcher />
      <InstagramLink />
    </div>
  );
}
