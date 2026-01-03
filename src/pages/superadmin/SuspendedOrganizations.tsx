import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Trash2, Eye, AlertTriangle } from "lucide-react";

const suspendedOrganizations = [
  { id: 1, name: "GlobalTech Solutions", email: "admin@globaltech.com", plan: "Enterprise", suspendedAt: "2024-06-15", reason: "Payment failure", users: 890 },
  { id: 2, name: "OldCorp Inc.", email: "contact@oldcorp.com", plan: "Pro", suspendedAt: "2024-05-20", reason: "Policy violation", users: 125 },
];

export default function SuspendedOrganizations() {
  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Suspended Organizations</h1>
          <p className="text-muted-foreground">Manage suspended organization accounts</p>
        </div>

        <div className="grid gap-4">
          {suspendedOrganizations.map((org) => (
            <Card key={org.id} className="bg-card border-border border-l-4 border-l-destructive">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className="bg-destructive/10 text-destructive font-semibold text-lg">
                        {org.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-lg text-foreground">{org.name}</p>
                      <p className="text-sm text-muted-foreground">{org.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="destructive">{org.reason}</Badge>
                        <span className="text-sm text-muted-foreground">{org.users} users affected</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                      Suspended: {org.suspendedAt}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" className="bg-superadmin hover:bg-superadmin/90">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reactivate
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {suspendedOrganizations.length === 0 && (
          <Card className="bg-card border-border">
            <CardContent className="p-12 text-center">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground">No suspended organizations</h3>
              <p className="text-muted-foreground">All organizations are currently active.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </SuperAdminLayout>
  );
}
