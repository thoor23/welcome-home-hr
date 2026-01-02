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
  const isEmployeeMenuActive = employeeSubItems.some((item) => currentPath === item.url);
  const isAttendanceMenuActive = attendanceSubItems.some((item) => currentPath === item.url);
  const isLeaveMenuActive = leaveSubItems.some((item) => currentPath === item.url);
  const isPayrollMenuActive = payrollSubItems.some((item) => currentPath === item.url);
  const isRecruitmentMenuActive = recruitmentSubItems.some((item) => currentPath === item.url);
  const isAssetMenuActive = assetSubItems.some((item) => currentPath === item.url);
  const isExpenseMenuActive = expenseSubItems.some((item) => currentPath === item.url);
  const isBillingMenuActive = billingSubItems.some((item) => currentPath === item.url);

  const [employeeMenuOpen, setEmployeeMenuOpen] = useState(isEmployeeMenuActive);
  const [attendanceMenuOpen, setAttendanceMenuOpen] = useState(isAttendanceMenuActive);
  const [leaveMenuOpen, setLeaveMenuOpen] = useState(isLeaveMenuActive);
  const [payrollMenuOpen, setPayrollMenuOpen] = useState(isPayrollMenuActive);
  const [recruitmentMenuOpen, setRecruitmentMenuOpen] = useState(isRecruitmentMenuActive);
  const [assetMenuOpen, setAssetMenuOpen] = useState(isAssetMenuActive);
  const [expenseMenuOpen, setExpenseMenuOpen] = useState(isExpenseMenuActive);
  const [billingMenuOpen, setBillingMenuOpen] = useState(isBillingMenuActive);

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
