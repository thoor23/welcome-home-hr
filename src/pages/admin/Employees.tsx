import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Eye, Pencil, MoreHorizontal, Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddEmployeeDrawer } from "@/components/employees/AddEmployeeDrawer";
import { ViewEmployeeDrawer } from "@/components/employees/ViewEmployeeDrawer";
import { EditEmployeeDrawer } from "@/components/employees/EditEmployeeDrawer";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import type { DocumentItem } from "@/components/employees/DocumentUpload";

export interface Employee {
  id: string;

  // Profile Picture
  profilePic?: string;

  // Personal Information
  name: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other";
  maritalStatus?: "single" | "married" | "divorced" | "widowed";
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  address?: string;

  // Work Information
  employeeId: string;
  department: string;
  designation: string;
  location?: string;
  region?: string;
  reportingManager?: string;
  employmentType?: "full-time" | "part-time" | "contract" | "intern";
  joiningDate: string;
  status: "active" | "probation" | "notice" | "exit";

  // Past Job Details
  pastJobs?: Array<{
    company: string;
    designation: string;
    startDate: string;
    endDate: string;
    description?: string;
  }>;

  // Education Details
  education?: Array<{
    degree: string;
    institution: string;
    year: string;
    grade?: string;
  }>;

  // Documents
  documents?: DocumentItem[];

  // Emergency Contact
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
    email?: string;
  };

  // Portal Access
  hasPortalAccess?: boolean;
  password?: string;
}

