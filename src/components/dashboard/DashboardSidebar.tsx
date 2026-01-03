import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Wallet,
  CalendarDays,
  UserPlus,
  FileText,
  Settings,
  Building2,
  Clock,
  ChevronDown,
  FileCheck,
  BarChart3,
  ListChecks,
  ScrollText,
  ClipboardList,
  CheckCircle,
  FileBarChart,
  Receipt,
  FileSpreadsheet,
  LayoutTemplate,
  Briefcase,
  UserCheck,
  FileUser,
  UserSearch,
  Calendar,
  FileCheck2,
  PieChart,
  MapPin,
  Package,
  Layers,
  UserCheck2,
  Wrench,
  CreditCard,
  Tags,
  ClipboardCheck,
  FileCheck as FileCheckIcon,
  FilePlus,
  Building,
  CalendarClock,
  ArrowRightLeft,
  Timer,
  UserPlus2,
  UserMinus,
  LogOut,
  Mail,
  FileSignature,
  Settings2,
  Headphones,
  TicketCheck,
  Bookmark,
  Gauge,
  BookOpen,
  FolderOpen,
  FileArchive,
  FolderCog,
  History,
  Activity,
  Database,
  Shield,
  Server,
  Webhook,
  HelpCircle,
  LucideIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Types
interface SubMenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

interface MenuItem {
  title: string;
  icon: LucideIcon;
  subItems: SubMenuItem[];
}

interface MenuGroup {
  label: string;
  items: MenuItem[];
}

