import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, TrendingUp, MapPin, Users } from "lucide-react";
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
  Legend,
  LineChart,
  Line,
} from "recharts";

// Sample data for charts
const eventsByMonth = [
  { month: "Jan", events: 12 },
  { month: "Feb", events: 15 },
  { month: "Mar", events: 18 },
  { month: "Apr", events: 14 },
  { month: "May", events: 22 },
  { month: "Jun", events: 19 },
  { month: "Jul", events: 16 },
  { month: "Aug", events: 21 },
  { month: "Sep", events: 25 },
  { month: "Oct", events: 18 },
  { month: "Nov", events: 20 },
  { month: "Dec", events: 15 },
];

const eventsByCategory = [
  { name: "Meeting", value: 45, color: "#3B82F6" },
  { name: "Training", value: 23, color: "#8B5CF6" },
  { name: "Workshop", value: 18, color: "#10B981" },
  { name: "Conference", value: 8, color: "#F59E0B" },
  { name: "Holiday", value: 12, color: "#EF4444" },
  { name: "Team Building", value: 15, color: "#EC4899" },
  { name: "Webinar", value: 32, color: "#06B6D4" },
];

const eventsByLocation = [
  { location: "HQ Office", events: 45 },
  { location: "Store 1", events: 28 },
  { location: "Store 2", events: 22 },
  { location: "Virtual", events: 35 },
  { location: "Training Room", events: 18 },
];

const attendanceTrends = [
  { month: "Jan", attendees: 120 },
  { month: "Feb", attendees: 145 },
  { month: "Mar", attendees: 168 },
  { month: "Apr", attendees: 155 },
  { month: "May", attendees: 210 },
  { month: "Jun", attendees: 185 },
  { month: "Jul", attendees: 160 },
  { month: "Aug", attendees: 195 },
  { month: "Sep", attendees: 230 },
  { month: "Oct", attendees: 175 },
  { month: "Nov", attendees: 200 },
  { month: "Dec", attendees: 150 },
];

const EventReport = () => {
  const totalEventsYear = eventsByMonth.reduce((sum, m) => sum + m.events, 0);
  const avgEventsMonth = Math.round(totalEventsYear / 12);
  const avgAttendees = Math.round(
    attendanceTrends.reduce((sum, m) => sum + m.attendees, 0) / 12
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 overflow-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground">Event Report</h1>
              <p className="text-muted-foreground">Analytics and insights for events</p>
            </div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <StatsCard
                title="Total Events (Year)"
                value={totalEventsYear.toString()}
                icon={CalendarDays}
              />
              <StatsCard
                title="Avg Events/Month"
                value={avgEventsMonth.toString()}
                icon={TrendingUp}
              />
              <StatsCard
                title="Most Active Location"
                value="HQ Office"
                icon={MapPin}
              />
              <StatsCard
                title="Avg Attendees"
                value={avgAttendees.toString()}
                icon={Users}
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Events by Month */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Events by Month
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={eventsByMonth}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="month" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="events" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Events by Category */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Events by Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={eventsByCategory}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                          labelLine={false}
                        >
                          {eventsByCategory.map((entry, index) => (
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
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Events by Location */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Events by Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={eventsByLocation} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis type="number" className="text-xs" />
                        <YAxis dataKey="location" type="category" width={100} className="text-xs" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="events" fill="#10B981" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Attendance Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Attendance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={attendanceTrends}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="month" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="attendees"
                          stroke="#8B5CF6"
                          strokeWidth={2}
                          dot={{ fill: "#8B5CF6", strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default EventReport;
