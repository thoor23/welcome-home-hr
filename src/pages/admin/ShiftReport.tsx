import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Download, Clock, Users, TrendingUp, Timer } from "lucide-react";
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

interface ShiftSummary {
  id: string;
  shiftName: string;
  employees: number;
  avgAttendance: number;
  lateArrivals: number;
  overtimeHours: number;
}

const employeeDistribution = [
  { name: "general", value: 45, fill: "hsl(var(--chart-1))" },
  { name: "morning", value: 20, fill: "hsl(var(--chart-2))" },
  { name: "evening", value: 18, fill: "hsl(var(--chart-3))" },
  { name: "night", value: 12, fill: "hsl(var(--chart-4))" },
  { name: "flexible", value: 8, fill: "hsl(var(--chart-5))" },
];

const distributionConfig = {
  value: { label: "Employees" },
  general: { label: "General Shift", color: "hsl(var(--chart-1))" },
  morning: { label: "Morning Shift", color: "hsl(var(--chart-2))" },
  evening: { label: "Evening Shift", color: "hsl(var(--chart-3))" },
  night: { label: "Night Shift", color: "hsl(var(--chart-4))" },
  flexible: { label: "Flexible", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;

const attendanceByShift = [
  { shift: "General", attendance: 96, target: 95 },
  { shift: "Morning", attendance: 92, target: 95 },
  { shift: "Evening", attendance: 88, target: 95 },
  { shift: "Night", attendance: 94, target: 95 },
  { shift: "Flexible", attendance: 98, target: 95 },
];

const attendanceConfig = {
  attendance: { label: "Attendance %", color: "hsl(var(--primary))" },
  target: { label: "Target", color: "hsl(var(--muted-foreground))" },
} satisfies ChartConfig;

const monthlyTrends = [
  { month: "Jan", general: 95, morning: 90, evening: 85, night: 92 },
  { month: "Feb", general: 96, morning: 91, evening: 87, night: 93 },
  { month: "Mar", general: 94, morning: 89, evening: 86, night: 91 },
  { month: "Apr", general: 97, morning: 92, evening: 88, night: 94 },
  { month: "May", general: 96, morning: 93, evening: 89, night: 95 },
  { month: "Jun", general: 95, morning: 91, evening: 87, night: 93 },
];

const trendsConfig = {
  general: { label: "General", color: "hsl(var(--chart-1))" },
  morning: { label: "Morning", color: "hsl(var(--chart-2))" },
  evening: { label: "Evening", color: "hsl(var(--chart-3))" },
  night: { label: "Night", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;

const overtimeByShift = [
  { shift: "General", overtime: 120 },
  { shift: "Morning", overtime: 85 },
  { shift: "Evening", overtime: 95 },
  { shift: "Night", overtime: 150 },
  { shift: "Flexible", overtime: 45 },
];

const overtimeConfig = {
  overtime: { label: "Overtime (hrs)", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;

const shiftSummaryData: ShiftSummary[] = [
  { id: "1", shiftName: "General Shift", employees: 45, avgAttendance: 96, lateArrivals: 12, overtimeHours: 120 },
  { id: "2", shiftName: "Morning Shift", employees: 20, avgAttendance: 92, lateArrivals: 8, overtimeHours: 85 },
  { id: "3", shiftName: "Evening Shift", employees: 18, avgAttendance: 88, lateArrivals: 15, overtimeHours: 95 },
  { id: "4", shiftName: "Night Shift", employees: 12, avgAttendance: 94, lateArrivals: 5, overtimeHours: 150 },
  { id: "5", shiftName: "Flexible Shift", employees: 8, avgAttendance: 98, lateArrivals: 2, overtimeHours: 45 },
];

const departments = ["All Departments", "Engineering", "Operations", "Security", "Customer Support"];
const locations = ["All Locations", "Head Office", "Branch A", "Branch B", "Warehouse"];
const dateRanges = ["This Month", "Last Month", "Last 3 Months", "Last 6 Months", "This Year"];

const ShiftReport = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedDateRange, setSelectedDateRange] = useState("This Month");

  const totalShifts = 5;
  const avgAttendanceRate = 93.6;
  const mostPopularShift = "General Shift";
  const totalOvertimeHours = 495;

  const handleExport = () => {
    toast.success("Report exported successfully");
  };

  const columns: Column<ShiftSummary>[] = [
    {
      key: "shiftName",
      header: "Shift",
      sortable: true,
      className: "font-medium",
    },
    {
      key: "employees",
      header: "Employees",
      sortable: true,
      className: "text-center",
    },
    {
      key: "avgAttendance",
      header: "Avg Attendance %",
      sortable: true,
      className: "text-center",
      render: (row) => (
        <span className={row.avgAttendance >= 95 ? "text-emerald-500" : row.avgAttendance >= 90 ? "text-amber-500" : "text-red-500"}>
          {row.avgAttendance}%
        </span>
      ),
    },
    {
      key: "lateArrivals",
      header: "Late Arrivals",
      sortable: true,
      className: "text-center",
    },
    {
      key: "overtimeHours",
      header: "Overtime (hrs)",
      sortable: true,
      className: "text-center",
    },
  ];

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Shift Report</h1>
          <p className="text-muted-foreground mt-1">Analytics and insights on shift management</p>
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
        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((loc) => (
              <SelectItem key={loc} value={loc}>{loc}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Shifts"
          value={String(totalShifts)}
          icon={Clock}
        />
        <StatsCard
          title="Avg Attendance Rate"
          value={`${avgAttendanceRate}%`}
          icon={TrendingUp}
        />
        <StatsCard
          title="Most Popular Shift"
          value={mostPopularShift}
          icon={Users}
        />
        <StatsCard
          title="Total Overtime"
          value={`${totalOvertimeHours}h`}
          icon={Timer}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Employee Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Employee Distribution by Shift</CardTitle>
            <CardDescription>Current allocation of employees across shifts</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={distributionConfig} className="mx-auto aspect-square max-h-[300px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={employeeDistribution}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={100}
                  strokeWidth={5}
                />
                <ChartLegend
                  content={<ChartLegendContent nameKey="name" />}
                  className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Attendance by Shift Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Rate by Shift</CardTitle>
            <CardDescription>Comparison with target attendance</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={attendanceConfig} className="h-[300px] w-full">
              <BarChart accessibilityLayer data={attendanceByShift}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="shift" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis domain={[80, 100]} tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="attendance" fill="var(--color-attendance)" radius={4} />
                <Bar dataKey="target" fill="var(--color-target)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Monthly Trends Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Shift-wise Attendance Trends</CardTitle>
            <CardDescription>Monthly attendance patterns by shift type</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={trendsConfig} className="h-[300px] w-full">
              <LineChart accessibilityLayer data={monthlyTrends}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis domain={[80, 100]} tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line type="monotone" dataKey="general" stroke="var(--color-general)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="morning" stroke="var(--color-morning)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="evening" stroke="var(--color-evening)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="night" stroke="var(--color-night)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Overtime by Shift Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Overtime Hours by Shift</CardTitle>
            <CardDescription>Total overtime hours per shift type</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={overtimeConfig} className="h-[300px] w-full">
              <BarChart accessibilityLayer data={overtimeByShift} layout="vertical">
                <CartesianGrid horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} />
                <YAxis dataKey="shift" type="category" tickLine={false} axisLine={false} width={80} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="overtime" fill="var(--color-overtime)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Shift Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle>Shift Summary</CardTitle>
          <CardDescription>Detailed breakdown of all shifts</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={shiftSummaryData}
            columns={columns}
            searchPlaceholder="Search shifts..."
            pageSize={10}
            getRowId={(row) => row.id}
          />
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default ShiftReport;