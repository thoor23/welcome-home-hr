import { useState } from "react";
import { ESSLayout } from "@/components/layout/ESSLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Bell, Mail, Smartphone, Globe, Moon, Sun, Shield, Clock, Calendar, FileText, DollarSign, Users, Save } from "lucide-react";
import { toast } from "sonner";

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  email: boolean;
  push: boolean;
  icon: React.ReactNode;
}

const ESSSettings = () => {
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: "leave",
      label: "Leave Requests",
      description: "Updates on your leave applications",
      email: true,
      push: true,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: "attendance",
      label: "Attendance Alerts",
      description: "Clock-in reminders and attendance issues",
      email: true,
      push: true,
      icon: <Clock className="h-4 w-4" />,
    },
    {
      id: "payroll",
      label: "Payroll & Salary",
      description: "Payslip availability and salary updates",
      email: true,
      push: false,
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      id: "documents",
      label: "Documents",
      description: "New documents and document requests",
      email: true,
      push: false,
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: "events",
      label: "Company Events",
      description: "Upcoming events and meeting invites",
      email: true,
      push: true,
      icon: <Users className="h-4 w-4" />,
    },
    {
      id: "announcements",
      label: "Announcements",
      description: "Company-wide announcements",
      email: true,
      push: true,
      icon: <Bell className="h-4 w-4" />,
    },
  ]);

  const [preferences, setPreferences] = useState({
    theme: "system",
    language: "en",
    timezone: "UTC+5:30",
    dateFormat: "DD/MM/YYYY",
    weekStart: "monday",
  });

  const [privacy, setPrivacy] = useState({
    showBirthday: true,
    showPhone: false,
    showEmail: true,
    profileVisibility: "team",
  });

  const handleNotificationChange = (id: string, type: "email" | "push", value: boolean) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, [type]: value } : n))
    );
  };

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <ESSLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your notifications and preferences</p>
          </div>
          <Button onClick={handleSaveSettings} className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Notification Settings */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle>Notification Settings</CardTitle>
              </div>
              <CardDescription>Choose how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 mb-6">
                <div className="grid grid-cols-[1fr,80px,80px] gap-4 items-center text-sm font-medium text-muted-foreground">
                  <span>Notification Type</span>
                  <span className="text-center flex items-center justify-center gap-1">
                    <Mail className="h-4 w-4" /> Email
                  </span>
                  <span className="text-center flex items-center justify-center gap-1">
                    <Smartphone className="h-4 w-4" /> Push
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="grid grid-cols-[1fr,80px,80px] gap-4 items-center py-3 border-b last:border-0"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-muted text-muted-foreground">
                        {notification.icon}
                      </div>
                      <div>
                        <p className="font-medium">{notification.label}</p>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <Switch
                        checked={notification.email}
                        onCheckedChange={(checked) =>
                          handleNotificationChange(notification.id, "email", checked)
                        }
                      />
                    </div>
                    <div className="flex justify-center">
                      <Switch
                        checked={notification.push}
                        onCheckedChange={(checked) =>
                          handleNotificationChange(notification.id, "push", checked)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Display Preferences */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <CardTitle>Display Preferences</CardTitle>
              </div>
              <CardDescription>Customize your display settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <Select
                  value={preferences.theme}
                  onValueChange={(value) => setPreferences({ ...preferences, theme: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4" /> Light
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4" /> Dark
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" /> System
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Language</Label>
                <Select
                  value={preferences.language}
                  onValueChange={(value) => setPreferences({ ...preferences, language: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="hi">हिंदी</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select
                  value={preferences.timezone}
                  onValueChange={(value) => setPreferences({ ...preferences, timezone: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC+5:30">IST (UTC+5:30)</SelectItem>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="UTC-5">EST (UTC-5)</SelectItem>
                    <SelectItem value="UTC-8">PST (UTC-8)</SelectItem>
                    <SelectItem value="UTC+1">CET (UTC+1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date Format</Label>
                <Select
                  value={preferences.dateFormat}
                  onValueChange={(value) => setPreferences({ ...preferences, dateFormat: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Week Starts On</Label>
                <Select
                  value={preferences.weekStart}
                  onValueChange={(value) => setPreferences({ ...preferences, weekStart: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sunday">Sunday</SelectItem>
                    <SelectItem value="monday">Monday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Privacy Settings</CardTitle>
              </div>
              <CardDescription>Control your profile visibility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Profile Visibility</Label>
                <Select
                  value={privacy.profileVisibility}
                  onValueChange={(value) => setPrivacy({ ...privacy, profileVisibility: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="everyone">Everyone in Company</SelectItem>
                    <SelectItem value="team">My Team Only</SelectItem>
                    <SelectItem value="managers">Managers Only</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Who can view your full profile</p>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Show on Profile</h4>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showBirthday">Birthday</Label>
                    <p className="text-sm text-muted-foreground">Show your birthday to colleagues</p>
                  </div>
                  <Switch
                    id="showBirthday"
                    checked={privacy.showBirthday}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, showBirthday: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showPhone">Phone Number</Label>
                    <p className="text-sm text-muted-foreground">Display phone on your profile</p>
                  </div>
                  <Switch
                    id="showPhone"
                    checked={privacy.showPhone}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, showPhone: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showEmail">Email Address</Label>
                    <p className="text-sm text-muted-foreground">Show email to colleagues</p>
                  </div>
                  <Switch
                    id="showEmail"
                    checked={privacy.showEmail}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, showEmail: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => toast.info("Password change functionality coming soon")}>
                Change Password
              </Button>
              <Button variant="outline" onClick={() => toast.info("Two-factor authentication coming soon")}>
                Enable 2FA
              </Button>
              <Button variant="outline" onClick={() => toast.info("Session management coming soon")}>
                Manage Sessions
              </Button>
              <Button variant="outline" onClick={() => toast.success("Data export request submitted")}>
                Export My Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ESSLayout>
  );
};

export default ESSSettings;
