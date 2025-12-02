import { useNavigate } from "react-router-dom";
import { Button } from "@workspace/ui/components/button";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-6">Welcome! Where would you like to start?</p>

      <div className="flex flex-col gap-3 max-w-sm">
        <Button onClick={() => navigate("/faq")}>View FAQs</Button>
        <Button onClick={() => navigate("/chatbot")}>Chatbot</Button>
      </div>
    </div>
  );
}
