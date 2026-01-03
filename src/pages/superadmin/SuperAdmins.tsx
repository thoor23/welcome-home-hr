import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus, Shield, Mail, Trash2 } from "lucide-react";

const superAdmins = [
  { id: 1, name: "System Administrator", email: "admin@nexhr.com", role: "Owner", lastActive: "Online now", added: "2023-01-01" },
  { id: 2, name: "Jane Cooper", email: "jane@nexhr.com", role: "Super Admin", lastActive: "5 min ago", added: "2024-02-15" },
  { id: 3, name: "Robert Chen", email: "robert@nexhr.com", role: "Super Admin", lastActive: "2 hours ago", added: "2024-04-20" },
];

export default function SuperAdmins() {
  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Super Admins</h1>
            <p className="text-muted-foreground">Manage platform administrators</p>
          </div>
          <Button className="bg-superadmin hover:bg-superadmin/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Super Admin
          </Button>
        </div>

        <div className="grid gap-4">
          {superAdmins.map((admin) => (
            <Card key={admin.id} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 ring-2 ring-superadmin/30">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-superadmin text-superadmin-foreground">
                        {admin.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-foreground">{admin.name}</p>
                        {admin.role === "Owner" && <Shield className="h-4 w-4 text-superadmin" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{admin.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:block text-right">
                      <Badge variant="outline" className="border-superadmin/30 text-superadmin">{admin.role}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">{admin.lastActive}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Mail className="h-4 w-4" />
                      </Button>
                      {admin.role !== "Owner" && (
                        <Button variant="outline" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SuperAdminLayout>
  );
}
