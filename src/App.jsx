import MainLayout from "./components/MainLayout";
import Header from "./components/Header";
import BottomBar from "./components/BottomBar";

export default function App() {
  return (
    <div className="common-background">
      <Header />
      <MainLayout />
      <BottomBar />
    </div>
  );
}
