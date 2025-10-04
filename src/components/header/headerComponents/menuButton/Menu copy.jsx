import { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "./MenuIcon";
import "./menu.css";

export default function Menu() {
  const [open, setOpen] = useState(false);
  const username = "a.sasha.art";

  return (
    <div className="menu.container">
      <button onClick={() => setOpen(!open)}>
        <MenuIcon />
      </button>
      {open && (
        <nav className="menu">
          <ul>
            {/* internal links */}
            <li className="menu-item">
              <Link to="/about" onClick={() => setOpen(false)}>
                About
              </Link>
            </li>
          </ul>
          <li>
            <Link to="/watercolor" onClick={() => setOpen(false)}>
              Watercolor
            </Link>
          </li>
          <li>
            <Link to="/mixed-media" onClick={() => setOpen(false)}>
              Mixed Media
            </Link>
          </li>
          <li>
            <Link to="/contacts" onClick={() => setOpen(false)}>
              Contacts
            </Link>
          </li>
          {/*external links*/}
          <li>
            <a
              href={`https://www.instagram.com/${username}/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href="https://www.behance.net/alexanrshaburo"
              target="_blank"
              rel="noopener noreferrer"
            >
              Behance
            </a>
          </li>
        </nav>
      )}
    </div>
  );
}
