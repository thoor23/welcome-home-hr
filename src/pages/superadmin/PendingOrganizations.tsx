import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Check, X, Eye, Clock } from "lucide-react";

const pendingOrganizations = [
  { id: 1, name: "NewTech Solutions", email: "admin@newtech.io", plan: "Pro", requestedAt: "2024-06-28", industry: "Technology" },
  { id: 2, name: "HealthCare Plus", email: "contact@healthcareplus.com", plan: "Enterprise", requestedAt: "2024-06-27", industry: "Healthcare" },
  { id: 3, name: "EduLearn Academy", email: "hello@edulearn.org", plan: "Starter", requestedAt: "2024-06-26", industry: "Education" },
];

export default function PendingOrganizations() {
  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pending Approvals</h1>
          <p className="text-muted-foreground">Review and approve organization registrations</p>
        </div>

        <div className="grid gap-4">
          {pendingOrganizations.map((org) => (
            <Card key={org.id} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className="bg-yellow-500/10 text-yellow-500 font-semibold text-lg">
                        {org.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-lg text-foreground">{org.name}</p>
                      <p className="text-sm text-muted-foreground">{org.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{org.industry}</Badge>
                        <Badge variant="outline" className="border-superadmin/30 text-superadmin">{org.plan}</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Requested: {org.requestedAt}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Review
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Check className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        <X className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {pendingOrganizations.length === 0 && (
          <Card className="bg-card border-border">
            <CardContent className="p-12 text-center">
              <Check className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground">All caught up!</h3>
              <p className="text-muted-foreground">No pending organization approvals.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </SuperAdminLayout>
  );
}
