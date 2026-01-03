import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TicketCheck, Clock, TrendingUp, Star, CheckCircle, AlertTriangle } from "lucide-react";
import { Pie, PieChart, Bar, BarChart, Line, LineChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";

const monthlyTickets = [
  { month: "Jul", tickets: 45, resolved: 42 },
  { month: "Aug", tickets: 52, resolved: 48 },
  { month: "Sep", tickets: 38, resolved: 36 },
  { month: "Oct", tickets: 65, resolved: 58 },
  { month: "Nov", tickets: 58, resolved: 55 },
  { month: "Dec", tickets: 72, resolved: 68 },
];

const ticketConfig = {
  tickets: { label: "Total Tickets", color: "hsl(217 91% 60%)" },
  resolved: { label: "Resolved", color: "hsl(142 76% 36%)" },
} satisfies ChartConfig;

const categoryData = [
  { category: "it", value: 45, fill: "hsl(217 91% 60%)" },
  { category: "hr", value: 32, fill: "hsl(262 83% 58%)" },
  { category: "facilities", value: 18, fill: "hsl(142 76% 36%)" },
  { category: "payroll", value: 28, fill: "hsl(38 92% 50%)" },
  { category: "leave", value: 56, fill: "hsl(330 81% 60%)" },
  { category: "general", value: 12, fill: "hsl(var(--muted))" },
];

const categoryConfig = {
  value: { label: "Tickets" },
  it: { label: "IT Support", color: "hsl(217 91% 60%)" },
  hr: { label: "HR Query", color: "hsl(262 83% 58%)" },
  facilities: { label: "Facilities", color: "hsl(142 76% 36%)" },
  payroll: { label: "Payroll", color: "hsl(38 92% 50%)" },
  leave: { label: "Leave Related", color: "hsl(330 81% 60%)" },
  general: { label: "General", color: "hsl(var(--muted))" },
} satisfies ChartConfig;

const priorityData = [
  { priority: "Critical", count: 8, color: "hsl(0 84% 60%)" },
  { priority: "High", count: 35, color: "hsl(25 95% 53%)" },
  { priority: "Medium", count: 98, color: "hsl(48 96% 53%)" },
  { priority: "Low", count: 50, color: "hsl(142 71% 45%)" },
];

const priorityConfig = {
  count: { label: "Count", color: "hsl(var(--primary))" },
} satisfies ChartConfig;

const resolutionTime = [
  { category: "IT Support", avgTime: 18 },
  { category: "HR Query", avgTime: 24 },
  { category: "Facilities", avgTime: 48 },
  { category: "Payroll", avgTime: 20 },
  { category: "Leave", avgTime: 12 },
  { category: "General", avgTime: 36 },
];

const resolutionConfig = {
  avgTime: { label: "Avg Time (hrs)", color: "hsl(262 83% 58%)" },
} satisfies ChartConfig;

const topPerformers = [
  { name: "John Smith", resolved: 45, avgTime: "4.2 hrs", rating: 4.8 },
  { name: "Sarah Johnson", resolved: 38, avgTime: "5.1 hrs", rating: 4.6 },
  { name: "Mike Chen", resolved: 35, avgTime: "4.8 hrs", rating: 4.7 },
  { name: "Emily Davis", resolved: 32, avgTime: "5.5 hrs", rating: 4.5 },
];

const breachedTickets = [
  { id: "TKT-2026-006", subject: "Keyboard replacement", category: "IT Support", breachTime: "12 hrs" },
  { id: "TKT-2025-098", subject: "Parking allocation", category: "Facilities", breachTime: "8 hrs" },
  { id: "TKT-2025-087", subject: "ID card request", category: "General", breachTime: "24 hrs" },
];

export default function SupportReport() {
  const stats = {
    totalMonth: 191,
    avgResolution: "18.5 hrs",
    slaCompliance: "94.2%",
    satisfaction: "4.6",
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground font-display">Support Report</h1>
        <p className="text-muted-foreground mt-1">Analytics and insights for support performance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <TicketCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Tickets (Month)</p>
                <p className="text-2xl font-bold">{stats.totalMonth}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10">
                <Clock className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Resolution Time</p>
                <p className="text-2xl font-bold">{stats.avgResolution}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-500/10">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">SLA Compliance</p>
                <p className="text-2xl font-bold">{stats.slaCompliance}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-yellow-500/10">
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Satisfaction Rating</p>
                <p className="text-2xl font-bold">{stats.satisfaction}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Tickets Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Tickets Over Time</CardTitle>
            <CardDescription>Monthly ticket volume and resolution</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={ticketConfig} className="h-[300px] w-full">
              <LineChart accessibilityLayer data={monthlyTickets}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line type="monotone" dataKey="tickets" stroke="var(--color-tickets)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="resolved" stroke="var(--color-resolved)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Tickets by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Tickets by Category</CardTitle>
            <CardDescription>Issue type distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={categoryConfig} className="mx-auto aspect-square max-h-[300px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={categoryData} dataKey="value" nameKey="category" innerRadius={60} outerRadius={100} strokeWidth={5} />
                <ChartLegend content={<ChartLegendContent nameKey="category" />} className="-translate-y-2 flex-wrap gap-2" />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Tickets by Priority */}
        <Card>
          <CardHeader>
            <CardTitle>Tickets by Priority</CardTitle>
            <CardDescription>Priority level breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={priorityConfig} className="h-[250px] w-full">
              <BarChart accessibilityLayer data={priorityData} layout="vertical">
                <CartesianGrid horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} />
                <YAxis dataKey="priority" type="category" tickLine={false} axisLine={false} width={70} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Resolution Time by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Avg Resolution Time by Category (hrs)</CardTitle>
            <CardDescription>Time to resolve by issue type</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={resolutionConfig} className="h-[250px] w-full">
              <BarChart accessibilityLayer data={resolutionTime}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="category" tickLine={false} tickMargin={10} axisLine={false} tick={{ fontSize: 10 }} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="avgTime" fill="var(--color-avgTime)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Top Performers
            </CardTitle>
            <CardDescription>Best performing support agents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={performer.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{performer.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {performer.resolved} tickets resolved
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{performer.rating}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{performer.avgTime}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Breached Tickets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              SLA Breached Tickets
            </CardTitle>
            <CardDescription>Tickets that exceeded response time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {breachedTickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                  <div>
                    <div className="font-mono text-sm text-muted-foreground">{ticket.id}</div>
                    <div className="font-medium">{ticket.subject}</div>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {ticket.category}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <Badge variant="destructive">Breached</Badge>
                    <div className="text-xs text-muted-foreground mt-1">
                      +{ticket.breachTime}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}