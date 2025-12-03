import {
  Home,
  Inbox,
  Search,
  List
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import shieldLightBg from "../../../assets/shield-light-bg.png";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Chatbot",
    url: "/chatbot",
    icon: Search,
  },
  {
    title: "FAQ Page",
    url: "/faq",
    icon: List,
  },
  {
    title: "Request Help",
    url: "/helpticket",
    icon: Inbox,
  },
];

export function WebSidebar() {
  
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <img
              src={shieldLightBg}
              alt="UMBC Shield"
              className="w-6 h-6 object-contain"
            />
            <span className="truncate font-bold text-lg p-2">
              CSEE Virtual Triage
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
