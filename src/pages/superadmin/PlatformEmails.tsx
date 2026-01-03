import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Mail, Edit, Eye, Send } from "lucide-react";

const templates = [
  { id: 1, name: "Welcome Email", subject: "Welcome to NexHR!", trigger: "New signup", lastUpdated: "2024-06-15" },
  { id: 2, name: "Password Reset", subject: "Reset your password", trigger: "Password reset request", lastUpdated: "2024-05-20" },
  { id: 3, name: "Invoice Notification", subject: "Your invoice is ready", trigger: "Invoice generated", lastUpdated: "2024-06-01" },
  { id: 4, name: "Subscription Expiry", subject: "Your subscription is expiring", trigger: "7 days before expiry", lastUpdated: "2024-04-10" },
  { id: 5, name: "Account Suspended", subject: "Your account has been suspended", trigger: "Account suspension", lastUpdated: "2024-03-25" },
];

export default function PlatformEmails() {
  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Email Templates</h1>
            <p className="text-muted-foreground">Manage platform-wide email templates</p>
          </div>
          <Button className="bg-superadmin hover:bg-superadmin/90">
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        </div>

        <div className="grid gap-4">
          {templates.map((template) => (
            <Card key={template.id} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-superadmin/10 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-superadmin" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{template.name}</p>
                      <p className="text-sm text-muted-foreground">Subject: {template.subject}</p>
                      <Badge variant="outline" className="mt-1">{template.trigger}</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Updated: {template.lastUpdated}</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Send className="h-4 w-4" />
                      </Button>
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
