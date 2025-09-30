import MenuIcon from "./svgIcons/MenuButton";
import Logo from "./Logo";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  return (
    <div className="headerContainer">
      <MenuIcon />
      <Logo />
      <ThemeSwitcher />
    </div>
  );
}
