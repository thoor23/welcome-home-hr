import { ESSLayout } from "@/components/layout/ESSLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CalendarDays, 
  Plane, 
  Heart, 
  Baby, 
  Briefcase,
  GraduationCap,
  Calendar,
  TrendingUp,
  Clock,
  Plus,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

export default function LeaveBalance() {
  // Mock leave balance data
  const leaveBalances = [
    {
      id: 1,
      type: "Casual Leave",
      icon: CalendarDays,
      total: 12,
      used: 4,
      pending: 1,
      available: 7,
      color: "bg-blue-500",
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-500",
    },
    {
      id: 2,
      type: "Sick Leave",
      icon: Heart,
      total: 10,
      used: 2,
      pending: 0,
      available: 8,
      color: "bg-red-500",
      bgColor: "bg-red-500/10",
      textColor: "text-red-500",
    },
    {
      id: 3,
      type: "Earned Leave",
      icon: Briefcase,
      total: 15,
      used: 5,
      pending: 2,
      available: 8,
      color: "bg-green-500",
      bgColor: "bg-green-500/10",
      textColor: "text-green-500",
    },
    {
      id: 4,
      type: "Vacation Leave",
      icon: Plane,
      total: 10,
      used: 3,
      pending: 0,
      available: 7,
      color: "bg-purple-500",
      bgColor: "bg-purple-500/10",
      textColor: "text-purple-500",
    },
    {
      id: 5,
      type: "Maternity/Paternity",
      icon: Baby,
      total: 15,
      used: 0,
      pending: 0,
      available: 15,
      color: "bg-pink-500",
      bgColor: "bg-pink-500/10",
      textColor: "text-pink-500",
    },
    {
      id: 6,
      type: "Study Leave",
      icon: GraduationCap,
      total: 5,
      used: 1,
      pending: 0,
      available: 4,
      color: "bg-orange-500",
      bgColor: "bg-orange-500/10",
      textColor: "text-orange-500",
    },
  ];

  // Summary stats
  const totalAvailable = leaveBalances.reduce((sum, l) => sum + l.available, 0);
  const totalUsed = leaveBalances.reduce((sum, l) => sum + l.used, 0);
  const totalPending = leaveBalances.reduce((sum, l) => sum + l.pending, 0);
  const totalLeaves = leaveBalances.reduce((sum, l) => sum + l.total, 0);

  // Upcoming leaves
  const upcomingLeaves = [
    {
      id: 1,
      type: "Earned Leave",
      startDate: "Jan 15, 2026",
      endDate: "Jan 17, 2026",
      days: 3,
      status: "approved",
    },
    {
      id: 2,
      type: "Casual Leave",
      startDate: "Feb 14, 2026",
      endDate: "Feb 14, 2026",
      days: 1,
      status: "pending",
    },
  ];

  return (
    <ESSLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Leave Balance</h1>
            <p className="text-muted-foreground">View your leave entitlements and usage</p>
          </div>
          <Link to="/ess/leaves/apply">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Apply Leave
            </Button>
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Available</p>
                  <p className="text-3xl font-bold text-foreground">{totalAvailable}</p>
                  <p className="text-xs text-muted-foreground">days</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Used This Year</p>
                  <p className="text-3xl font-bold text-foreground">{totalUsed}</p>
                  <p className="text-xs text-muted-foreground">days</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Approval</p>
                  <p className="text-3xl font-bold text-foreground">{totalPending}</p>
                  <p className="text-xs text-muted-foreground">days</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Entitlement</p>
                  <p className="text-3xl font-bold text-foreground">{totalLeaves}</p>
                  <p className="text-xs text-muted-foreground">days/year</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CalendarDays className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leave Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leaveBalances.map((leave) => (
            <Card key={leave.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full ${leave.bgColor} flex items-center justify-center`}>
                      <leave.icon className={`h-5 w-5 ${leave.textColor}`} />
                    </div>
                    <div>
                      <CardTitle className="text-base">{leave.type}</CardTitle>
                      <CardDescription>{leave.total} days/year</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-2xl font-bold ${leave.textColor}`}>{leave.available}</span>
                    <p className="text-xs text-muted-foreground">available</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-3">
                  <Progress 
                    value={(leave.used / leave.total) * 100} 
                    className="h-2"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <div className={`h-2 w-2 rounded-full ${leave.color}`}></div>
                        <span className="text-muted-foreground">Used: {leave.used}</span>
                      </div>
                      {leave.pending > 0 && (
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                          <span className="text-muted-foreground">Pending: {leave.pending}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Leaves */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Upcoming Leaves</CardTitle>
                  <CardDescription>Your scheduled time off</CardDescription>
                </div>
                <Link to="/ess/leaves/requests">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {upcomingLeaves.length > 0 ? (
                <div className="space-y-4">
                  {upcomingLeaves.map((leave) => (
                    <div key={leave.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <CalendarDays className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{leave.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {leave.startDate} {leave.endDate !== leave.startDate && `- ${leave.endDate}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          className={
                            leave.status === "approved" 
                              ? "bg-green-500/10 text-green-500 border-green-500/20" 
                              : "bg-orange-500/10 text-orange-500 border-orange-500/20"
                          }
                        >
                          {leave.status}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">{leave.days} day(s)</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarDays className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No upcoming leaves scheduled</p>
                  <Link to="/ess/leaves/apply">
                    <Button variant="outline" size="sm" className="mt-3">
                      Apply for Leave
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Leave Policy Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Leave Policy</CardTitle>
              <CardDescription>Important information about your leaves</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                  <p className="font-medium text-foreground">Carry Forward</p>
                  <p className="text-sm text-muted-foreground">
                    Up to 5 earned leaves can be carried forward to next year
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-orange-500/5 border border-orange-500/20">
                  <p className="font-medium text-foreground">Leave Encashment</p>
                  <p className="text-sm text-muted-foreground">
                    Unused earned leaves beyond carry forward limit will be encashed
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                  <p className="font-medium text-foreground">Advance Notice</p>
                  <p className="text-sm text-muted-foreground">
                    Please apply for planned leaves at least 3 days in advance
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-purple-500/5 border border-purple-500/20">
                  <p className="font-medium text-foreground">Sick Leave</p>
                  <p className="text-sm text-muted-foreground">
                    Medical certificate required for sick leave exceeding 2 days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ESSLayout>
  );
}
