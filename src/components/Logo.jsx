import logoLight from "../assets/logo/LogoBlack.png";
import logoDark from "../assets/logo/LogoWhite.png";
import { useTheme } from "../theme/ThemeContext";

export default function Logo() {
  const { theme, mode, toggle, setLight, setDark, setSystem } = useTheme();

  const src = theme === "dark" ? logoDark : logoLight;

  return <img src={src} alt="logo" height={40} />;
}
