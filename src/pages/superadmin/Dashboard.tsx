import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, CreditCard, TrendingUp, AlertTriangle, CheckCircle, Clock, DollarSign } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const stats = [
  { title: "Total Organizations", value: "248", change: "+12%", changeType: "positive", icon: Building2 },
  { title: "Total Users", value: "15,420", change: "+8.2%", changeType: "positive", icon: Users },
  { title: "Active Subscriptions", value: "186", change: "+5%", changeType: "positive", icon: CreditCard },
  { title: "Monthly Revenue", value: "$48,250", change: "+15.3%", changeType: "positive", icon: DollarSign },
];

const growthData = [
  { month: "Jan", organizations: 180, users: 12000 },
  { month: "Feb", organizations: 195, users: 12800 },
  { month: "Mar", organizations: 210, users: 13500 },
  { month: "Apr", organizations: 220, users: 14200 },
  { month: "May", organizations: 235, users: 14800 },
  { month: "Jun", organizations: 248, users: 15420 },
];

const revenueData = [
  { month: "Jan", revenue: 35000 },
  { month: "Feb", revenue: 38000 },
  { month: "Mar", revenue: 42000 },
  { month: "Apr", revenue: 45000 },
  { month: "May", revenue: 46500 },
  { month: "Jun", revenue: 48250 },
];

const recentOrganizations = [
  { name: "TechCorp Inc.", plan: "Enterprise", status: "active", users: 450 },
  { name: "StartupXYZ", plan: "Pro", status: "pending", users: 25 },
  { name: "MegaCorp Ltd.", plan: "Enterprise", status: "active", users: 1200 },
  { name: "SmallBiz Co.", plan: "Starter", status: "active", users: 8 },
  { name: "Innovation Labs", plan: "Pro", status: "trial", users: 45 },
];

const systemAlerts = [
  { type: "warning", message: "High API usage detected for TechCorp Inc.", time: "5 min ago" },
  { type: "error", message: "Payment failed for StartupXYZ subscription", time: "1 hour ago" },
  { type: "info", message: "New organization registration: Innovation Labs", time: "2 hours ago" },
];

export default function SuperAdminDashboard() {
  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Platform Overview</h1>
          <p className="text-muted-foreground">Monitor and manage all organizations on the platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    <p className={`text-sm mt-1 ${stat.changeType === "positive" ? "text-green-500" : "text-destructive"}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-superadmin/10 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-superadmin" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Growth Chart */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Platform Growth</CardTitle>
              <CardDescription>Organizations and users over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="organizations" 
                      stroke="hsl(var(--superadmin))" 
                      fill="hsl(var(--superadmin) / 0.2)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Chart */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
              <CardDescription>Revenue trend over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                      formatter={(value) => [`$${value}`, "Revenue"]}
                    />
                    <Bar 
                      dataKey="revenue" 
                      fill="hsl(var(--superadmin))" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Organizations */}
          <Card className="lg:col-span-2 bg-card border-border">
            <CardHeader>
              <CardTitle>Recent Organizations</CardTitle>
              <CardDescription>Latest organization activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrganizations.map((org, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-superadmin/10 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-superadmin" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{org.name}</p>
                        <p className="text-sm text-muted-foreground">{org.users} users • {org.plan}</p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      org.status === "active" ? "bg-green-500/10 text-green-500" :
                      org.status === "pending" ? "bg-yellow-500/10 text-yellow-500" :
                      "bg-blue-500/10 text-blue-500"
                    }`}>
                      {org.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Recent platform notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemAlerts.map((alert, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`mt-0.5 ${
                      alert.type === "error" ? "text-destructive" :
                      alert.type === "warning" ? "text-yellow-500" :
                      "text-blue-500"
                    }`}>
                      {alert.type === "error" ? <AlertTriangle className="h-5 w-5" /> :
                       alert.type === "warning" ? <Clock className="h-5 w-5" /> :
                       <CheckCircle className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SuperAdminLayout>
  );
}
