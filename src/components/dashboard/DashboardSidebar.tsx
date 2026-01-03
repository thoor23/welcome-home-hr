import { useState } from "react";
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
  HardDrive,
  History,
  Activity,
  Database,
  Shield,
  Server,
  Webhook,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
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

const mainMenuItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
];

const employeeSubItems = [
  { title: "All Employees", url: "/admin/employees/all", icon: Users },
  { title: "Departments", url: "/admin/employees/departments", icon: Building2 },
  { title: "Designations", url: "/admin/employees/designations", icon: Briefcase },
  { title: "Employment Types", url: "/admin/employees/types", icon: UserCheck },
  { title: "Locations", url: "/admin/employees/locations", icon: MapPin },
  { title: "Regularization", url: "/admin/employees/regularization", icon: FileCheck },
];

const attendanceSubItems = [
  { title: "Overview", url: "/admin/attendance/overview", icon: BarChart3 },
  { title: "All Attendance", url: "/admin/attendance/all", icon: ListChecks },
  { title: "Regularization", url: "/admin/attendance/regularization", icon: FileCheck },
  { title: "Rules", url: "/admin/attendance/rules", icon: ScrollText },
];

const leaveSubItems = [
  { title: "Overview", url: "/admin/leave/overview", icon: BarChart3 },
  { title: "All Leaves", url: "/admin/leave/all", icon: CheckCircle },
  { title: "Requests", url: "/admin/leave/requests", icon: ClipboardList },
  { title: "Rules", url: "/admin/leave/rules", icon: ScrollText },
  { title: "Report", url: "/admin/leave/report", icon: FileBarChart },
];

const payrollSubItems = [
  { title: "Employee Salaries", url: "/admin/payroll/salaries", icon: Users },
  { title: "Salary Structure", url: "/admin/payroll/salary-structure", icon: FileSpreadsheet },
  { title: "Generate Payslip", url: "/admin/payroll/generate", icon: Receipt },
  { title: "Payslip Template", url: "/admin/payroll/template", icon: LayoutTemplate },
  { title: "Report", url: "/admin/payroll/report", icon: FileBarChart },
];

const recruitmentSubItems = [
  { title: "Job Postings", url: "/admin/recruitment/jobs", icon: Briefcase },
  { title: "Applications", url: "/admin/recruitment/applications", icon: FileUser },
  { title: "Candidates", url: "/admin/recruitment/candidates", icon: UserSearch },
  { title: "Interviews", url: "/admin/recruitment/interviews", icon: Calendar },
  { title: "Offers", url: "/admin/recruitment/offers", icon: FileCheck2 },
  { title: "Report", url: "/admin/recruitment/report", icon: PieChart },
];

const assetSubItems = [
  { title: "All Assets", url: "/admin/assets/all", icon: Package },
  { title: "Categories", url: "/admin/assets/categories", icon: Layers },
  { title: "Assignments", url: "/admin/assets/assignments", icon: UserCheck2 },
  { title: "Maintenance", url: "/admin/assets/maintenance", icon: Wrench },
  { title: "Report", url: "/admin/assets/report", icon: BarChart3 },
];

const expenseSubItems = [
  { title: "All Expenses", url: "/admin/expenses/all", icon: CreditCard },
  { title: "Categories", url: "/admin/expenses/categories", icon: Tags },
  { title: "Claims", url: "/admin/expenses/claims", icon: ClipboardCheck },
  { title: "Approvals", url: "/admin/expenses/approvals", icon: FileCheckIcon },
  { title: "Report", url: "/admin/expenses/report", icon: BarChart3 },
];

const billingSubItems = [
  { title: "All Invoices", url: "/admin/billing/invoices", icon: FileText },
  { title: "Generate Invoice", url: "/admin/billing/generate-invoice", icon: FilePlus },
  { title: "Invoice Template", url: "/admin/billing/invoice-template", icon: LayoutTemplate },
  { title: "Requests", url: "/admin/billing/requests", icon: Receipt },
  { title: "Approvals", url: "/admin/billing/approvals", icon: FileCheckIcon },
  { title: "Allocations", url: "/admin/billing/allocations", icon: Wallet },
  { title: "Categories", url: "/admin/billing/categories", icon: Tags },
  { title: "Report", url: "/admin/billing/report", icon: PieChart },
];

