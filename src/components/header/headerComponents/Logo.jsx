/* eslint-disable no-unused-vars */
import logoLight from "./images/logo/LogoBlack.png";
import logoDark from "./images/logo/LogoWhite.png";
import { useTheme } from "../../../theme/ThemeContext";

export default function Logo() {
  const { theme, mode, toggle, setLight, setDark, setSystem } = useTheme();

  const src = theme === "dark" ? logoDark : logoLight;

  return (
    <div className="logoSign">
      <img src={src} alt="logo" height={40} />
    </div>
  );
}
