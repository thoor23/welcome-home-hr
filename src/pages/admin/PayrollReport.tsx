import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  IndianRupee, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Download, 
  FileSpreadsheet,
  PieChart,
  BarChart3 
} from "lucide-react";
import type { Column } from "@/components/ui/data-table";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  Legend 
} from "recharts";

interface DepartmentPayroll {
  id: string;
  department: string;
  employees: number;
  grossSalary: number;
  deductions: number;
  netSalary: number;
  averageSalary: number;
}

const mockDepartmentData: DepartmentPayroll[] = [
  { id: "1", department: "Engineering", employees: 25, grossSalary: 2125000, deductions: 318750, netSalary: 1806250, averageSalary: 85000 },
  { id: "2", department: "Design", employees: 10, grossSalary: 650000, deductions: 97500, netSalary: 552500, averageSalary: 65000 },
  { id: "3", department: "Marketing", employees: 12, grossSalary: 900000, deductions: 135000, netSalary: 765000, averageSalary: 75000 },
  { id: "4", department: "HR", employees: 8, grossSalary: 440000, deductions: 66000, netSalary: 374000, averageSalary: 55000 },
  { id: "5", department: "Finance", employees: 6, grossSalary: 480000, deductions: 72000, netSalary: 408000, averageSalary: 80000 },
  { id: "6", department: "Operations", employees: 15, grossSalary: 825000, deductions: 123750, netSalary: 701250, averageSalary: 55000 },
];

const monthlyTrend = [
  { month: "Jul", gross: 5100000, net: 4335000 },
  { month: "Aug", gross: 5200000, net: 4420000 },
  { month: "Sep", gross: 5150000, net: 4377500 },
  { month: "Oct", gross: 5300000, net: 4505000 },
  { month: "Nov", gross: 5350000, net: 4547500 },
  { month: "Dec", gross: 5420000, net: 4607000 },
];

const deductionBreakdown = [
  { name: "Provident Fund", value: 520000, color: "#0ea5e9" },
  { name: "TDS", value: 380000, color: "#f97316" },
  { name: "Professional Tax", value: 15200, color: "#22c55e" },
  { name: "ESI", value: 48000, color: "#8b5cf6" },
  { name: "Other", value: 25000, color: "#64748b" },
];

const PayrollReport = () => {
  const [selectedMonth, setSelectedMonth] = useState("December");
  const [selectedYear, setSelectedYear] = useState("2024");

  const totalGross = mockDepartmentData.reduce((sum, d) => sum + d.grossSalary, 0);
  const totalNet = mockDepartmentData.reduce((sum, d) => sum + d.netSalary, 0);
  const totalDeductions = mockDepartmentData.reduce((sum, d) => sum + d.deductions, 0);
  const totalEmployees = mockDepartmentData.reduce((sum, d) => sum + d.employees, 0);

  const columns: Column<DepartmentPayroll>[] = [
    { key: "department", header: "Department", render: (row) => <span className="font-medium">{row.department}</span> },
    { key: "employees", header: "Employees", render: (row) => <Badge variant="secondary">{row.employees}</Badge> },
    { key: "grossSalary", header: "Gross Salary", render: (row) => <span>₹{row.grossSalary.toLocaleString()}</span> },
    { key: "deductions", header: "Deductions", render: (row) => <span className="text-rose-600">₹{row.deductions.toLocaleString()}</span> },
    { key: "netSalary", header: "Net Salary", render: (row) => <span className="font-medium text-emerald-600">₹{row.netSalary.toLocaleString()}</span> },
    { key: "averageSalary", header: "Avg. Salary", render: (row) => <span>₹{row.averageSalary.toLocaleString()}</span> },
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
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Payroll Report</h1>
                  <p className="text-muted-foreground">Comprehensive payroll analytics and reports</p>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(month => (
                        <SelectItem key={month} value={month}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Gross Salary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <IndianRupee className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-2xl font-bold">₹{(totalGross / 100000).toFixed(1)}L</span>
                      </div>
                      <Badge variant="secondary" className="text-emerald-600">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +2.3%
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Net Salary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-emerald-500/10">
                          <IndianRupee className="h-5 w-5 text-emerald-500" />
                        </div>
                        <span className="text-2xl font-bold">₹{(totalNet / 100000).toFixed(1)}L</span>
                      </div>
                      <Badge variant="secondary" className="text-emerald-600">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +2.1%
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Deductions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-rose-500/10">
                          <TrendingDown className="h-5 w-5 text-rose-500" />
                        </div>
                        <span className="text-2xl font-bold">₹{(totalDeductions / 100000).toFixed(1)}L</span>
                      </div>
                      <Badge variant="secondary">15%</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Employees</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-blue-500/10">
                          <Users className="h-5 w-5 text-blue-500" />
                        </div>
                        <span className="text-2xl font-bold">{totalEmployees}</span>
                      </div>
                      <Badge variant="secondary" className="text-emerald-600">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +3
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      <CardTitle>Monthly Payroll Trend</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyTrend}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis dataKey="month" className="text-xs" />
                          <YAxis tickFormatter={(value) => `₹${value / 100000}L`} className="text-xs" />
                          <Tooltip 
                            formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                            contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                          />
                          <Bar dataKey="gross" name="Gross Salary" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="net" name="Net Salary" fill="hsl(142 76% 36%)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-primary" />
                      <CardTitle>Deduction Breakdown</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPie>
                          <Pie
                            data={deductionBreakdown}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {deductionBreakdown.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                            contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                          />
                          <Legend />
                        </RechartsPie>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Department Breakdown Table */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="h-5 w-5 text-primary" />
                      <CardTitle>Department-wise Payroll</CardTitle>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <DataTable columns={columns} data={mockDepartmentData} />
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PayrollReport;
