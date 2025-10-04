import { createPortal } from "react-dom";
import { useEffect } from "react";

export default function Lightbox({ src, alt = "", onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keysown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);
  return createPortal(
    <div
      className="lb-backdrop"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <img className="lb-img" src={src} alt={alt} onClick={onClose} />
    </div>,
    document.body
  );
}
