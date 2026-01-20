// Mock user data with role assignments

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  roleId: string;
  status: "active" | "inactive" | "pending";
  department?: string;
  designation?: string;
  employeeId?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mock users data
const defaultUsers: User[] = [
  {
    id: "usr_001",
    email: "admin@nexhr.com",
    firstName: "System",
    lastName: "Administrator",
    roleId: "admin",
    status: "active",
    department: "IT",
    designation: "System Admin",
    employeeId: "EMP001",
    phone: "+1 234 567 8900",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "usr_002",
    email: "sarah.johnson@nexhr.com",
    firstName: "Sarah",
    lastName: "Johnson",
    roleId: "hr_manager",
    status: "active",
    department: "Human Resources",
    designation: "HR Manager",
    employeeId: "EMP002",
    phone: "+1 234 567 8901",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "usr_003",
    email: "michael.chen@nexhr.com",
    firstName: "Michael",
    lastName: "Chen",
    roleId: "finance_manager",
    status: "active",
    department: "Finance",
    designation: "Finance Manager",
    employeeId: "EMP003",
    phone: "+1 234 567 8902",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
  },
  {
    id: "usr_004",
    email: "emily.rodriguez@nexhr.com",
    firstName: "Emily",
    lastName: "Rodriguez",
    roleId: "team_lead",
    status: "active",
    department: "Engineering",
    designation: "Team Lead",
    employeeId: "EMP004",
    phone: "+1 234 567 8903",
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15"),
  },
  {
    id: "usr_005",
    email: "david.kim@nexhr.com",
    firstName: "David",
    lastName: "Kim",
    roleId: "employee",
    status: "active",
    department: "Engineering",
    designation: "Software Developer",
    employeeId: "EMP005",
    phone: "+1 234 567 8904",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-01"),
  },
  {
    id: "usr_006",
    email: "lisa.wang@nexhr.com",
    firstName: "Lisa",
    lastName: "Wang",
    roleId: "employee",
    status: "active",
    department: "Marketing",
    designation: "Marketing Specialist",
    employeeId: "EMP006",
    phone: "+1 234 567 8905",
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-15"),
  },
  {
    id: "usr_007",
    email: "james.brown@nexhr.com",
    firstName: "James",
    lastName: "Brown",
    roleId: "employee",
    status: "inactive",
    department: "Sales",
    designation: "Sales Representative",
    employeeId: "EMP007",
    phone: "+1 234 567 8906",
    createdAt: new Date("2024-04-01"),
    updatedAt: new Date("2024-04-01"),
  },
  {
    id: "usr_008",
    email: "anna.martinez@nexhr.com",
    firstName: "Anna",
    lastName: "Martinez",
    roleId: "employee",
    status: "pending",
    department: "Design",
    designation: "UI/UX Designer",
    employeeId: "EMP008",
    phone: "+1 234 567 8907",
    createdAt: new Date("2024-04-15"),
    updatedAt: new Date("2024-04-15"),
  },
];

// Mutable mock data store
let mockUsers: User[] = [...defaultUsers];

// Get all users
export const getMockUsers = (): User[] => {
  return [...mockUsers];
};

// Set mock users (for updates)
export const setMockUsers = (users: User[]): void => {
  mockUsers = users;
};

// Reset to default users
export const resetMockUsers = (): void => {
  mockUsers = [...defaultUsers];
};

// Get user by ID
export const getMockUserById = (id: string): User | undefined => {
  return mockUsers.find((u) => u.id === id);
};
