import MenuIcon from "../assets/icons/MenuIcon";
import Logo from "./Logo";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  return (
    <div className="headerContainer">
      <h2>TEST</h2>
      <MenuIcon size={24} />
      <Logo />
      <ThemeSwitcher />
    </div>
  );
}
