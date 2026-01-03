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

// Menu Data
const menuGroups: MenuGroup[] = [
  {
    label: "People",
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
    label: "HR",
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
    label: "Support",
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

// Simple Menu Item Component
function SimpleMenuItem({
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

  if (collapsed) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton className={cn(isMenuActive && "bg-muted")}>
          <item.icon className="h-4 w-4" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className={cn(isMenuActive && "bg-muted font-medium")}>
            <item.icon className="h-4 w-4" />
            <span className="flex-1">{item.title}</span>
            <ChevronDown className={cn("h-4 w-4", isOpen && "rotate-180")} />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.subItems.map((sub) => (
              <SidebarMenuSubItem key={sub.url}>
                <SidebarMenuSubButton asChild className={cn(currentPath === sub.url && "bg-muted font-medium")}>
                  <Link to={sub.url}>
                    <sub.icon className="h-3.5 w-3.5" />
                    <span>{sub.title}</span>
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
    <Sidebar className={cn("border-r border-border bg-card", collapsed ? "w-16" : "w-60")} collapsible="icon">
      {/* Header */}
      <SidebarHeader className={cn("p-4 border-b border-border", collapsed && "p-2")}>
        <div className={cn("flex items-center gap-2", collapsed && "justify-center")}>
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Users className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && <span className="font-bold text-lg">NexHR</span>}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        {/* Dashboard */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={cn(currentPath === "/admin/dashboard" && "bg-primary text-primary-foreground")}>
                  <Link to="/admin/dashboard" className={cn("flex items-center gap-2", collapsed && "justify-center")}>
                    <LayoutDashboard className="h-4 w-4" />
                    {!collapsed && <span>Dashboard</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Menu Groups */}
        {menuGroups.map((group) => (
          <SidebarGroup key={group.label}>
            {!collapsed && (
              <SidebarGroupLabel className="text-xs text-muted-foreground uppercase">
                {group.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SimpleMenuItem key={item.title} item={item} collapsed={collapsed} currentPath={currentPath} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={cn(currentPath === "/admin/settings" && "bg-muted font-medium")}>
                  <Link to="/admin/settings" className={cn("flex items-center gap-2", collapsed && "justify-center")}>
                    <Settings className="h-4 w-4" />
                    {!collapsed && <span>Settings</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className={cn("p-3 border-t border-border", collapsed && "p-2")}>
        <SidebarMenuButton className={cn("w-full", collapsed && "justify-center")}>
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Logout</span>}
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
