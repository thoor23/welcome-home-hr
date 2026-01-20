import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Wallet,
  CalendarDays,
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
  UserCheck as UserCheckIcon,
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
  UserCog,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  requiredPermission?: string;
}

interface MenuItem {
  title: string;
  icon: LucideIcon;
  subItems: SubMenuItem[];
  requiredPermission?: string; // At least one permission needed to see menu
}

interface MenuGroup {
  label: string;
  items: MenuItem[];
}

// Menu Data with Permission Requirements
const menuGroups: MenuGroup[] = [
  {
    label: "Administration",
    items: [
      {
        title: "User Management",
        icon: UserCog,
        requiredPermission: "users.view",
        subItems: [
          { title: "All Users", url: "/app/users/all", icon: Users, requiredPermission: "users.view" },
          { title: "Roles", url: "/app/users/roles", icon: ShieldCheck, requiredPermission: "roles.view" },
          { title: "Permissions", url: "/app/users/permissions", icon: KeyRound, requiredPermission: "roles.view" },
        ],
      },
    ],
  },
  {
    label: "People",
    items: [
      {
        title: "Employees",
        icon: Users,
        requiredPermission: "employees.view",
        subItems: [
          { title: "All Employees", url: "/app/employees/all", icon: Users, requiredPermission: "employees.view" },
          { title: "Departments", url: "/app/employees/departments", icon: Building2, requiredPermission: "departments.view" },
          { title: "Designations", url: "/app/employees/designations", icon: Briefcase, requiredPermission: "designations.view" },
          { title: "Employment Types", url: "/app/employees/types", icon: UserCheckIcon, requiredPermission: "employment_types.view" },
          { title: "Locations", url: "/app/employees/locations", icon: MapPin, requiredPermission: "locations.view" },
          { title: "Regularization", url: "/app/employees/regularization", icon: FileCheck, requiredPermission: "employees.edit" },
        ],
      },
      {
        title: "Attendance",
        icon: CalendarCheck,
        subItems: [
          { title: "Overview", url: "/app/attendance/overview", icon: BarChart3, requiredPermission: "attendance.view_all" },
          { title: "All Attendance", url: "/app/attendance/all", icon: ListChecks, requiredPermission: "attendance.view_all" },
          { title: "My Attendance", url: "/app/attendance/my", icon: CalendarCheck, requiredPermission: "attendance.view_own" },
          { title: "Regularization", url: "/app/attendance/regularization", icon: FileCheck, requiredPermission: "attendance.regularize" },
          { title: "Rules", url: "/app/attendance/rules", icon: ScrollText, requiredPermission: "attendance.rules" },
        ],
      },
      {
        title: "Shifts",
        icon: Timer,
        subItems: [
          { title: "All Shifts", url: "/app/shifts/all", icon: Clock, requiredPermission: "shifts.view_all" },
          { title: "Assignments", url: "/app/shifts/assignments", icon: UserCheck2, requiredPermission: "shifts.manage" },
          { title: "Schedule", url: "/app/shifts/schedule", icon: CalendarClock, requiredPermission: "shifts.view_all" },
          { title: "My Schedule", url: "/app/shifts/my-schedule", icon: CalendarClock, requiredPermission: "shifts.view_own" },
          { title: "Swap Requests", url: "/app/shifts/swaps", icon: ArrowRightLeft, requiredPermission: "shifts.swap_request" },
        ],
      },
      {
        title: "Leave",
        icon: CalendarDays,
        subItems: [
          { title: "Overview", url: "/app/leave/overview", icon: BarChart3, requiredPermission: "leave.view_all" },
          { title: "All Leaves", url: "/app/leave/all", icon: CheckCircle, requiredPermission: "leave.view_all" },
          { title: "Requests", url: "/app/leave/requests", icon: ClipboardList, requiredPermission: "leave.approve" },
          { title: "My Leaves", url: "/app/leave/my-leaves", icon: CalendarDays, requiredPermission: "leave.view_own" },
          { title: "Apply Leave", url: "/app/leave/apply", icon: FilePlus, requiredPermission: "leave.apply" },
          { title: "Rules", url: "/app/leave/rules", icon: ScrollText, requiredPermission: "leave.manage_rules" },
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
          { title: "Employee Salaries", url: "/app/payroll/salaries", icon: Users, requiredPermission: "payroll.view" },
          { title: "Salary Structure", url: "/app/payroll/salary-structure", icon: FileSpreadsheet, requiredPermission: "payroll.manage" },
          { title: "Generate Payslip", url: "/app/payroll/generate", icon: Receipt, requiredPermission: "payroll.generate" },
          { title: "My Payslips", url: "/app/payroll/my-payslips", icon: Receipt, requiredPermission: "payslips.view_own" },
          { title: "Payslip Template", url: "/app/payroll/template", icon: LayoutTemplate, requiredPermission: "payroll.manage" },
        ],
      },
      {
        title: "Expenses",
        icon: CreditCard,
        subItems: [
          { title: "All Expenses", url: "/app/expenses/all", icon: CreditCard, requiredPermission: "expenses.view_all" },
          { title: "My Expenses", url: "/app/expenses/my", icon: CreditCard, requiredPermission: "expenses.view_own" },
          { title: "Submit Claim", url: "/app/expenses/submit", icon: FilePlus, requiredPermission: "expenses.submit" },
          { title: "Categories", url: "/app/expenses/categories", icon: Tags, requiredPermission: "expenses.manage" },
          { title: "Claims", url: "/app/expenses/claims", icon: ClipboardCheck, requiredPermission: "expenses.view_all" },
          { title: "Approvals", url: "/app/expenses/approvals", icon: FileCheckIcon, requiredPermission: "expenses.approve" },
        ],
      },
      {
        title: "Internal Billing",
        icon: Building,
        requiredPermission: "billing.view",
        subItems: [
          { title: "All Invoices", url: "/app/billing/invoices", icon: FileText, requiredPermission: "billing.view" },
          { title: "Generate Invoice", url: "/app/billing/generate-invoice", icon: FilePlus, requiredPermission: "billing.manage" },
          { title: "Invoice Template", url: "/app/billing/invoice-template", icon: LayoutTemplate, requiredPermission: "billing.manage" },
          { title: "Requests", url: "/app/billing/requests", icon: Receipt, requiredPermission: "billing.view" },
          { title: "Approvals", url: "/app/billing/approvals", icon: FileCheckIcon, requiredPermission: "billing.manage" },
          { title: "Allocations", url: "/app/billing/allocations", icon: Wallet, requiredPermission: "billing.manage" },
          { title: "Categories", url: "/app/billing/categories", icon: Tags, requiredPermission: "billing.manage" },
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
          { title: "All Assets", url: "/app/assets/all", icon: Package, requiredPermission: "assets.view_all" },
          { title: "My Assets", url: "/app/assets/my", icon: Package, requiredPermission: "assets.view_own" },
          { title: "Categories", url: "/app/assets/categories", icon: Layers, requiredPermission: "assets.manage" },
          { title: "Assignments", url: "/app/assets/assignments", icon: UserCheck2, requiredPermission: "assets.assign" },
          { title: "Maintenance", url: "/app/assets/maintenance", icon: Wrench, requiredPermission: "assets.manage" },
        ],
      },
      {
        title: "Events",
        icon: CalendarDays,
        subItems: [
          { title: "Calendar", url: "/app/events/calendar", icon: CalendarDays, requiredPermission: "events.view" },
          { title: "All Events", url: "/app/events/list", icon: CalendarCheck, requiredPermission: "events.manage" },
          { title: "Categories", url: "/app/events/categories", icon: Tags, requiredPermission: "events.manage" },
        ],
      },
      {
        title: "Documents",
        icon: FolderOpen,
        subItems: [
          { title: "All Documents", url: "/app/documents/all", icon: FolderOpen, requiredPermission: "documents.view_all" },
          { title: "My Documents", url: "/app/documents/my", icon: FileArchive, requiredPermission: "documents.view_own" },
          { title: "Categories", url: "/app/documents/categories", icon: Tags, requiredPermission: "documents.manage" },
          { title: "Settings", url: "/app/documents/settings", icon: FolderCog, requiredPermission: "documents.manage" },
        ],
      },
      {
        title: "Communications",
        icon: Mail,
        requiredPermission: "communications.view",
        subItems: [
          { title: "All Emails", url: "/app/communications/all", icon: Mail, requiredPermission: "communications.view" },
          { title: "Generate Letter", url: "/app/communications/generate", icon: FileSignature, requiredPermission: "communications.manage" },
          { title: "Email Templates", url: "/app/communications/email-templates", icon: FileText, requiredPermission: "communications.manage" },
          { title: "Letter Templates", url: "/app/communications/letter-templates", icon: FileSignature, requiredPermission: "communications.manage" },
          { title: "Configuration", url: "/app/communications/config", icon: Settings2, requiredPermission: "communications.manage" },
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
          { title: "All Tickets", url: "/app/support/all", icon: TicketCheck, requiredPermission: "support.view_all" },
          { title: "My Tickets", url: "/app/support/my-tickets", icon: Bookmark, requiredPermission: "support.view_own" },
          { title: "New Ticket", url: "/app/support/new", icon: FilePlus, requiredPermission: "support.create" },
          { title: "Categories", url: "/app/support/categories", icon: Tags, requiredPermission: "support.manage" },
          { title: "SLA Settings", url: "/app/support/sla", icon: Gauge, requiredPermission: "support.manage" },
          { title: "Knowledge Base", url: "/app/support/knowledge-base", icon: BookOpen, requiredPermission: "support.knowledge_base" },
        ],
      },
      {
        title: "Audit Logs",
        icon: History,
        requiredPermission: "audit.view",
        subItems: [
          { title: "All Logs", url: "/app/audit/all", icon: History, requiredPermission: "audit.view" },
          { title: "Activity Logs", url: "/app/audit/activity", icon: Activity, requiredPermission: "audit.activity" },
          { title: "Data Changes", url: "/app/audit/data", icon: Database, requiredPermission: "audit.view" },
          { title: "Security Logs", url: "/app/audit/security", icon: Shield, requiredPermission: "audit.security" },
          { title: "System Logs", url: "/app/audit/system", icon: Server, requiredPermission: "audit.view" },
          { title: "API Logs", url: "/app/audit/api", icon: Webhook, requiredPermission: "audit.view" },
          { title: "Settings", url: "/app/audit/settings", icon: Settings, requiredPermission: "audit.settings" },
        ],
      },
    ],
  },
];

