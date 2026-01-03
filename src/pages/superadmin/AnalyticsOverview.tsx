import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, TrendingUp, DollarSign, Activity, Globe } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const stats = [
  { title: "Total Organizations", value: "248", change: "+12%", icon: Building2 },
  { title: "Total Users", value: "15,420", change: "+8.2%", icon: Users },
  { title: "Monthly Revenue", value: "$48,250", change: "+15.3%", icon: DollarSign },
  { title: "Active Sessions", value: "1,234", change: "+5%", icon: Activity },
];

const chartData = [
  { month: "Jan", revenue: 35000, users: 12000 },
  { month: "Feb", revenue: 38000, users: 12800 },
  { month: "Mar", revenue: 42000, users: 13500 },
  { month: "Apr", revenue: 45000, users: 14200 },
  { month: "May", revenue: 46500, users: 14800 },
  { month: "Jun", revenue: 48250, users: 15420 },
];

const planDistribution = [
  { name: "Starter", value: 45, color: "hsl(var(--chart-1))" },
  { name: "Pro", value: 98, color: "hsl(var(--chart-2))" },
  { name: "Enterprise", value: 43, color: "hsl(var(--superadmin))" },
];

const regionData = [
  { region: "North America", orgs: 120, percentage: 48 },
  { region: "Europe", orgs: 75, percentage: 30 },
  { region: "Asia Pacific", orgs: 35, percentage: 14 },
  { region: "Other", orgs: 18, percentage: 8 },
];

export default function AnalyticsOverview() {
  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Overview</h1>
          <p className="text-muted-foreground">Platform-wide metrics and insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    <p className="text-sm text-green-500 mt-1">{stat.change}</p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-superadmin/10 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-superadmin" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Revenue & User Growth</CardTitle>
              <CardDescription>Monthly trends over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                    <Area type="monotone" dataKey="revenue" stroke="hsl(var(--superadmin))" fill="hsl(var(--superadmin) / 0.2)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Plan Distribution</CardTitle>
              <CardDescription>Organizations by subscription plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={planDistribution} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                      {planDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Geographic Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {regionData.map((region) => (
                <div key={region.region} className="p-4 rounded-lg bg-muted/30">
                  <p className="font-medium text-foreground">{region.region}</p>
                  <p className="text-2xl font-bold text-superadmin">{region.orgs}</p>
                  <p className="text-sm text-muted-foreground">{region.percentage}% of total</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SuperAdminLayout>
  );
}
