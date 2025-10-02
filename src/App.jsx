import MainLayout from "./components/MainLayout";
import Header from "./components/header/Header";
import BottomBar from "./components/footer/BottomBar";
import "./App.css";

export default function App() {
  return (
    <div className="common-background">
      <Header />
      <MainLayout />
      <BottomBar />
    </div>
  );
}
