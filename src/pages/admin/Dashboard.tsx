import { Users, UserCheck, UserX, UserPlus, Calendar, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { AttendanceChart } from "@/components/dashboard/AttendanceChart";
import { DepartmentChart } from "@/components/dashboard/DepartmentChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <main className="flex-1 p-6 overflow-auto">
            {/* Welcome Section */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground font-display">Welcome back, John</h1>
                <p className="text-muted-foreground mt-1">
                  Here's what's happening with your workforce today.
                </p>
              </div>
              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="font-medium">{format(currentTime, "EEEE, MMMM d, yyyy")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-medium tabular-nums">{format(currentTime, "hh:mm:ss a")}</span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Total Employees"
                value="248"
                icon={Users}
                iconColor="text-primary"
              />
              <StatsCard
                title="Present Today"
                value="215"
                icon={UserCheck}
                iconColor="text-emerald-500"
              />
              <StatsCard
                title="On Leave"
                value="18"
                icon={UserX}
                iconColor="text-amber-500"
              />
              <StatsCard
                title="New Hires"
                value="12"
                icon={UserPlus}
                iconColor="text-purple-500"
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <AttendanceChart />
              </div>
              <DepartmentChart />
            </div>

            {/* Activity & Events Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentActivity />
              <UpcomingEvents />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
