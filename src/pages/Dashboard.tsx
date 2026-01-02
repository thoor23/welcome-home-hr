import { Users, UserCheck, UserX, UserPlus } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { AttendanceChart } from "@/components/dashboard/AttendanceChart";
import { DepartmentChart } from "@/components/dashboard/DepartmentChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <main className="flex-1 p-6 overflow-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground font-display">Welcome back, John</h1>
              <p className="text-muted-foreground mt-1">
                Here's what's happening with your workforce today.
              </p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="bg-secondary/50 border border-border/50">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <StatsCard
                    title="Total Employees"
                    value="248"
                    change="12.5%"
                    changeType="positive"
                    icon={Users}
                    iconColor="text-primary"
                  />
                  <StatsCard
                    title="Present Today"
                    value="215"
                    change="8.2%"
                    changeType="positive"
                    icon={UserCheck}
                    iconColor="text-emerald-500"
                  />
                  <StatsCard
                    title="On Leave"
                    value="18"
                    change="2.4%"
                    changeType="negative"
                    icon={UserX}
                    iconColor="text-amber-500"
                  />
                  <StatsCard
                    title="New Hires"
                    value="12"
                    change="24.5%"
                    changeType="positive"
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
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-xl p-12 text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Analytics Dashboard</h3>
                  <p className="text-muted-foreground">Detailed analytics and insights coming soon...</p>
                </div>
              </TabsContent>

              <TabsContent value="reports" className="mt-6">
                <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-xl p-12 text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Reports Center</h3>
                  <p className="text-muted-foreground">Generate and download reports coming soon...</p>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
