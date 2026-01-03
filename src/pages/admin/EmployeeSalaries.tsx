import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { DataTable, Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Download, 
  Eye,
  Edit,
  Building2,
  CreditCard
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EmployeeSalaryData {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  designation: string;
  basicSalary: number;
  hra: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: string;
  panNumber: string;
  status: "active" | "inactive";
}

const EmployeeSalaries = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeSalaryData | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  // Mock data
  const employeeSalaryData: EmployeeSalaryData[] = [
    {
      id: "1",
      employeeId: "EMP001",
      name: "Rahul Sharma",
      department: "Engineering",
      designation: "Senior Developer",
      basicSalary: 50000,
      hra: 20000,
      allowances: 15000,
      deductions: 8500,
      netSalary: 76500,
      bankName: "HDFC Bank",
      accountNumber: "1234567890123456",
      ifscCode: "HDFC0001234",
      accountType: "Savings",
      panNumber: "ABCDE1234F",
      status: "active"
    },
    {
      id: "2",
      employeeId: "EMP002",
      name: "Priya Patel",
      department: "Design",
      designation: "UI/UX Designer",
      basicSalary: 45000,
      hra: 18000,
      allowances: 12000,
      deductions: 7500,
      netSalary: 67500,
      bankName: "ICICI Bank",
      accountNumber: "9876543210987654",
      ifscCode: "ICIC0005678",
      accountType: "Savings",
      panNumber: "FGHIJ5678K",
      status: "active"
    },
    {
      id: "3",
      employeeId: "EMP003",
      name: "Amit Kumar",
      department: "Marketing",
      designation: "Marketing Manager",
      basicSalary: 55000,
      hra: 22000,
      allowances: 18000,
      deductions: 9500,
      netSalary: 85500,
      bankName: "SBI",
      accountNumber: "5678901234567890",
      ifscCode: "SBIN0009012",
      accountType: "Current",
      panNumber: "KLMNO9012P",
      status: "active"
    },
    {
      id: "4",
      employeeId: "EMP004",
      name: "Sneha Gupta",
      department: "HR",
      designation: "HR Executive",
      basicSalary: 35000,
      hra: 14000,
      allowances: 10000,
      deductions: 5900,
      netSalary: 53100,
      bankName: "Axis Bank",
      accountNumber: "3456789012345678",
      ifscCode: "UTIB0003456",
      accountType: "Savings",
      panNumber: "QRSTU3456V",
      status: "active"
    },
    {
      id: "5",
      employeeId: "EMP005",
      name: "Vikram Singh",
      department: "Engineering",
      designation: "Tech Lead",
      basicSalary: 70000,
      hra: 28000,
      allowances: 22000,
      deductions: 12000,
      netSalary: 108000,
      bankName: "Kotak Bank",
      accountNumber: "7890123456789012",
      ifscCode: "KKBK0007890",
      accountType: "Savings",
      panNumber: "WXYZ7890A",
      status: "inactive"
    },
  ];

  const columns: Column<EmployeeSalaryData>[] = [
    {
      key: "employeeId",
      header: "Employee ID",
      sortable: true,
      searchable: true,
    },
    {
      key: "name",
      header: "Name",
      sortable: true,
      searchable: true,
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xs font-medium text-primary">
              {row.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className="font-medium">{row.name}</p>
            <p className="text-xs text-muted-foreground">{row.designation}</p>
          </div>
        </div>
      ),
    },
    {
      key: "department",
      header: "Department",
      sortable: true,
    },
    {
      key: "basicSalary",
      header: "Basic Salary",
      sortable: true,
      render: (row) => `₹${row.basicSalary.toLocaleString()}`,
    },
    {
      key: "netSalary",
      header: "Net Salary",
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-primary">₹{row.netSalary.toLocaleString()}</span>
      ),
    },
    {
      key: "bankName",
      header: "Bank",
      sortable: true,
    },
    {
      key: "accountNumber",
      header: "Account No.",
      render: (row) => `****${row.accountNumber.slice(-4)}`,
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <Badge variant={row.status === "active" ? "default" : "secondary"}>
          {row.status}
        </Badge>
      ),
    },
    {
      key: "id",
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => {
              setSelectedEmployee(row);
              setViewDialogOpen(true);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const filters = [
    {
      key: "department",
      label: "Department",
      options: [
        { label: "Engineering", value: "Engineering" },
        { label: "Design", value: "Design" },
        { label: "Marketing", value: "Marketing" },
        { label: "HR", value: "HR" },
      ],
    },
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
  ];

  const handleExport = () => {
    console.log("Exporting employee salary data...");
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Employee Salaries</h1>
            <p className="text-muted-foreground">
              View and manage employee salary and bank details
            </p>
          </div>
          <Button onClick={handleExport} className="gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Employees</p>
                <p className="text-2xl font-bold">{employeeSalaryData.length}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Net Salary</p>
                <p className="text-2xl font-bold">
                  ₹{employeeSalaryData.reduce((sum, emp) => sum + emp.netSalary, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Salary</p>
                <p className="text-2xl font-bold">
                  ₹{Math.round(employeeSalaryData.reduce((sum, emp) => sum + emp.netSalary, 0) / employeeSalaryData.length).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Employees</p>
                <p className="text-2xl font-bold">
                  {employeeSalaryData.filter(emp => emp.status === "active").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="rounded-lg border bg-card">
          <DataTable
            data={employeeSalaryData}
            columns={columns}
            filters={filters}
            searchPlaceholder="Search employees..."
          />
        </div>
      </div>

      {/* View Employee Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <Tabs defaultValue="salary" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="salary">Salary Details</TabsTrigger>
                <TabsTrigger value="bank">Bank Details</TabsTrigger>
              </TabsList>
              <TabsContent value="salary" className="mt-4">
                <div className="grid gap-4">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-medium text-primary">
                        {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{selectedEmployee.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedEmployee.employeeId} • {selectedEmployee.designation}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Basic Salary</p>
                      <p className="text-lg font-semibold">₹{selectedEmployee.basicSalary.toLocaleString()}</p>
                    </div>
                    <div className="p-3 rounded-lg border">
                      <p className="text-sm text-muted-foreground">HRA</p>
                      <p className="text-lg font-semibold">₹{selectedEmployee.hra.toLocaleString()}</p>
                    </div>
                    <div className="p-3 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Allowances</p>
                      <p className="text-lg font-semibold">₹{selectedEmployee.allowances.toLocaleString()}</p>
                    </div>
                    <div className="p-3 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Deductions</p>
                      <p className="text-lg font-semibold text-destructive">-₹{selectedEmployee.deductions.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-sm text-muted-foreground">Net Salary</p>
                    <p className="text-2xl font-bold text-primary">₹{selectedEmployee.netSalary.toLocaleString()}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="bank" className="mt-4">
                <div className="grid gap-4">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-3 mb-4">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                      <span className="font-semibold">{selectedEmployee.bankName}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Account Number</p>
                        <p className="font-medium">{selectedEmployee.accountNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">IFSC Code</p>
                        <p className="font-medium">{selectedEmployee.ifscCode}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Account Type</p>
                        <p className="font-medium">{selectedEmployee.accountType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">PAN Number</p>
                        <p className="font-medium">{selectedEmployee.panNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default EmployeeSalaries;