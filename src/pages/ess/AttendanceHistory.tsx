import { useState } from "react";
import { ESSLayout } from "@/components/layout/ESSLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  CalendarDays, 
  Download, 
  Filter,
  Clock,
  LogIn,
  LogOut,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Coffee
} from "lucide-react";
import { format, subDays, startOfMonth, endOfMonth } from "date-fns";

export default function AttendanceHistory() {
  const [selectedMonth, setSelectedMonth] = useState("january");
  const [selectedYear, setSelectedYear] = useState("2026");
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Mock attendance data
  const attendanceRecords = [
    {
      id: 1,
      date: "2026-01-03",
      day: "Friday",
      clockIn: "09:02 AM",
      clockOut: "06:15 PM",
      totalHours: "9h 13m",
      breakTime: "45m",
      effectiveHours: "8h 28m",
      status: "present",
      shift: "General",
    },
    {
      id: 2,
      date: "2026-01-02",
      day: "Thursday",
      clockIn: "08:55 AM",
      clockOut: "06:00 PM",
      totalHours: "9h 05m",
      breakTime: "1h 00m",
      effectiveHours: "8h 05m",
      status: "present",
      shift: "General",
    },
    {
      id: 3,
      date: "2026-01-01",
      day: "Wednesday",
      clockIn: "-",
      clockOut: "-",
      totalHours: "-",
      breakTime: "-",
      effectiveHours: "-",
      status: "holiday",
      shift: "-",
    },
    {
      id: 4,
      date: "2025-12-31",
      day: "Tuesday",
      clockIn: "09:30 AM",
      clockOut: "06:45 PM",
      totalHours: "9h 15m",
      breakTime: "30m",
      effectiveHours: "8h 45m",
      status: "late",
      shift: "General",
    },
    {
      id: 5,
      date: "2025-12-30",
      day: "Monday",
      clockIn: "09:00 AM",
      clockOut: "04:00 PM",
      totalHours: "7h 00m",
      breakTime: "30m",
      effectiveHours: "6h 30m",
      status: "early-leave",
      shift: "General",
    },
    {
      id: 6,
      date: "2025-12-29",
      day: "Sunday",
      clockIn: "-",
      clockOut: "-",
      totalHours: "-",
      breakTime: "-",
      effectiveHours: "-",
      status: "weekend",
      shift: "-",
    },
    {
      id: 7,
      date: "2025-12-28",
      day: "Saturday",
      clockIn: "-",
      clockOut: "-",
      totalHours: "-",
      breakTime: "-",
      effectiveHours: "-",
      status: "weekend",
      shift: "-",
    },
    {
      id: 8,
      date: "2025-12-27",
      day: "Friday",
      clockIn: "-",
      clockOut: "-",
      totalHours: "-",
      breakTime: "-",
      effectiveHours: "-",
      status: "leave",
      shift: "-",
    },
  ];

  // Monthly summary
  const monthlySummary = {
    totalDays: 31,
    workingDays: 22,
    present: 18,
    absent: 0,
    late: 2,
    earlyLeave: 1,
    leaves: 1,
    holidays: 2,
    weekends: 8,
    totalHours: "156h 30m",
    avgHours: "8h 42m",
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Present</Badge>;
      case "late":
        return <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20">Late</Badge>;
      case "early-leave":
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Early Leave</Badge>;
      case "absent":
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Absent</Badge>;
      case "leave":
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Leave</Badge>;
      case "holiday":
        return <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20">Holiday</Badge>;
      case "weekend":
        return <Badge variant="secondary">Weekend</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <ESSLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Attendance History</h1>
            <p className="text-muted-foreground">View your past attendance records</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Filter by:</span>
              </div>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="january">January</SelectItem>
                  <SelectItem value="february">February</SelectItem>
                  <SelectItem value="march">March</SelectItem>
                  <SelectItem value="april">April</SelectItem>
                  <SelectItem value="may">May</SelectItem>
                  <SelectItem value="june">June</SelectItem>
                  <SelectItem value="july">July</SelectItem>
                  <SelectItem value="august">August</SelectItem>
                  <SelectItem value="september">September</SelectItem>
                  <SelectItem value="october">October</SelectItem>
                  <SelectItem value="november">November</SelectItem>
                  <SelectItem value="december">December</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="secondary" size="sm">Apply</Button>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{monthlySummary.present}</p>
              <p className="text-xs text-muted-foreground">Present</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-2">
                <XCircle className="h-5 w-5 text-red-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{monthlySummary.absent}</p>
              <p className="text-xs text-muted-foreground">Absent</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{monthlySummary.late}</p>
              <p className="text-xs text-muted-foreground">Late</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-2">
                <CalendarDays className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{monthlySummary.leaves}</p>
              <p className="text-xs text-muted-foreground">Leaves</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-2">
                <Coffee className="h-5 w-5 text-purple-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{monthlySummary.holidays}</p>
              <p className="text-xs text-muted-foreground">Holidays</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{monthlySummary.avgHours}</p>
              <p className="text-xs text-muted-foreground">Avg/Day</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Calendar View</CardTitle>
              <CardDescription>Select a date to view details</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-muted-foreground">Present</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                  <span className="text-muted-foreground">Late</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span className="text-muted-foreground">Leave</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span className="text-muted-foreground">Absent</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attendance Table */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Attendance Records</CardTitle>
              <CardDescription>Detailed daily attendance log</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Clock In</TableHead>
                      <TableHead>Clock Out</TableHead>
                      <TableHead>Hours</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-foreground">{format(new Date(record.date), "MMM d, yyyy")}</p>
                            <p className="text-xs text-muted-foreground">{record.day}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {record.clockIn !== "-" && <LogIn className="h-3 w-3 text-green-500" />}
                            <span>{record.clockIn}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {record.clockOut !== "-" && <LogOut className="h-3 w-3 text-red-500" />}
                            <span>{record.clockOut}</span>
                          </div>
                        </TableCell>
                        <TableCell>{record.effectiveHours}</TableCell>
                        <TableCell>{getStatusBadge(record.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Statistics</CardTitle>
            <CardDescription>Overview of your attendance for {selectedMonth} {selectedYear}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Working Days</p>
                <p className="text-2xl font-bold text-foreground">{monthlySummary.workingDays}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Days Worked</p>
                <p className="text-2xl font-bold text-foreground">{monthlySummary.present}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Hours</p>
                <p className="text-2xl font-bold text-foreground">{monthlySummary.totalHours}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Hours/Day</p>
                <p className="text-2xl font-bold text-foreground">{monthlySummary.avgHours}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ESSLayout>
  );
}
