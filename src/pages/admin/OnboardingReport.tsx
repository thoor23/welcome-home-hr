import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Download, Users, Clock, TrendingUp, FileText } from "lucide-react";
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
  totalOnboardings: number;
  completed: number;
  inProgress: number;
  avgCompletionDays: number;
}

const onboardingByDepartment = [
  { name: "Engineering", value: 25, color: "hsl(var(--chart-1))" },
  { name: "Marketing", value: 12, color: "hsl(var(--chart-2))" },
  { name: "Operations", value: 15, color: "hsl(var(--chart-3))" },
  { name: "HR", value: 8, color: "hsl(var(--chart-4))" },
  { name: "Finance", value: 10, color: "hsl(var(--chart-5))" },
];

const monthlyTrends = [
  { month: "Jul", onboardings: 8 },
  { month: "Aug", onboardings: 12 },
  { month: "Sep", onboardings: 10 },
  { month: "Oct", onboardings: 15 },
  { month: "Nov", onboardings: 18 },
  { month: "Dec", onboardings: 14 },
];

const avgCompletionTime = [
  { month: "Jul", days: 12 },
  { month: "Aug", days: 10 },
  { month: "Sep", days: 11 },
  { month: "Oct", days: 9 },
  { month: "Nov", days: 8 },
  { month: "Dec", days: 7 },
];

const taskCompletionRates = [
  { category: "Documents", rate: 95 },
  { category: "IT Setup", rate: 92 },
  { category: "Training", rate: 85 },
  { category: "HR", rate: 98 },
  { category: "Admin", rate: 88 },
];

const departmentSummaryData: DepartmentSummary[] = [
  { id: "1", department: "Engineering", totalOnboardings: 25, completed: 22, inProgress: 3, avgCompletionDays: 8 },
  { id: "2", department: "Marketing", totalOnboardings: 12, completed: 10, inProgress: 2, avgCompletionDays: 7 },
  { id: "3", department: "Operations", totalOnboardings: 15, completed: 13, inProgress: 2, avgCompletionDays: 9 },
  { id: "4", department: "HR", totalOnboardings: 8, completed: 8, inProgress: 0, avgCompletionDays: 6 },
  { id: "5", department: "Finance", totalOnboardings: 10, completed: 9, inProgress: 1, avgCompletionDays: 7 },
];

const dateRanges = ["This Month", "Last Month", "Last 3 Months", "Last 6 Months", "This Year"];

const OnboardingReport = () => {
  const [selectedDateRange, setSelectedDateRange] = useState("This Year");

  const totalOnboardings = 70;
  const avgCompletionDays = 8;
  const onTimeRate = 92;
  const pendingDocuments = 12;

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
      key: "totalOnboardings",
      header: "Total Onboardings",
      sortable: true,
      className: "text-center",
    },
    {
      key: "completed",
      header: "Completed",
      sortable: true,
      className: "text-center",
      render: (row) => (
        <span className="text-emerald-500">{row.completed}</span>
      ),
    },
    {
      key: "inProgress",
      header: "In Progress",
      sortable: true,
      className: "text-center",
      render: (row) => (
        <span className="text-amber-500">{row.inProgress}</span>
      ),
    },
    {
      key: "avgCompletionDays",
      header: "Avg Days",
      sortable: true,
      className: "text-center",
      render: (row) => `${row.avgCompletionDays} days`,
    },
  ];

  return (
    <AdminLayout>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground font-display">Onboarding Report</h1>
                <p className="text-muted-foreground mt-1">Analytics and insights on employee onboarding</p>
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
              <StatsCard title="Total Onboardings" value={String(totalOnboardings)} icon={Users} />
              <StatsCard title="Avg Completion Time" value={`${avgCompletionDays} days`} icon={Clock} />
              <StatsCard title="On-Time Completion" value={`${onTimeRate}%`} icon={TrendingUp} />
              <StatsCard title="Pending Documents" value={String(pendingDocuments)} icon={FileText} />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Onboarding by Department Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Onboarding by Department</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={onboardingByDepartment}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                      >
                        {onboardingByDepartment.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Monthly Onboarding Trends Bar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Monthly Onboarding Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip />
                      <Bar dataKey="onboardings" name="Onboardings" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Average Completion Time Trend */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Avg Completion Time Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={avgCompletionTime}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="days" name="Days" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Task Completion Rates by Category */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Task Completion by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={taskCompletionRates} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis type="number" domain={[0, 100]} className="text-xs" />
                      <YAxis dataKey="category" type="category" className="text-xs" width={80} />
                      <Tooltip />
                      <Bar dataKey="rate" name="Completion Rate %" fill="hsl(var(--chart-3))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Department Summary Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Department Summary</CardTitle>
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
    </AdminLayout>
  );
};

export default OnboardingReport;