// Collapsible Menu Item with Permission Filtering
function CollapsibleMenuItem({
  item,
  collapsed,
  currentPath,
}: {
  item: MenuItem;
  collapsed: boolean;
  currentPath: string;
}) {
  const { openMenus, toggleMenu } = useSidebarContext();
  const { hasPermission } = useAuth();
  
  // Filter sub-items based on permissions
  const visibleSubItems = item.subItems.filter(
    (sub) => !sub.requiredPermission || hasPermission(sub.requiredPermission)
  );
  
  const isMenuActive = visibleSubItems.some((sub) => currentPath === sub.url);
  const isOpen = openMenus.has(item.title) || isMenuActive;

  // Auto-open menu when its route is active - must be before any conditional returns
  useEffect(() => {
    if (isMenuActive && !openMenus.has(item.title)) {
      toggleMenu(item.title);
    }
  }, [isMenuActive, item.title, openMenus, toggleMenu]);
  
  // Don't render if no visible sub-items
  if (visibleSubItems.length === 0) {
    return null;
  }

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
            {visibleSubItems.map((sub) => (
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
        onClick={() => toggleMenu(item.title)}
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
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="ml-4 pl-3 border-l border-border space-y-0.5 py-1">
          {visibleSubItems.map((sub) => (
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

export function AppSidebar() {
  const { collapsed } = useSidebarContext();
  const { hasPermission } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  // Filter menu groups based on permissions
  const filteredMenuGroups = menuGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        // If item has required permission, check it
        if (item.requiredPermission && !hasPermission(item.requiredPermission)) {
          // Check if any sub-items are visible
          return item.subItems.some(
            (sub) => !sub.requiredPermission || hasPermission(sub.requiredPermission)
          );
        }
        // Otherwise, check if any sub-items are visible
        return item.subItems.some(
          (sub) => !sub.requiredPermission || hasPermission(sub.requiredPermission)
        );
      }),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <aside
      className={cn(
        "h-screen bg-sidebar border-r border-border flex flex-col transition-all duration-300 ease-in-out sticky top-0",
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
      <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        <div className={cn("space-y-6", collapsed ? "px-2" : "px-3")}>
          {/* Dashboard Link - Always visible */}
          <div>
            {collapsed ? (
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    to="/app/dashboard"
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 mx-auto",
                      currentPath === "/app/dashboard"
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
                to="/app/dashboard"
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  currentPath === "/app/dashboard"
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
          {filteredMenuGroups.map((group) => (
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

          {/* Settings - Check permission */}
          {hasPermission("settings.company") || hasPermission("settings.personal") ? (
            <div>
              {collapsed ? (
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      to="/app/settings"
                      className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 mx-auto",
                        currentPath.startsWith("/app/settings")
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
                  to="/app/settings"
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                    currentPath.startsWith("/app/settings")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
