import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
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
  employeeId: string;
  name: string;
  email: string;
  avatar: string;
  department: string;
  designation: string;
  bankAccount: string;
  bankName: string;
  pan: string;
  basicSalary: number;
  hra: number;
  da: number;
  conveyance: number;
  medical: number;
  specialAllowance: number;
  grossSalary: number;
  pf: number;
  esi: number;
  professionalTax: number;
  tds: number;
  totalDeductions: number;
  netSalary: number;
  workingDays: number;
  presentDays: number;
  lop: number;
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
  { id: "1", employeeId: "EMP001", name: "Rahul Sharma", email: "rahul.sharma@company.com", avatar: "", department: "Engineering", designation: "Senior Developer", bankAccount: "XXXX1234", bankName: "HDFC Bank", pan: "ABCDE1234F", basicSalary: 42500, hra: 17000, da: 8500, conveyance: 1600, medical: 1250, specialAllowance: 14150, grossSalary: 85000, pf: 5100, esi: 0, professionalTax: 200, tds: 7200, totalDeductions: 12500, netSalary: 72500, workingDays: 26, presentDays: 24, lop: 2, status: "pending" },
  { id: "2", employeeId: "EMP002", name: "Priya Patel", email: "priya.patel@company.com", avatar: "", department: "Design", designation: "UI/UX Designer", bankAccount: "XXXX5678", bankName: "ICICI Bank", pan: "FGHIJ5678K", basicSalary: 32500, hra: 13000, da: 6500, conveyance: 1600, medical: 1250, specialAllowance: 10150, grossSalary: 65000, pf: 3900, esi: 1138, professionalTax: 200, tds: 4512, totalDeductions: 9750, netSalary: 55250, workingDays: 26, presentDays: 26, lop: 0, status: "generated" },
  { id: "3", employeeId: "EMP003", name: "Amit Kumar", email: "amit.kumar@company.com", avatar: "", department: "Marketing", designation: "Marketing Manager", bankAccount: "XXXX9012", bankName: "SBI", pan: "LMNOP9012Q", basicSalary: 37500, hra: 15000, da: 7500, conveyance: 1600, medical: 1250, specialAllowance: 12150, grossSalary: 75000, pf: 4500, esi: 0, professionalTax: 200, tds: 6550, totalDeductions: 11250, netSalary: 63750, workingDays: 26, presentDays: 25, lop: 1, status: "sent" },
  { id: "4", employeeId: "EMP004", name: "Sneha Gupta", email: "sneha.gupta@company.com", avatar: "", department: "HR", designation: "HR Executive", bankAccount: "XXXX3456", bankName: "Axis Bank", pan: "RSTUV3456W", basicSalary: 27500, hra: 11000, da: 5500, conveyance: 1600, medical: 1250, specialAllowance: 8150, grossSalary: 55000, pf: 3300, esi: 963, professionalTax: 200, tds: 3787, totalDeductions: 8250, netSalary: 46750, workingDays: 26, presentDays: 26, lop: 0, status: "pending" },
  { id: "5", employeeId: "EMP005", name: "Vikram Singh", email: "vikram.singh@company.com", avatar: "", department: "Engineering", designation: "Tech Lead", bankAccount: "XXXX7890", bankName: "HDFC Bank", pan: "XYZAB7890C", basicSalary: 60000, hra: 24000, da: 12000, conveyance: 1600, medical: 1250, specialAllowance: 21150, grossSalary: 120000, pf: 7200, esi: 0, professionalTax: 200, tds: 10600, totalDeductions: 18000, netSalary: 102000, workingDays: 26, presentDays: 24, lop: 2, status: "pending" },
  { id: "6", employeeId: "EMP006", name: "Anita Desai", email: "anita.desai@company.com", avatar: "", department: "Finance", designation: "Accounts Manager", bankAccount: "XXXX2345", bankName: "Kotak Bank", pan: "DEFGH2345I", basicSalary: 40000, hra: 16000, da: 8000, conveyance: 1600, medical: 1250, specialAllowance: 13150, grossSalary: 80000, pf: 4800, esi: 0, professionalTax: 200, tds: 7000, totalDeductions: 12000, netSalary: 68000, workingDays: 26, presentDays: 26, lop: 0, status: "pending" },
  { id: "7", employeeId: "EMP007", name: "Rajesh Verma", email: "rajesh.verma@company.com", avatar: "", department: "Engineering", designation: "Software Engineer", bankAccount: "XXXX6789", bankName: "SBI", pan: "JKLMN6789O", basicSalary: 30000, hra: 12000, da: 6000, conveyance: 1600, medical: 1250, specialAllowance: 9150, grossSalary: 60000, pf: 3600, esi: 1050, professionalTax: 200, tds: 4150, totalDeductions: 9000, netSalary: 51000, workingDays: 26, presentDays: 23, lop: 3, status: "pending" },
  { id: "8", employeeId: "EMP008", name: "Meera Krishnan", email: "meera.krishnan@company.com", avatar: "", department: "Operations", designation: "Operations Lead", bankAccount: "XXXX0123", bankName: "ICICI Bank", pan: "PQRST0123U", basicSalary: 35000, hra: 14000, da: 7000, conveyance: 1600, medical: 1250, specialAllowance: 11150, grossSalary: 70000, pf: 4200, esi: 0, professionalTax: 200, tds: 6100, totalDeductions: 10500, netSalary: 59500, workingDays: 26, presentDays: 25, lop: 1, status: "generated" },
  { id: "9", employeeId: "EMP009", name: "Suresh Reddy", email: "suresh.reddy@company.com", avatar: "", department: "Sales", designation: "Sales Executive", bankAccount: "XXXX4567", bankName: "Axis Bank", pan: "VWXYZ4567A", basicSalary: 25000, hra: 10000, da: 5000, conveyance: 1600, medical: 1250, specialAllowance: 7150, grossSalary: 50000, pf: 3000, esi: 875, professionalTax: 200, tds: 3425, totalDeductions: 7500, netSalary: 42500, workingDays: 26, presentDays: 26, lop: 0, status: "pending" },
  { id: "10", employeeId: "EMP010", name: "Kavita Joshi", email: "kavita.joshi@company.com", avatar: "", department: "Design", designation: "Graphic Designer", bankAccount: "XXXX8901", bankName: "HDFC Bank", pan: "BCDEF8901G", basicSalary: 22500, hra: 9000, da: 4500, conveyance: 1600, medical: 1250, specialAllowance: 6150, grossSalary: 45000, pf: 2700, esi: 788, professionalTax: 200, tds: 3062, totalDeductions: 6750, netSalary: 38250, workingDays: 26, presentDays: 24, lop: 2, status: "sent" },
  { id: "11", employeeId: "EMP011", name: "Arun Nair", email: "arun.nair@company.com", avatar: "", department: "Engineering", designation: "DevOps Engineer", bankAccount: "XXXX2346", bankName: "Kotak Bank", pan: "HIJKL2346M", basicSalary: 45000, hra: 18000, da: 9000, conveyance: 1600, medical: 1250, specialAllowance: 15150, grossSalary: 90000, pf: 5400, esi: 0, professionalTax: 200, tds: 7900, totalDeductions: 13500, netSalary: 76500, workingDays: 26, presentDays: 26, lop: 0, status: "pending" },
  { id: "12", employeeId: "EMP012", name: "Pooja Mehta", email: "pooja.mehta@company.com", avatar: "", department: "HR", designation: "Recruitment Specialist", bankAccount: "XXXX5679", bankName: "SBI", pan: "NOPQR5679S", basicSalary: 27500, hra: 11000, da: 5500, conveyance: 1600, medical: 1250, specialAllowance: 8150, grossSalary: 55000, pf: 3300, esi: 963, professionalTax: 200, tds: 3787, totalDeductions: 8250, netSalary: 46750, workingDays: 26, presentDays: 25, lop: 1, status: "generated" },
  { id: "13", employeeId: "EMP013", name: "Karthik Iyer", email: "karthik.iyer@company.com", avatar: "", department: "Engineering", designation: "QA Engineer", bankAccount: "XXXX9013", bankName: "ICICI Bank", pan: "TUVWX9013Y", basicSalary: 30000, hra: 12000, da: 6000, conveyance: 1600, medical: 1250, specialAllowance: 9150, grossSalary: 60000, pf: 3600, esi: 1050, professionalTax: 200, tds: 4150, totalDeductions: 9000, netSalary: 51000, workingDays: 26, presentDays: 26, lop: 0, status: "pending" },
  { id: "14", employeeId: "EMP014", name: "Neha Saxena", email: "neha.saxena@company.com", avatar: "", department: "Marketing", designation: "Content Writer", bankAccount: "XXXX3457", bankName: "Axis Bank", pan: "ZABCD3457E", basicSalary: 20000, hra: 8000, da: 4000, conveyance: 1600, medical: 1250, specialAllowance: 5150, grossSalary: 40000, pf: 2400, esi: 700, professionalTax: 200, tds: 2700, totalDeductions: 6000, netSalary: 34000, workingDays: 26, presentDays: 24, lop: 2, status: "pending" },
  { id: "15", employeeId: "EMP015", name: "Sanjay Kapoor", email: "sanjay.kapoor@company.com", avatar: "", department: "Finance", designation: "Financial Analyst", bankAccount: "XXXX7891", bankName: "HDFC Bank", pan: "FGHIJ7891K", basicSalary: 37500, hra: 15000, da: 7500, conveyance: 1600, medical: 1250, specialAllowance: 12150, grossSalary: 75000, pf: 4500, esi: 0, professionalTax: 200, tds: 6550, totalDeductions: 11250, netSalary: 63750, workingDays: 26, presentDays: 26, lop: 0, status: "sent" },
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
      key: "employeeId",
      header: "Emp ID",
      render: (row) => <span className="font-mono text-xs">{row.employeeId}</span>,
    },
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
      key: "basicSalary",
      header: "Basic",
      render: (row) => <span>₹{(row.basicSalary ?? 0).toLocaleString()}</span>,
    },
    {
      key: "hra",
      header: "HRA",
      render: (row) => <span>₹{(row.hra ?? 0).toLocaleString()}</span>,
    },
    {
      key: "da",
      header: "DA",
      render: (row) => <span>₹{(row.da ?? 0).toLocaleString()}</span>,
    },
    {
      key: "specialAllowance",
      header: "Special Allow.",
      render: (row) => <span>₹{(row.specialAllowance ?? 0).toLocaleString()}</span>,
    },
    {
      key: "grossSalary",
      header: "Gross Salary",
      render: (row) => <span className="font-medium">₹{(row.grossSalary ?? 0).toLocaleString()}</span>,
    },
    {
      key: "pf",
      header: "PF",
      render: (row) => <span className="text-rose-600">₹{(row.pf ?? 0).toLocaleString()}</span>,
    },
    {
      key: "tds",
      header: "TDS",
      render: (row) => <span className="text-rose-600">₹{(row.tds ?? 0).toLocaleString()}</span>,
    },
    {
      key: "totalDeductions",
      header: "Total Ded.",
      render: (row) => <span className="font-medium text-rose-600">₹{(row.totalDeductions ?? 0).toLocaleString()}</span>,
    },
    {
      key: "netSalary",
      header: "Net Salary",
      render: (row) => <span className="font-bold text-emerald-600">₹{(row.netSalary ?? 0).toLocaleString()}</span>,
    },
    {
      key: "presentDays",
      header: "Days",
      render: (row) => (
        <span className="text-xs">{row.presentDays}/{row.workingDays} {row.lop > 0 && <span className="text-rose-500">(-{row.lop})</span>}</span>
      ),
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
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-2xl font-bold text-foreground">Generate Payslip</h1>
                <p className="text-muted-foreground">Generate and manage employee payslips</p>
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
                  {/* Filters */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-wrap items-center gap-4">
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
                    </CardContent>
                  </Card>

                  {/* Employee Table */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Employees - {selectedMonth} {selectedYear}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <DataTable columns={employeeColumns} data={employees} />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="requests" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Employee Payslip Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <DataTable columns={requestColumns} data={requests} />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default GeneratePayslip;
