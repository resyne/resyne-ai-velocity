import { useLocation, useNavigate } from "react-router-dom";
import { Briefcase, Users, FileText, CalendarDays, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import resyneLogo from "@/assets/resyne-logo-main.png";

const navItems = [
  { title: "Commesse", path: "/erp", icon: Briefcase },
  { title: "Clienti", path: "/erp/clienti", icon: Users },
  { title: "Fatturazione", path: "/erp/fatturazione", icon: FileText },
  { title: "Scadenze", path: "/erp/scadenze", icon: CalendarDays },
];

export function ERPSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => {
    if (path === "/erp") return location.pathname === "/erp";
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex items-center gap-2">
              {!collapsed && <img src={resyneLogo} alt="Resyne" className="h-5" />}
              {!collapsed && <span className="font-heading text-xs">ERP</span>}
              {collapsed && <img src={resyneLogo} alt="Resyne" className="h-5" />}
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.path)}
                    isActive={isActive(item.path)}
                    tooltip={item.title}
                  >
                    <item.icon className="h-4 w-4" />
                    {!collapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-2">
          {!collapsed && (
            <p className="text-xs text-muted-foreground truncate mb-2 px-2">{user?.email}</p>
          )}
          <Button
            variant="ghost"
            size={collapsed ? "icon" : "sm"}
            className="w-full justify-start"
            onClick={signOut}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Esci</span>}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
