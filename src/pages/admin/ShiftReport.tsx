import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Download, Clock, Users, TrendingUp, Timer } from "lucide-react";
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

interface ShiftSummary {
  id: string;
  shiftName: string;
  employees: number;
  avgAttendance: number;
  lateArrivals: number;
  overtimeHours: number;
}

const employeeDistribution = [
  { name: "General Shift", value: 45, color: "hsl(var(--chart-1))" },
  { name: "Morning Shift", value: 20, color: "hsl(var(--chart-2))" },
  { name: "Evening Shift", value: 18, color: "hsl(var(--chart-3))" },
  { name: "Night Shift", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Flexible", value: 8, color: "hsl(var(--chart-5))" },
];

const attendanceByShift = [
  { shift: "General", attendance: 96, target: 95 },
  { shift: "Morning", attendance: 92, target: 95 },
  { shift: "Evening", attendance: 88, target: 95 },
  { shift: "Night", attendance: 94, target: 95 },
  { shift: "Flexible", attendance: 98, target: 95 },
];

const monthlyTrends = [
  { month: "Jan", general: 95, morning: 90, evening: 85, night: 92 },
  { month: "Feb", general: 96, morning: 91, evening: 87, night: 93 },
  { month: "Mar", general: 94, morning: 89, evening: 86, night: 91 },
  { month: "Apr", general: 97, morning: 92, evening: 88, night: 94 },
  { month: "May", general: 96, morning: 93, evening: 89, night: 95 },
  { month: "Jun", general: 95, morning: 91, evening: 87, night: 93 },
];

const overtimeByShift = [
  { shift: "General", overtime: 120 },
  { shift: "Morning", overtime: 85 },
  { shift: "Evening", overtime: 95 },
  { shift: "Night", overtime: 150 },
  { shift: "Flexible", overtime: 45 },
];

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
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          <main className="flex-1 p-6 overflow-auto min-w-0">
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
                  <CardTitle className="text-lg">Employee Distribution by Shift</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={employeeDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                      >
                        {employeeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Attendance by Shift Bar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Attendance Rate by Shift</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={attendanceByShift}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="shift" className="text-xs" />
                      <YAxis domain={[80, 100]} className="text-xs" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="attendance" name="Attendance %" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="target" name="Target" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Monthly Trends Line Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Shift-wise Attendance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis domain={[80, 100]} className="text-xs" />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="general" name="General" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                      <Line type="monotone" dataKey="morning" name="Morning" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                      <Line type="monotone" dataKey="evening" name="Evening" stroke="hsl(var(--chart-3))" strokeWidth={2} />
                      <Line type="monotone" dataKey="night" name="Night" stroke="hsl(var(--chart-4))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Overtime by Shift Bar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Overtime Hours by Shift</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={overtimeByShift} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis type="number" className="text-xs" />
                      <YAxis dataKey="shift" type="category" className="text-xs" width={80} />
                      <Tooltip />
                      <Bar dataKey="overtime" name="Overtime (hrs)" fill="hsl(var(--chart-5))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Shift Summary Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Shift Summary</CardTitle>
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
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ShiftReport;
