import YinYang from "../assets/icons/YinYang.svg";
import { useTheme } from "../theme/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, mode, toggle, setLight, setDark, setSystem } = useTheme();

  return (
    <button onClick={() => toggle()}>
      <img src={YinYang} alt="themeSwitcher" width={25} height={25} />
    </button>
  );
}
