import { createBrowserRouter, Outlet } from "react-router-dom";
import Signup from "./components/Signup.js";
import Signin from "./components/Signin.js";
import Dashboard from "./components/Dashboard.js";
import PrivateRoute from "./components/PrivateRoute.js";
import FAQboard from "./components/FAQboard.js";

function PrivateLayout() {
    return (
        <PrivateRoute>
            <Outlet />
        </PrivateRoute>
    )
}

export const router = createBrowserRouter([
    { path: "/", element: <Signin />},
    { path: "/signup", element: <Signup />},
    { path: "/signin", element: <Signin />},
    {
        element: <PrivateLayout />,
        children: [
            {path: "/faq", element: <FAQboard />},
            {path: "/dashboard", element: <Dashboard />},
        ]
    },
]);