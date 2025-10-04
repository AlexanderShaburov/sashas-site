import { Outlet } from "react-router-dom";
import "./gallery.css";

export default function MainLayout() {
  return (
    <main className="main-layout">
      <Outlet />
    </main>
  );
}
