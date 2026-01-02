import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Search, Eye, Pencil, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddEmployeeDrawer } from "@/components/employees/AddEmployeeDrawer";
import { ViewEmployeeDrawer } from "@/components/employees/ViewEmployeeDrawer";
import { EditEmployeeDrawer } from "@/components/employees/EditEmployeeDrawer";

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  employeeId: string;
  joiningDate: string;
  status: "active" | "inactive" | "on-leave";
  avatar?: string;
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
    status: "on-leave",
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
    status: "active",
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
    status: "inactive",
  },
];

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [searchQuery, setSearchQuery] = useState("");
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [viewDrawerOpen, setViewDrawerOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddEmployee = (newEmployee: Omit<Employee, "id">) => {
    const employee: Employee = {
      ...newEmployee,
      id: String(employees.length + 1),
    };
    setEmployees([...employees, employee]);
    setAddDrawerOpen(false);
  };

  const handleEditEmployee = (updatedEmployee: Employee) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
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

  const getStatusBadge = (status: Employee["status"]) => {
    const variants = {
      active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      inactive: "bg-red-500/10 text-red-500 border-red-500/20",
      "on-leave": "bg-amber-500/10 text-amber-500 border-amber-500/20",
    };

    const labels = {
      active: "Active",
      inactive: "Inactive",
      "on-leave": "On Leave",
    };

    return (
      <Badge variant="outline" className={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col">
          <DashboardHeader />

          <main className="flex-1 p-6 overflow-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground font-display">
                  Employees
                </h1>
                <p className="text-muted-foreground mt-1">
                  Manage your organization's employees
                </p>
              </div>
              <Button onClick={() => setAddDrawerOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            </div>

            {/* Search */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Employee</TableHead>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={employee.avatar} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {employee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">
                              {employee.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {employee.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {employee.employeeId}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {employee.department}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {employee.designation}
                      </TableCell>
                      <TableCell>{getStatusBadge(employee.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleViewEmployee(employee)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleEditClick(employee)}
                            >
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit Employee
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </main>
        </div>
      </div>

      {/* Drawers */}
      <AddEmployeeDrawer
        open={addDrawerOpen}
        onOpenChange={setAddDrawerOpen}
        onSubmit={handleAddEmployee}
      />

      {selectedEmployee && (
        <>
          <ViewEmployeeDrawer
            open={viewDrawerOpen}
            onOpenChange={setViewDrawerOpen}
            employee={selectedEmployee}
          />
          <EditEmployeeDrawer
            open={editDrawerOpen}
            onOpenChange={setEditDrawerOpen}
            employee={selectedEmployee}
            onSubmit={handleEditEmployee}
          />
        </>
      )}
    </SidebarProvider>
  );
};

export default Employees;
