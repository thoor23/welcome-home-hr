import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, TrendingUp, MapPin, Users } from "lucide-react";
import { Pie, PieChart, Bar, BarChart, Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

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

const monthlyConfig = {
  events: { label: "Events", color: "hsl(var(--primary))" },
} satisfies ChartConfig;

const eventsByCategory = [
  { category: "meeting", value: 45, fill: "hsl(217 91% 60%)" },
  { category: "training", value: 23, fill: "hsl(262 83% 58%)" },
  { category: "workshop", value: 18, fill: "hsl(142 76% 36%)" },
  { category: "conference", value: 8, fill: "hsl(38 92% 50%)" },
  { category: "holiday", value: 12, fill: "hsl(0 84% 60%)" },
  { category: "teambuilding", value: 15, fill: "hsl(330 81% 60%)" },
  { category: "webinar", value: 32, fill: "hsl(var(--primary))" },
];

const categoryConfig = {
  value: { label: "Events" },
  meeting: { label: "Meeting", color: "hsl(217 91% 60%)" },
  training: { label: "Training", color: "hsl(262 83% 58%)" },
  workshop: { label: "Workshop", color: "hsl(142 76% 36%)" },
  conference: { label: "Conference", color: "hsl(38 92% 50%)" },
  holiday: { label: "Holiday", color: "hsl(0 84% 60%)" },
  teambuilding: { label: "Team Building", color: "hsl(330 81% 60%)" },
  webinar: { label: "Webinar", color: "hsl(186 94% 41%)" },
} satisfies ChartConfig;

const eventsByLocation = [
  { location: "HQ Office", events: 45 },
  { location: "Store 1", events: 28 },
  { location: "Store 2", events: 22 },
  { location: "Virtual", events: 35 },
  { location: "Training Room", events: 18 },
];

const locationConfig = {
  events: { label: "Events", color: "hsl(142 76% 36%)" },
} satisfies ChartConfig;

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

const attendanceConfig = {
  attendees: { label: "Attendees", color: "hsl(262 83% 58%)" },
} satisfies ChartConfig;

const EventReport = () => {
  const totalEventsYear = eventsByMonth.reduce((sum, m) => sum + m.events, 0);
  const avgEventsMonth = Math.round(totalEventsYear / 12);
  const avgAttendees = Math.round(
    attendanceTrends.reduce((sum, m) => sum + m.attendees, 0) / 12
  );

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground font-display">Event Report</h1>
        <p className="text-muted-foreground mt-1">Analytics and insights for events</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard title="Total Events (Year)" value={totalEventsYear.toString()} icon={CalendarDays} />
        <StatsCard title="Avg Events/Month" value={avgEventsMonth.toString()} icon={TrendingUp} />
        <StatsCard title="Most Active Location" value="HQ Office" icon={MapPin} />
        <StatsCard title="Avg Attendees" value={avgAttendees.toString()} icon={Users} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Events by Month */}
        <Card>
          <CardHeader>
            <CardTitle>Events by Month</CardTitle>
            <CardDescription>Monthly event distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={monthlyConfig} className="h-[300px] w-full">
              <BarChart accessibilityLayer data={eventsByMonth}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="events" fill="var(--color-events)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Events by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Events by Category</CardTitle>
            <CardDescription>Event type distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={categoryConfig} className="mx-auto aspect-square max-h-[300px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={eventsByCategory} dataKey="value" nameKey="category" innerRadius={60} outerRadius={100} strokeWidth={5} />
                <ChartLegend content={<ChartLegendContent nameKey="category" />} className="-translate-y-2 flex-wrap gap-2" />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Events by Location */}
        <Card>
          <CardHeader>
            <CardTitle>Events by Location</CardTitle>
            <CardDescription>Venue-wise event distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={locationConfig} className="h-[300px] w-full">
              <BarChart accessibilityLayer data={eventsByLocation} layout="vertical">
                <CartesianGrid horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} />
                <YAxis dataKey="location" type="category" tickLine={false} axisLine={false} width={100} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="events" fill="var(--color-events)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Attendance Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Trends</CardTitle>
            <CardDescription>Monthly attendee counts</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={attendanceConfig} className="h-[300px] w-full">
              <LineChart accessibilityLayer data={attendanceTrends}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="attendees" stroke="var(--color-attendees)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default EventReport;