import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Download, Users, TrendingDown, Clock, Wallet } from "lucide-react";
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
  totalExits: number;
  resignations: number;
  terminations: number;
  avgTenure: number;
}

const exitsByType = [
  { type: "resignation", value: 45, fill: "hsl(var(--chart-1))" },
  { type: "termination", value: 8, fill: "hsl(var(--chart-2))" },
  { type: "retirement", value: 5, fill: "hsl(var(--chart-3))" },
  { type: "contract", value: 12, fill: "hsl(var(--chart-4))" },
];

const typeConfig = {
  value: { label: "Exits" },
  resignation: { label: "Resignation", color: "hsl(var(--chart-1))" },
  termination: { label: "Termination", color: "hsl(var(--chart-2))" },
  retirement: { label: "Retirement", color: "hsl(var(--chart-3))" },
  contract: { label: "Contract End", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;

const exitsByDepartment = [
  { department: "engineering", value: 20, fill: "hsl(var(--chart-1))" },
  { department: "marketing", value: 15, fill: "hsl(var(--chart-2))" },
  { department: "operations", value: 18, fill: "hsl(var(--chart-3))" },
  { department: "hr", value: 5, fill: "hsl(var(--chart-4))" },
  { department: "finance", value: 12, fill: "hsl(var(--chart-5))" },
];

const deptConfig = {
  value: { label: "Exits" },
  engineering: { label: "Engineering", color: "hsl(var(--chart-1))" },
  marketing: { label: "Marketing", color: "hsl(var(--chart-2))" },
  operations: { label: "Operations", color: "hsl(var(--chart-3))" },
  hr: { label: "HR", color: "hsl(var(--chart-4))" },
  finance: { label: "Finance", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;

const monthlyExits = [
  { month: "Jul", exits: 5 },
  { month: "Aug", exits: 8 },
  { month: "Sep", exits: 6 },
  { month: "Oct", exits: 10 },
  { month: "Nov", exits: 12 },
  { month: "Dec", exits: 9 },
];

const monthlyConfig = {
  exits: { label: "Exits", color: "hsl(var(--primary))" },
} satisfies ChartConfig;

const attritionTrend = [
  { month: "Jul", rate: 2.1 },
  { month: "Aug", rate: 2.5 },
  { month: "Sep", rate: 2.2 },
  { month: "Oct", rate: 2.8 },
  { month: "Nov", rate: 3.0 },
  { month: "Dec", rate: 2.6 },
];

const attritionConfig = {
  rate: { label: "Attrition Rate %", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

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
    <AdminLayout>
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
            <CardTitle>Exits by Type</CardTitle>
            <CardDescription>Distribution by exit reason</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={typeConfig} className="mx-auto aspect-square max-h-[300px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={exitsByType} dataKey="value" nameKey="type" innerRadius={60} outerRadius={100} strokeWidth={5} />
                <ChartLegend content={<ChartLegendContent nameKey="type" />} className="-translate-y-2 flex-wrap gap-2" />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Exits by Department Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Exits by Department</CardTitle>
            <CardDescription>Distribution across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={deptConfig} className="mx-auto aspect-square max-h-[300px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={exitsByDepartment} dataKey="value" nameKey="department" innerRadius={60} outerRadius={100} strokeWidth={5} />
                <ChartLegend content={<ChartLegendContent nameKey="department" />} className="-translate-y-2 flex-wrap gap-2" />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Monthly Exits Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Exit Trends</CardTitle>
            <CardDescription>Exits per month</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={monthlyConfig} className="h-[300px] w-full">
              <BarChart accessibilityLayer data={monthlyExits}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="exits" fill="var(--color-exits)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Attrition Rate Trend Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Attrition Rate Trend</CardTitle>
            <CardDescription>Monthly attrition percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={attritionConfig} className="h-[300px] w-full">
              <LineChart accessibilityLayer data={attritionTrend}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis domain={[0, 5]} tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line type="monotone" dataKey="rate" stroke="var(--color-rate)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle>Department-wise Exit Summary</CardTitle>
          <CardDescription>Exit statistics by department</CardDescription>
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

export default OffboardingReport;