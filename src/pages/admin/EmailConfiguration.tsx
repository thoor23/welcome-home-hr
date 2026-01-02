import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Server,
  Mail,
  Building2,
  Settings,
  Upload,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

const EmailConfiguration = () => {
  const [smtpConfig, setSmtpConfig] = useState({
    server: "smtp.gmail.com",
    port: "587",
    encryption: "TLS",
    username: "hr@company.com",
    password: "••••••••••••",
  });

  const [senderInfo, setSenderInfo] = useState({
    senderName: "NexHR Team",
    senderEmail: "hr@nexhr.com",
    replyTo: "support@nexhr.com",
    ccEmail: "",
    bccEmail: "records@nexhr.com",
  });

  const [companyInfo, setCompanyInfo] = useState({
    companyName: "NexHR Technologies Pvt. Ltd.",
    companyAddress: "123 Business Park, Tech City, TC 12345",
    logoUrl: "",
    signatureUrl: "",
    stampUrl: "",
  });

  const [emailSettings, setEmailSettings] = useState({
    enableNotifications: true,
    footerText: "This is an automated message from NexHR. Please do not reply directly to this email.",
    includeUnsubscribe: false,
  });

  const [connectionStatus, setConnectionStatus] = useState<"idle" | "testing" | "success" | "error">("idle");

  const handleTestConnection = () => {
    setConnectionStatus("testing");
    setTimeout(() => {
      setConnectionStatus("success");
      toast.success("SMTP connection successful!");
    }, 2000);
  };

  const handleSaveAll = () => {
    toast.success("Configuration saved successfully");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 space-y-6 overflow-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Email Configuration</h1>
                <p className="text-muted-foreground">Configure email settings and company information for letters</p>
              </div>
              <Button onClick={handleSaveAll}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Save All Settings
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* SMTP Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    SMTP Configuration
                  </CardTitle>
                  <CardDescription>Configure your email server settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>SMTP Server</Label>
                      <Input
                        value={smtpConfig.server}
                        onChange={(e) => setSmtpConfig({ ...smtpConfig, server: e.target.value })}
                        placeholder="smtp.gmail.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Port</Label>
                      <Input
                        value={smtpConfig.port}
                        onChange={(e) => setSmtpConfig({ ...smtpConfig, port: e.target.value })}
                        placeholder="587"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Encryption</Label>
                    <Select value={smtpConfig.encryption} onValueChange={(v) => setSmtpConfig({ ...smtpConfig, encryption: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TLS">TLS</SelectItem>
                        <SelectItem value="SSL">SSL</SelectItem>
                        <SelectItem value="None">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Username</Label>
                    <Input
                      value={smtpConfig.username}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, username: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input
                      type="password"
                      value={smtpConfig.password}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, password: e.target.value })}
                      placeholder="••••••••"
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleTestConnection}
                    disabled={connectionStatus === "testing"}
                  >
                    {connectionStatus === "testing" ? (
                      <>Testing Connection...</>
                    ) : connectionStatus === "success" ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2 text-emerald-500" />
                        Connection Successful
                      </>
                    ) : connectionStatus === "error" ? (
                      <>
                        <AlertCircle className="h-4 w-4 mr-2 text-destructive" />
                        Connection Failed
                      </>
                    ) : (
                      "Test Connection"
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Sender Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Sender Information
                  </CardTitle>
                  <CardDescription>Configure default sender details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Sender Name</Label>
                      <Input
                        value={senderInfo.senderName}
                        onChange={(e) => setSenderInfo({ ...senderInfo, senderName: e.target.value })}
                        placeholder="HR Team"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Sender Email</Label>
                      <Input
                        type="email"
                        value={senderInfo.senderEmail}
                        onChange={(e) => setSenderInfo({ ...senderInfo, senderEmail: e.target.value })}
                        placeholder="hr@company.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Reply-To Email</Label>
                    <Input
                      type="email"
                      value={senderInfo.replyTo}
                      onChange={(e) => setSenderInfo({ ...senderInfo, replyTo: e.target.value })}
                      placeholder="support@company.com"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>CC Email (Optional)</Label>
                      <Input
                        type="email"
                        value={senderInfo.ccEmail}
                        onChange={(e) => setSenderInfo({ ...senderInfo, ccEmail: e.target.value })}
                        placeholder="cc@company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>BCC Email (Optional)</Label>
                      <Input
                        type="email"
                        value={senderInfo.bccEmail}
                        onChange={(e) => setSenderInfo({ ...senderInfo, bccEmail: e.target.value })}
                        placeholder="records@company.com"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Company Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Company Information
                  </CardTitle>
                  <CardDescription>Details for letter headers and footers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Company Name</Label>
                    <Input
                      value={companyInfo.companyName}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, companyName: e.target.value })}
                      placeholder="Your Company Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Company Address</Label>
                    <Textarea
                      value={companyInfo.companyAddress}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, companyAddress: e.target.value })}
                      placeholder="Full company address"
                      className="min-h-[80px]"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Company Logo</Label>
                      <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer">
                        <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                        <span className="text-xs text-muted-foreground">Upload Logo</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Digital Signature</Label>
                      <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer">
                        <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                        <span className="text-xs text-muted-foreground">Upload Signature</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Company Stamp</Label>
                      <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer">
                        <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                        <span className="text-xs text-muted-foreground">Upload Stamp</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Email Settings
                  </CardTitle>
                  <CardDescription>General email preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send automatic notifications for HR events</p>
                    </div>
                    <Switch
                      checked={emailSettings.enableNotifications}
                      onCheckedChange={(checked) => setEmailSettings({ ...emailSettings, enableNotifications: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Include Unsubscribe Link</Label>
                      <p className="text-sm text-muted-foreground">Add unsubscribe option to marketing emails</p>
                    </div>
                    <Switch
                      checked={emailSettings.includeUnsubscribe}
                      onCheckedChange={(checked) => setEmailSettings({ ...emailSettings, includeUnsubscribe: checked })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email Footer Text</Label>
                    <Textarea
                      value={emailSettings.footerText}
                      onChange={(e) => setEmailSettings({ ...emailSettings, footerText: e.target.value })}
                      placeholder="Footer text for all emails"
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default EmailConfiguration;
