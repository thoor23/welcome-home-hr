import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Download, Users, TrendingDown, Clock, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable, Column } from "@/components/ui/data-table";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { toast } from "sonner";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DepartmentSummary {
  id: string;
  department: string;
  totalExits: number;
  resignations: number;
  terminations: number;
  avgTenure: number;
}

const exitsByType = [
  { name: "Resignation", value: 45, color: "hsl(var(--chart-1))" },
  { name: "Termination", value: 8, color: "hsl(var(--chart-2))" },
  { name: "Retirement", value: 5, color: "hsl(var(--chart-3))" },
  { name: "Contract End", value: 12, color: "hsl(var(--chart-4))" },
];

const exitsByDepartment = [
  { name: "Engineering", value: 20, color: "hsl(var(--chart-1))" },
  { name: "Marketing", value: 15, color: "hsl(var(--chart-2))" },
  { name: "Operations", value: 18, color: "hsl(var(--chart-3))" },
  { name: "HR", value: 5, color: "hsl(var(--chart-4))" },
  { name: "Finance", value: 12, color: "hsl(var(--chart-5))" },
];

const monthlyExits = [
  { month: "Jul", exits: 5 },
  { month: "Aug", exits: 8 },
  { month: "Sep", exits: 6 },
  { month: "Oct", exits: 10 },
  { month: "Nov", exits: 12 },
  { month: "Dec", exits: 9 },
];

const attritionTrend = [
  { month: "Jul", rate: 2.1 },
  { month: "Aug", rate: 2.5 },
  { month: "Sep", rate: 2.2 },
  { month: "Oct", rate: 2.8 },
  { month: "Nov", rate: 3.0 },
  { month: "Dec", rate: 2.6 },
];

const departmentSummaryData: DepartmentSummary[] = [
  { id: "1", department: "Engineering", totalExits: 20, resignations: 15, terminations: 3, avgTenure: 2.5 },
  { id: "2", department: "Marketing", totalExits: 15, resignations: 12, terminations: 2, avgTenure: 1.8 },
  { id: "3", department: "Operations", totalExits: 18, resignations: 14, terminations: 2, avgTenure: 3.2 },
  { id: "4", department: "HR", totalExits: 5, resignations: 4, terminations: 0, avgTenure: 2.0 },
  { id: "5", department: "Finance", totalExits: 12, resignations: 10, terminations: 1, avgTenure: 2.8 },
];

const dateRanges = ["This Month", "Last Month", "Last 3 Months", "Last 6 Months", "This Year"];

const OffboardingReport = () => {
  const [selectedDateRange, setSelectedDateRange] = useState("This Year");

  const totalExits = 70;
  const attritionRate = 2.6;
  const avgTenure = 2.5;
  const pendingFnF = 8;

  const handleExport = () => {
    toast.success("Report exported successfully");
  };

  const columns: Column<DepartmentSummary>[] = [
    {
      key: "department",
      header: "Department",
      sortable: true,
      className: "font-medium",
    },
    {
      key: "totalExits",
      header: "Total Exits",
      sortable: true,
      className: "text-center",
    },
    {
      key: "resignations",
      header: "Resignations",
      sortable: true,
      className: "text-center",
      render: (row) => (
        <span className="text-blue-500">{row.resignations}</span>
      ),
    },
    {
      key: "terminations",
      header: "Terminations",
      sortable: true,
      className: "text-center",
      render: (row) => (
        <span className="text-red-500">{row.terminations}</span>
      ),
    },
    {
      key: "avgTenure",
      header: "Avg Tenure (yrs)",
      sortable: true,
      className: "text-center",
      render: (row) => `${row.avgTenure} yrs`,
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          <main className="flex-1 p-6 overflow-auto min-w-0">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground font-display">Offboarding Report</h1>
                <p className="text-muted-foreground mt-1">Analytics and insights on employee exits</p>
              </div>
              <Button onClick={handleExport} className="gap-2">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  {dateRanges.map((range) => (
                    <SelectItem key={range} value={range}>{range}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatsCard title="Total Exits" value={String(totalExits)} icon={Users} />
              <StatsCard title="Attrition Rate" value={`${attritionRate}%`} icon={TrendingDown} />
              <StatsCard title="Avg Tenure" value={`${avgTenure} yrs`} icon={Clock} />
              <StatsCard title="Pending F&F" value={String(pendingFnF)} icon={Wallet} />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Exits by Type Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Exits by Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={exitsByType}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                      >
                        {exitsByType.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Exits by Department Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Exits by Department</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={exitsByDepartment}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                      >
                        {exitsByDepartment.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Monthly Exits Bar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Monthly Exit Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyExits}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip />
                      <Bar dataKey="exits" name="Exits" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Attrition Rate Trend Line Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Attrition Rate Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={attritionTrend}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis domain={[0, 5]} className="text-xs" />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="rate" name="Attrition Rate %" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Department Summary Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Department-wise Exit Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={departmentSummaryData}
                  columns={columns}
                  searchPlaceholder="Search departments..."
                  pageSize={10}
                  getRowId={(row) => row.id}
                />
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default OffboardingReport;
