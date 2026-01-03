import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, ToggleLeft } from "lucide-react";

const features = [
  { id: 1, name: "AI-Powered Analytics", description: "Enable AI insights and recommendations", enabled: true, beta: true },
  { id: 2, name: "Advanced Reporting", description: "Custom report builder for organizations", enabled: true, beta: false },
  { id: 3, name: "Mobile App Access", description: "Native mobile app for employees", enabled: true, beta: false },
  { id: 4, name: "Single Sign-On (SSO)", description: "Enterprise SSO integration", enabled: true, beta: false },
  { id: 5, name: "Custom Workflows", description: "Automated workflow builder", enabled: false, beta: true },
  { id: 6, name: "API Rate Limiting", description: "Enhanced API rate limiting controls", enabled: true, beta: false },
  { id: 7, name: "Multi-currency Support", description: "Support for multiple currencies", enabled: false, beta: true },
];

export default function FeatureFlags() {
  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Feature Flags</h1>
            <p className="text-muted-foreground">Toggle features globally or per organization</p>
          </div>
          <Button className="bg-superadmin hover:bg-superadmin/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Feature
          </Button>
        </div>

        <div className="grid gap-4">
          {features.map((feature) => (
            <Card key={feature.id} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${feature.enabled ? "bg-green-500/10" : "bg-muted"}`}>
                      <ToggleLeft className={`h-5 w-5 ${feature.enabled ? "text-green-500" : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{feature.name}</p>
                        {feature.beta && <Badge variant="outline" className="border-superadmin/30 text-superadmin">Beta</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                  <Switch checked={feature.enabled} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SuperAdminLayout>
  );
}
