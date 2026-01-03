import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const usageData = [
  { feature: "Employee Mgmt", usage: 95 },
  { feature: "Attendance", usage: 88 },
  { feature: "Leave Mgmt", usage: 82 },
  { feature: "Payroll", usage: 75 },
  { feature: "Recruitment", usage: 45 },
  { feature: "Documents", usage: 62 },
  { feature: "Support", usage: 38 },
];

const apiUsage = [
  { org: "TechCorp Inc.", requests: 125000, limit: 200000 },
  { org: "MegaCorp Ltd.", requests: 89000, limit: 200000 },
  { org: "StartupXYZ", requests: 12000, limit: 50000 },
  { org: "Innovation Labs", requests: 8500, limit: 50000 },
];

export default function UsageAnalytics() {
  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Usage Analytics</h1>
          <p className="text-muted-foreground">Feature usage and API consumption metrics</p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Feature Usage by Organizations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usageData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="feature" type="category" width={120} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                  <Bar dataKey="usage" fill="hsl(var(--superadmin))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>API Usage by Organization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {apiUsage.map((org) => (
                <div key={org.org} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-foreground">{org.org}</span>
                    <span className="text-muted-foreground">{org.requests.toLocaleString()} / {org.limit.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-superadmin rounded-full transition-all"
                      style={{ width: `${(org.requests / org.limit) * 100}%` }}
                    />
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
