// AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import { Root } from "./views/Root/index";   // your layout with SidebarProvider, Header, WebSidebar
import Dashboard from "./Dashboard";
import FAQPage from "./views/FAQ";
import { Chatbot } from "./views/Chatbot";
import Helpticket from "./views/Helpticket";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Root layout wraps all pages */}
      <Route path="/" element={<Root />}>
        <Route index element={<Dashboard />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="chatbot" element={<Chatbot />} />
        <Route path="helpticket" element={<Helpticket />} />
      </Route>
    </Routes>
  );
}