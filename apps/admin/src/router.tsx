import { createBrowserRouter } from "react-router-dom";
import Signup from "./components/Signup.js";
import Signin from "./components/Signin.js";
import Dashboard from "./components/Dashboard.js";
import FAQboard from "./views/FAQ/index.js";
import { Root } from "./views/Root/index.js";

export const router = createBrowserRouter([
    { path: "/", element: <Signin />},
    { path: "/signup", element: <Signup />},
    { path: "/signin", element: <Signin />},
    {
        element: <Root />,
        children: [
            {path: "/faq", element: <FAQboard />},
            {path: "/dashboard", element: <Dashboard />},
        ]
    },
]);