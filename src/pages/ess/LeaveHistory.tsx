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
  Download, 
  Filter,
  CalendarDays,
  CheckCircle2,
  XCircle,
  Plane,
  Heart,
  Briefcase,
  Baby,
  GraduationCap
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function LeaveHistory() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedType, setSelectedType] = useState("all");
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Mock leave history data
  const leaveHistory = [
    {
      id: 1,
      leaveType: "Vacation Leave",
      icon: Plane,
      startDate: "2025-12-25",
      endDate: "2025-12-27",
      days: 3,
      reason: "Christmas holidays with family",
      status: "completed",
      approver: "John Manager",
    },
    {
      id: 2,
      leaveType: "Sick Leave",
      icon: Heart,
      startDate: "2025-12-20",
      endDate: "2025-12-21",
      days: 2,
      reason: "Fever and cold symptoms",
      status: "completed",
      approver: "John Manager",
    },
    {
      id: 3,
      leaveType: "Casual Leave",
      icon: CalendarDays,
      startDate: "2025-11-15",
      endDate: "2025-11-15",
      days: 1,
      reason: "Personal work",
      status: "completed",
      approver: "John Manager",
    },
    {
      id: 4,
      leaveType: "Earned Leave",
      icon: Briefcase,
      startDate: "2025-10-14",
      endDate: "2025-10-18",
      days: 5,
      reason: "Diwali vacation",
      status: "completed",
      approver: "John Manager",
    },
    {
      id: 5,
      leaveType: "Study Leave",
      icon: GraduationCap,
      startDate: "2025-09-10",
      endDate: "2025-09-10",
      days: 1,
      reason: "Professional certification exam",
      status: "completed",
      approver: "John Manager",
    },
    {
      id: 6,
      leaveType: "Casual Leave",
      icon: CalendarDays,
      startDate: "2025-08-20",
      endDate: "2025-08-20",
      days: 1,
      reason: "Doctor appointment",
      status: "cancelled",
      approver: "John Manager",
    },
    {
      id: 7,
      leaveType: "Sick Leave",
      icon: Heart,
      startDate: "2025-07-05",
      endDate: "2025-07-06",
      days: 2,
      reason: "Food poisoning",
      status: "completed",
      approver: "John Manager",
    },
  ];

  // Filter by type
  const filteredHistory = selectedType === "all" 
    ? leaveHistory 
    : leaveHistory.filter(l => l.leaveType.toLowerCase().includes(selectedType.toLowerCase()));

  // Summary by type
  const summary = {
    casual: leaveHistory.filter(l => l.leaveType === "Casual Leave" && l.status === "completed").reduce((sum, l) => sum + l.days, 0),
    sick: leaveHistory.filter(l => l.leaveType === "Sick Leave" && l.status === "completed").reduce((sum, l) => sum + l.days, 0),
    earned: leaveHistory.filter(l => l.leaveType === "Earned Leave" && l.status === "completed").reduce((sum, l) => sum + l.days, 0),
    vacation: leaveHistory.filter(l => l.leaveType === "Vacation Leave" && l.status === "completed").reduce((sum, l) => sum + l.days, 0),
    study: leaveHistory.filter(l => l.leaveType === "Study Leave" && l.status === "completed").reduce((sum, l) => sum + l.days, 0),
    total: leaveHistory.filter(l => l.status === "completed").reduce((sum, l) => sum + l.days, 0),
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-gray-500/10 text-gray-500 border-gray-500/20">
            <XCircle className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getLeaveIcon = (type: string) => {
    const leave = leaveHistory.find(l => l.leaveType === type);
    const Icon = leave?.icon || CalendarDays;
    return Icon;
  };

  return (
    <ESSLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Leave History</h1>
            <p className="text-muted-foreground">View your past leave records</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Filter:</span>
              </div>
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
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Leave Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="casual">Casual Leave</SelectItem>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="earned">Earned Leave</SelectItem>
                  <SelectItem value="vacation">Vacation Leave</SelectItem>
                  <SelectItem value="study">Study Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <CalendarDays className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{summary.casual}</p>
              <p className="text-xs text-muted-foreground">Casual</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="h-6 w-6 text-red-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{summary.sick}</p>
              <p className="text-xs text-muted-foreground">Sick</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Briefcase className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{summary.earned}</p>
              <p className="text-xs text-muted-foreground">Earned</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Plane className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{summary.vacation}</p>
              <p className="text-xs text-muted-foreground">Vacation</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <GraduationCap className="h-6 w-6 text-orange-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{summary.study}</p>
              <p className="text-xs text-muted-foreground">Study</p>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 text-center">
              <CalendarDays className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-primary">{summary.total}</p>
              <p className="text-xs text-muted-foreground">Total Used</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Calendar View</CardTitle>
              <CardDescription>Visual overview of leaves taken</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className={cn("rounded-md border pointer-events-auto")}
              />
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-foreground">Legend</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-muted-foreground">Casual</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span className="text-muted-foreground">Sick</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-muted-foreground">Earned</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                    <span className="text-muted-foreground">Vacation</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leave History Table */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Leave Records</CardTitle>
              <CardDescription>Detailed history of all leaves taken</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Leave Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredHistory.map((leave) => {
                      const Icon = leave.icon;
                      return (
                        <TableRow key={leave.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{leave.leaveType}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-foreground">
                                {format(new Date(leave.startDate), "MMM d")}
                                {leave.endDate !== leave.startDate && ` - ${format(new Date(leave.endDate), "MMM d")}`}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {format(new Date(leave.startDate), "yyyy")}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{leave.days}</Badge>
                          </TableCell>
                          <TableCell>
                            <p className="max-w-[200px] truncate text-sm text-muted-foreground">
                              {leave.reason}
                            </p>
                          </TableCell>
                          <TableCell>{getStatusBadge(leave.status)}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Yearly Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Yearly Summary - {selectedYear}</CardTitle>
            <CardDescription>Overview of your leave usage for the year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Total Leaves Taken</p>
                <p className="text-3xl font-bold text-foreground">{summary.total}</p>
                <p className="text-xs text-muted-foreground">days</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Leaves Cancelled</p>
                <p className="text-3xl font-bold text-foreground">
                  {leaveHistory.filter(l => l.status === "cancelled").length}
                </p>
                <p className="text-xs text-muted-foreground">requests</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Most Used Type</p>
                <p className="text-xl font-bold text-foreground">Sick Leave</p>
                <p className="text-xs text-muted-foreground">{summary.sick} days</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Per Month</p>
                <p className="text-3xl font-bold text-foreground">{(summary.total / 12).toFixed(1)}</p>
                <p className="text-xs text-muted-foreground">days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ESSLayout>
  );
}