const shiftSubItems = [
  { title: "All Shifts", url: "/admin/shifts/all", icon: Clock },
  { title: "Assignments", url: "/admin/shifts/assignments", icon: UserCheck2 },
  { title: "Schedule", url: "/admin/shifts/schedule", icon: CalendarClock },
  { title: "Swap Requests", url: "/admin/shifts/swaps", icon: ArrowRightLeft },
  { title: "Report", url: "/admin/shifts/report", icon: BarChart3 },
];

const onboardingSubItems = [
  { title: "Overview", url: "/admin/onboarding/overview", icon: BarChart3 },
  { title: "New Hire", url: "/admin/onboarding/new", icon: UserPlus2 },
  { title: "Tasks", url: "/admin/onboarding/tasks", icon: ClipboardList },
  { title: "Report", url: "/admin/onboarding/report", icon: PieChart },
];

const offboardingSubItems = [
  { title: "Overview", url: "/admin/offboarding/overview", icon: BarChart3 },
  { title: "Exit Clearance", url: "/admin/offboarding/clearance", icon: LogOut },
  { title: "Tasks", url: "/admin/offboarding/tasks", icon: ClipboardList },
  { title: "Report", url: "/admin/offboarding/report", icon: PieChart },
];

const communicationsSubItems = [
  { title: "All Emails", url: "/admin/communications/all", icon: Mail },
  { title: "Generate Letter", url: "/admin/communications/generate", icon: FileSignature },
  { title: "Email Templates", url: "/admin/communications/email-templates", icon: FileText },
  { title: "Letter Templates", url: "/admin/communications/letter-templates", icon: FileSignature },
  { title: "Configuration", url: "/admin/communications/config", icon: Settings2 },
  { title: "Report", url: "/admin/communications/report", icon: PieChart },
];

const eventsSubItems = [
  { title: "Calendar", url: "/admin/events/calendar", icon: CalendarDays },
  { title: "All Events", url: "/admin/events/list", icon: CalendarCheck },
  { title: "Categories", url: "/admin/events/categories", icon: Tags },
  { title: "Report", url: "/admin/events/report", icon: PieChart },
];

const supportSubItems = [
  { title: "All Tickets", url: "/admin/support/all", icon: TicketCheck },
  { title: "My Tickets", url: "/admin/support/my-tickets", icon: Bookmark },
  { title: "Categories", url: "/admin/support/categories", icon: Tags },
  { title: "SLA Settings", url: "/admin/support/sla", icon: Gauge },
  { title: "Knowledge Base", url: "/admin/support/knowledge-base", icon: BookOpen },
  { title: "Report", url: "/admin/support/report", icon: PieChart },
];

const documentsSubItems = [
  { title: "All Documents", url: "/admin/documents/all", icon: FolderOpen },
  { title: "My Documents", url: "/admin/documents/my", icon: FileArchive },
  { title: "Categories", url: "/admin/documents/categories", icon: Tags },
  { title: "Settings", url: "/admin/documents/settings", icon: FolderCog },
  { title: "Report", url: "/admin/documents/report", icon: PieChart },
];

const auditSubItems = [
  { title: "All Logs", url: "/admin/audit/all", icon: History },
  { title: "Activity Logs", url: "/admin/audit/activity", icon: Activity },
  { title: "Data Changes", url: "/admin/audit/data", icon: Database },
  { title: "Security Logs", url: "/admin/audit/security", icon: Shield },
  { title: "System Logs", url: "/admin/audit/system", icon: Server },
  { title: "API Logs", url: "/admin/audit/api", icon: Webhook },
  { title: "Settings", url: "/admin/audit/settings", icon: Settings },
];

