import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Wallet,
  CalendarDays,
  UserPlus,
  TrendingUp,
  FileText,
  Settings,
  Building2,
  Clock,
  Award,
  HelpCircle,
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
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const mainMenuItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
];

const hrModules = [
  { title: "Employees", url: "/admin/employees", icon: Users },
  { title: "Attendance", url: "/admin/attendance", icon: CalendarCheck },
  { title: "Payroll", url: "/admin/payroll", icon: Wallet },
  { title: "Leave Management", url: "/admin/leave", icon: CalendarDays },
  { title: "Recruitment", url: "/admin/recruitment", icon: UserPlus },
  { title: "Performance", url: "/admin/performance", icon: TrendingUp },
  { title: "Time Tracking", url: "/admin/time-tracking", icon: Clock },
  { title: "Departments", url: "/admin/departments", icon: Building2 },
];

const otherItems = [
  { title: "Reports", url: "/admin/reports", icon: FileText },
  { title: "Awards", url: "/admin/awards", icon: Award },
  { title: "Settings", url: "/admin/settings", icon: Settings },
  { title: "Help & Support", url: "/admin/help", icon: HelpCircle },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar
      className={cn(
        "border-r border-border bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
      collapsible="icon"
    >
      <SidebarContent className={cn("py-4", collapsed ? "px-1" : "px-2")}>
        {/* Logo */}
        <div className={cn("mb-6 flex items-center gap-2", collapsed ? "justify-center px-0" : "px-2")}>
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <Users className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="font-display font-bold text-lg text-foreground">NexHR</span>
          )}
        </div>

        {/* Main Menu */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    className={cn(
                      "rounded-lg transition-all",
                      isActive(item.url)
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "hover:bg-secondary"
                    )}
                  >
                    <Link to={item.url} className={cn("flex items-center", collapsed ? "justify-center" : "gap-3")}>
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* HR Modules */}
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              HR Modules
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {hrModules.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    className={cn(
                      "rounded-lg transition-all",
                      isActive(item.url)
                        ? "bg-secondary text-foreground"
                        : "hover:bg-secondary"
                    )}
                  >
                    <Link to={item.url} className={cn("flex items-center", collapsed ? "justify-center" : "gap-3")}>
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Other */}
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Others
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {otherItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    className={cn(
                      "rounded-lg transition-all",
                      isActive(item.url)
                        ? "bg-secondary text-foreground"
                        : "hover:bg-secondary"
                    )}
                  >
                    <Link to={item.url} className={cn("flex items-center", collapsed ? "justify-center" : "gap-3")}>
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
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
