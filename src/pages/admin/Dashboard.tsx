import { Users, UserCheck, UserX, UserPlus, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { TooltipProvider } from "@/components/ui/tooltip";
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
    <TooltipProvider>
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 border border-border rounded-lg">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground tabular-nums">
                  {format(currentTime, "MM/dd/yyyy hh:mm a")}
                </span>
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
    </TooltipProvider>
  );
};

export default Dashboard;
