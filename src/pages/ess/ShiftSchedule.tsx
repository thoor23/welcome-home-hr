import { ESSLayout } from "@/components/layout/ESSLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, MapPin, Users, ArrowRightLeft, Calendar as CalendarIcon, Sun, Moon, Sunset } from "lucide-react";
import { useState } from "react";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import { Link } from "react-router-dom";

const weeklySchedule = [
  { date: new Date(2026, 0, 5), shift: "Morning", time: "06:00 - 14:00", location: "Main Office", team: "Team Alpha" },
  { date: new Date(2026, 0, 6), shift: "Morning", time: "06:00 - 14:00", location: "Main Office", team: "Team Alpha" },
  { date: new Date(2026, 0, 7), shift: "Evening", time: "14:00 - 22:00", location: "Branch B", team: "Team Beta" },
  { date: new Date(2026, 0, 8), shift: "Evening", time: "14:00 - 22:00", location: "Branch B", team: "Team Beta" },
  { date: new Date(2026, 0, 9), shift: "Morning", time: "06:00 - 14:00", location: "Main Office", team: "Team Alpha" },
  { date: new Date(2026, 0, 10), shift: "Off", time: "-", location: "-", team: "-" },
  { date: new Date(2026, 0, 11), shift: "Off", time: "-", location: "-", team: "-" },
];

const upcomingShifts = [
  { id: 1, date: "2026-01-05", day: "Monday", shift: "Morning", time: "06:00 - 14:00", location: "Main Office", status: "confirmed" },
  { id: 2, date: "2026-01-06", day: "Tuesday", shift: "Morning", time: "06:00 - 14:00", location: "Main Office", status: "confirmed" },
  { id: 3, date: "2026-01-07", day: "Wednesday", shift: "Evening", time: "14:00 - 22:00", location: "Branch B", status: "confirmed" },
  { id: 4, date: "2026-01-08", day: "Thursday", shift: "Evening", time: "14:00 - 22:00", location: "Branch B", status: "pending" },
  { id: 5, date: "2026-01-09", day: "Friday", shift: "Morning", time: "06:00 - 14:00", location: "Main Office", status: "confirmed" },
];

const shiftStats = {
  totalHours: 160,
  workedHours: 88,
  remainingHours: 72,
  overtimeHours: 4,
};

export default function ShiftSchedule() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMonth, setViewMonth] = useState("january");

  const getShiftIcon = (shift: string) => {
    switch (shift) {
      case "Morning": return <Sun className="h-4 w-4 text-amber-500" />;
      case "Evening": return <Sunset className="h-4 w-4 text-orange-500" />;
      case "Night": return <Moon className="h-4 w-4 text-indigo-500" />;
      default: return null;
    }
  };

  const getShiftBadge = (shift: string) => {
    switch (shift) {
      case "Morning": return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">Morning</Badge>;
      case "Evening": return <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20">Evening</Badge>;
      case "Night": return <Badge className="bg-indigo-500/10 text-indigo-600 border-indigo-500/20">Night</Badge>;
      case "Off": return <Badge variant="secondary">Day Off</Badge>;
      default: return <Badge variant="outline">{shift}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed": return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Confirmed</Badge>;
      case "pending": return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">Pending</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });

  return (
    <ESSLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Shift Schedule</h1>
            <p className="text-muted-foreground">View your assigned shifts and work schedule</p>
          </div>
          <Button asChild>
            <Link to="/ess/shifts/swap">
              <ArrowRightLeft className="mr-2 h-4 w-4" />
              Request Swap
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{shiftStats.totalHours}h</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Worked Hours</CardTitle>
              <Clock className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">{shiftStats.workedHours}h</div>
              <p className="text-xs text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Remaining</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{shiftStats.remainingHours}h</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overtime</CardTitle>
              <Clock className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{shiftStats.overtimeHours}h</div>
              <p className="text-xs text-muted-foreground">Extra hours</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="week" className="space-y-4">
          <TabsList>
            <TabsTrigger value="week">Week View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="week" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>This Week's Schedule</CardTitle>
                <CardDescription>
                  {format(weekStart, "MMM d")} - {format(addDays(weekStart, 6), "MMM d, yyyy")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-7">
                  {weeklySchedule.map((day, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        day.shift === "Off" 
                          ? "bg-muted/50 border-dashed" 
                          : isSameDay(day.date, new Date()) 
                            ? "bg-primary/5 border-primary" 
                            : "bg-card"
                      }`}
                    >
                      <div className="text-center space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">
                          {format(day.date, "EEE")}
                        </p>
                        <p className={`text-lg font-bold ${isSameDay(day.date, new Date()) ? "text-primary" : ""}`}>
                          {format(day.date, "d")}
                        </p>
                        <div className="flex justify-center">
                          {getShiftIcon(day.shift)}
                        </div>
                        <p className="text-xs font-medium">{day.shift}</p>
                        {day.shift !== "Off" && (
                          <>
                            <p className="text-xs text-muted-foreground">{day.time}</p>
                            <p className="text-xs text-muted-foreground truncate">{day.location}</p>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-[300px_1fr]">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Select Date</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md"
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Select a date"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedDate && (
                    <div className="space-y-4">
                      {weeklySchedule.find(s => isSameDay(s.date, selectedDate)) ? (
                        (() => {
                          const shift = weeklySchedule.find(s => isSameDay(s.date, selectedDate))!;
                          return shift.shift === "Off" ? (
                            <div className="text-center py-8">
                              <Badge variant="secondary" className="text-lg px-4 py-2">Day Off</Badge>
                              <p className="text-muted-foreground mt-2">No shift scheduled</p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                {getShiftIcon(shift.shift)}
                                {getShiftBadge(shift.shift)}
                              </div>
                              <div className="grid gap-3">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <span>{shift.time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <span>{shift.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4 text-muted-foreground" />
                                  <span>{shift.team}</span>
                                </div>
                              </div>
                              <Button variant="outline" className="w-full" asChild>
                                <Link to="/ess/shifts/swap">
                                  <ArrowRightLeft className="mr-2 h-4 w-4" />
                                  Request Swap for this Shift
                                </Link>
                              </Button>
                            </div>
                          );
                        })()
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          No shift data available for this date
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Upcoming Shifts</CardTitle>
                  <CardDescription>Your scheduled shifts for the coming days</CardDescription>
                </div>
                <Select value={viewMonth} onValueChange={setViewMonth}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="january">January</SelectItem>
                    <SelectItem value="february">February</SelectItem>
                    <SelectItem value="march">March</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Day</TableHead>
                      <TableHead>Shift</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingShifts.map((shift) => (
                      <TableRow key={shift.id}>
                        <TableCell className="font-medium">{shift.date}</TableCell>
                        <TableCell>{shift.day}</TableCell>
                        <TableCell>{getShiftBadge(shift.shift)}</TableCell>
                        <TableCell>{shift.time}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            {shift.location}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(shift.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link to="/ess/shifts/swap">
                              <ArrowRightLeft className="h-4 w-4" />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ESSLayout>
  );
}
