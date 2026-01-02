import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DataTable, Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { toast } from "sonner";
import {
  Briefcase,
  FileText,
  Users,
  FileCheck,
  TrendingUp,
  Clock,
  Download,
} from "lucide-react";

interface DepartmentSummary {
  id: string;
  department: string;
  openings: number;
  applications: number;
  interviews: number;
  offers: number;
  hired: number;
  conversionRate: string;
}

const mockDepartmentData: DepartmentSummary[] = [
  {
    id: "1",
    department: "Engineering",
    openings: 8,
    applications: 156,
    interviews: 42,
    offers: 12,
    hired: 8,
    conversionRate: "5.1%",
  },
  {
    id: "2",
    department: "Product",
    openings: 3,
    applications: 48,
    interviews: 15,
    offers: 5,
    hired: 3,
    conversionRate: "6.3%",
  },
  {
    id: "3",
    department: "Design",
    openings: 2,
    applications: 35,
    interviews: 12,
    offers: 4,
    hired: 2,
    conversionRate: "5.7%",
  },
  {
    id: "4",
    department: "Analytics",
    openings: 2,
    applications: 28,
    interviews: 8,
    offers: 3,
    hired: 2,
    conversionRate: "7.1%",
  },
  {
    id: "5",
    department: "Human Resources",
    openings: 1,
    applications: 15,
    interviews: 5,
    offers: 2,
    hired: 1,
    conversionRate: "6.7%",
  },
];

const applicationsPerJobData = [
  { job: "Sr. Software Eng.", applications: 45 },
  { job: "Product Manager", applications: 32 },
  { job: "UI/UX Designer", applications: 28 },
  { job: "Data Analyst", applications: 18 },
  { job: "HR Coordinator", applications: 15 },
];

const sourceDistributionData = [
  { name: "LinkedIn", value: 35, color: "hsl(var(--primary))" },
  { name: "Indeed", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Referral", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Website", value: 15, color: "hsl(var(--chart-4))" },
  { name: "Other", value: 5, color: "hsl(var(--chart-5))" },
];

const hiringTrendData = [
  { month: "Aug", applications: 85, interviews: 25, hires: 4 },
  { month: "Sep", applications: 92, interviews: 28, hires: 5 },
  { month: "Oct", applications: 110, interviews: 35, hires: 6 },
  { month: "Nov", applications: 125, interviews: 40, hires: 7 },
  { month: "Dec", applications: 98, interviews: 30, hires: 5 },
  { month: "Jan", applications: 156, interviews: 48, hires: 8 },
];

const statsData = [
  { title: "Total Openings", value: "16", icon: Briefcase, color: "text-primary" },
  { title: "Applications", value: "282", icon: FileText, color: "text-blue-500" },
  { title: "Interviews", value: "82", icon: Users, color: "text-amber-500" },
  { title: "Offers Made", value: "26", icon: FileCheck, color: "text-emerald-500" },
  { title: "Hiring Rate", value: "5.7%", icon: TrendingUp, color: "text-purple-500" },
  { title: "Avg Time-to-Hire", value: "28 days", icon: Clock, color: "text-pink-500" },
];

export default function RecruitmentReport() {
  const columns: Column<DepartmentSummary>[] = [
    {
      key: "department",
      header: "Department",
      sortable: true,
      render: (row) => <span className="font-medium">{row.department}</span>,
    },
    {
      key: "openings",
      header: "Openings",
      sortable: true,
    },
    {
      key: "applications",
      header: "Applications",
      sortable: true,
    },
    {
      key: "interviews",
      header: "Interviews",
      sortable: true,
    },
    {
      key: "offers",
      header: "Offers",
      sortable: true,
    },
    {
      key: "hired",
      header: "Hired",
      sortable: true,
    },
    {
      key: "conversionRate",
      header: "Conversion Rate",
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-emerald-500">{row.conversionRate}</span>
      ),
    },
  ];

  const handleExport = () => {
    toast.success("Report exported successfully");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Recruitment Report</h1>
                  <p className="text-muted-foreground">Analytics and insights for recruitment</p>
                </div>
                <Button onClick={handleExport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {statsData.map((stat) => (
                  <Card key={stat.title}>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center">
                        <stat.icon className={`h-6 w-6 ${stat.color} mb-2`} />
                        <p className="text-xs text-muted-foreground">{stat.title}</p>
                        <p className="text-xl font-bold">{stat.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Applications per Job */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Applications per Job</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={applicationsPerJobData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                        <YAxis
                          type="category"
                          dataKey="job"
                          width={120}
                          stroke="hsl(var(--muted-foreground))"
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--popover))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar
                          dataKey="applications"
                          fill="hsl(var(--primary))"
                          radius={[0, 4, 4, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Source Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Application Sources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={sourceDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {sourceDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--popover))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Hiring Trend Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Hiring Trend (Last 6 Months)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={hiringTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="applications"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--primary))" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="interviews"
                        stroke="hsl(var(--chart-2))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--chart-2))" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="hires"
                        stroke="hsl(var(--chart-3))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--chart-3))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Department Summary Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Department-wise Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <DataTable
                    data={mockDepartmentData}
                    columns={columns}
                    searchPlaceholder="Search departments..."
                  />
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
