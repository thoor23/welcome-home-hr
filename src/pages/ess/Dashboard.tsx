import { ESSLayout } from "@/components/layout/ESSLayout";
import { ESSStatsCard } from "@/components/ess/ESSStatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CalendarCheck,
  CalendarDays,
  Clock,
  FileText,
  ClipboardList,
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const attendanceStats = {
  status: "Present",
  checkIn: "09:05 AM",
  workHours: "4h 32m",
  totalDays: 22,
  presentDays: 18,
  percentage: 82,
};

const leaveBalance = {
  casual: { total: 12, used: 4, remaining: 8 },
  sick: { total: 10, used: 2, remaining: 8 },
  earned: { total: 15, used: 5, remaining: 10 },
};

const pendingRequests = [
  { id: 1, type: "Leave", title: "Casual Leave", date: "Jan 15-17, 2026", status: "pending" },
  { id: 2, type: "Expense", title: "Travel Reimbursement", amount: "₹4,500", status: "pending" },
  { id: 3, type: "Shift", title: "Swap Request", date: "Jan 20, 2026", status: "pending" },
];

const upcomingEvents = [
  { id: 1, title: "Team Standup", time: "10:00 AM", location: "Meeting Room A" },
  { id: 2, title: "Project Review", time: "2:00 PM", location: "Conference Hall" },
  { id: 3, title: "HR Town Hall", time: "4:00 PM", location: "Auditorium" },
];

const recentActivity = [
  { id: 1, action: "Leave Approved", description: "Dec 25-26 Casual Leave", time: "2 hours ago", status: "success" },
  { id: 2, action: "Expense Rejected", description: "Internet Bill Claim", time: "1 day ago", status: "error" },
  { id: 3, action: "Payslip Generated", description: "December 2025", time: "3 days ago", status: "info" },
];

export default function ESSDashboard() {
  const totalLeaveRemaining = leaveBalance.casual.remaining + leaveBalance.sick.remaining + leaveBalance.earned.remaining;

  return (
    <ESSLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground">Welcome back, John! 👋</h1>
          <p className="text-muted-foreground">Here's what's happening with your work today.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ESSStatsCard
            title="Today's Status"
            value={attendanceStats.status}
            subtitle={`Check-in: ${attendanceStats.checkIn}`}
            icon={CalendarCheck}
            iconColor="text-green-500"
          />
          <ESSStatsCard
            title="Work Hours Today"
            value={attendanceStats.workHours}
            subtitle="Expected: 8h 00m"
            icon={Clock}
            iconColor="text-blue-500"
          />
          <ESSStatsCard
            title="Leave Balance"
            value={`${totalLeaveRemaining} days`}
            subtitle="Across all types"
            icon={CalendarDays}
            iconColor="text-purple-500"
          />
          <ESSStatsCard
            title="Pending Requests"
            value={pendingRequests.length.toString()}
            subtitle="Awaiting approval"
            icon={ClipboardList}
            iconColor="text-amber-500"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Attendance & Leave */}
          <div className="lg:col-span-2 space-y-6">
            {/* Attendance Summary */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Attendance Summary</CardTitle>
                  <CardDescription>This month's attendance overview</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/ess/attendance/history">
                    View History <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Monthly Attendance</span>
                    <span className="text-sm font-medium">{attendanceStats.presentDays}/{attendanceStats.totalDays} days</span>
                  </div>
                  <Progress value={attendanceStats.percentage} className="h-3" />
                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div className="text-center p-3 bg-green-500/10 rounded-lg">
                      <p className="text-2xl font-bold text-green-500">{attendanceStats.presentDays}</p>
                      <p className="text-xs text-muted-foreground">Present</p>
                    </div>
                    <div className="text-center p-3 bg-red-500/10 rounded-lg">
                      <p className="text-2xl font-bold text-red-500">2</p>
                      <p className="text-xs text-muted-foreground">Absent</p>
                    </div>
                    <div className="text-center p-3 bg-amber-500/10 rounded-lg">
                      <p className="text-2xl font-bold text-amber-500">2</p>
                      <p className="text-xs text-muted-foreground">Late</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Leave Balance */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Leave Balance</CardTitle>
                  <CardDescription>Available leave days by type</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/ess/leaves/apply">
                    Apply Leave <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(leaveBalance).map(([type, data]) => (
                    <div key={type} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium capitalize">{type} Leave</span>
                        <span className="text-sm text-muted-foreground">
                          {data.remaining}/{data.total} days
                        </span>
                      </div>
                      <Progress 
                        value={(data.remaining / data.total) * 100} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pending Requests */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Requests</CardTitle>
                <CardDescription>Your requests awaiting approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-500/10 rounded-lg">
                          {request.type === "Leave" && <CalendarDays className="h-4 w-4 text-amber-500" />}
                          {request.type === "Expense" && <FileText className="h-4 w-4 text-amber-500" />}
                          {request.type === "Shift" && <Clock className="h-4 w-4 text-amber-500" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{request.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {request.date || request.amount}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-amber-500/10 text-amber-500">
                        Pending
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Events & Activity */}
          <div className="space-y-6">
            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <div className="w-0.5 h-full bg-border" />
                      </div>
                      <div className="pb-4">
                        <p className="text-sm font-medium">{event.title}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className={`p-1.5 rounded-full ${
                        activity.status === "success" ? "bg-green-500/10" :
                        activity.status === "error" ? "bg-red-500/10" : "bg-blue-500/10"
                      }`}>
                        {activity.status === "success" && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {activity.status === "error" && <XCircle className="h-4 w-4 text-red-500" />}
                        {activity.status === "info" && <AlertCircle className="h-4 w-4 text-blue-500" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="h-auto py-3 flex-col gap-1" asChild>
                  <Link to="/ess/leaves/apply">
                    <CalendarDays className="h-5 w-5" />
                    <span className="text-xs">Apply Leave</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-3 flex-col gap-1" asChild>
                  <Link to="/ess/expenses/submit">
                    <FileText className="h-5 w-5" />
                    <span className="text-xs">Submit Expense</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-3 flex-col gap-1" asChild>
                  <Link to="/ess/attendance/regularization">
                    <ClipboardList className="h-5 w-5" />
                    <span className="text-xs">Regularize</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-3 flex-col gap-1" asChild>
                  <Link to="/ess/support/new">
                    <FileText className="h-5 w-5" />
                    <span className="text-xs">Raise Ticket</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ESSLayout>
  );
}
