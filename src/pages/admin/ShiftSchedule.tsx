import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Download, Copy, Clock, Users, AlertCircle, Timer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ScheduleEntry {
  date: string;
  shift: string;
}

interface EmployeeSchedule {
  id: string;
  name: string;
  profilePic?: string;
  department: string;
  schedule: ScheduleEntry[];
}

const shiftColors: Record<string, string> = {
  "General": "bg-blue-500/20 text-blue-600 border-blue-500/30",
  "Morning": "bg-emerald-500/20 text-emerald-600 border-emerald-500/30",
  "Evening": "bg-amber-500/20 text-amber-600 border-amber-500/30",
  "Night": "bg-purple-500/20 text-purple-600 border-purple-500/30",
  "Off": "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
};

const generateWeekDates = (startDate: Date): string[] => {
  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    dates.push(date.toISOString().split("T")[0]);
  }
  return dates;
};

const mockEmployees: EmployeeSchedule[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    department: "Engineering",
    schedule: [
      { date: "2026-01-05", shift: "General" },
      { date: "2026-01-06", shift: "General" },
      { date: "2026-01-07", shift: "General" },
      { date: "2026-01-08", shift: "General" },
      { date: "2026-01-09", shift: "General" },
      { date: "2026-01-10", shift: "Off" },
      { date: "2026-01-11", shift: "Off" },
    ],
  },
  {
    id: "2",
    name: "Priya Sharma",
    department: "Operations",
    schedule: [
      { date: "2026-01-05", shift: "Morning" },
      { date: "2026-01-06", shift: "Morning" },
      { date: "2026-01-07", shift: "Evening" },
      { date: "2026-01-08", shift: "Evening" },
      { date: "2026-01-09", shift: "Morning" },
      { date: "2026-01-10", shift: "Morning" },
      { date: "2026-01-11", shift: "Off" },
    ],
  },
  {
    id: "3",
    name: "Amit Patel",
    department: "Security",
    schedule: [
      { date: "2026-01-05", shift: "Night" },
      { date: "2026-01-06", shift: "Night" },
      { date: "2026-01-07", shift: "Off" },
      { date: "2026-01-08", shift: "Night" },
      { date: "2026-01-09", shift: "Night" },
      { date: "2026-01-10", shift: "Night" },
      { date: "2026-01-11", shift: "Off" },
    ],
  },
  {
    id: "4",
    name: "Sneha Reddy",
    department: "Customer Support",
    schedule: [
      { date: "2026-01-05", shift: "Evening" },
      { date: "2026-01-06", shift: "Evening" },
      { date: "2026-01-07", shift: "Evening" },
      { date: "2026-01-08", shift: "Morning" },
      { date: "2026-01-09", shift: "Morning" },
      { date: "2026-01-10", shift: "Off" },
      { date: "2026-01-11", shift: "Off" },
    ],
  },
  {
    id: "5",
    name: "Vikram Singh",
    department: "Engineering",
    schedule: [
      { date: "2026-01-05", shift: "General" },
      { date: "2026-01-06", shift: "General" },
      { date: "2026-01-07", shift: "General" },
      { date: "2026-01-08", shift: "General" },
      { date: "2026-01-09", shift: "General" },
      { date: "2026-01-10", shift: "Off" },
      { date: "2026-01-11", shift: "Off" },
    ],
  },
];

const departments = ["All", "Engineering", "Operations", "Security", "Customer Support", "HR", "Sales"];
const locations = ["All", "Head Office", "Branch A", "Branch B", "Warehouse"];

