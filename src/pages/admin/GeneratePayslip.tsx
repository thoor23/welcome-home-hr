import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Download, MoreHorizontal, Eye, Send, Check, X, Clock } from "lucide-react";
import type { Column } from "@/components/ui/data-table";

interface Employee {
  id: string;
  name: string;
  email: string;
  avatar: string;
  department: string;
  designation: string;
  grossSalary: number;
  netSalary: number;
  status: "generated" | "pending" | "sent";
}

interface PayslipRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: string;
  department: string;
  requestedMonth: string;
  requestedYear: string;
  reason: string;
  requestDate: string;
  status: "pending" | "approved" | "rejected";
}

const mockEmployees: Employee[] = [
  { id: "1", name: "Rahul Sharma", email: "rahul.sharma@company.com", avatar: "", department: "Engineering", designation: "Senior Developer", grossSalary: 85000, netSalary: 72500, status: "pending" },
  { id: "2", name: "Priya Patel", email: "priya.patel@company.com", avatar: "", department: "Design", designation: "UI/UX Designer", grossSalary: 65000, netSalary: 55250, status: "generated" },
  { id: "3", name: "Amit Kumar", email: "amit.kumar@company.com", avatar: "", department: "Marketing", designation: "Marketing Manager", grossSalary: 75000, netSalary: 63750, status: "sent" },
  { id: "4", name: "Sneha Gupta", email: "sneha.gupta@company.com", avatar: "", department: "HR", designation: "HR Executive", grossSalary: 55000, netSalary: 46750, status: "pending" },
  { id: "5", name: "Vikram Singh", email: "vikram.singh@company.com", avatar: "", department: "Engineering", designation: "Tech Lead", grossSalary: 120000, netSalary: 102000, status: "pending" },
];

const mockRequests: PayslipRequest[] = [
  { id: "1", employeeId: "1", employeeName: "Rahul Sharma", avatar: "", department: "Engineering", requestedMonth: "October", requestedYear: "2024", reason: "Bank loan application", requestDate: "2024-12-28", status: "pending" },
  { id: "2", employeeId: "3", employeeName: "Amit Kumar", avatar: "", department: "Marketing", requestedMonth: "November", requestedYear: "2024", reason: "Visa application", requestDate: "2024-12-27", status: "pending" },
  { id: "3", employeeId: "2", employeeName: "Priya Patel", avatar: "", department: "Design", requestedMonth: "September", requestedYear: "2024", reason: "Tax filing", requestDate: "2024-12-25", status: "approved" },
  { id: "4", employeeId: "4", employeeName: "Sneha Gupta", avatar: "", department: "HR", requestedMonth: "August", requestedYear: "2024", reason: "Personal records", requestDate: "2024-12-20", status: "rejected" },
];

const GeneratePayslip = () => {
  const [employees] = useState<Employee[]>(mockEmployees);
  const [requests] = useState<PayslipRequest[]>(mockRequests);
  const [selectedMonth, setSelectedMonth] = useState("December");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEmployees(employees.map(e => e.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleSelectEmployee = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedEmployees([...selectedEmployees, id]);
    } else {
      setSelectedEmployees(selectedEmployees.filter(e => e !== id));
    }
  };

  const employeeColumns: Column<Employee>[] = [
    {
      key: "name",
      header: "Employee",
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.avatar} />
            <AvatarFallback>{row.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{row.name}</p>
            <p className="text-xs text-muted-foreground">{row.email}</p>
          </div>
        </div>
      ),
    },
    { key: "department", header: "Department" },
    { key: "designation", header: "Designation" },
    {
      key: "grossSalary",
      header: "Gross Salary",
      render: (row) => <span className="font-medium">₹{row.grossSalary.toLocaleString()}</span>,
    },
    {
      key: "netSalary",
      header: "Net Salary",
      render: (row) => <span className="font-medium text-emerald-600">₹{row.netSalary.toLocaleString()}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <Badge variant={row.status === "sent" ? "default" : row.status === "generated" ? "secondary" : "outline"}>
          {row.status === "sent" && <Check className="h-3 w-3 mr-1" />}
          {row.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      sortable: false,
      render: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem><Eye className="h-4 w-4 mr-2" />View Payslip</DropdownMenuItem>
            <DropdownMenuItem><Download className="h-4 w-4 mr-2" />Download PDF</DropdownMenuItem>
            <DropdownMenuItem><Send className="h-4 w-4 mr-2" />Send to Employee</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const requestColumns: Column<PayslipRequest>[] = [
    {
      key: "employeeName",
      header: "Employee",
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.avatar} />
            <AvatarFallback>{row.employeeName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{row.employeeName}</p>
            <p className="text-xs text-muted-foreground">{row.department}</p>
          </div>
        </div>
      ),
    },
    {
      key: "requestedMonth",
      header: "Requested Month",
      render: (row) => <span>{row.requestedMonth} {row.requestedYear}</span>,
    },
    { key: "reason", header: "Reason" },
    {
      key: "requestDate",
      header: "Request Date",
      render: (row) => <span>{new Date(row.requestDate).toLocaleDateString("en-IN")}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <Badge variant={row.status === "approved" ? "default" : row.status === "rejected" ? "destructive" : "outline"}>
          {row.status === "approved" && <Check className="h-3 w-3 mr-1" />}
          {row.status === "rejected" && <X className="h-3 w-3 mr-1" />}
          {row.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      sortable: false,
      render: (row) => (
        <div className="flex items-center gap-2">
          {row.status === "pending" && (
            <>
              <Button size="sm" variant="default"><Check className="h-4 w-4 mr-1" />Approve</Button>
              <Button size="sm" variant="outline"><X className="h-4 w-4 mr-1" />Reject</Button>
            </>
          )}
          {row.status === "approved" && (
            <Button size="sm" variant="outline"><Download className="h-4 w-4 mr-1" />Download</Button>
          )}
        </div>
      ),
    },
  ];
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Generate Payslip</h1>
          <p className="text-muted-foreground mt-1">Generate and manage employee payslips</p>
        </div>
      </div>

      <Tabs defaultValue="generate" className="space-y-4">
        <TabsList>
          <TabsTrigger value="generate">Generate Payslip</TabsTrigger>
          <TabsTrigger value="requests">
            Payslip Requests
            <Badge variant="secondary" className="ml-2">
              {requests.filter(r => r.status === "pending").length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-4">
          <div className="flex flex-wrap items-center gap-4 p-4 border rounded-lg bg-card">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Month:</span>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(month => (
                    <SelectItem key={month} value={month}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Year:</span>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1" />
            <Button variant="outline" disabled={selectedEmployees.length === 0}>
              <FileText className="h-4 w-4 mr-2" />
              Generate Selected ({selectedEmployees.length})
            </Button>
            <Button disabled={selectedEmployees.length === 0}>
              <Send className="h-4 w-4 mr-2" />
              Generate & Send
            </Button>
          </div>

          <DataTable columns={employeeColumns} data={employees} />
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <DataTable columns={requestColumns} data={requests} />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default GeneratePayslip;
