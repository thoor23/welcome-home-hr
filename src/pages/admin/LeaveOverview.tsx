import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, CheckCircle, Clock, XCircle } from "lucide-react";

const stats = [
  {
    title: "Total Leave Requests",
    value: "156",
    change: "+12% from last month",
    icon: CalendarDays,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Approved",
    value: "124",
    change: "79% approval rate",
    icon: CheckCircle,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Pending",
    value: "18",
    change: "Awaiting approval",
    icon: Clock,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    title: "Rejected",
    value: "14",
    change: "9% rejection rate",
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
];

const LeaveOverview = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />

          <main className="flex-1 p-6 overflow-auto min-w-0">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-foreground font-display">Leave Overview</h1>
              <p className="text-muted-foreground mt-1">Monitor and manage employee leave requests</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
              {stats.map((stat) => (
                <Card key={stat.title} className="border-border">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-lg ${stat.bg}`}>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Leave Types Summary */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Leave Types Usage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { type: "Sick Leave", used: 45, total: 60, color: "bg-red-500" },
                    { type: "Casual Leave", used: 32, total: 48, color: "bg-blue-500" },
                    { type: "Annual Leave", used: 28, total: 36, color: "bg-emerald-500" },
                    { type: "Maternity/Paternity", used: 8, total: 12, color: "bg-purple-500" },
                  ].map((item) => (
                    <div key={item.type}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">{item.type}</span>
                        <span className="text-foreground font-medium">{item.used}/{item.total}</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full`}
                          style={{ width: `${(item.used / item.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Department-wise Leaves</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { dept: "Engineering", count: 42 },
                    { dept: "Marketing", count: 28 },
                    { dept: "Sales", count: 35 },
                    { dept: "HR", count: 18 },
                    { dept: "Finance", count: 22 },
                  ].map((item) => (
                    <div key={item.dept} className="flex justify-between items-center">
                      <span className="text-muted-foreground">{item.dept}</span>
                      <span className="text-foreground font-medium">{item.count} leaves</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming Leaves</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "Sarah Johnson", date: "Jan 20-22", type: "Casual" },
                    { name: "Mike Chen", date: "Jan 25", type: "Sick" },
                    { name: "Emily Davis", date: "Jan 28-30", type: "Annual" },
                    { name: "Alex Wilson", date: "Feb 1-5", type: "Annual" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div>
                        <p className="text-foreground font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </div>
                      <span className="text-xs bg-secondary px-2 py-1 rounded">{item.type}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default LeaveOverview;