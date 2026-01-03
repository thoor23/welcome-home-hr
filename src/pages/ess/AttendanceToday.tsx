import { useState } from "react";
import { ESSLayout } from "@/components/layout/ESSLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  LogIn, 
  LogOut, 
  Coffee, 
  MapPin, 
  Calendar,
  Timer,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import { format } from "date-fns";

export default function AttendanceToday() {
  const [isClockedIn, setIsClockedIn] = useState(true);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const currentDate = new Date();
  
  // Mock data
  const todayAttendance = {
    clockIn: "09:02 AM",
    clockOut: null,
    totalHours: "5h 32m",
    breakTime: "45m",
    effectiveHours: "4h 47m",
    status: "Present",
    shift: "General Shift (9:00 AM - 6:00 PM)",
    location: "Main Office - Building A",
  };

  const timelineEvents = [
    { time: "09:02 AM", event: "Clock In", icon: LogIn, status: "success" },
    { time: "11:30 AM", event: "Break Start", icon: Coffee, status: "warning" },
    { time: "11:45 AM", event: "Break End", icon: Coffee, status: "success" },
    { time: "01:00 PM", event: "Break Start", icon: Coffee, status: "warning" },
    { time: "01:30 PM", event: "Break End", icon: Coffee, status: "success" },
  ];

  const weekSummary = [
    { day: "Mon", hours: 8.5, status: "present" },
    { day: "Tue", hours: 8.2, status: "present" },
    { day: "Wed", hours: 0, status: "leave" },
    { day: "Thu", hours: 7.8, status: "present" },
    { day: "Fri", hours: 5.5, status: "ongoing" },
    { day: "Sat", hours: 0, status: "weekend" },
    { day: "Sun", hours: 0, status: "weekend" },
  ];

  const handleClockIn = () => {
    setIsClockedIn(true);
  };

  const handleClockOut = () => {
    setIsClockedIn(false);
  };

  const handleBreakToggle = () => {
    setIsOnBreak(!isOnBreak);
  };

  return (
    <ESSLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Today's Attendance</h1>
            <p className="text-muted-foreground">
              {format(currentDate, "EEEE, MMMM d, yyyy")}
            </p>
          </div>
          <Badge variant="outline" className="w-fit flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {todayAttendance.shift}
          </Badge>
        </div>

        {/* Clock In/Out Card */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Current Time Display */}
              <div className="text-center lg:text-left">
                <p className="text-sm text-muted-foreground mb-1">Current Time</p>
                <div className="text-4xl font-bold text-foreground font-mono">
                  {format(currentDate, "hh:mm:ss a")}
                </div>
                <div className="flex items-center gap-2 mt-2 justify-center lg:justify-start">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{todayAttendance.location}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-center">
                {isClockedIn ? (
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20 text-lg px-4 py-2">
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    {isOnBreak ? "On Break" : "Clocked In"}
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    <XCircle className="h-5 w-5 mr-2" />
                    Not Clocked In
                  </Badge>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {!isClockedIn ? (
                  <Button size="lg" onClick={handleClockIn} className="gap-2">
                    <LogIn className="h-5 w-5" />
                    Clock In
                  </Button>
                ) : (
                  <>
                    <Button 
                      size="lg" 
                      variant={isOnBreak ? "default" : "outline"} 
                      onClick={handleBreakToggle}
                      className="gap-2"
                    >
                      <Coffee className="h-5 w-5" />
                      {isOnBreak ? "End Break" : "Start Break"}
                    </Button>
                    <Button size="lg" variant="destructive" onClick={handleClockOut} className="gap-2">
                      <LogOut className="h-5 w-5" />
                      Clock Out
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Clock In</p>
                  <p className="text-2xl font-bold text-foreground">{todayAttendance.clockIn}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <LogIn className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Hours</p>
                  <p className="text-2xl font-bold text-foreground">{todayAttendance.totalHours}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Timer className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Break Time</p>
                  <p className="text-2xl font-bold text-foreground">{todayAttendance.breakTime}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Coffee className="h-5 w-5 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Effective Hours</p>
                  <p className="text-2xl font-bold text-foreground">{todayAttendance.effectiveHours}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today's Timeline</CardTitle>
              <CardDescription>Your activity log for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      event.status === "success" ? "bg-green-500/10" : "bg-orange-500/10"
                    }`}>
                      <event.icon className={`h-5 w-5 ${
                        event.status === "success" ? "text-green-500" : "text-orange-500"
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{event.event}</p>
                      <p className="text-sm text-muted-foreground">{event.time}</p>
                    </div>
                    <Badge variant="outline" className={
                      event.status === "success" 
                        ? "border-green-500/30 text-green-500" 
                        : "border-orange-500/30 text-orange-500"
                    }>
                      {event.status === "success" ? "Completed" : "Break"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">This Week's Summary</CardTitle>
              <CardDescription>Your attendance overview for the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weekSummary.map((day, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-10 text-sm font-medium text-muted-foreground">{day.day}</div>
                    <div className="flex-1">
                      <Progress 
                        value={day.status === "weekend" ? 0 : (day.hours / 9) * 100} 
                        className="h-2"
                      />
                    </div>
                    <div className="w-16 text-right">
                      {day.status === "weekend" ? (
                        <span className="text-sm text-muted-foreground">Off</span>
                      ) : day.status === "leave" ? (
                        <Badge variant="secondary" className="text-xs">Leave</Badge>
                      ) : day.status === "ongoing" ? (
                        <Badge className="bg-primary/10 text-primary text-xs">{day.hours}h</Badge>
                      ) : (
                        <span className="text-sm font-medium text-foreground">{day.hours}h</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total This Week</span>
                  <span className="text-lg font-bold text-foreground">30h 00m</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-muted-foreground">Expected</span>
                  <span className="text-sm text-muted-foreground">40h 00m</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Section */}
        <Card className="border-orange-500/20 bg-orange-500/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Reminder</p>
                <p className="text-sm text-muted-foreground">
                  You have 2 pending regularization requests from last week. Please ensure all attendance records are accurate.
                </p>
              </div>
              <Button variant="outline" size="sm" className="shrink-0">
                View Requests
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ESSLayout>
  );
}
