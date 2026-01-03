import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Eye, ArrowRight } from "lucide-react";

const logs = [
  { id: 1, admin: "Jane Cooper", targetUser: "John Smith", targetOrg: "TechCorp Inc.", duration: "15 min", timestamp: "2024-06-28 14:30", reason: "Support request #1234" },
  { id: 2, admin: "Robert Chen", targetUser: "Sarah Johnson", targetOrg: "StartupXYZ", duration: "5 min", timestamp: "2024-06-28 11:15", reason: "Account verification" },
  { id: 3, admin: "System Administrator", targetUser: "Michael Brown", targetOrg: "MegaCorp Ltd.", duration: "30 min", timestamp: "2024-06-27 16:45", reason: "Feature demonstration" },
];

export default function ImpersonationLogs() {
  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Impersonation Logs</h1>
          <p className="text-muted-foreground">Audit trail of admin impersonation sessions</p>
        </div>

        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {logs.map((log) => (
                <div key={log.id} className="p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-superadmin/10 flex items-center justify-center">
                        <Eye className="h-5 w-5 text-superadmin" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs bg-superadmin/10 text-superadmin">
                            {log.admin.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-foreground">{log.admin}</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">{log.targetUser}</span>
                        <Badge variant="outline" className="ml-2">{log.targetOrg}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{log.timestamp}</p>
                      <p className="text-xs text-muted-foreground">Duration: {log.duration}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 ml-14">Reason: {log.reason}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SuperAdminLayout>
  );
}
