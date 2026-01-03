import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSidebarContext } from "@/contexts/SidebarContext";
import {
  LayoutDashboard,
  User,
  CalendarCheck,
  CalendarDays,
  Wallet,
  Clock,
  FileText,
  Package,
  Headphones,
  ChevronDown,
  BarChart3,
  ClipboardList,
  History,
  Receipt,
  FileBarChart,
  Calendar,
  ArrowRightLeft,
  TicketCheck,
  BookOpen,
  Bell,
  LucideIcon,
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
}

interface MenuItem {
  title: string;
  icon: LucideIcon;
  url?: string;
  subItems?: SubMenuItem[];
}

interface MenuGroup {
  label: string;
  items: MenuItem[];
}

// ESS Menu Data
const menuGroups: MenuGroup[] = [
  {
    label: "My Work",
    items: [
      {
        title: "My Attendance",
        icon: CalendarCheck,
        subItems: [
          { title: "Today", url: "/ess/attendance/today", icon: Clock },
          { title: "History", url: "/ess/attendance/history", icon: History },
          { title: "Regularization", url: "/ess/attendance/regularization", icon: ClipboardList },
        ],
      },
      {
        title: "My Leaves",
        icon: CalendarDays,
        subItems: [
          { title: "Balance", url: "/ess/leaves/balance", icon: BarChart3 },
          { title: "Apply Leave", url: "/ess/leaves/apply", icon: ClipboardList },
          { title: "My Requests", url: "/ess/leaves/requests", icon: FileText },
          { title: "History", url: "/ess/leaves/history", icon: History },
        ],
      },
      {
        title: "My Shifts",
        icon: Clock,
        subItems: [
          { title: "Schedule", url: "/ess/shifts/schedule", icon: Calendar },
          { title: "Swap Requests", url: "/ess/shifts/swap", icon: ArrowRightLeft },
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
          { title: "Payslips", url: "/ess/payroll/payslips", icon: Receipt },
          { title: "Salary Details", url: "/ess/payroll/salary", icon: FileBarChart },
          { title: "Tax Documents", url: "/ess/payroll/tax", icon: FileText },
        ],
      },
      {
        title: "Expenses",
        icon: Receipt,
        subItems: [
          { title: "Submit Claim", url: "/ess/expenses/submit", icon: ClipboardList },
          { title: "My Claims", url: "/ess/expenses/claims", icon: FileText },
        ],
      },
    ],
  },
  {
    label: "Resources",
    items: [
      {
        title: "My Assets",
        icon: Package,
        url: "/ess/assets",
      },
      {
        title: "My Documents",
        icon: FileText,
        url: "/ess/documents",
      },
      {
        title: "Events",
        icon: Calendar,
        url: "/ess/events",
      },
    ],
  },
  {
    label: "Support",
    items: [
      {
        title: "Help Desk",
        icon: Headphones,
        subItems: [
          { title: "My Tickets", url: "/ess/support/tickets", icon: TicketCheck },
          { title: "New Ticket", url: "/ess/support/new", icon: ClipboardList },
          { title: "Knowledge Base", url: "/ess/support/kb", icon: BookOpen },
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
  const { openMenus, toggleMenu } = useSidebarContext();
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const isMenuActive = hasSubItems 
    ? item.subItems!.some((sub) => currentPath === sub.url)
    : currentPath === item.url;
  const isOpen = openMenus.has(item.title) || isMenuActive;

  useEffect(() => {
    if (isMenuActive && hasSubItems && !openMenus.has(item.title)) {
      toggleMenu(item.title);
    }
  }, [isMenuActive, item.title, openMenus, toggleMenu, hasSubItems]);

  // Simple link without sub-items
  if (!hasSubItems && item.url) {
    if (collapsed) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Link
              to={item.url}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200",
                isMenuActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">{item.title}</TooltipContent>
        </Tooltip>
      );
    }

    return (
      <Link
        to={item.url}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
          isMenuActive
            ? "bg-primary/10 text-primary font-medium"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <item.icon className="h-4 w-4 shrink-0" />
        <span>{item.title}</span>
      </Link>
    );
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
            {item.subItems!.map((sub) => (
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
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="ml-4 pl-3 border-l border-border space-y-0.5 py-1">
          {item.subItems!.map((sub) => (
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

export function ESSSidebar() {
  const { collapsed } = useSidebarContext();
  const location = useLocation();
  const currentPath = location.pathname;

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
            <User className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground tracking-tight">
                NexHR
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Self Service
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        <div className={cn("space-y-6", collapsed ? "px-2" : "px-3")}>
          {/* Dashboard Link */}
          <div>
            {collapsed ? (
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    to="/ess/dashboard"
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 mx-auto",
                      currentPath === "/ess/dashboard"
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
                to="/ess/dashboard"
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  currentPath === "/ess/dashboard"
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
        </div>
      </div>

    </aside>
  );
}
