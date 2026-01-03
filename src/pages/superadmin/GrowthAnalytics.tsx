import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Users, Building2, DollarSign, UserMinus } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const growthData = [
  { month: "Jan", signups: 12, churn: 2 },
  { month: "Feb", signups: 18, churn: 1 },
  { month: "Mar", signups: 15, churn: 3 },
  { month: "Apr", signups: 22, churn: 2 },
  { month: "May", signups: 28, churn: 4 },
  { month: "Jun", signups: 25, churn: 2 },
];

const stats = [
  { title: "New Signups (30d)", value: "45", change: "+18%", positive: true, icon: Building2 },
  { title: "New Users (30d)", value: "856", change: "+12%", positive: true, icon: Users },
  { title: "Churn Rate", value: "2.1%", change: "-0.5%", positive: true, icon: UserMinus },
  { title: "MRR Growth", value: "$3,200", change: "+8.5%", positive: true, icon: DollarSign },
];

export default function GrowthAnalytics() {
  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Growth Analytics</h1>
          <p className="text-muted-foreground">Track platform growth and retention metrics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    <p className={`text-sm mt-1 flex items-center gap-1 ${stat.positive ? "text-green-500" : "text-destructive"}`}>
                      {stat.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {stat.change}
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

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Signups vs Churn</CardTitle>
            <CardDescription>Monthly comparison of new signups and churned organizations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                  <Line type="monotone" dataKey="signups" stroke="hsl(var(--superadmin))" strokeWidth={2} dot={{ fill: "hsl(var(--superadmin))" }} />
                  <Line type="monotone" dataKey="churn" stroke="hsl(var(--destructive))" strokeWidth={2} dot={{ fill: "hsl(var(--destructive))" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </SuperAdminLayout>
  );
}
