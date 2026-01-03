import { Bell, Moon, Sun, CreditCard, CheckSquare, Settings, MessageSquare, FileText, HelpCircle, Clock, ArrowRight, User, PanelLeftClose, PanelLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    title: "Invitation to join the team",
    badge: "Collaboration",
    badgeColor: "bg-primary",
    time: "Today, 10:14 PM",
    avatar: true,
    hasArrow: true,
  },
  {
    id: 2,
    title: "New message received from Alan Rickman",
    time: "Today, 7:51 AM",
    icon: MessageSquare,
    iconBg: "bg-primary",
  },
  {
    id: 3,
    title: "You have a follow up with Jampack Head on Friday, Dec 19 at 9:30 am",
    time: "Yesterday, 9:25 PM",
    icon: Clock,
    iconBg: "bg-pink-100 dark:bg-pink-900",
    iconColor: "text-pink-500",
  },
  {
    id: 4,
    title: "Application of Sarah Williams is waiting for your approval",
    time: "Today 10:14 PM",
    avatar: true,
  },
];

export function DashboardHeader() {
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
        <BreadcrumbNav type="admin" />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-foreground hover:bg-transparent hover:text-foreground active:bg-transparent active:text-foreground"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="text-foreground hover:bg-transparent hover:text-foreground active:bg-transparent active:text-foreground relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                4
              </Badge>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0 bg-card border-border">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="font-semibold text-foreground">Notifications</span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-transparent">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Notification List */}
            <div className="max-h-80 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-3 p-4 border-b border-border hover:bg-secondary/50 cursor-pointer">
                  {notification.avatar ? (
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {notification.id === 1 ? "TM" : "SW"}
                      </AvatarFallback>
                    </Avatar>
                  ) : notification.icon ? (
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${notification.iconBg}`}>
                      <notification.icon className={`h-5 w-5 ${notification.iconColor || "text-primary-foreground"}`} />
                    </div>
                  ) : null}
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-tight">{notification.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {notification.badge && (
                        <Badge className={`${notification.badgeColor} text-primary-foreground text-xs px-2 py-0.5`}>
                          {notification.badge}
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                  </div>
                  
                  {notification.hasArrow && (
                    <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                  )}
                </div>
              ))}
            </div>
            
            {/* Footer */}
            <div className="p-3 text-center border-t border-border">
              <span className="text-sm text-primary cursor-pointer hover:underline">View all notifications</span>
            </div>
          </PopoverContent>
        </Popover>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-transparent">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  JD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 bg-card border-border">
            {/* Profile Header */}
            <div className="flex items-center gap-3 p-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">John Doe</span>
                <span className="text-xs text-muted-foreground">john@company.com</span>
                <span className="text-xs text-primary cursor-pointer hover:underline">Sign Out</span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/admin/profile")}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Badge className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive">2</Badge>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">Manage Account</DropdownMenuLabel>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              Payment methods
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CheckSquare className="mr-2 h-4 w-4" />
              Subscriptions
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/admin/personal-settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <MessageSquare className="mr-2 h-4 w-4" />
              Raise a ticket
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <FileText className="mr-2 h-4 w-4" />
              Terms & Conditions
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              Help & Support
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
