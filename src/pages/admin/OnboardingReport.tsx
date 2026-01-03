import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Download, Users, Clock, TrendingUp, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Pie, PieChart, Bar, BarChart, Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

interface DepartmentSummary {
  id: string;
  department: string;
  totalOnboardings: number;
  completed: number;
  inProgress: number;
  avgCompletionDays: number;
}

const onboardingByDepartment = [
  { department: "engineering", value: 25, fill: "hsl(var(--chart-1))" },
  { department: "marketing", value: 12, fill: "hsl(var(--chart-2))" },
  { department: "operations", value: 15, fill: "hsl(var(--chart-3))" },
  { department: "hr", value: 8, fill: "hsl(var(--chart-4))" },
  { department: "finance", value: 10, fill: "hsl(var(--chart-5))" },
];

const departmentConfig = {
  value: { label: "Onboardings" },
  engineering: { label: "Engineering", color: "hsl(var(--chart-1))" },
  marketing: { label: "Marketing", color: "hsl(var(--chart-2))" },
  operations: { label: "Operations", color: "hsl(var(--chart-3))" },
  hr: { label: "HR", color: "hsl(var(--chart-4))" },
  finance: { label: "Finance", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;

const monthlyTrends = [
  { month: "Jul", onboardings: 8 },
  { month: "Aug", onboardings: 12 },
  { month: "Sep", onboardings: 10 },
  { month: "Oct", onboardings: 15 },
  { month: "Nov", onboardings: 18 },
  { month: "Dec", onboardings: 14 },
];

const monthlyConfig = {
  onboardings: { label: "Onboardings", color: "hsl(var(--primary))" },
} satisfies ChartConfig;

const avgCompletionTime = [
  { month: "Jul", days: 12 },
  { month: "Aug", days: 10 },
  { month: "Sep", days: 11 },
  { month: "Oct", days: 9 },
  { month: "Nov", days: 8 },
  { month: "Dec", days: 7 },
];

const completionConfig = {
  days: { label: "Days", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

const taskCompletionRates = [
  { category: "Documents", rate: 95 },
  { category: "IT Setup", rate: 92 },
  { category: "Training", rate: 85 },
  { category: "HR", rate: 98 },
  { category: "Admin", rate: 88 },
];

const taskConfig = {
  rate: { label: "Completion Rate %", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

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
            <CardTitle>Onboarding by Department</CardTitle>
            <CardDescription>Distribution across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={departmentConfig} className="mx-auto aspect-square max-h-[300px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={onboardingByDepartment} dataKey="value" nameKey="department" innerRadius={60} outerRadius={100} strokeWidth={5} />
                <ChartLegend content={<ChartLegendContent nameKey="department" />} className="-translate-y-2 flex-wrap gap-2" />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Monthly Onboarding Trends Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Onboarding Trends</CardTitle>
            <CardDescription>New hires per month</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={monthlyConfig} className="h-[300px] w-full">
              <BarChart accessibilityLayer data={monthlyTrends}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="onboardings" fill="var(--color-onboardings)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Average Completion Time Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Avg Completion Time Trend</CardTitle>
            <CardDescription>Days to complete onboarding</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={completionConfig} className="h-[300px] w-full">
              <LineChart accessibilityLayer data={avgCompletionTime}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line type="monotone" dataKey="days" stroke="var(--color-days)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Task Completion Rates by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Task Completion by Category</CardTitle>
            <CardDescription>Completion rates by task type</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={taskConfig} className="h-[300px] w-full">
              <BarChart accessibilityLayer data={taskCompletionRates} layout="vertical">
                <CartesianGrid horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tickLine={false} axisLine={false} />
                <YAxis dataKey="category" type="category" tickLine={false} axisLine={false} width={80} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="rate" fill="var(--color-rate)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle>Department Summary</CardTitle>
          <CardDescription>Onboarding statistics by department</CardDescription>
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