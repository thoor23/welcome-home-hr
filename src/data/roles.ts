// Role definitions with dynamic permission assignments

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isDefault: boolean; // Default roles cannot be deleted
  createdAt: Date;
  updatedAt: Date;
}

// Default roles that come with the system
export const defaultRoles: Role[] = [
  {
    id: "admin",
    name: "Administrator",
    description: "Full system access with all permissions",
    permissions: ["*"], // Wildcard = all permissions
    isDefault: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "hr_manager",
    name: "HR Manager",
    description: "Manage employees, attendance, leave, and payroll",
    permissions: [
      "dashboard.view",
      "employees.view",
      "employees.create",
      "employees.edit",
      "departments.view",
      "departments.manage",
      "designations.view",
      "designations.manage",
      "locations.view",
      "locations.manage",
      "employment_types.view",
      "employment_types.manage",
      "attendance.view_all",
      "attendance.manage",
      "attendance.regularize",
      "attendance.rules",
      "leave.view_all",
      "leave.approve",
      "leave.manage_rules",
      "payroll.view",
      "payroll.manage",
      "payroll.generate",
      "documents.view_all",
      "documents.manage",
      "events.view",
      "events.manage",
      "support.view_all",
      "support.manage",
      "support.knowledge_base",
      "shifts.view_all",
      "shifts.manage",
      "settings.personal",
    ],
    isDefault: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "finance_manager",
    name: "Finance Manager",
    description: "Manage payroll, expenses, and billing",
    permissions: [
      "dashboard.view",
      "employees.view",
      "payroll.view",
      "payroll.manage",
      "payroll.generate",
      "payslips.view_own",
      "expenses.view_all",
      "expenses.approve",
      "expenses.manage",
      "billing.view",
      "billing.manage",
      "settings.personal",
    ],
    isDefault: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "team_lead",
    name: "Team Lead",
    description: "Manage team attendance and leave approvals",
    permissions: [
      "dashboard.view",
      "employees.view",
      "attendance.view_all",
      "attendance.view_own",
      "attendance.regularize",
      "leave.view_all",
      "leave.approve",
      "leave.view_own",
      "leave.apply",
      "payslips.view_own",
      "expenses.view_own",
      "expenses.submit",
      "assets.view_own",
      "documents.view_own",
      "documents.upload_own",
      "events.view",
      "support.view_own",
      "support.create",
      "support.knowledge_base",
      "shifts.view_all",
      "shifts.view_own",
      "shifts.swap_request",
      "settings.personal",
    ],
    isDefault: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "employee",
    name: "Employee",
    description: "Self-service access only",
    permissions: [
      "dashboard.view",
      "attendance.view_own",
      "leave.view_own",
      "leave.apply",
      "payslips.view_own",
      "expenses.view_own",
      "expenses.submit",
      "assets.view_own",
      "documents.view_own",
      "documents.upload_own",
      "events.view",
      "support.view_own",
      "support.create",
      "support.knowledge_base",
      "shifts.view_own",
      "shifts.swap_request",
      "settings.personal",
    ],
    isDefault: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

// Mutable mock data store (simulates database)
let mockRoles: Role[] = [...defaultRoles];

// Get all roles
export const getMockRoles = (): Role[] => {
  return [...mockRoles];
};

// Set mock roles (for updates)
export const setMockRoles = (roles: Role[]): void => {
  mockRoles = roles;
};

// Reset to default roles
export const resetMockRoles = (): void => {
  mockRoles = [...defaultRoles];
};
