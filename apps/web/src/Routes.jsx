import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import FAQPage from "./views/FAQ/index";
import { Chatbot } from "./views/Chatbot/index";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/chatbot" element={<Chatbot />} />
    </Routes>
  );
}
