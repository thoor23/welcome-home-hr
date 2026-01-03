import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, AlertTriangle, CheckCircle, Users, Globe } from "lucide-react";

const stats = [
  { title: "Active Sessions", value: "1,234", icon: Users, color: "text-green-500" },
  { title: "Failed Logins (24h)", value: "23", icon: Lock, color: "text-yellow-500" },
  { title: "Blocked IPs", value: "12", icon: Globe, color: "text-destructive" },
  { title: "Security Score", value: "94/100", icon: Shield, color: "text-superadmin" },
];

const recentEvents = [
  { type: "success", message: "Two-factor authentication enabled for admin@techcorp.com", time: "5 min ago" },
  { type: "warning", message: "Multiple failed login attempts from IP 192.168.1.100", time: "15 min ago" },
  { type: "success", message: "Security audit completed successfully", time: "1 hour ago" },
  { type: "error", message: "Suspicious activity detected for user john@startupxyz.io", time: "2 hours ago" },
  { type: "success", message: "Password policy updated across all organizations", time: "3 hours ago" },
];

export default function SecurityOverview() {
  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Security Overview</h1>
          <p className="text-muted-foreground">Monitor platform security and access patterns</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Recent Security Events</CardTitle>
            <CardDescription>Latest security-related activities across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvents.map((event, index) => (
                <div key={index} className="flex items-start gap-4 p-3 rounded-lg bg-muted/30">
                  <div className={`mt-0.5 ${
                    event.type === "success" ? "text-green-500" :
                    event.type === "warning" ? "text-yellow-500" :
                    "text-destructive"
                  }`}>
                    {event.type === "success" ? <CheckCircle className="h-5 w-5" /> :
                     event.type === "warning" ? <AlertTriangle className="h-5 w-5" /> :
                     <Shield className="h-5 w-5" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{event.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SuperAdminLayout>
  );
}
