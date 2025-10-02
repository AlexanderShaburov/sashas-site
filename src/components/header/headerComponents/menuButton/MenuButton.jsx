// src/assets/icons/MenuIcon.jsx
import MenuIcon from "./MenuIcon.jsx";
import "./menuButton.css";

function ShowMenu() {
  return <h1>Menu</h1>;
}

export default function MenuButton() {
  return (
    <button
      type="button"
      aria-label="menu button"
      className="menuButton"
      onClick={ShowMenu}
    >
      <MenuIcon color="#ccc" size={25} />
    </button>
  );
}
