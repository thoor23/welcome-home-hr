// Permission definitions for the application
// Each permission controls access to specific features/pages

export interface Permission {
  key: string;
  label: string;
  description: string;
  category: string;
}

export interface PermissionCategory {
  key: string;
  label: string;
  permissions: Permission[];
}

// All available permissions grouped by category
export const PERMISSION_CATEGORIES: PermissionCategory[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    permissions: [
      { key: "dashboard.view", label: "View Dashboard", description: "Access to view the main dashboard", category: "dashboard" },
    ],
  },
  {
    key: "users",
    label: "User Management",
    permissions: [
      { key: "users.view", label: "View Users", description: "View list of all users", category: "users" },
      { key: "users.create", label: "Create Users", description: "Create new user accounts", category: "users" },
      { key: "users.edit", label: "Edit Users", description: "Edit existing user accounts", category: "users" },
      { key: "users.delete", label: "Delete Users", description: "Delete user accounts", category: "users" },
      { key: "roles.view", label: "View Roles", description: "View all roles", category: "users" },
      { key: "roles.create", label: "Create Roles", description: "Create new roles", category: "users" },
      { key: "roles.edit", label: "Edit Roles", description: "Edit existing roles and permissions", category: "users" },
      { key: "roles.delete", label: "Delete Roles", description: "Delete roles", category: "users" },
    ],
  },
  {
    key: "employees",
    label: "Employees",
    permissions: [
      { key: "employees.view", label: "View Employees", description: "View all employees", category: "employees" },
      { key: "employees.create", label: "Create Employees", description: "Add new employees", category: "employees" },
      { key: "employees.edit", label: "Edit Employees", description: "Edit employee details", category: "employees" },
      { key: "employees.delete", label: "Delete Employees", description: "Remove employees", category: "employees" },
      { key: "departments.view", label: "View Departments", description: "View all departments", category: "employees" },
      { key: "departments.manage", label: "Manage Departments", description: "Create/edit/delete departments", category: "employees" },
      { key: "designations.view", label: "View Designations", description: "View all designations", category: "employees" },
      { key: "designations.manage", label: "Manage Designations", description: "Create/edit/delete designations", category: "employees" },
      { key: "locations.view", label: "View Locations", description: "View all locations", category: "employees" },
      { key: "locations.manage", label: "Manage Locations", description: "Create/edit/delete locations", category: "employees" },
      { key: "employment_types.view", label: "View Employment Types", description: "View employment types", category: "employees" },
      { key: "employment_types.manage", label: "Manage Employment Types", description: "Manage employment types", category: "employees" },
    ],
  },
  {
    key: "attendance",
    label: "Attendance",
    permissions: [
      { key: "attendance.view_all", label: "View All Attendance", description: "View attendance of all employees", category: "attendance" },
      { key: "attendance.manage", label: "Manage Attendance", description: "Edit and manage attendance records", category: "attendance" },
      { key: "attendance.view_own", label: "View Own Attendance", description: "View personal attendance records", category: "attendance" },
      { key: "attendance.regularize", label: "Regularization Requests", description: "View and approve regularization", category: "attendance" },
      { key: "attendance.rules", label: "Manage Attendance Rules", description: "Configure attendance rules", category: "attendance" },
    ],
  },
  {
    key: "leave",
    label: "Leave Management",
    permissions: [
      { key: "leave.view_all", label: "View All Leaves", description: "View leave requests of all employees", category: "leave" },
      { key: "leave.approve", label: "Approve Leaves", description: "Approve or reject leave requests", category: "leave" },
      { key: "leave.manage_rules", label: "Manage Leave Rules", description: "Configure leave policies", category: "leave" },
      { key: "leave.view_own", label: "View Own Leaves", description: "View personal leave balance and history", category: "leave" },
      { key: "leave.apply", label: "Apply for Leave", description: "Submit leave requests", category: "leave" },
    ],
  },
  {
    key: "payroll",
    label: "Payroll",
    permissions: [
      { key: "payroll.view", label: "View Payroll", description: "View payroll data", category: "payroll" },
      { key: "payroll.manage", label: "Manage Payroll", description: "Manage salary structures and payroll", category: "payroll" },
      { key: "payroll.generate", label: "Generate Payslips", description: "Generate and process payslips", category: "payroll" },
      { key: "payslips.view_own", label: "View Own Payslips", description: "View personal payslips", category: "payroll" },
    ],
  },
  {
    key: "expenses",
    label: "Expenses",
    permissions: [
      { key: "expenses.view_all", label: "View All Expenses", description: "View expense claims of all employees", category: "expenses" },
      { key: "expenses.approve", label: "Approve Expenses", description: "Approve or reject expense claims", category: "expenses" },
      { key: "expenses.manage", label: "Manage Expense Categories", description: "Manage expense categories", category: "expenses" },
      { key: "expenses.view_own", label: "View Own Expenses", description: "View personal expense claims", category: "expenses" },
      { key: "expenses.submit", label: "Submit Expenses", description: "Submit expense claims", category: "expenses" },
    ],
  },
  {
    key: "assets",
    label: "Assets",
    permissions: [
      { key: "assets.view_all", label: "View All Assets", description: "View all company assets", category: "assets" },
      { key: "assets.manage", label: "Manage Assets", description: "Add/edit/delete assets", category: "assets" },
      { key: "assets.assign", label: "Assign Assets", description: "Assign assets to employees", category: "assets" },
      { key: "assets.view_own", label: "View Own Assets", description: "View personally assigned assets", category: "assets" },
    ],
  },
  {
    key: "documents",
    label: "Documents",
    permissions: [
      { key: "documents.view_all", label: "View All Documents", description: "Access all company documents", category: "documents" },
      { key: "documents.manage", label: "Manage Documents", description: "Upload/edit/delete documents", category: "documents" },
      { key: "documents.view_own", label: "View Own Documents", description: "Access personal documents", category: "documents" },
      { key: "documents.upload_own", label: "Upload Own Documents", description: "Upload personal documents", category: "documents" },
    ],
  },
  {
    key: "events",
    label: "Events",
    permissions: [
      { key: "events.view", label: "View Events", description: "View company events", category: "events" },
      { key: "events.manage", label: "Manage Events", description: "Create/edit/delete events", category: "events" },
    ],
  },
  {
    key: "support",
    label: "Support & Tickets",
    permissions: [
      { key: "support.view_all", label: "View All Tickets", description: "View all support tickets", category: "support" },
      { key: "support.manage", label: "Manage Tickets", description: "Respond to and resolve tickets", category: "support" },
      { key: "support.view_own", label: "View Own Tickets", description: "View personal support tickets", category: "support" },
      { key: "support.create", label: "Create Tickets", description: "Submit new support tickets", category: "support" },
      { key: "support.knowledge_base", label: "Knowledge Base", description: "Access knowledge base articles", category: "support" },
    ],
  },
  {
    key: "shifts",
    label: "Shifts",
    permissions: [
      { key: "shifts.view_all", label: "View All Shifts", description: "View shift schedules of all employees", category: "shifts" },
      { key: "shifts.manage", label: "Manage Shifts", description: "Create and manage shift schedules", category: "shifts" },
      { key: "shifts.view_own", label: "View Own Shifts", description: "View personal shift schedule", category: "shifts" },
      { key: "shifts.swap_request", label: "Request Shift Swap", description: "Request to swap shifts", category: "shifts" },
    ],
  },
  {
    key: "communications",
    label: "Communications",
    permissions: [
      { key: "communications.view", label: "View Communications", description: "View emails and letters", category: "communications" },
      { key: "communications.manage", label: "Manage Communications", description: "Send emails and generate letters", category: "communications" },
    ],
  },
  {
    key: "billing",
    label: "Billing & Invoices",
    permissions: [
      { key: "billing.view", label: "View Billing", description: "View invoices and billing", category: "billing" },
      { key: "billing.manage", label: "Manage Billing", description: "Create and manage invoices", category: "billing" },
    ],
  },
  {
    key: "audit",
    label: "Audit & Logs",
    permissions: [
      { key: "audit.view", label: "View Audit Logs", description: "View system audit logs", category: "audit" },
      { key: "audit.activity", label: "View Activity Logs", description: "View user activity logs", category: "audit" },
      { key: "audit.security", label: "View Security Logs", description: "View security logs", category: "audit" },
      { key: "audit.settings", label: "Audit Settings", description: "Configure audit settings", category: "audit" },
    ],
  },
  {
    key: "settings",
    label: "Settings",
    permissions: [
      { key: "settings.company", label: "Company Settings", description: "Manage company settings", category: "settings" },
      { key: "settings.personal", label: "Personal Settings", description: "Manage personal profile settings", category: "settings" },
    ],
  },
];

// Flat list of all permissions
export const ALL_PERMISSIONS = PERMISSION_CATEGORIES.flatMap((cat) => cat.permissions);

// Get permission by key
export const getPermission = (key: string): Permission | undefined => {
  return ALL_PERMISSIONS.find((p) => p.key === key);
};

// Get permissions by category
export const getPermissionsByCategory = (categoryKey: string): Permission[] => {
  const category = PERMISSION_CATEGORIES.find((c) => c.key === categoryKey);
  return category?.permissions || [];
};
