import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbNavProps {
  type: "ess" | "admin" | "superadmin";
  className?: string;
}

// Route label mappings for ESS portal
const essRouteLabels: Record<string, string> = {
  "dashboard": "Dashboard",
  "attendance-today": "Today's Attendance",
  "attendance-history": "Attendance History",
  "attendance-regularization": "Regularization",
  "apply-leave": "Apply Leave",
  "leave-balance": "Leave Balance",
  "leave-history": "Leave History",
  "leave-requests": "Leave Requests",
  "shift-schedule": "Shift Schedule",
  "shift-swap": "Shift Swap Requests",
  "payslips": "Payslips",
  "salary-details": "Salary Details",
  "tax-documents": "Tax Documents",
  "expense-claims": "Expense Claims",
  "expense-submit": "Submit Expense",
  "documents": "Documents",
  "assets": "Assets",
  "events": "Events",
  "tickets": "Support Tickets",
  "new-ticket": "New Ticket",
  "knowledge-base": "Knowledge Base",
  "notifications": "Notifications",
  "profile": "Profile",
  "settings": "Settings",
};

// Route label mappings for Admin panel
const adminRouteLabels: Record<string, string> = {
  "dashboard": "Dashboard",
  "employees": "Employees",
  "all-employees": "All Employees",
  "departments": "Departments",
  "designations": "Designations",
  "locations": "Locations",
  "employment-types": "Employment Types",
  "all-attendance": "All Attendance",
  "attendance-overview": "Overview",
  "attendance-regularization": "Regularization",
  "details-regularization": "Details Regularization",
  "attendance-rules": "Rules",
  "all-leaves": "All Leaves",
  "leave-overview": "Overview",
  "leave-requests": "Requests",
  "leave-rules": "Rules",
  "leave-report": "Report",
  "all-shifts": "All Shifts",
  "shift-schedule": "Schedule",
  "shift-assignments": "Assignments",
  "shift-swaps": "Swaps",
  "shift-report": "Report",
  "all-events": "All Events",
  "events-list": "Events List",
  "event-categories": "Categories",
  "event-report": "Report",
  "employee-salaries": "Employee Salaries",
  "salary-structure": "Salary Structure",
  "generate-payslip": "Generate Payslip",
  "payslip-template": "Payslip Template",
  "payroll-report": "Payroll Report",
  "all-expenses": "All Expenses",
  "expense-claims": "Claims",
  "expense-approvals": "Approvals",
  "expense-categories": "Categories",
  "expense-report": "Report",
  "all-invoices": "All Invoices",
  "generate-invoice": "Generate Invoice",
  "invoice-template": "Template",
  "billing-requests": "Requests",
  "billing-approvals": "Approvals",
  "billing-allocations": "Allocations",
  "billing-categories": "Categories",
  "billing-report": "Report",
  "all-documents": "All Documents",
  "my-documents": "My Documents",
  "document-categories": "Categories",
  "document-settings": "Settings",
  "document-report": "Report",
  "generate-letter": "Generate Letter",
  "letter-templates": "Templates",
  "all-assets": "All Assets",
  "asset-assignments": "Assignments",
  "asset-categories": "Categories",
  "asset-maintenance": "Maintenance",
  "asset-report": "Report",
  "all-tickets": "All Tickets",
  "my-tickets": "My Tickets",
  "ticket-categories": "Categories",
  "knowledge-base": "Knowledge Base",
  "sla-settings": "SLA Settings",
  "support-report": "Report",
  "job-postings": "Job Postings",
  "applications": "Applications",
  "candidates": "Candidates",
  "interviews": "Interviews",
  "offers": "Offers",
  "recruitment-report": "Report",
  "onboarding-overview": "Onboarding Overview",
  "onboarding-tasks": "Onboarding Tasks",
  "new-hire-onboarding": "New Hire",
  "onboarding-report": "Report",
  "offboarding-overview": "Offboarding Overview",
  "offboarding-tasks": "Offboarding Tasks",
  "exit-clearance": "Exit Clearance",
  "offboarding-report": "Report",
  "all-audit-logs": "All Audit Logs",
  "activity-logs": "Activity Logs",
  "data-change-logs": "Data Change Logs",
  "security-logs": "Security Logs",
  "system-logs": "System Logs",
  "api-logs": "API Logs",
  "audit-settings": "Settings",
  "all-emails": "All Emails",
  "email-templates": "Templates",
  "email-configuration": "Configuration",
  "email-report": "Report",
  "company-settings": "Company Settings",
  "personal-settings": "Personal Settings",
  "profile": "Profile",
};

// Route label mappings for Super Admin panel
const superadminRouteLabels: Record<string, string> = {
  "dashboard": "Dashboard",
  "all": "All",
  "pending": "Pending Approval",
  "suspended": "Suspended",
  "admins": "Super Admins",
  "impersonation": "Impersonation Logs",
  "plans": "Plans",
  "invoices": "Invoices",
  "payments": "Payments",
  "coupons": "Coupons",
  "overview": "Overview",
  "usage": "Usage",
  "growth": "Growth",
  "features": "Feature Flags",
  "emails": "Email Templates",
  "maintenance": "Maintenance",
  "logins": "Login Attempts",
  "blocklist": "IP Blocklist",
  "system": "System Logs",
  "security": "Security",
  "settings": "Settings",
  "organizations": "Organizations",
  "users": "Users",
  "billing": "Billing",
  "analytics": "Analytics",
  "logs": "Audit Logs",
};

export function BreadcrumbNav({ type, className }: BreadcrumbNavProps) {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  
  // Skip if we're at root or only have the base segment
  if (pathSegments.length <= 1) {
    return null;
  }

  const routeLabels = type === "ess" ? essRouteLabels : type === "superadmin" ? superadminRouteLabels : adminRouteLabels;
  const baseRoute = type === "ess" ? "/ess" : type === "superadmin" ? "/superadmin" : "/admin";
  const baseName = type === "ess" ? "Employee Portal" : type === "superadmin" ? "Super Admin" : "Admin Panel";

  // Build breadcrumb items
  const breadcrumbs = pathSegments.slice(1).map((segment, index) => {
    const path = `${baseRoute}/${pathSegments.slice(1, index + 2).join("/")}`;
    const label = routeLabels[segment] || segment.split("-").map(
      word => word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
    const isLast = index === pathSegments.length - 2;
    
    return { path, label, isLast };
  });

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1 text-sm", className)}>
      <Link
        to={`${baseRoute}/dashboard`}
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
        <span className="hidden sm:inline">{baseName}</span>
      </Link>
      
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.path} className="flex items-center gap-1">
          <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
          {crumb.isLast ? (
            <span className="font-medium text-foreground">{crumb.label}</span>
          ) : (
            <Link
              to={crumb.path}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
