import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/mainLayout/MainLayout";
import Header from "./components/header/Header";
import BottomBar from "./components/footer/BottomBar";

import Home from "./pages/Home";
import Watercolor from "./pages/Watercolor";
import MixedMedia from "./pages/MixedMedia";
import "./components/mainLayout/gallery.css";

export default function App() {
  return (
    <div className="common-background">
      <Header />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="watercolor" element={<Watercolor />} />
          <Route path="mixed-media" element={<MixedMedia />} />
        </Route>
      </Routes>
      <BottomBar />
    </div>
  );
}
