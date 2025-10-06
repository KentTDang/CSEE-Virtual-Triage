import { createBrowserRouter } from "react-router-dom";
import App from "./App.js";
import Signup from "./components/Signup.js";
import Signin from "./components/Signin.js";
import Dashboard from "./components/Dashboard.js";
import PrivateRoute from "./components/PrivateRoute.js";

export const router = createBrowserRouter([
    { path: "/", element: <App />},
    { path: "/signup", element: <Signup />},
    { path: "/signin", element: <Signin />},
    { 
        path: "/dashboard", 
        element: (
            <PrivateRoute>
                <Dashboard />{" "}
            </PrivateRoute>
        ),
    },
]);