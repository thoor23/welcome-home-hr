import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DataTable, Column } from "@/components/ui/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Send,
  CheckCircle,
  FileText,
  Clock,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

const monthlyData = [
  { month: "Aug", sent: 45, downloaded: 32 },
  { month: "Sep", sent: 52, downloaded: 38 },
  { month: "Oct", sent: 48, downloaded: 41 },
  { month: "Nov", sent: 61, downloaded: 45 },
  { month: "Dec", sent: 55, downloaded: 42 },
  { month: "Jan", sent: 68, downloaded: 51 },
];

const typeDistribution = [
  { name: "Offer Letter", value: 45, color: "hsl(var(--primary))" },
  { name: "Relieving Letter", value: 32, color: "hsl(var(--chart-2))" },
  { name: "Experience Letter", value: 28, color: "hsl(var(--chart-3))" },
  { name: "Welcome Email", value: 38, color: "hsl(var(--chart-4))" },
  { name: "Interview Invite", value: 25, color: "hsl(var(--chart-5))" },
  { name: "Others", value: 15, color: "hsl(var(--muted))" },
];

const departmentData = [
  { department: "Engineering", count: 42 },
  { department: "Marketing", count: 28 },
  { department: "Sales", count: 35 },
  { department: "HR", count: 22 },
  { department: "Operations", count: 18 },
  { department: "Finance", count: 15 },
];

const statusData = [
  { name: "Sent", value: 156, color: "hsl(142, 76%, 36%)" },
  { name: "Downloaded", value: 89, color: "hsl(217, 91%, 60%)" },
  { name: "Draft", value: 12, color: "hsl(var(--muted))" },
  { name: "Failed", value: 5, color: "hsl(var(--destructive))" },
];

interface TypeSummary {
  id: string;
  type: string;
  total: number;
  sent: number;
  downloaded: number;
  pending: number;
}

const typeSummary: TypeSummary[] = [
  { id: "1", type: "Offer Letter", total: 45, sent: 38, downloaded: 32, pending: 5 },
  { id: "2", type: "Relieving Letter", total: 32, sent: 28, downloaded: 25, pending: 4 },
  { id: "3", type: "Experience Letter", total: 28, sent: 24, downloaded: 22, pending: 2 },
  { id: "4", type: "Appointment Letter", total: 38, sent: 35, downloaded: 30, pending: 3 },
  { id: "5", type: "Interview Invitation", total: 25, sent: 25, downloaded: 0, pending: 0 },
  { id: "6", type: "Warning Letter", total: 8, sent: 6, downloaded: 5, pending: 2 },
  { id: "7", type: "Promotion Letter", total: 12, sent: 12, downloaded: 10, pending: 0 },
];

const columns: Column<TypeSummary>[] = [
  {
    key: "type",
    header: "Letter/Email Type",
    render: (item) => <span className="font-medium">{item.type}</span>,
  },
  {
    key: "total",
    header: "Total Generated",
    render: (item) => <span className="text-center block">{item.total}</span>,
  },
  {
    key: "sent",
    header: "Sent",
    render: (item) => <span className="text-emerald-500">{item.sent}</span>,
  },
  {
    key: "downloaded",
    header: "Downloaded",
    render: (item) => <span className="text-blue-500">{item.downloaded}</span>,
  },
  {
    key: "pending",
    header: "Pending",
    render: (item) => <span className="text-muted-foreground">{item.pending}</span>,
  },
];

const EmailReport = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Email & Letter Report</h1>
          <p className="text-muted-foreground">Analytics for communications and document generation</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatsCard
            title="Total Sent (Month)"
            value="68"
            icon={Send}
          />
          <StatsCard
            title="Delivery Rate"
            value="98.2%"
            icon={CheckCircle}
          />
          <StatsCard
            title="Most Common"
            value="Offer Letter"
            icon={FileText}
          />
          <StatsCard
            title="Avg Response Time"
            value="2.4 days"
            icon={Clock}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="sent" stroke="hsl(var(--primary))" strokeWidth={2} name="Sent" />
                  <Line type="monotone" dataKey="downloaded" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Downloaded" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribution by Type</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={typeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {typeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>By Department</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                  <YAxis type="category" dataKey="department" stroke="hsl(var(--muted-foreground))" width={100} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Summary Table */}
        <Card>
          <CardHeader>
            <CardTitle>Type-wise Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={typeSummary} />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default EmailReport;