import MenuButton from "./headerComponents/menuButton/MenuButton";
import Logo from "./headerComponents/Logo";
import ThemeSwitcher from "./headerComponents/themeSwitcher/ThemeSwitcher";
import { InstagramLink } from "./headerComponents/instagram/InstagramLink";
import "./header.css";

export default function Header() {
  return (
    <div className="headerContainer">
      <MenuButton className="menuButton" size={24} />
      <Logo />
      <ThemeSwitcher />
      <InstagramLink />
    </div>
  );
}
