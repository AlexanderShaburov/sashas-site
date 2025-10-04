/* eslint-disable no-unused-vars */
import logoLight from "./images/logo/LogoBlack.png";
import logoDark from "./images/logo/LogoWhite.png";
import { useTheme } from "../../../theme/ThemeContext";
import { Link } from "react-router-dom";

export default function Logo() {
  const { theme, mode, toggle, setLight, setDark, setSystem } = useTheme();

  const src = theme === "dark" ? logoDark : logoLight;

  return (
    <Link to="/" className="logoSign" aria-label="Home">
      <img src={src} alt="logo" height={40} />
    </Link>
  );
}
