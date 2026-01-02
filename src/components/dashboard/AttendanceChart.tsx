import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const chartData = [
  { day: "Mon", present: 85, absent: 10, leave: 5 },
  { day: "Tue", present: 88, absent: 8, leave: 4 },
  { day: "Wed", present: 82, absent: 12, leave: 6 },
  { day: "Thu", present: 90, absent: 6, leave: 4 },
  { day: "Fri", present: 78, absent: 15, leave: 7 },
  { day: "Sat", present: 45, absent: 5, leave: 2 },
  { day: "Sun", present: 20, absent: 2, leave: 1 },
];

const chartConfig = {
  present: {
    label: "Present",
    color: "hsl(var(--primary))",
  },
  leave: {
    label: "On Leave",
    color: "hsl(142.1 76.2% 36.3%)",
  },
  absent: {
    label: "Absent",
    color: "hsl(0 84.2% 60.2%)",
  },
} satisfies ChartConfig;

export function AttendanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Attendance</CardTitle>
        <CardDescription>Employee attendance overview for the week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="present" fill="var(--color-present)" radius={4} />
            <Bar dataKey="leave" fill="var(--color-leave)" radius={4} />
            <Bar dataKey="absent" fill="var(--color-absent)" radius={4} />
          </BarChart>
        </ChartContainer>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
          <div>
            <p className="text-sm text-muted-foreground">Total Employees</p>
            <p className="text-xl font-bold text-foreground">248</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">↑ 12.5%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Avg. Attendance</p>
            <p className="text-xl font-bold text-foreground">94.2%</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">↑ 3.2%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">On Leave Today</p>
            <p className="text-xl font-bold text-foreground">12</p>
            <p className="text-xs text-red-500">↓ 2.1%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Late Arrivals</p>
            <p className="text-xl font-bold text-foreground">8</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">↑ 15.3%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
