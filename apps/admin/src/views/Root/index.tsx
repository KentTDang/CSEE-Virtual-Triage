import { Outlet } from "react-router-dom";
import PrivateRoute from "../../components/PrivateRoute";
import { AppSidebar } from "../../components/AppSidebar/index.js";
import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar";
import { Header } from "../../components/Header";
import { cn } from "@workspace/ui/lib/utils";

export const Root = () => {
  return (
    <PrivateRoute>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset
          className={cn(
            // Set content container, so we can use container queries
            "@container/content",

            // If layout is fixed, set the height
            // to 100svh to prevent overflow
            "has-[[data-layout=fixed]]:h-svh",

            // If layout is fixed and sidebar is inset,
            // set the height to 100svh - spacing (total margins) to prevent overflow
            "peer-data-[variant=inset]:has-[[data-layout=fixed]]:h-[calc(100svh-(var(--spacing)*4))]",
          )}
        >
          <Header />
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </PrivateRoute>
  );
};
