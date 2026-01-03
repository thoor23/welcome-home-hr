import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Globe, Ban, Clock } from "lucide-react";

const blockedIPs = [
  { id: 1, ip: "45.33.32.156", reason: "Multiple failed login attempts", blockedAt: "2024-06-28 14:30", expiresAt: "Permanent" },
  { id: 2, ip: "192.168.100.50", reason: "Suspicious API activity", blockedAt: "2024-06-27 10:15", expiresAt: "2024-07-27" },
  { id: 3, ip: "10.0.0.99", reason: "Brute force attack detected", blockedAt: "2024-06-25 08:45", expiresAt: "Permanent" },
];

export default function IPBlocklist() {
  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">IP Blocklist</h1>
            <p className="text-muted-foreground">Manage blocked IP addresses</p>
          </div>
          <Button className="bg-superadmin hover:bg-superadmin/90">
            <Plus className="h-4 w-4 mr-2" />
            Block IP
          </Button>
        </div>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <Input placeholder="Enter IP address to block..." className="flex-1" />
              <Button variant="destructive">
                <Ban className="h-4 w-4 mr-2" />
                Block
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Blocked IP Addresses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {blockedIPs.map((ip) => (
                <div key={ip.id} className="flex items-center justify-between p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                      <Globe className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <p className="font-mono font-medium text-foreground">{ip.ip}</p>
                      <p className="text-sm text-muted-foreground">{ip.reason}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Blocked: {ip.blockedAt}</span>
                      </div>
                      <Badge variant="outline" className={ip.expiresAt === "Permanent" ? "border-destructive/30 text-destructive" : ""}>
                        {ip.expiresAt}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