const initialEmployees: Employee[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1 234 567 8901",
    department: "Engineering",
    designation: "Senior Developer",
    employeeId: "EMP001",
    joiningDate: "2022-03-15",
    status: "active",
    dateOfBirth: "1990-05-12",
    gender: "female",
    maritalStatus: "married",
    bloodGroup: "O+",
    address: "123 Tech Street, San Francisco, CA 94102",
    location: "San Francisco",
    region: "West",
    reportingManager: "Mike Chen",
    employmentType: "full-time",
    pastJobs: [
      {
        company: "Tech Corp",
        designation: "Junior Developer",
        startDate: "2018-01-01",
        endDate: "2022-02-28",
        description: "Worked on frontend development",
      },
    ],
    education: [
      {
        degree: "B.S. Computer Science",
        institution: "Stanford University",
        year: "2017",
        grade: "3.8 GPA",
      },
    ],
    emergencyContact: {
      name: "John Johnson",
      relationship: "Spouse",
      phone: "+1 234 567 8900",
      email: "john.johnson@email.com",
    },
    hasPortalAccess: true,
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike.chen@company.com",
    phone: "+1 234 567 8902",
    department: "Marketing",
    designation: "Marketing Manager",
    employeeId: "EMP002",
    joiningDate: "2021-06-20",
    status: "active",
    gender: "male",
    employmentType: "full-time",
    location: "New York",
    region: "East",
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily.davis@company.com",
    phone: "+1 234 567 8903",
    department: "HR",
    designation: "HR Specialist",
    employeeId: "EMP003",
    joiningDate: "2023-01-10",
    status: "probation",
    gender: "female",
    employmentType: "full-time",
    location: "Chicago",
    region: "Midwest",
  },
  {
    id: "4",
    name: "Alex Wilson",
    email: "alex.wilson@company.com",
    phone: "+1 234 567 8904",
    department: "Sales",
    designation: "Sales Executive",
    employeeId: "EMP004",
    joiningDate: "2022-09-05",
    status: "notice",
    gender: "male",
    employmentType: "full-time",
    location: "Los Angeles",
    region: "West",
  },
  {
    id: "5",
    name: "Jessica Brown",
    email: "jessica.brown@company.com",
    phone: "+1 234 567 8905",
    department: "Engineering",
    designation: "UI/UX Designer",
    employeeId: "EMP005",
    joiningDate: "2023-04-12",
    status: "exit",
    gender: "female",
    employmentType: "contract",
    location: "Austin",
    region: "South",
  },
];

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [viewDrawerOpen, setViewDrawerOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleAddEmployee = (newEmployee: Omit<Employee, "id">) => {
    const employee: Employee = {
      ...newEmployee,
      id: String(employees.length + 1),
    };
    setEmployees([...employees, employee]);
    setAddDrawerOpen(false);
  };

  const handleEditEmployee = (updatedEmployee: Employee) => {
    setEmployees(employees.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp)));
    setEditDrawerOpen(false);
    setSelectedEmployee(null);
  };

  const handleViewEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setViewDrawerOpen(true);
  };

  const handleEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setEditDrawerOpen(true);
  };

  const exportEmployeesCsv = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Department",
      "Designation",
      "Employee ID",
      "Joining Date",
      "Status",
      "Location",
    ];

    const escapeCsv = (value: string) => {
      if (value.includes('"') || value.includes(",") || value.includes("\n")) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    };

    const rows = employees.map((employee) => [
      employee.name,
      employee.email,
      employee.phone,
      employee.department,
      employee.designation,
      employee.employeeId,
      employee.joiningDate,
      employee.status,
      employee.location ?? "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => escapeCsv(String(cell))).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "employees.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status: Employee["status"]) => {
    const variants = {
      active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      probation: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      notice: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      exit: "bg-red-500/10 text-red-500 border-red-500/20",
    };

    const labels = {
      active: "In Office",
      probation: "Remote",
      notice: "On Leave",
      exit: "Exit",
    };

    const dots = {
      active: "bg-emerald-500",
      probation: "bg-blue-500",
      notice: "bg-amber-500",
      exit: "bg-red-500",
    };

    return (
      <Badge variant="outline" className={`${variants[status]} gap-1.5`}>
        <span className={`h-1.5 w-1.5 rounded-full ${dots[status]}`} />
        {labels[status]}
      </Badge>
    );
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatEmploymentType = (type?: string) => {
    if (!type) return "—";
    return type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const capitalize = (str?: string) => {
    if (!str) return "—";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Define columns for the DataTable
  const columns: Column<Employee>[] = [
    {
      key: "name",
      header: "Member",
      searchable: true,
      sortable: true,
      render: (employee) => (
        <div className="flex items-center gap-3 whitespace-nowrap">
          <Avatar className="h-9 w-9 flex-shrink-0">
            <AvatarImage src={employee.profilePic} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {employee.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground">{employee.name}</p>
            <p className="text-sm text-muted-foreground">{employee.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "employeeId",
      header: "Employee ID",
      searchable: true,
      sortable: true,
      defaultHidden: true,
      className: "text-muted-foreground whitespace-nowrap",
    },
    {
      key: "phone",
      header: "Phone",
      searchable: true,
      sortable: true,
      defaultHidden: true,
      className: "text-muted-foreground whitespace-nowrap",
    },
    {
      key: "dateOfBirth",
      header: "Date of Birth",
      sortable: true,
      defaultHidden: true,
      className: "text-muted-foreground whitespace-nowrap",
      render: (employee) => formatDate(employee.dateOfBirth),
    },
    {
      key: "gender",
      header: "Gender",
      sortable: true,
      defaultHidden: true,
      className: "text-muted-foreground whitespace-nowrap",
      render: (employee) => capitalize(employee.gender),
    },
    {
      key: "maritalStatus",
      header: "Marital Status",
      sortable: true,
      defaultHidden: true,
      className: "text-muted-foreground whitespace-nowrap",
      render: (employee) => capitalize(employee.maritalStatus),
    },
    {
      key: "bloodGroup",
      header: "Blood Group",
      sortable: true,
      defaultHidden: true,
      className: "text-muted-foreground whitespace-nowrap",
      render: (employee) => employee.bloodGroup || "—",
    },
    {
      key: "address",
      header: "Address",
      sortable: false,
      defaultHidden: true,
      className: "text-muted-foreground max-w-[200px] truncate",
      render: (employee) => (
        <span title={employee.address} className="truncate block max-w-[200px]">
          {employee.address || "—"}
        </span>
      ),
    },
    {
      key: "designation",
      header: "Role",
      searchable: true,
      sortable: true,
      className: "text-muted-foreground whitespace-nowrap",
    },
    {
      key: "department",
      header: "Department",
      searchable: true,
      sortable: true,
      defaultHidden: true,
      className: "text-muted-foreground whitespace-nowrap",
    },
    {
      key: "region",
      header: "Region",
      sortable: true,
      defaultHidden: true,
      className: "text-muted-foreground whitespace-nowrap",
      render: (employee) => employee.region || "—",
    },
    {
      key: "reportingManager",
      header: "Reporting Manager",
      searchable: true,
      sortable: true,
      defaultHidden: true,
      className: "text-muted-foreground whitespace-nowrap",
      render: (employee) => employee.reportingManager || "—",
    },
    {
      key: "employmentType",
      header: "Employment Type",
      sortable: true,
      defaultHidden: true,
      className: "text-muted-foreground whitespace-nowrap",
      render: (employee) => formatEmploymentType(employee.employmentType),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      className: "whitespace-nowrap",
      render: (employee) => getStatusBadge(employee.status),
    },
    {
      key: "location",
      header: "Location",
      sortable: true,
      className: "text-muted-foreground whitespace-nowrap",
      render: (employee) => employee.location || "—",
    },
    {
      key: "joiningDate",
      header: "Joining Date",
      sortable: true,
      className: "text-muted-foreground whitespace-nowrap",
      render: (employee) => formatDate(employee.joiningDate),
    },
    {
      key: "hasPortalAccess",
      header: "Portal Access",
      sortable: true,
      defaultHidden: true,
      render: (employee) => (
        <Badge
          variant="outline"
          className={
            employee.hasPortalAccess
              ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
              : "bg-muted text-muted-foreground"
          }
        >
          {employee.hasPortalAccess ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      key: "emergencyContact",
      header: "Emergency Contact",
      sortable: false,
      defaultHidden: true,
      className: "text-muted-foreground whitespace-nowrap",
      render: (employee) => employee.emergencyContact?.name || "—",
    },
    {
      key: "actions",
      header: "",
      sortable: false,
      headerClassName: "w-[50px]",
      sticky: "right",
      render: (employee) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleViewEmployee(employee);
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleEditClick(employee);
              }}
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit Employee
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  // Define filters
  const filters: Filter[] = [
    {
      key: "status",
      label: "Status",
      options: [
        { label: "In Office", value: "active" },
        { label: "Remote", value: "probation" },
        { label: "On Leave", value: "notice" },
        { label: "Exit", value: "exit" },
      ],
    },
    {
      key: "department",
      label: "Department",
      options: [
        { label: "Engineering", value: "Engineering" },
        { label: "Marketing", value: "Marketing" },
        { label: "HR", value: "HR" },
        { label: "Sales", value: "Sales" },
      ],
    },
  ];

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Employees</h1>
          <p className="text-muted-foreground mt-1">Manage your organization's employees</p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={employees}
        columns={columns}
        filters={filters}
        searchPlaceholder="Search Users..."
        selectable
        toolbarActions={
          <>
            <Button variant="outline" onClick={exportEmployeesCsv}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button onClick={() => setAddDrawerOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </>
        }
        pageSize={10}
        pageSizeOptions={[10, 25, 50, 100]}
        getRowId={(employee) => employee.id}
      />

      {/* Drawers */}
      <AddEmployeeDrawer
        open={addDrawerOpen}
        onOpenChange={setAddDrawerOpen}
        onSubmit={handleAddEmployee}
        employees={employees}
      />

      {selectedEmployee && (
        <>
          <ViewEmployeeDrawer open={viewDrawerOpen} onOpenChange={setViewDrawerOpen} employee={selectedEmployee} />
          <EditEmployeeDrawer
            open={editDrawerOpen}
            onOpenChange={setEditDrawerOpen}
            employee={selectedEmployee}
            onSubmit={handleEditEmployee}
            employees={employees}
          />
        </>
      )}
    </AdminLayout>
  );
};

export default Employees;
