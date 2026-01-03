import { Bell, Moon, Sun, Settings, User, PanelLeftClose, PanelLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTheme } from "next-themes";
import { Badge } from "@/components/ui/badge";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";

const notifications = [
  {
    id: 1,
    title: "New organization registration: TechCorp Inc.",
    time: "5 minutes ago",
    type: "org",
  },
  {
    id: 2,
    title: "Failed payment attempt for StartupXYZ",
    time: "1 hour ago",
    type: "billing",
  },
  {
    id: 3,
    title: "Security alert: Multiple failed logins detected",
    time: "2 hours ago",
    type: "security",
  },
];

export function SuperAdminHeader() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const { collapsed, toggleCollapsed } = useSidebarContext();

  return (
    <header className="h-16 flex-shrink-0 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6 sticky top-0 z-50">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        {/* Collapse Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapsed}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          {collapsed ? <PanelLeft className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
        </Button>
        
        {/* Breadcrumb Navigation */}
        <BreadcrumbNav type="superadmin" />
      </div>

      {/* Center - Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search organizations, users..."
            className="pl-10 bg-muted/50 border-0"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-foreground hover:bg-transparent"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-superadmin">
                3
              </Badge>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0 bg-card border-border">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="font-semibold text-foreground">Notifications</span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="max-h-80 overflow-y-auto scrollbar-hide">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-3 p-4 border-b border-border hover:bg-secondary/50 cursor-pointer">
                  <div className={`h-2 w-2 rounded-full mt-2 ${
                    notification.type === "security" ? "bg-destructive" :
                    notification.type === "billing" ? "bg-yellow-500" :
                    "bg-superadmin"
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{notification.title}</p>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-3 text-center border-t border-border">
              <span className="text-sm text-superadmin cursor-pointer hover:underline">View all notifications</span>
            </div>
          </PopoverContent>
        </Popover>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-transparent">
              <Avatar className="h-8 w-8 ring-2 ring-superadmin/30">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-superadmin text-superadmin-foreground text-sm">
                  SA
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-card border-border">
            <div className="flex items-center gap-3 p-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-superadmin text-superadmin-foreground">
                  SA
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">Super Admin</span>
                <span className="text-xs text-muted-foreground">admin@nexhr.com</span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/superadmin/settings")}>
              <User className="mr-2 h-4 w-4" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
