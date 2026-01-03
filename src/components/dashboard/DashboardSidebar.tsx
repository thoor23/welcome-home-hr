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
  ChevronLeft,
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
  UserCheck as UserCheckIcon,
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
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
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
          { title: "Employment Types", url: "/admin/employees/types", icon: UserCheckIcon },
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

// Collapsible Menu Item
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

  // Icon-only mode with tooltip
  if (collapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <button
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200",
              isMenuActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className="flex flex-col gap-1 p-2">
          <span className="font-medium">{item.title}</span>
          <div className="flex flex-col gap-0.5">
            {item.subItems.map((sub) => (
              <Link
                key={sub.url}
                to={sub.url}
                className={cn(
                  "text-xs px-2 py-1 rounded hover:bg-muted transition-colors",
                  currentPath === sub.url && "bg-primary/10 text-primary font-medium"
                )}
              >
                {sub.title}
              </Link>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center w-full gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
          isMenuActive
            ? "bg-primary/10 text-primary font-medium"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <item.icon className="h-4 w-4 shrink-0" />
        <span className="flex-1 text-left">{item.title}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="ml-4 pl-3 border-l border-border space-y-0.5 py-1">
          {item.subItems.map((sub) => (
            <Link
              key={sub.url}
              to={sub.url}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-all duration-150",
                currentPath === sub.url
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <sub.icon className="h-3.5 w-3.5" />
              <span>{sub.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside
      className={cn(
        "h-screen bg-sidebar border-r border-border flex flex-col transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className={cn(
        "flex items-center h-16 px-4 border-b border-border shrink-0",
        collapsed && "justify-center px-2"
      )}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
            <Users className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="font-bold text-lg text-foreground tracking-tight">
              NexHR
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 py-4">
        <div className={cn("space-y-6", collapsed ? "px-2" : "px-3")}>
          {/* Dashboard Link */}
          <div>
            {collapsed ? (
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    to="/admin/dashboard"
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 mx-auto",
                      currentPath === "/admin/dashboard"
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <LayoutDashboard className="h-5 w-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Dashboard</TooltipContent>
              </Tooltip>
            ) : (
              <Link
                to="/admin/dashboard"
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  currentPath === "/admin/dashboard"
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            )}
          </div>

          {/* Menu Groups */}
          {menuGroups.map((group) => (
            <div key={group.label} className="space-y-1">
              {!collapsed && (
                <h3 className="px-3 text-[11px] font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2">
                  {group.label}
                </h3>
              )}
              <div className={cn("space-y-1", collapsed && "flex flex-col items-center")}>
                {group.items.map((item) => (
                  <CollapsibleMenuItem
                    key={item.title}
                    item={item}
                    collapsed={collapsed}
                    currentPath={currentPath}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Settings */}
          <div>
            {collapsed ? (
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    to="/admin/settings"
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 mx-auto",
                      currentPath === "/admin/settings"
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Settings className="h-5 w-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Settings</TooltipContent>
              </Tooltip>
            ) : (
              <Link
                to="/admin/settings"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                  currentPath === "/admin/settings"
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            )}
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className={cn(
        "border-t border-border p-3 shrink-0",
        collapsed && "flex flex-col items-center gap-2"
      )}>
        {/* Collapse Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "w-full justify-start gap-2 text-muted-foreground hover:text-foreground",
            collapsed && "w-10 h-10 p-0 justify-center"
          )}
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              collapsed && "rotate-180"
            )}
          />
          {!collapsed && <span className="text-sm">Collapse</span>}
        </Button>

        {/* Logout */}
        {collapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-10 h-10 p-0 text-muted-foreground hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Logout</TooltipContent>
          </Tooltip>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive mt-1"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-sm">Logout</span>
          </Button>
        )}
      </div>
    </aside>
  );
}
