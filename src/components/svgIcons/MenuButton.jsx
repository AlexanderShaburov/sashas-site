// src/assets/icons/MenuIcon.jsx
import MenuIcon from "../../assets/icons/MenuIcon.jsx";

function ShowMenu() {
  return <h1>Menu</h1>;
}

export default function MenuButton() {
  return (
    <button onClick={ShowMenu}>
      <MenuIcon color="#ccc" size={25} />
    </button>
  );
}
