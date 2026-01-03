import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Power, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function MaintenanceMode() {
  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Maintenance Mode</h1>
          <p className="text-muted-foreground">Control platform availability and maintenance windows</p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Power className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <CardTitle>Platform Status</CardTitle>
                  <CardDescription>Current operational status</CardDescription>
                </div>
              </div>
              <Badge className="bg-green-500/10 text-green-500">Operational</Badge>
            </div>
          </CardHeader>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Enable Maintenance Mode
            </CardTitle>
            <CardDescription>
              When enabled, users will see a maintenance page instead of the application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">Temporarily disable access to the platform</p>
              </div>
              <Switch />
            </div>
            
            <div className="space-y-2">
              <Label>Maintenance Message</Label>
              <Textarea 
                placeholder="We're currently performing scheduled maintenance. We'll be back shortly!"
                className="min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Estimated Completion Time</Label>
              <Input type="datetime-local" />
            </div>
            
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Activate Maintenance Mode
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Scheduled Maintenance
            </CardTitle>
            <CardDescription>
              Plan future maintenance windows
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No scheduled maintenance windows</p>
              <Button variant="outline" className="mt-4">
                Schedule Maintenance
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SuperAdminLayout>
  );
}
