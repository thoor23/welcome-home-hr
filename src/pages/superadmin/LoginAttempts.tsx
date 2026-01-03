import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Lock, CheckCircle, XCircle, Globe } from "lucide-react";

const loginAttempts = [
  { id: 1, email: "admin@techcorp.com", ip: "192.168.1.1", location: "New York, US", status: "success", time: "2 min ago", device: "Chrome / Windows" },
  { id: 2, email: "unknown@hacker.com", ip: "45.33.32.156", location: "Unknown", status: "failed", time: "5 min ago", device: "Unknown" },
  { id: 3, email: "sarah@startupxyz.io", ip: "10.0.0.45", location: "San Francisco, US", status: "success", time: "10 min ago", device: "Safari / macOS" },
  { id: 4, email: "john@megacorp.com", ip: "172.16.0.12", location: "London, UK", status: "failed", time: "15 min ago", device: "Firefox / Linux" },
  { id: 5, email: "admin@smallbiz.co", ip: "192.168.2.100", location: "Toronto, CA", status: "success", time: "20 min ago", device: "Chrome / Windows" },
];

export default function LoginAttempts() {
  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Login Attempts</h1>
          <p className="text-muted-foreground">Monitor authentication attempts across the platform</p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by email or IP..." className="pl-10" />
              </div>
              <Button variant="outline">Export Logs</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {loginAttempts.map((attempt) => (
                <div key={attempt.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      attempt.status === "success" ? "bg-green-500/10" : "bg-destructive/10"
                    }`}>
                      {attempt.status === "success" ? 
                        <CheckCircle className="h-5 w-5 text-green-500" /> : 
                        <XCircle className="h-5 w-5 text-destructive" />
                      }
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{attempt.email}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Globe className="h-3 w-3" />
                        <span>{attempt.ip}</span>
                        <span>•</span>
                        <span>{attempt.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-foreground">{attempt.device}</p>
                      <p className="text-xs text-muted-foreground">{attempt.time}</p>
                    </div>
                    <Badge className={attempt.status === "success" ? "bg-green-500/10 text-green-500" : "bg-destructive/10 text-destructive"}>
                      {attempt.status}
                    </Badge>
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