const ShiftSchedule = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date("2026-01-05"));
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [view, setView] = useState<"weekly" | "monthly">("weekly");

  const weekDates = generateWeekDates(currentWeekStart);
  const filteredEmployees = mockEmployees.filter(
    (emp) => selectedDepartment === "All" || emp.department === selectedDepartment
  );

  const formatDateHeader = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate(),
    };
  };

  const getShiftForDate = (schedule: ScheduleEntry[], date: string) => {
    const entry = schedule.find((s) => s.date === date);
    return entry?.shift || "Off";
  };

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(currentWeekStart.getDate() + (direction === "next" ? 7 : -7));
    setCurrentWeekStart(newDate);
  };

  const getWeekRange = () => {
    const endDate = new Date(currentWeekStart);
    endDate.setDate(currentWeekStart.getDate() + 6);
    return `${currentWeekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
  };

  const totalScheduledHours = 280; // Mock
  const employeesToday = 42;
  const overtimeHours = 24;
  const understaffedDays = 1;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          <main className="flex-1 p-6 overflow-auto min-w-0">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground font-display">Shift Schedule</h1>
                <p className="text-muted-foreground mt-1">Weekly and monthly roster management</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => toast.info("Copying last week's schedule")}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Previous
                </Button>
                <Button variant="outline" onClick={() => toast.info("Exporting schedule")}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatsCard
                title="Scheduled Hours"
                value={`${totalScheduledHours}h`}
                icon={Clock}
              />
              <StatsCard
                title="Employees Today"
                value={String(employeesToday)}
                icon={Users}
              />
              <StatsCard
                title="Overtime Hours"
                value={`${overtimeHours}h`}
                icon={Timer}
              />
              <StatsCard
                title="Understaffed Days"
                value={String(understaffedDays)}
                icon={AlertCircle}
              />
            </div>

            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Tabs value={view} onValueChange={(v) => setView(v as "weekly" | "monthly")}>
                      <TabsList>
                        <TabsTrigger value="weekly">Weekly</TabsTrigger>
                        <TabsTrigger value="monthly">Monthly</TabsTrigger>
                      </TabsList>
                    </Tabs>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={() => navigateWeek("prev")}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium min-w-[180px] text-center">
                        {getWeekRange()}
                      </span>
                      <Button variant="outline" size="icon" onClick={() => navigateWeek("next")}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((d) => (
                          <SelectItem key={d} value={d}>{d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((l) => (
                          <SelectItem key={l} value={l}>{l}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="text-left p-3 border-b border-border bg-muted/50 min-w-[200px] sticky left-0 z-10">
                          Employee
                        </th>
                        {weekDates.map((date) => {
                          const { day, date: dateNum } = formatDateHeader(date);
                          const isToday = date === new Date().toISOString().split("T")[0];
                          return (
                            <th
                              key={date}
                              className={cn(
                                "text-center p-3 border-b border-border min-w-[100px]",
                                isToday && "bg-primary/10"
                              )}
                            >
                              <div className="text-xs text-muted-foreground">{day}</div>
                              <div className={cn("text-lg font-semibold", isToday && "text-primary")}>
                                {dateNum}
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEmployees.map((employee) => (
                        <tr key={employee.id} className="hover:bg-muted/30 transition-colors">
                          <td className="p-3 border-b border-border sticky left-0 bg-background z-10">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={employee.profilePic} />
                                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                  {employee.name.split(" ").map((n) => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{employee.name}</p>
                                <p className="text-xs text-muted-foreground">{employee.department}</p>
                              </div>
                            </div>
                          </td>
                          {weekDates.map((date) => {
                            const shift = getShiftForDate(employee.schedule, date);
                            const isToday = date === new Date().toISOString().split("T")[0];
                            return (
                              <td
                                key={date}
                                className={cn(
                                  "p-2 border-b border-border text-center",
                                  isToday && "bg-primary/5"
                                )}
                              >
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "text-xs cursor-pointer hover:opacity-80 transition-opacity",
                                    shiftColors[shift]
                                  )}
                                  onClick={() => toast.info(`Click to edit ${employee.name}'s ${shift} shift`)}
                                >
                                  {shift}
                                </Badge>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">Shifts:</span>
                  {Object.entries(shiftColors).map(([shift, color]) => (
                    <div key={shift} className="flex items-center gap-2">
                      <Badge variant="outline" className={cn("text-xs", color)}>
                        {shift}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ShiftSchedule;