const otherItems = [
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isEmployeeMenuActive = employeeSubItems.some((item) => currentPath === item.url);
  const isAttendanceMenuActive = attendanceSubItems.some((item) => currentPath === item.url);
  const isLeaveMenuActive = leaveSubItems.some((item) => currentPath === item.url);
  const isPayrollMenuActive = payrollSubItems.some((item) => currentPath === item.url);
  const isRecruitmentMenuActive = recruitmentSubItems.some((item) => currentPath === item.url);
  const isAssetMenuActive = assetSubItems.some((item) => currentPath === item.url);
  const isExpenseMenuActive = expenseSubItems.some((item) => currentPath === item.url);
  const isBillingMenuActive = billingSubItems.some((item) => currentPath === item.url);
  const isShiftMenuActive = shiftSubItems.some((item) => currentPath === item.url);
  const isOnboardingMenuActive = onboardingSubItems.some((item) => currentPath === item.url);
  const isOffboardingMenuActive = offboardingSubItems.some((item) => currentPath === item.url);
  const isCommunicationsMenuActive = communicationsSubItems.some((item) => currentPath === item.url);
  const isEventsMenuActive = eventsSubItems.some((item) => currentPath === item.url);
  const isSupportMenuActive = supportSubItems.some((item) => currentPath === item.url);
  const isDocumentsMenuActive = documentsSubItems.some((item) => currentPath === item.url);
  const isAuditMenuActive = auditSubItems.some((item) => currentPath === item.url);

  const [employeeMenuOpen, setEmployeeMenuOpen] = useState(isEmployeeMenuActive);
  const [attendanceMenuOpen, setAttendanceMenuOpen] = useState(isAttendanceMenuActive);
  const [leaveMenuOpen, setLeaveMenuOpen] = useState(isLeaveMenuActive);
  const [payrollMenuOpen, setPayrollMenuOpen] = useState(isPayrollMenuActive);
  const [recruitmentMenuOpen, setRecruitmentMenuOpen] = useState(isRecruitmentMenuActive);
  const [assetMenuOpen, setAssetMenuOpen] = useState(isAssetMenuActive);
  const [expenseMenuOpen, setExpenseMenuOpen] = useState(isExpenseMenuActive);
  const [billingMenuOpen, setBillingMenuOpen] = useState(isBillingMenuActive);
  const [shiftMenuOpen, setShiftMenuOpen] = useState(isShiftMenuActive);
  const [onboardingMenuOpen, setOnboardingMenuOpen] = useState(isOnboardingMenuActive);
  const [offboardingMenuOpen, setOffboardingMenuOpen] = useState(isOffboardingMenuActive);
  const [communicationsMenuOpen, setCommunicationsMenuOpen] = useState(isCommunicationsMenuActive);
  const [eventsMenuOpen, setEventsMenuOpen] = useState(isEventsMenuActive);
  const [supportMenuOpen, setSupportMenuOpen] = useState(isSupportMenuActive);
  const [documentsMenuOpen, setDocumentsMenuOpen] = useState(isDocumentsMenuActive);
  const [auditMenuOpen, setAuditMenuOpen] = useState(isAuditMenuActive);

  return (
    <Sidebar
      className={cn(
        "border-r border-border bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
      collapsible="icon"
    >
      {/* Logo - Static Header */}
      <SidebarHeader className={cn("py-4 border-b border-border", collapsed ? "px-1" : "px-2")}>
        <div className={cn("flex items-center gap-2", collapsed ? "justify-center px-0" : "px-2")}>
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <Users className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="font-display font-bold text-lg text-foreground">NexHR</span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className={cn("py-4", collapsed ? "px-1" : "px-2")}>
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
              {/* Employee Management with Submenu */}
              <Collapsible
                open={employeeMenuOpen}
                onOpenChange={setEmployeeMenuOpen}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={isEmployeeMenuActive}
                      className={cn(
                        "rounded-lg transition-all w-full",
                        isEmployeeMenuActive
                          ? "bg-secondary text-foreground"
                          : "hover:bg-secondary"
                      )}
                    >
                      <div className={cn("flex items-center w-full", collapsed ? "justify-center" : "gap-3")}>
                        <Users className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1 truncate">Employees</span>
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 flex-shrink-0 transition-transform duration-200",
                                employeeMenuOpen && "rotate-180"
                              )}
                            />
                          </>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {!collapsed && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {employeeSubItems.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive(item.url)}
                            >
                              <Link to={item.url} className="flex items-center gap-2">
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>

              {/* Attendance Management with Submenu */}
              <Collapsible
                open={attendanceMenuOpen}
                onOpenChange={setAttendanceMenuOpen}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={isAttendanceMenuActive}
                      className={cn(
                        "rounded-lg transition-all w-full",
                        isAttendanceMenuActive
                          ? "bg-secondary text-foreground"
                          : "hover:bg-secondary"
                      )}
                    >
                      <div className={cn("flex items-center w-full", collapsed ? "justify-center" : "gap-3")}>
                        <CalendarCheck className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1 truncate">Attendance</span>
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 flex-shrink-0 transition-transform duration-200",
                                attendanceMenuOpen && "rotate-180"
                              )}
                            />
                          </>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {!collapsed && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {attendanceSubItems.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive(item.url)}
                            >
                              <Link to={item.url} className="flex items-center gap-2">
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>

              {/* Shift Management with Submenu */}
              <Collapsible
                open={shiftMenuOpen}
                onOpenChange={setShiftMenuOpen}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={isShiftMenuActive}
                      className={cn(
                        "rounded-lg transition-all w-full",
                        isShiftMenuActive
                          ? "bg-secondary text-foreground"
                          : "hover:bg-secondary"
                      )}
                    >
                      <div className={cn("flex items-center w-full", collapsed ? "justify-center" : "gap-3")}>
                        <Timer className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1 truncate">Shifts</span>
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 flex-shrink-0 transition-transform duration-200",
                                shiftMenuOpen && "rotate-180"
                              )}
                            />
                          </>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {!collapsed && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {shiftSubItems.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive(item.url)}
                            >
                              <Link to={item.url} className="flex items-center gap-2">
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>

              {/* Leave Management with Submenu */}
              <Collapsible
                open={leaveMenuOpen}
                onOpenChange={setLeaveMenuOpen}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={isLeaveMenuActive}
                      className={cn(
                        "rounded-lg transition-all w-full",
                        isLeaveMenuActive
                          ? "bg-secondary text-foreground"
                          : "hover:bg-secondary"
                      )}
                    >
                      <div className={cn("flex items-center w-full", collapsed ? "justify-center" : "gap-3")}>
                        <CalendarDays className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1 truncate">Leave</span>
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 flex-shrink-0 transition-transform duration-200",
                                leaveMenuOpen && "rotate-180"
                              )}
                            />
                          </>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {!collapsed && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {leaveSubItems.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive(item.url)}
                            >
                              <Link to={item.url} className="flex items-center gap-2">
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>

              {/* Payroll Management with Submenu */}
              <Collapsible
                open={payrollMenuOpen}
                onOpenChange={setPayrollMenuOpen}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={isPayrollMenuActive}
                      className={cn(
                        "rounded-lg transition-all w-full",
                        isPayrollMenuActive
                          ? "bg-secondary text-foreground"
                          : "hover:bg-secondary"
                      )}
                    >
                      <div className={cn("flex items-center w-full", collapsed ? "justify-center" : "gap-3")}>
                        <Wallet className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1 truncate">Payroll</span>
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 flex-shrink-0 transition-transform duration-200",
                                payrollMenuOpen && "rotate-180"
                              )}
                            />
                          </>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {!collapsed && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {payrollSubItems.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive(item.url)}
                            >
                              <Link to={item.url} className="flex items-center gap-2">
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>

              {/* Recruitment Management with Submenu */}
              <Collapsible
                open={recruitmentMenuOpen}
                onOpenChange={setRecruitmentMenuOpen}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={isRecruitmentMenuActive}
                      className={cn(
                        "rounded-lg transition-all w-full",
                        isRecruitmentMenuActive
                          ? "bg-secondary text-foreground"
                          : "hover:bg-secondary"
                      )}
                    >
                      <div className={cn("flex items-center w-full", collapsed ? "justify-center" : "gap-3")}>
                        <UserPlus className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1 truncate">Recruitment</span>
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 flex-shrink-0 transition-transform duration-200",
                                recruitmentMenuOpen && "rotate-180"
                              )}
                            />
                          </>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {!collapsed && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {recruitmentSubItems.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive(item.url)}
                            >
                              <Link to={item.url} className="flex items-center gap-2">
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>

              {/* Asset Management with Submenu */}
              <Collapsible
                open={assetMenuOpen}
                onOpenChange={setAssetMenuOpen}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={isAssetMenuActive}
                      className={cn(
                        "rounded-lg transition-all w-full",
                        isAssetMenuActive
                          ? "bg-secondary text-foreground"
                          : "hover:bg-secondary"
                      )}
                    >
                      <div className={cn("flex items-center w-full", collapsed ? "justify-center" : "gap-3")}>
                        <Package className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1 truncate">Assets</span>
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 flex-shrink-0 transition-transform duration-200",
                                assetMenuOpen && "rotate-180"
                              )}
                            />
                          </>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {!collapsed && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {assetSubItems.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive(item.url)}
                            >
                              <Link to={item.url} className="flex items-center gap-2">
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>

              {/* Expense Management with Submenu */}
              <Collapsible
                open={expenseMenuOpen}
                onOpenChange={setExpenseMenuOpen}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={isExpenseMenuActive}
                      className={cn(
                        "rounded-lg transition-all w-full",
                        isExpenseMenuActive
                          ? "bg-secondary text-foreground"
                          : "hover:bg-secondary"
                      )}
                    >
                      <div className={cn("flex items-center w-full", collapsed ? "justify-center" : "gap-3")}>
                        <CreditCard className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1 truncate">Expenses</span>
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 flex-shrink-0 transition-transform duration-200",
                                expenseMenuOpen && "rotate-180"
                              )}
                            />
                          </>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {!collapsed && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {expenseSubItems.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive(item.url)}
                            >
                              <Link to={item.url} className="flex items-center gap-2">
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>

              {/* Internal Billing with Submenu */}
              <Collapsible
                open={billingMenuOpen}
                onOpenChange={setBillingMenuOpen}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={isBillingMenuActive}
                      className={cn(
                        "rounded-lg transition-all w-full",
                        isBillingMenuActive
                          ? "bg-secondary text-foreground"
                          : "hover:bg-secondary"
                      )}
                    >
                      <div className={cn("flex items-center w-full", collapsed ? "justify-center" : "gap-3")}>
                        <Building className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1 truncate">Internal Billing</span>
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 flex-shrink-0 transition-transform duration-200",
                                billingMenuOpen && "rotate-180"
                              )}
                            />
                          </>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {!collapsed && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {billingSubItems.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive(item.url)}
                            >
                              <Link to={item.url} className="flex items-center gap-2">
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>

              {/* Onboarding with Submenu */}
              <Collapsible
                open={onboardingMenuOpen}
                onOpenChange={setOnboardingMenuOpen}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={isOnboardingMenuActive}
                      className={cn(
                        "rounded-lg transition-all w-full",
                        isOnboardingMenuActive
                          ? "bg-secondary text-foreground"
                          : "hover:bg-secondary"
                      )}
                    >
                      <div className={cn("flex items-center w-full", collapsed ? "justify-center" : "gap-3")}>
                        <UserPlus2 className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1 truncate">Onboarding</span>
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 flex-shrink-0 transition-transform duration-200",
                                onboardingMenuOpen && "rotate-180"
                              )}
                            />
                          </>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {!collapsed && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {onboardingSubItems.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive(item.url)}
                            >
                              <Link to={item.url} className="flex items-center gap-2">
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>

              {/* Offboarding with Submenu */}
              <Collapsible
                open={offboardingMenuOpen}
                onOpenChange={setOffboardingMenuOpen}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={isOffboardingMenuActive}
                      className={cn(
                        "rounded-lg transition-all w-full",
                        isOffboardingMenuActive
                          ? "bg-secondary text-foreground"
                          : "hover:bg-secondary"
                      )}
                    >
                      <div className={cn("flex items-center w-full", collapsed ? "justify-center" : "gap-3")}>
                        <UserMinus className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1 truncate">Offboarding</span>
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 flex-shrink-0 transition-transform duration-200",
                                offboardingMenuOpen && "rotate-180"
                              )}
                            />
                          </>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {!collapsed && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {offboardingSubItems.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive(item.url)}
                            >
                              <Link to={item.url} className="flex items-center gap-2">
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>

              {/* Communications with Submenu */}
              <Collapsible
                open={communicationsMenuOpen}
                onOpenChange={setCommunicationsMenuOpen}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={isCommunicationsMenuActive}
                      className={cn(
                        "rounded-lg transition-all w-full",
                        isCommunicationsMenuActive
                          ? "bg-secondary text-foreground"
                          : "hover:bg-secondary"
                      )}
                    >
                      <div className={cn("flex items-center w-full", collapsed ? "justify-center" : "gap-3")}>
                        <Mail className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1 truncate">Communications</span>
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 flex-shrink-0 transition-transform duration-200",
                                communicationsMenuOpen && "rotate-180"
                              )}
                            />
                          </>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {!collapsed && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {communicationsSubItems.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive(item.url)}
                            >
                              <Link to={item.url} className="flex items-center gap-2">
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>

              {/* Events with Submenu */}
              <Collapsible
                open={eventsMenuOpen}
                onOpenChange={setEventsMenuOpen}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={isEventsMenuActive}
                      className={cn(
                        "rounded-lg transition-all w-full",
                        isEventsMenuActive
                          ? "bg-secondary text-foreground"
                          : "hover:bg-secondary"
                      )}
                    >
                      <div className={cn("flex items-center w-full", collapsed ? "justify-center" : "gap-3")}>
                        <CalendarDays className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1 truncate">Events</span>
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 flex-shrink-0 transition-transform duration-200",
                                eventsMenuOpen && "rotate-180"
                              )}
                            />
                          </>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {!collapsed && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {eventsSubItems.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive(item.url)}
                            >
                              <Link to={item.url} className="flex items-center gap-2">
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>

              {/* Support with Submenu */}
              <Collapsible
                open={supportMenuOpen}
                onOpenChange={setSupportMenuOpen}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={isSupportMenuActive}
                      className={cn(
                        "rounded-lg transition-all w-full",
                        isSupportMenuActive
                          ? "bg-secondary text-foreground"
                          : "hover:bg-secondary"
                      )}
                    >
                      <div className={cn("flex items-center w-full", collapsed ? "justify-center" : "gap-3")}>
                        <Headphones className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1 truncate">Support</span>
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 flex-shrink-0 transition-transform duration-200",
                                supportMenuOpen && "rotate-180"
                              )}
                            />
                          </>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {!collapsed && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {supportSubItems.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive(item.url)}
                            >
                              <Link to={item.url} className="flex items-center gap-2">
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>
              {/* Documents Management with Submenu */}
              <Collapsible
                open={documentsMenuOpen}
                onOpenChange={setDocumentsMenuOpen}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={isDocumentsMenuActive}
                      className={cn(
                        "rounded-lg transition-all w-full",
                        isDocumentsMenuActive
                          ? "bg-secondary text-foreground"
                          : "hover:bg-secondary"
                      )}
                    >
                      <div className={cn("flex items-center w-full", collapsed ? "justify-center" : "gap-3")}>
                        <FolderOpen className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1 truncate">Documents</span>
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 flex-shrink-0 transition-transform duration-200",
                                documentsMenuOpen && "rotate-180"
                              )}
                            />
                          </>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {!collapsed && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {documentsSubItems.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive(item.url)}
                            >
                              <Link to={item.url} className="flex items-center gap-2">
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>
              {/* Audit Logs with Submenu */}
              <Collapsible
                open={auditMenuOpen}
                onOpenChange={setAuditMenuOpen}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={isAuditMenuActive}
                      className={cn(
                        "rounded-lg transition-all w-full",
                        isAuditMenuActive
                          ? "bg-secondary text-foreground"
                          : "hover:bg-secondary"
                      )}
                    >
                      <div className={cn("flex items-center w-full", collapsed ? "justify-center" : "gap-3")}>
                        <History className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1 truncate">Audit Logs</span>
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 flex-shrink-0 transition-transform duration-200",
                                auditMenuOpen && "rotate-180"
                              )}
                            />
                          </>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {!collapsed && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {auditSubItems.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive(item.url)}
                            >
                              <Link to={item.url} className="flex items-center gap-2">
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>

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
