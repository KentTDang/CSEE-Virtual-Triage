import { Outlet } from "react-router-dom";
// import PrivateRoute from "../../components/PrivateRoute";
// import { AppSidebar } from "../../components/AppSidebar/index.js";
// import {
//   SidebarInset,
//   SidebarProvider,
// } from "@workspace/ui/components/sidebar";
import { Header } from "../../components/Header";
// import { cn } from "@workspace/ui/lib/utils";

export const Root = () => {
  return (
    <div>
        <Header />
        <Outlet />
    </div>
  );
};
