import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@workspace/ui/globals.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.js";
import { AuthContextProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <h1 className="text-center pt-4 text-3xl">
        React Supabase Authentication
      </h1>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  </StrictMode>
);

// import App from "./App";
// import Layout from "./layout";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <Layout>
//       <App />
//     </Layout>
//     </StrictMode>
// );
