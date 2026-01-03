import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Download, History, User, Database, Shield, Server } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const logs = [
  { id: 1, type: "user", action: "User login", actor: "admin@techcorp.com", target: "TechCorp Inc.", timestamp: "2024-06-28 14:30:45", ip: "192.168.1.1" },
  { id: 2, type: "data", action: "Employee record updated", actor: "hr@startupxyz.io", target: "John Smith", timestamp: "2024-06-28 14:25:12", ip: "10.0.0.45" },
  { id: 3, type: "security", action: "Password changed", actor: "sarah@megacorp.com", target: "Self", timestamp: "2024-06-28 14:20:33", ip: "172.16.0.12" },
  { id: 4, type: "system", action: "Backup completed", actor: "System", target: "Database", timestamp: "2024-06-28 14:00:00", ip: "-" },
  { id: 5, type: "user", action: "Role assignment changed", actor: "admin@smallbiz.co", target: "Employee role", timestamp: "2024-06-28 13:45:22", ip: "192.168.2.100" },
];

const getIcon = (type: string) => {
  switch (type) {
    case "user": return User;
    case "data": return Database;
    case "security": return Shield;
    case "system": return Server;
    default: return History;
  }
};

const getColor = (type: string) => {
  switch (type) {
    case "user": return "text-blue-500 bg-blue-500/10";
    case "data": return "text-green-500 bg-green-500/10";
    case "security": return "text-yellow-500 bg-yellow-500/10";
    case "system": return "text-superadmin bg-superadmin/10";
    default: return "text-muted-foreground bg-muted";
  }
};

export default function PlatformLogs() {
  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Audit Logs</h1>
            <p className="text-muted-foreground">Complete activity history across the platform</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>

        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search logs..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="data">Data</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {logs.map((log) => {
                const Icon = getIcon(log.type);
                const colorClass = getColor(log.type);
                return (
                  <div key={log.id} className="flex items-start justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${colorClass}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{log.action}</p>
                        <p className="text-sm text-muted-foreground">
                          By <span className="text-foreground">{log.actor}</span> → {log.target}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{log.timestamp}</p>
                      <Badge variant="outline" className="mt-1">{log.type}</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </SuperAdminLayout>
  );
}
