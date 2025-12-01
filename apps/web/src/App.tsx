import { Header } from "./components/Header";
import { Chatbot } from "./views/Chatbot";

export default function App() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <Chatbot />
    </div>
  );
}
