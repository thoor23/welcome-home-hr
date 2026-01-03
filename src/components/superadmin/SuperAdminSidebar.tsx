import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSidebarContext } from "@/contexts/SidebarContext";
import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  ChevronDown,
  Shield,
  History,
  Server,
  Wrench,
  Clock,
  Ban,
  UserCog,
  Eye,
  Receipt,
  Wallet,
  Tag,
  PieChart,
  Activity,
  TrendingUp,
  ToggleLeft,
  Mail,
  AlertTriangle,
  FileText,
  Lock,
  Globe,
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
  subItems: SubMenuItem[];
}

interface MenuGroup {
  label: string;
  items: MenuItem[];
}

// Menu Data for Super Admin
const menuGroups: MenuGroup[] = [
  {
    label: "Management",
    items: [
      {
        title: "Organizations",
        icon: Building2,
        subItems: [
          { title: "All Organizations", url: "/superadmin/organizations/all", icon: Building2 },
          { title: "Pending Approval", url: "/superadmin/organizations/pending", icon: Clock },
          { title: "Suspended", url: "/superadmin/organizations/suspended", icon: Ban },
        ],
      },
      {
        title: "Users",
        icon: Users,
        subItems: [
          { title: "All Users", url: "/superadmin/users/all", icon: Users },
          { title: "Super Admins", url: "/superadmin/users/admins", icon: UserCog },
          { title: "Impersonation Logs", url: "/superadmin/users/impersonation", icon: Eye },
        ],
      },
    ],
  },
  {
    label: "Billing",
    items: [
      {
        title: "Subscriptions",
        icon: CreditCard,
        subItems: [
          { title: "Plans", url: "/superadmin/billing/plans", icon: CreditCard },
          { title: "Invoices", url: "/superadmin/billing/invoices", icon: Receipt },
          { title: "Payments", url: "/superadmin/billing/payments", icon: Wallet },
          { title: "Coupons", url: "/superadmin/billing/coupons", icon: Tag },
        ],
      },
    ],
  },
  {
    label: "Analytics",
    items: [
      {
        title: "Platform Analytics",
        icon: BarChart3,
        subItems: [
          { title: "Overview", url: "/superadmin/analytics/overview", icon: PieChart },
          { title: "Usage", url: "/superadmin/analytics/usage", icon: Activity },
          { title: "Growth", url: "/superadmin/analytics/growth", icon: TrendingUp },
        ],
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        title: "Configuration",
        icon: Wrench,
        subItems: [
          { title: "Feature Flags", url: "/superadmin/system/features", icon: ToggleLeft },
          { title: "Email Templates", url: "/superadmin/system/emails", icon: Mail },
          { title: "Maintenance", url: "/superadmin/system/maintenance", icon: AlertTriangle },
        ],
      },
      {
        title: "Security",
        icon: Shield,
        subItems: [
          { title: "Overview", url: "/superadmin/security/overview", icon: Shield },
          { title: "Login Attempts", url: "/superadmin/security/logins", icon: Lock },
          { title: "IP Blocklist", url: "/superadmin/security/blocklist", icon: Globe },
        ],
      },
      {
        title: "Audit Logs",
        icon: History,
        subItems: [
          { title: "All Logs", url: "/superadmin/logs/all", icon: History },
          { title: "System Logs", url: "/superadmin/logs/system", icon: Server },
          { title: "Security Logs", url: "/superadmin/logs/security", icon: Shield },
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
  const isMenuActive = item.subItems.some((sub) => currentPath === sub.url);
  const isOpen = openMenus.has(item.title) || isMenuActive;

  useEffect(() => {
    if (isMenuActive && !openMenus.has(item.title)) {
      toggleMenu(item.title);
    }
  }, [isMenuActive, item.title, openMenus, toggleMenu]);

  if (collapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <button
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200",
              isMenuActive
                ? "bg-superadmin/10 text-superadmin"
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
                  currentPath === sub.url && "bg-superadmin/10 text-superadmin font-medium"
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
            ? "bg-superadmin/10 text-superadmin font-medium"
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
                  ? "bg-superadmin text-superadmin-foreground font-medium"
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

export function SuperAdminSidebar() {
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
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-superadmin to-superadmin/70 flex items-center justify-center shadow-lg shadow-superadmin/20">
            <Shield className="w-5 h-5 text-superadmin-foreground" />
          </div>
          {!collapsed && (
            <span className="font-bold text-lg text-foreground tracking-tight">
              Super Admin
            </span>
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
                    to="/superadmin/dashboard"
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 mx-auto",
                      currentPath === "/superadmin/dashboard"
                        ? "bg-superadmin text-superadmin-foreground shadow-md shadow-superadmin/25"
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
                to="/superadmin/dashboard"
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  currentPath === "/superadmin/dashboard"
                    ? "bg-superadmin text-superadmin-foreground shadow-md shadow-superadmin/25"
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
          <div className="pt-2 border-t border-border">
            {collapsed ? (
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    to="/superadmin/settings"
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 mx-auto",
                      currentPath === "/superadmin/settings"
                        ? "bg-superadmin text-superadmin-foreground"
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
                to="/superadmin/settings"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                  currentPath === "/superadmin/settings"
                    ? "bg-superadmin text-superadmin-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
