import Menu from "./headerComponents/menuButton/Menu";
import Logo from "./headerComponents/Logo";
import ThemeSwitcher from "./headerComponents/themeSwitcher/ThemeSwitcher";
import { InstagramLink } from "./headerComponents/instagram/InstagramLink";
import "./header.css";

export default function Header() {
  return (
    <div className="headerContainer">
      <Menu />
      <Logo />
      <ThemeSwitcher />
      <InstagramLink />
    </div>
  );
}
