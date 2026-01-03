import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
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
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Payroll Report</h1>
          <p className="text-muted-foreground mt-1">Comprehensive payroll analytics and reports</p>
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

      <DataTable columns={columns} data={mockDepartmentData} />
    </AdminLayout>
  );
};

export default PayrollReport;
