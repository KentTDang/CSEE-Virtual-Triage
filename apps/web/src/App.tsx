import { Header } from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes"

export default function App() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <BrowserRouter>
        <Header />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}
