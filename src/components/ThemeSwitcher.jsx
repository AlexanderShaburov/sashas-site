import YinYang from "../assets/icons/YinYang";
import { useTheme } from "../theme/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, mode, toggle, setLight, setDark, setSystem } = useTheme();

  return (
    <button onClick={() => toggle()}>
      <YinYang size={24} />
    </button>
  );
}
