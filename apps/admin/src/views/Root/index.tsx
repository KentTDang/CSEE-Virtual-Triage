import { Outlet } from "react-router-dom";
import PrivateRoute from "../../components/PrivateRoute";
import { AppSidebar} from "../../components/AppSidebar/index.js";
import { SidebarProvider } from "@workspace/ui/components/sidebar";
import { Header } from "../../components/Header";

export const Root = () => {
    return (
        <PrivateRoute>
            <SidebarProvider> 
                <AppSidebar />
                <main>
                    <Header />
                    <Outlet />
                </main>
            </SidebarProvider>
        </PrivateRoute>
    )
}