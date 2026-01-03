import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DataTable, Column } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, CheckCircle, FileText, Clock } from "lucide-react";
import { Pie, PieChart, Bar, BarChart, Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const monthlyData = [
  { month: "Aug", sent: 45, downloaded: 32 },
  { month: "Sep", sent: 52, downloaded: 38 },
  { month: "Oct", sent: 48, downloaded: 41 },
  { month: "Nov", sent: 61, downloaded: 45 },
  { month: "Dec", sent: 55, downloaded: 42 },
  { month: "Jan", sent: 68, downloaded: 51 },
];

const monthlyConfig = {
  sent: { label: "Sent", color: "hsl(var(--primary))" },
  downloaded: { label: "Downloaded", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

const typeDistribution = [
  { type: "offer", value: 45, fill: "var(--color-offer)" },
  { type: "relieving", value: 32, fill: "var(--color-relieving)" },
  { type: "experience", value: 28, fill: "var(--color-experience)" },
  { type: "welcome", value: 38, fill: "var(--color-welcome)" },
  { type: "interview", value: 25, fill: "var(--color-interview)" },
  { type: "others", value: 15, fill: "var(--color-others)" },
];

const typeConfig = {
  value: { label: "Count" },
  offer: { label: "Offer Letter", color: "hsl(var(--primary))" },
  relieving: { label: "Relieving Letter", color: "hsl(var(--chart-2))" },
  experience: { label: "Experience Letter", color: "hsl(var(--chart-3))" },
  welcome: { label: "Welcome Email", color: "hsl(var(--chart-4))" },
  interview: { label: "Interview Invite", color: "hsl(var(--chart-5))" },
  others: { label: "Others", color: "hsl(var(--muted))" },
} satisfies ChartConfig;

const departmentData = [
  { department: "Engineering", count: 42 },
  { department: "Marketing", count: 28 },
  { department: "Sales", count: 35 },
  { department: "HR", count: 22 },
  { department: "Operations", count: 18 },
  { department: "Finance", count: 15 },
];

const departmentConfig = {
  count: { label: "Count", color: "hsl(var(--primary))" },
} satisfies ChartConfig;

const statusData = [
  { status: "sent", value: 156, fill: "var(--color-sent)" },
  { status: "downloaded", value: 89, fill: "var(--color-downloaded)" },
  { status: "draft", value: 12, fill: "var(--color-draft)" },
  { status: "failed", value: 5, fill: "var(--color-failed)" },
];

const statusConfig = {
  value: { label: "Count" },
  sent: { label: "Sent", color: "hsl(142 76% 36%)" },
  downloaded: { label: "Downloaded", color: "hsl(217 91% 60%)" },
  draft: { label: "Draft", color: "hsl(var(--muted))" },
  failed: { label: "Failed", color: "hsl(var(--destructive))" },
} satisfies ChartConfig;

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
          <h1 className="text-3xl font-bold text-foreground font-display">Email & Letter Report</h1>
          <p className="text-muted-foreground mt-1">Analytics for communications and document generation</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatsCard title="Total Sent (Month)" value="68" icon={Send} />
          <StatsCard title="Delivery Rate" value="98.2%" icon={CheckCircle} />
          <StatsCard title="Most Common" value="Offer Letter" icon={FileText} />
          <StatsCard title="Avg Response Time" value="2.4 days" icon={Clock} />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
              <CardDescription>Email sent and download activity</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={monthlyConfig} className="h-[300px] w-full">
                <LineChart accessibilityLayer data={monthlyData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line type="monotone" dataKey="sent" stroke="var(--color-sent)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="downloaded" stroke="var(--color-downloaded)" strokeWidth={2} dot={false} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribution by Type</CardTitle>
              <CardDescription>Breakdown of letter and email types</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={typeConfig} className="mx-auto aspect-square max-h-[300px]">
                <PieChart>
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Pie data={typeDistribution} dataKey="value" nameKey="type" innerRadius={60} outerRadius={100} strokeWidth={5} />
                  <ChartLegend content={<ChartLegendContent nameKey="type" />} className="-translate-y-2 flex-wrap gap-2" />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>By Department</CardTitle>
              <CardDescription>Communications by department</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={departmentConfig} className="h-[300px] w-full">
                <BarChart accessibilityLayer data={departmentData} layout="vertical">
                  <CartesianGrid horizontal={false} />
                  <XAxis type="number" tickLine={false} axisLine={false} />
                  <YAxis dataKey="department" type="category" tickLine={false} axisLine={false} width={100} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-count)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status Breakdown</CardTitle>
              <CardDescription>Current status of all communications</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={statusConfig} className="mx-auto aspect-square max-h-[300px]">
                <PieChart>
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Pie data={statusData} dataKey="value" nameKey="status" outerRadius={100} strokeWidth={5} />
                  <ChartLegend content={<ChartLegendContent nameKey="status" />} className="-translate-y-2 flex-wrap gap-2" />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Summary Table */}
        <Card>
          <CardHeader>
            <CardTitle>Type-wise Summary</CardTitle>
            <CardDescription>Detailed breakdown by letter type</CardDescription>
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