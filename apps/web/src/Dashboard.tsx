import { useNavigate } from "react-router-dom";
import { Button } from "@workspace/ui/components/button";
import bgImage from "../assets/maryland-flag-backgrounds-landscape-black.jpg"

export default function Dashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "FAQ",
      description: "Edit, organize, and update the FAQ database.",
      path: "/faq",
    },
    {
      title: "Chatbot",
      description: "Edit, organize, and update the FAQ database.",
      path: "/chatbot",
    },
    {
      title: "Request Help",
      description: "View and resolve chatbot-submitted help requests.",
      path: "/resolveTicket",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center m-5 mx-10 ">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <h2 className="text-gray-600">
            Welcome!
          </h2>
        </div>

      </div>
    
      <div className="min-h-screen p-6 pt-10" style={{backgroundImage: `url(${bgImage})`}}>
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl text-white font-bold drop-shadow-lg leading-relaxed">
              Welcome to the CSEE Virtual Triage System. Use this portal to view CSEE FAQs and recieve support through the chatbot or help ticket system.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {cards.map((card) => (
              <div
                key={card.title}
                onClick={() => navigate(card.path)}
                className="
                  cursor-pointer 
                  p-6 
                  bg-[#FCB415] 
                  text-black
                  rounded-2xl 
                  shadow 
                  hover:shadow-lg 
                  transition 
                  hover:bg-[#FEDD93]
                "
              >
                <h3 className="text-xl font-semibold mb-2 text-black">{card.title}</h3>
                <p className="text-black">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
