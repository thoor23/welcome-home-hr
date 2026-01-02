import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TicketCheck, 
  Clock, 
  TrendingUp, 
  Star,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

const monthlyTickets = [
  { month: "Jul", tickets: 45, resolved: 42 },
  { month: "Aug", tickets: 52, resolved: 48 },
  { month: "Sep", tickets: 38, resolved: 36 },
  { month: "Oct", tickets: 65, resolved: 58 },
  { month: "Nov", tickets: 58, resolved: 55 },
  { month: "Dec", tickets: 72, resolved: 68 },
];

const categoryData = [
  { name: "IT Support", value: 45, color: "#3B82F6" },
  { name: "HR Query", value: 32, color: "#8B5CF6" },
  { name: "Facilities", value: 18, color: "#10B981" },
  { name: "Payroll", value: 28, color: "#F59E0B" },
  { name: "Leave Related", value: 56, color: "#EC4899" },
  { name: "General", value: 12, color: "#6B7280" },
];

const priorityData = [
  { priority: "Critical", count: 8, color: "#EF4444" },
  { priority: "High", count: 35, color: "#F97316" },
  { priority: "Medium", count: 98, color: "#EAB308" },
  { priority: "Low", count: 50, color: "#22C55E" },
];

const resolutionTime = [
  { category: "IT Support", avgTime: 18 },
  { category: "HR Query", avgTime: 24 },
  { category: "Facilities", avgTime: 48 },
  { category: "Payroll", avgTime: 20 },
  { category: "Leave", avgTime: 12 },
  { category: "General", avgTime: 36 },
];

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
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Support Report</h1>
              <p className="text-muted-foreground">Analytics and insights for support performance</p>
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
                  <CardTitle className="text-base">Tickets Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyTickets}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="tickets" 
                          stroke="#3B82F6" 
                          strokeWidth={2}
                          name="Total Tickets"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="resolved" 
                          stroke="#10B981" 
                          strokeWidth={2}
                          name="Resolved"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Tickets by Category */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Tickets by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Tickets by Priority */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Tickets by Priority</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={priorityData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis type="number" className="text-xs" />
                        <YAxis dataKey="priority" type="category" className="text-xs" width={70} />
                        <Tooltip />
                        <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                          {priorityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Resolution Time by Category */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Avg Resolution Time by Category (hrs)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={resolutionTime}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="category" className="text-xs" tick={{ fontSize: 10 }} />
                        <YAxis className="text-xs" />
                        <Tooltip />
                        <Bar dataKey="avgTime" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tables Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Performers */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Top Performers
                  </CardTitle>
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
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    SLA Breached Tickets
                  </CardTitle>
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
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