// Menu Data - Organized by logical groups
const menuGroups: MenuGroup[] = [
  {
    label: "People Management",
    items: [
      {
        title: "Employees",
        icon: Users,
        subItems: [
          { title: "All Employees", url: "/admin/employees/all", icon: Users },
          { title: "Departments", url: "/admin/employees/departments", icon: Building2 },
          { title: "Designations", url: "/admin/employees/designations", icon: Briefcase },
          { title: "Employment Types", url: "/admin/employees/types", icon: UserCheck },
          { title: "Locations", url: "/admin/employees/locations", icon: MapPin },
          { title: "Regularization", url: "/admin/employees/regularization", icon: FileCheck },
        ],
      },
      {
        title: "Attendance",
        icon: CalendarCheck,
        subItems: [
          { title: "Overview", url: "/admin/attendance/overview", icon: BarChart3 },
          { title: "All Attendance", url: "/admin/attendance/all", icon: ListChecks },
          { title: "Regularization", url: "/admin/attendance/regularization", icon: FileCheck },
          { title: "Rules", url: "/admin/attendance/rules", icon: ScrollText },
        ],
      },
      {
        title: "Shifts",
        icon: Timer,
        subItems: [
          { title: "All Shifts", url: "/admin/shifts/all", icon: Clock },
          { title: "Assignments", url: "/admin/shifts/assignments", icon: UserCheck2 },
          { title: "Schedule", url: "/admin/shifts/schedule", icon: CalendarClock },
          { title: "Swap Requests", url: "/admin/shifts/swaps", icon: ArrowRightLeft },
          { title: "Report", url: "/admin/shifts/report", icon: BarChart3 },
        ],
      },
      {
        title: "Leave",
        icon: CalendarDays,
        subItems: [
          { title: "Overview", url: "/admin/leave/overview", icon: BarChart3 },
          { title: "All Leaves", url: "/admin/leave/all", icon: CheckCircle },
          { title: "Requests", url: "/admin/leave/requests", icon: ClipboardList },
          { title: "Rules", url: "/admin/leave/rules", icon: ScrollText },
          { title: "Report", url: "/admin/leave/report", icon: FileBarChart },
        ],
      },
    ],
  },
  {
    label: "HR Operations",
    items: [
      {
        title: "Recruitment",
        icon: UserPlus,
        subItems: [
          { title: "Job Postings", url: "/admin/recruitment/jobs", icon: Briefcase },
          { title: "Applications", url: "/admin/recruitment/applications", icon: FileUser },
          { title: "Candidates", url: "/admin/recruitment/candidates", icon: UserSearch },
          { title: "Interviews", url: "/admin/recruitment/interviews", icon: Calendar },
          { title: "Offers", url: "/admin/recruitment/offers", icon: FileCheck2 },
          { title: "Report", url: "/admin/recruitment/report", icon: PieChart },
        ],
      },
      {
        title: "Onboarding",
        icon: UserPlus2,
        subItems: [
          { title: "Overview", url: "/admin/onboarding/overview", icon: BarChart3 },
          { title: "New Hire", url: "/admin/onboarding/new", icon: UserPlus2 },
          { title: "Tasks", url: "/admin/onboarding/tasks", icon: ClipboardList },
          { title: "Report", url: "/admin/onboarding/report", icon: PieChart },
        ],
      },
      {
        title: "Offboarding",
        icon: UserMinus,
        subItems: [
          { title: "Overview", url: "/admin/offboarding/overview", icon: BarChart3 },
          { title: "Exit Clearance", url: "/admin/offboarding/clearance", icon: LogOut },
          { title: "Tasks", url: "/admin/offboarding/tasks", icon: ClipboardList },
          { title: "Report", url: "/admin/offboarding/report", icon: PieChart },
        ],
      },
    ],
  },
  {
    label: "Finance",
    items: [
      {
        title: "Payroll",
        icon: Wallet,
        subItems: [
          { title: "Employee Salaries", url: "/admin/payroll/salaries", icon: Users },
          { title: "Salary Structure", url: "/admin/payroll/salary-structure", icon: FileSpreadsheet },
          { title: "Generate Payslip", url: "/admin/payroll/generate", icon: Receipt },
          { title: "Payslip Template", url: "/admin/payroll/template", icon: LayoutTemplate },
          { title: "Report", url: "/admin/payroll/report", icon: FileBarChart },
        ],
      },
      {
        title: "Expenses",
        icon: CreditCard,
        subItems: [
          { title: "All Expenses", url: "/admin/expenses/all", icon: CreditCard },
          { title: "Categories", url: "/admin/expenses/categories", icon: Tags },
          { title: "Claims", url: "/admin/expenses/claims", icon: ClipboardCheck },
          { title: "Approvals", url: "/admin/expenses/approvals", icon: FileCheckIcon },
          { title: "Report", url: "/admin/expenses/report", icon: BarChart3 },
        ],
      },
      {
        title: "Internal Billing",
        icon: Building,
        subItems: [
          { title: "All Invoices", url: "/admin/billing/invoices", icon: FileText },
          { title: "Generate Invoice", url: "/admin/billing/generate-invoice", icon: FilePlus },
          { title: "Invoice Template", url: "/admin/billing/invoice-template", icon: LayoutTemplate },
          { title: "Requests", url: "/admin/billing/requests", icon: Receipt },
          { title: "Approvals", url: "/admin/billing/approvals", icon: FileCheckIcon },
          { title: "Allocations", url: "/admin/billing/allocations", icon: Wallet },
          { title: "Categories", url: "/admin/billing/categories", icon: Tags },
          { title: "Report", url: "/admin/billing/report", icon: PieChart },
        ],
      },
    ],
  },
  {
    label: "Organization",
    items: [
      {
        title: "Assets",
        icon: Package,
        subItems: [
          { title: "All Assets", url: "/admin/assets/all", icon: Package },
          { title: "Categories", url: "/admin/assets/categories", icon: Layers },
          { title: "Assignments", url: "/admin/assets/assignments", icon: UserCheck2 },
          { title: "Maintenance", url: "/admin/assets/maintenance", icon: Wrench },
          { title: "Report", url: "/admin/assets/report", icon: BarChart3 },
        ],
      },
      {
        title: "Events",
        icon: CalendarDays,
        subItems: [
          { title: "Calendar", url: "/admin/events/calendar", icon: CalendarDays },
          { title: "All Events", url: "/admin/events/list", icon: CalendarCheck },
          { title: "Categories", url: "/admin/events/categories", icon: Tags },
          { title: "Report", url: "/admin/events/report", icon: PieChart },
        ],
      },
      {
        title: "Documents",
        icon: FolderOpen,
        subItems: [
          { title: "All Documents", url: "/admin/documents/all", icon: FolderOpen },
          { title: "My Documents", url: "/admin/documents/my", icon: FileArchive },
          { title: "Categories", url: "/admin/documents/categories", icon: Tags },
          { title: "Settings", url: "/admin/documents/settings", icon: FolderCog },
          { title: "Report", url: "/admin/documents/report", icon: PieChart },
        ],
      },
      {
        title: "Communications",
        icon: Mail,
        subItems: [
          { title: "All Emails", url: "/admin/communications/all", icon: Mail },
          { title: "Generate Letter", url: "/admin/communications/generate", icon: FileSignature },
          { title: "Email Templates", url: "/admin/communications/email-templates", icon: FileText },
          { title: "Letter Templates", url: "/admin/communications/letter-templates", icon: FileSignature },
          { title: "Configuration", url: "/admin/communications/config", icon: Settings2 },
          { title: "Report", url: "/admin/communications/report", icon: PieChart },
        ],
      },
    ],
  },
  {
    label: "Support & Admin",
    items: [
      {
        title: "Support",
        icon: Headphones,
        subItems: [
          { title: "All Tickets", url: "/admin/support/all", icon: TicketCheck },
          { title: "My Tickets", url: "/admin/support/my-tickets", icon: Bookmark },
          { title: "Categories", url: "/admin/support/categories", icon: Tags },
          { title: "SLA Settings", url: "/admin/support/sla", icon: Gauge },
          { title: "Knowledge Base", url: "/admin/support/knowledge-base", icon: BookOpen },
          { title: "Report", url: "/admin/support/report", icon: PieChart },
        ],
      },
      {
        title: "Audit Logs",
        icon: History,
        subItems: [
          { title: "All Logs", url: "/admin/audit/all", icon: History },
          { title: "Activity Logs", url: "/admin/audit/activity", icon: Activity },
          { title: "Data Changes", url: "/admin/audit/data", icon: Database },
          { title: "Security Logs", url: "/admin/audit/security", icon: Shield },
          { title: "System Logs", url: "/admin/audit/system", icon: Server },
          { title: "API Logs", url: "/admin/audit/api", icon: Webhook },
          { title: "Settings", url: "/admin/audit/settings", icon: Settings },
        ],
      },
    ],
  },
];

