import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Gauge, 
  Clock, 
  Bell, 
  AlertTriangle,
  Save,
} from "lucide-react";

export default function SLASettings() {
  const [defaultResponse, setDefaultResponse] = useState("4");
  const [defaultResolution, setDefaultResolution] = useState("24");
  const [businessHoursStart, setBusinessHoursStart] = useState("09:00");
  const [businessHoursEnd, setBusinessHoursEnd] = useState("18:00");
  const [workingDays, setWorkingDays] = useState(["monday", "tuesday", "wednesday", "thursday", "friday"]);
  
  const [escalateAfter, setEscalateAfter] = useState("8");
  const [autoAssign, setAutoAssign] = useState(true);
  
  const [notifyOnCreate, setNotifyOnCreate] = useState(true);
  const [notifyOnStatusChange, setNotifyOnStatusChange] = useState(true);
  const [notifyOnApproachingSLA, setNotifyOnApproachingSLA] = useState(true);
  const [notifyOnBreach, setNotifyOnBreach] = useState(true);

  const prioritySLAs = [
    { priority: "Critical", response: "30 minutes", resolution: "4 hours", color: "text-red-500" },
    { priority: "High", response: "2 hours", resolution: "8 hours", color: "text-orange-500" },
    { priority: "Medium", response: "4 hours", resolution: "24 hours", color: "text-yellow-500" },
    { priority: "Low", response: "8 hours", resolution: "72 hours", color: "text-green-500" },
  ];

  const days = [
    { id: "monday", label: "Monday" },
    { id: "tuesday", label: "Tuesday" },
    { id: "wednesday", label: "Wednesday" },
    { id: "thursday", label: "Thursday" },
    { id: "friday", label: "Friday" },
    { id: "saturday", label: "Saturday" },
    { id: "sunday", label: "Sunday" },
  ];

  const toggleDay = (dayId: string) => {
    setWorkingDays(prev => 
      prev.includes(dayId) 
        ? prev.filter(d => d !== dayId)
        : [...prev, dayId]
    );
  };

  const handleSave = () => {
    toast.success("SLA settings saved successfully");
  };

  return (
    <AdminLayout>
            <div className="mb-6">
              <h1 className="text-2xl font-bold">SLA Settings</h1>
              <p className="text-muted-foreground">Configure Service Level Agreements for support tickets</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Default SLA Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Default SLA Configuration
                  </CardTitle>
                  <CardDescription>
                    Set default response and resolution times
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Default Response Time (hours)</Label>
                      <Input 
                        type="number" 
                        value={defaultResponse} 
                        onChange={(e) => setDefaultResponse(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Default Resolution Time (hours)</Label>
                      <Input 
                        type="number" 
                        value={defaultResolution} 
                        onChange={(e) => setDefaultResolution(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Business Hours Start</Label>
                      <Input 
                        type="time" 
                        value={businessHoursStart} 
                        onChange={(e) => setBusinessHoursStart(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Business Hours End</Label>
                      <Input 
                        type="time" 
                        value={businessHoursEnd} 
                        onChange={(e) => setBusinessHoursEnd(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Working Days</Label>
                    <div className="flex flex-wrap gap-2">
                      {days.map((day) => (
                        <div key={day.id} className="flex items-center gap-2">
                          <Checkbox
                            id={day.id}
                            checked={workingDays.includes(day.id)}
                            onCheckedChange={() => toggleDay(day.id)}
                          />
                          <Label htmlFor={day.id} className="text-sm font-normal cursor-pointer">
                            {day.label.slice(0, 3)}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Priority-Based SLA */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gauge className="h-5 w-5 text-primary" />
                    Priority-Based SLA
                  </CardTitle>
                  <CardDescription>
                    Response and resolution times by priority level
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {prioritySLAs.map((sla) => (
                      <div key={sla.priority} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className={sla.color}>
                            {sla.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                          <div className="text-center">
                            <div className="text-muted-foreground text-xs">Response</div>
                            <div className="font-medium">{sla.response}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-muted-foreground text-xs">Resolution</div>
                            <div className="font-medium">{sla.resolution}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Escalation Rules */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                    Escalation Rules
                  </CardTitle>
                  <CardDescription>
                    Configure automatic escalation behavior
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Escalate After (hours without response)</Label>
                    <Input 
                      type="number" 
                      value={escalateAfter} 
                      onChange={(e) => setEscalateAfter(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Escalation Notification Recipients</Label>
                    <Input placeholder="e.g., manager@company.com, hr@company.com" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-assign on Escalation</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically assign to supervisor
                      </p>
                    </div>
                    <Switch checked={autoAssign} onCheckedChange={setAutoAssign} />
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription>
                    Configure when to send notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notify on Ticket Creation</Label>
                      <p className="text-sm text-muted-foreground">
                        Send email when a new ticket is created
                      </p>
                    </div>
                    <Switch checked={notifyOnCreate} onCheckedChange={setNotifyOnCreate} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notify on Status Change</Label>
                      <p className="text-sm text-muted-foreground">
                        Send email when ticket status changes
                      </p>
                    </div>
                    <Switch checked={notifyOnStatusChange} onCheckedChange={setNotifyOnStatusChange} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notify on Approaching SLA</Label>
                      <p className="text-sm text-muted-foreground">
                        Alert when SLA breach is imminent
                      </p>
                    </div>
                    <Switch checked={notifyOnApproachingSLA} onCheckedChange={setNotifyOnApproachingSLA} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notify on SLA Breach</Label>
                      <p className="text-sm text-muted-foreground">
                        Alert when SLA has been breached
                      </p>
                    </div>
                    <Switch checked={notifyOnBreach} onCheckedChange={setNotifyOnBreach} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </div>
    </AdminLayout>
  );
}
