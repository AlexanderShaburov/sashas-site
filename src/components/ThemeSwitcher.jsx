/* eslint-disable no-unused-vars */
import { useTheme } from "../theme/ThemeContext";
import { SunIcon } from "../assets/icons/SunIcon";
import { MoonIcon } from "../assets/icons/MoonIcon";

export default function ThemeSwitcher() {
  const { theme, mode, toggle, setLight, setDark, setSystem } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className="themeSwicherButton"
      onClick={toggle}
    >
      {theme === "dark" ? <SunIcon size={24} /> : <MoonIcon size={24} />}
    </button>
  );
}