// Collapsible Menu Item Component
function CollapsibleMenuItem({
  item,
  collapsed,
  currentPath,
}: {
  item: MenuItem;
  collapsed: boolean;
  currentPath: string;
}) {
  const isMenuActive = item.subItems.some((sub) => currentPath === sub.url);
  const [isOpen, setIsOpen] = useState(isMenuActive);

  const menuButton = (
    <SidebarMenuButton
      isActive={isMenuActive}
      className={cn(
        "rounded-lg transition-all duration-200 w-full group/menu-btn",
        isMenuActive
          ? "bg-primary/10 text-primary border-l-2 border-primary"
          : "hover:bg-muted/50 border-l-2 border-transparent"
      )}
    >
      <div className={cn("flex items-center w-full", collapsed ? "justify-center" : "gap-3")}>
        <item.icon className={cn("h-4 w-4 flex-shrink-0", isMenuActive && "text-primary")} />
        {!collapsed && (
          <>
            <span className="flex-1 truncate text-sm font-medium">{item.title}</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 flex-shrink-0 transition-transform duration-200 text-muted-foreground",
                isOpen && "rotate-180"
              )}
            />
          </>
        )}
      </div>
    </SidebarMenuButton>
  );

  if (collapsed) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarMenuItem>{menuButton}</SidebarMenuItem>
          </TooltipTrigger>
          <TooltipContent side="right" className="flex flex-col gap-1 p-2">
            <span className="font-semibold">{item.title}</span>
            <Separator className="my-1" />
            {item.subItems.map((sub) => (
              <Link
                key={sub.url}
                to={sub.url}
                className={cn(
                  "text-xs py-1 px-2 rounded hover:bg-muted/50 transition-colors",
                  currentPath === sub.url && "bg-primary/10 text-primary"
                )}
              >
                {sub.title}
              </Link>
            ))}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>{menuButton}</CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="ml-4 border-l border-border/50 pl-2 mt-1">
            {item.subItems.map((sub) => (
              <SidebarMenuSubItem key={sub.url}>
                <SidebarMenuSubButton
                  asChild
                  isActive={currentPath === sub.url}
                  className={cn(
                    "rounded-md transition-all duration-200",
                    currentPath === sub.url
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Link to={sub.url} className="flex items-center gap-2">
                    <sub.icon className="h-3.5 w-3.5" />
                    <span className="text-sm">{sub.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Sidebar
      className={cn(
        "border-r border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
      collapsible="icon"
    >
      {/* Logo - Static Header */}
      <SidebarHeader className={cn("py-4 border-b border-border/50", collapsed ? "px-2" : "px-4")}>
        <div className={cn("flex items-center gap-3", collapsed ? "justify-center" : "")}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0 shadow-md shadow-primary/20">
            <Users className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg text-foreground leading-tight">NexHR</span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wide">HR Management</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className={cn("py-3", collapsed ? "px-1" : "px-2")}>
        {/* Dashboard - Main */}
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="px-3 text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest mb-1">
              Main
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        asChild
                        isActive={currentPath === "/admin/dashboard"}
                        className={cn(
                          "rounded-lg transition-all duration-200",
                          currentPath === "/admin/dashboard"
                            ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 hover:bg-primary/90"
                            : "hover:bg-muted/50"
                        )}
                      >
                        <Link to="/admin/dashboard" className={cn("flex items-center", collapsed ? "justify-center" : "gap-3")}>
                          <LayoutDashboard className="h-4 w-4 flex-shrink-0" />
                          {!collapsed && <span className="font-medium">Dashboard</span>}
                        </Link>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right">Dashboard</TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Menu Groups */}
        {menuGroups.map((group, groupIndex) => (
          <SidebarGroup key={group.label} className={groupIndex > 0 ? "mt-2" : ""}>
            {!collapsed && (
              <SidebarGroupLabel className="px-3 text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest mb-1">
                {group.label}
              </SidebarGroupLabel>
            )}
            {collapsed && groupIndex > 0 && (
              <div className="mx-2 my-2">
                <Separator className="bg-border/30" />
              </div>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="space-y-0.5">
                {group.items.map((item) => (
                  <CollapsibleMenuItem
                    key={item.title}
                    item={item}
                    collapsed={collapsed}
                    currentPath={currentPath}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {/* Settings */}
        <SidebarGroup className="mt-2">
          {!collapsed && (
            <SidebarGroupLabel className="px-3 text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest mb-1">
              System
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        asChild
                        isActive={currentPath === "/admin/settings"}
                        className={cn(
                          "rounded-lg transition-all duration-200",
                          currentPath === "/admin/settings"
                            ? "bg-primary/10 text-primary border-l-2 border-primary"
                            : "hover:bg-muted/50 border-l-2 border-transparent"
                        )}
                      >
                        <Link to="/admin/settings" className={cn("flex items-center", collapsed ? "justify-center" : "gap-3")}>
                          <Settings className="h-4 w-4 flex-shrink-0" />
                          {!collapsed && <span className="text-sm font-medium">Settings</span>}
                        </Link>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right">Settings</TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer - Static */}
      <SidebarFooter className={cn("py-3 border-t border-border/50", collapsed ? "px-2" : "px-3")}>
        <div className={cn("flex items-center gap-3", collapsed ? "justify-center" : "")}>
          <Avatar className="h-8 w-8 border-2 border-primary/20">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">AD</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Admin User</p>
              <p className="text-xs text-muted-foreground truncate">admin@nexhr.com</p>
            </div>
          )}
          {!collapsed && (
            <div className="flex gap-1">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="p-1.5 rounded-md hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground">
                      <HelpCircle className="h-4 w-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Help</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                      <LogOut className="h-4 w-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Logout</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
