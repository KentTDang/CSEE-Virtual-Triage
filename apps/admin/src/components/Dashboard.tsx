import { UserAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Button } from "@workspace/ui/components/button";
import bgImage from "../../assets/maryland-flag-backgrounds-landscape-black.jpg"

const Dashboard = () => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const cards = [
    {
      title: "FAQ Management",
      description: "Edit, organize, and update the FAQ database.",
      path: "/faq",
    },
    {
      title: "Resolve Tickets",
      description: "View and resolve chatbot-submitted help requests.",
      path: "/resolveTicket",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center m-5 mx-10 ">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <h2 className="text-gray-600">
            Hello, {session?.user?.email}
          </h2>
        </div>

        <Button variant="destructive" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    
      <div className="min-h-screen p-6 pt-10" style={{backgroundImage: `url(${bgImage})`}}>
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl text-white font-bold drop-shadow-lg leading-relaxed">
              Welcome to the CSEE Virtual Triage System. Through this portal you
              will be able to manage the FAQ table and resolve help tickets sent by
              the users.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
};

export default Dashboard;
