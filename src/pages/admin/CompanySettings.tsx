import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { 
  Building2, 
  Briefcase, 
  Clock, 
  Globe, 
  Bell, 
  Shield, 
  Puzzle, 
  CreditCard,
  Upload,
  Save,
  RotateCcw,
  Download,
  Check,
  ExternalLink
} from "lucide-react";
import { toast } from "sonner";

const menuItems = [
  { id: "profile", label: "Company Profile", icon: Building2, description: "Basic details and branding" },
  { id: "business", label: "Business Details", icon: Briefcase, description: "Legal and bank info" },
  { id: "work", label: "Work Configuration", icon: Clock, description: "Schedule and leave settings" },
  { id: "localization", label: "Localization", icon: Globe, description: "Regional preferences" },
  { id: "notifications", label: "Notifications", icon: Bell, description: "Alerts and channels" },
  { id: "security", label: "Security", icon: Shield, description: "Password and 2FA" },
  { id: "integrations", label: "Integrations", icon: Puzzle, description: "Connected services" },
  { id: "subscription", label: "Subscription", icon: CreditCard, description: "Plans and billing" },
];

const CompanySettings = () => {
  const [activeSection, setActiveSection] = useState("profile");

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  const handleReset = () => {
    toast.info("Settings reset to defaults");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Basic details about your organization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="h-24 w-24 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center bg-muted/50">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Upload Logo</Button>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG or SVG. Max 2MB.</p>
                  </div>
                </div>
                <Separator />
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" defaultValue="NexHR Technologies" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select defaultValue="technology">
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companySize">Company Size</Label>
                    <Select defaultValue="51-200">
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-500">201-500 employees</SelectItem>
                        <SelectItem value="500+">500+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="foundedYear">Founded Year</Label>
                    <Input id="foundedYear" type="number" defaultValue="2020" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Contact Email</Label>
                    <Input id="email" type="email" defaultValue="hr@nexhr.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Contact Phone</Label>
                    <Input id="phone" defaultValue="+91 98765 43210" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" type="url" defaultValue="https://nexhr.com" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Company Description</Label>
                    <Textarea id="description" placeholder="Brief description of your company..." rows={3} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Branding</CardTitle>
                <CardDescription>Customize your company's visual identity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input id="primaryColor" type="color" className="w-12 h-10 p-1" defaultValue="#6366f1" />
                      <Input defaultValue="#6366f1" className="flex-1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex gap-2">
                      <Input id="secondaryColor" type="color" className="w-12 h-10 p-1" defaultValue="#8b5cf6" />
                      <Input defaultValue="#8b5cf6" className="flex-1" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="h-16 w-16 rounded border-2 border-dashed border-muted-foreground/25 flex items-center justify-center bg-muted/50">
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Upload Favicon</Button>
                    <p className="text-xs text-muted-foreground mt-1">ICO or PNG. 32x32px recommended.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "business":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Legal Information</CardTitle>
                <CardDescription>Official registration and tax details</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="legalName">Legal Name</Label>
                  <Input id="legalName" defaultValue="NexHR Technologies Pvt. Ltd." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select defaultValue="private">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Private Limited</SelectItem>
                      <SelectItem value="llp">LLP</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="sole">Sole Proprietorship</SelectItem>
                      <SelectItem value="public">Public Limited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Registration Number (CIN)</Label>
                  <Input id="registrationNumber" defaultValue="U72200MH2020PTC123456" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gstNumber">GST Number</Label>
                  <Input id="gstNumber" defaultValue="27AABCU9603R1ZM" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="panNumber">PAN Number</Label>
                  <Input id="panNumber" defaultValue="AABCU9603R" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tanNumber">TAN Number</Label>
                  <Input id="tanNumber" defaultValue="MUMH12345F" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="registeredAddress">Registered Address</Label>
                  <Textarea id="registeredAddress" defaultValue="123 Tech Park, Andheri East, Mumbai - 400069, Maharashtra, India" rows={2} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="billingAddress">Billing Address</Label>
                  <Textarea id="billingAddress" placeholder="Same as registered address or enter different..." rows={2} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bank Details</CardTitle>
                <CardDescription>Primary bank account for payroll and transactions</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input id="bankName" defaultValue="HDFC Bank" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branchName">Branch Name</Label>
                  <Input id="branchName" defaultValue="Andheri East" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input id="accountNumber" type="password" defaultValue="50100123456789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ifscCode">IFSC Code</Label>
                  <Input id="ifscCode" defaultValue="HDFC0001234" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountType">Account Type</Label>
                  <Select defaultValue="current">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current Account</SelectItem>
                      <SelectItem value="savings">Savings Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "work":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Work Schedule</CardTitle>
                <CardDescription>Define your organization's work week and hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Working Days</Label>
                  <div className="flex flex-wrap gap-4">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox id={day.toLowerCase()} defaultChecked={index < 5} />
                        <Label htmlFor={day.toLowerCase()} className="text-sm">{day}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="weekStart">Week Starts On</Label>
                    <Select defaultValue="monday">
                      <SelectTrigger>
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sunday">Sunday</SelectItem>
                        <SelectItem value="monday">Monday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="officeStart">Office Start Time</Label>
                    <Input id="officeStart" type="time" defaultValue="09:00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="officeEnd">Office End Time</Label>
                    <Input id="officeEnd" type="time" defaultValue="18:00" />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="breakDuration">Break Duration</Label>
                    <Select defaultValue="60">
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fullDayHours">Full Day Hours</Label>
                    <Input id="fullDayHours" type="number" defaultValue="8" min={1} max={12} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="halfDayHours">Half Day Hours</Label>
                    <Input id="halfDayHours" type="number" defaultValue="4" min={1} max={6} />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="gracePeriod">Grace Period (minutes)</Label>
                    <Input id="gracePeriod" type="number" defaultValue="15" min={0} max={60} />
                    <p className="text-xs text-muted-foreground">Minutes allowed before marking as late</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="overtimeThreshold">Overtime Threshold (hours)</Label>
                    <Input id="overtimeThreshold" type="number" defaultValue="9" min={1} max={16} />
                    <p className="text-xs text-muted-foreground">Hours after which overtime starts</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Leave Configuration</CardTitle>
                <CardDescription>Holiday and leave policy settings</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="financialYearStart">Financial Year Starts</Label>
                  <Select defaultValue="april">
                    <SelectTrigger>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="january">January</SelectItem>
                      <SelectItem value="april">April</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="annualHolidays">Annual Holidays</Label>
                  <Input id="annualHolidays" type="number" defaultValue="12" min={0} max={30} />
                </div>
                <div className="flex items-center justify-between md:col-span-2">
                  <div className="space-y-0.5">
                    <Label>Allow Leave Carry Forward</Label>
                    <p className="text-xs text-muted-foreground">Unused leaves carry over to next year</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxCarryForward">Max Carry Forward Days</Label>
                  <Input id="maxCarryForward" type="number" defaultValue="10" min={0} max={30} />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "localization":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Regional Settings</CardTitle>
                <CardDescription>Configure timezone, currency, and display preferences</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select defaultValue="india">
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="canada">Canada</SelectItem>
                      <SelectItem value="australia">Australia</SelectItem>
                      <SelectItem value="germany">Germany</SelectItem>
                      <SelectItem value="france">France</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="asia-kolkata">
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asia-kolkata">Asia/Kolkata (UTC+5:30)</SelectItem>
                      <SelectItem value="america-new_york">America/New_York (UTC-5)</SelectItem>
                      <SelectItem value="america-los_angeles">America/Los_Angeles (UTC-8)</SelectItem>
                      <SelectItem value="europe-london">Europe/London (UTC+0)</SelectItem>
                      <SelectItem value="europe-berlin">Europe/Berlin (UTC+1)</SelectItem>
                      <SelectItem value="asia-tokyo">Asia/Tokyo (UTC+9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue="inr">
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inr">INR (₹) - Indian Rupee</SelectItem>
                      <SelectItem value="usd">USD ($) - US Dollar</SelectItem>
                      <SelectItem value="eur">EUR (€) - Euro</SelectItem>
                      <SelectItem value="gbp">GBP (£) - British Pound</SelectItem>
                      <SelectItem value="aud">AUD ($) - Australian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Display Formats</CardTitle>
                <CardDescription>Customize how dates, times, and numbers are displayed</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select defaultValue="dd-mm-yyyy">
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd-mm-yyyy">DD/MM/YYYY (31/12/2026)</SelectItem>
                      <SelectItem value="mm-dd-yyyy">MM/DD/YYYY (12/31/2026)</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD (2026-12-31)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Time Format</Label>
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="time12" defaultChecked />
                      <Label htmlFor="time12">12-hour</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="time24" />
                      <Label htmlFor="time24">24-hour</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numberFormat">Number Format</Label>
                  <Select defaultValue="indian">
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="indian">Indian (1,00,000)</SelectItem>
                      <SelectItem value="international">International (100,000)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstDayOfWeek">First Day of Week</Label>
                  <Select defaultValue="monday">
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sunday">Sunday</SelectItem>
                      <SelectItem value="monday">Monday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>Configure which events trigger email notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { id: "leaveRequests", label: "Leave Requests", desc: "Notify managers on new leave requests" },
                  { id: "attendanceAlerts", label: "Attendance Alerts", desc: "Late arrivals and absence notifications" },
                  { id: "payrollProcessed", label: "Payroll Processed", desc: "When payroll is generated" },
                  { id: "newEmployee", label: "New Employee Joined", desc: "Welcome notifications for new hires" },
                  { id: "birthdays", label: "Birthday Reminders", desc: "Employee birthday alerts" },
                  { id: "anniversary", label: "Work Anniversary", desc: "Anniversary reminders" },
                  { id: "documentExpiry", label: "Document Expiry", desc: "ID/contract expiry alerts" },
                  { id: "systemUpdates", label: "System Updates", desc: "Platform update notifications" },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <Label htmlFor={item.id}>{item.label}</Label>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch id={item.id} defaultChecked={["leaveRequests", "attendanceAlerts", "payrollProcessed", "newEmployee"].includes(item.id)} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Channels</CardTitle>
                <CardDescription>Choose how notifications are delivered</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { id: "emailChannel", label: "Email", desc: "Send notifications via email" },
                  { id: "inAppChannel", label: "In-App Notifications", desc: "Show notifications in the app" },
                  { id: "smsChannel", label: "SMS", desc: "Send SMS for critical alerts" },
                  { id: "slackChannel", label: "Slack", desc: "Post to Slack channels" },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <Label htmlFor={item.id}>{item.label}</Label>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch id={item.id} defaultChecked={["emailChannel", "inAppChannel"].includes(item.id)} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Digest Settings</CardTitle>
                <CardDescription>Configure summary email preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label>Daily Summary Email</Label>
                    <p className="text-xs text-muted-foreground">Receive a daily digest of all activities</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label>Weekly Report Email</Label>
                    <p className="text-xs text-muted-foreground">Receive a weekly summary report</p>
                  </div>
                  <Switch />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="digestRecipients">Digest Recipients</Label>
                  <Textarea id="digestRecipients" placeholder="Enter email addresses separated by commas..." defaultValue="admin@nexhr.com, hr@nexhr.com" rows={2} />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Password Policy</CardTitle>
                <CardDescription>Configure password requirements for all users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="minLength">Minimum Length</Label>
                    <Input id="minLength" type="number" defaultValue="8" min={6} max={20} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                    <Input id="passwordExpiry" type="number" defaultValue="90" min={0} max={365} />
                    <p className="text-xs text-muted-foreground">Set to 0 for no expiry</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  {[
                    { id: "requireUppercase", label: "Require Uppercase Letter", checked: true },
                    { id: "requireLowercase", label: "Require Lowercase Letter", checked: true },
                    { id: "requireNumbers", label: "Require Numbers", checked: true },
                    { id: "requireSpecial", label: "Require Special Characters", checked: false },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox id={item.id} defaultChecked={item.checked} />
                      <Label htmlFor={item.id}>{item.label}</Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Settings</CardTitle>
                <CardDescription>Manage user session behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Select defaultValue="30">
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="480">8 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label>Allow Multiple Sessions</Label>
                    <p className="text-xs text-muted-foreground">Users can log in from multiple devices</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label>Force Logout on Password Change</Label>
                    <p className="text-xs text-muted-foreground">End all sessions when password is changed</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Enhanced security with 2FA</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label>Enable 2FA for All Users</Label>
                    <p className="text-xs text-muted-foreground">Require two-factor authentication</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label>Enforce 2FA for Admins</Label>
                    <p className="text-xs text-muted-foreground">Mandatory 2FA for admin roles</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>2FA Methods</Label>
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="2faEmail" defaultChecked />
                      <Label htmlFor="2faEmail">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="2faAuthenticator" defaultChecked />
                      <Label htmlFor="2faAuthenticator">Authenticator App</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>IP Restrictions</CardTitle>
                <CardDescription>Limit access by IP address</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label>Enable IP Whitelist</Label>
                    <p className="text-xs text-muted-foreground">Only allow access from specified IP addresses</p>
                  </div>
                  <Switch />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="allowedIPs">Allowed IP Addresses</Label>
                  <Textarea id="allowedIPs" placeholder="Enter IP addresses, one per line..." rows={3} />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label>Block Suspicious Login Attempts</Label>
                    <p className="text-xs text-muted-foreground">Automatically block after multiple failed attempts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "integrations":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Connected Services</CardTitle>
                <CardDescription>Manage third-party integrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { name: "Google Workspace", desc: "SSO and calendar sync", connected: true, icon: "G" },
                    { name: "Microsoft 365", desc: "SSO and Outlook integration", connected: false, icon: "M" },
                    { name: "Slack", desc: "Notifications and commands", connected: true, icon: "S" },
                    { name: "Zoom", desc: "Meeting scheduling", connected: false, icon: "Z" },
                    { name: "Biometric Devices", desc: "Attendance hardware", connected: false, icon: "B" },
                    { name: "Payment Gateway", desc: "Salary disbursement", connected: true, icon: "P" },
                    { name: "SMS Gateway", desc: "OTP and alerts", connected: true, icon: "T" },
                    { name: "Email Service", desc: "SMTP configuration", connected: true, icon: "E" },
                  ].map((integration) => (
                    <div key={integration.name} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center font-semibold text-primary">
                          {integration.icon}
                        </div>
                        <div>
                          <p className="font-medium">{integration.name}</p>
                          <p className="text-xs text-muted-foreground">{integration.desc}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {integration.connected ? (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            <Check className="h-3 w-3 mr-1" />
                            Connected
                          </Badge>
                        ) : (
                          <Button variant="outline" size="sm">Connect</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Access</CardTitle>
                <CardDescription>Manage API keys and webhooks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>API Key</Label>
                  <div className="flex gap-2">
                    <Input type="password" value="sk_live_xxxxxxxxxxxxxxxxxxxx" readOnly className="font-mono" />
                    <Button variant="outline">Copy</Button>
                    <Button variant="outline">Regenerate</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Keep this key secret. Do not share it publicly.</p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="webhookUrl">Webhook URL</Label>
                  <Input id="webhookUrl" placeholder="https://your-server.com/webhook" />
                  <p className="text-xs text-muted-foreground">We'll send POST requests to this URL for events</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    API Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "subscription":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Your subscription details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-6 rounded-lg border bg-gradient-to-r from-primary/10 to-primary/5">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-bold">Pro Plan</h3>
                      <Badge>Active</Badge>
                    </div>
                    <p className="text-muted-foreground mt-1">Billed monthly • Renews on Jan 15, 2026</p>
                    <div className="mt-4 space-y-1 text-sm">
                      <p>✓ Up to 200 employees</p>
                      <p>✓ 50 GB storage</p>
                      <p>✓ All modules included</p>
                      <p>✓ Priority support</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">$99</p>
                    <p className="text-muted-foreground">/month</p>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline">Change Plan</Button>
                      <Button>Upgrade</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage Statistics</CardTitle>
                <CardDescription>Current usage vs. plan limits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-4">
                  {[
                    { label: "Employees", current: 87, limit: 200, unit: "" },
                    { label: "Storage Used", current: 12.5, limit: 50, unit: "GB" },
                    { label: "API Calls", current: 2340, limit: 10000, unit: "" },
                    { label: "Active Users", current: 45, limit: 200, unit: "" },
                  ].map((stat) => (
                    <div key={stat.label} className="space-y-2">
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">
                        {stat.current}{stat.unit && ` ${stat.unit}`}
                        <span className="text-sm font-normal text-muted-foreground"> / {stat.limit}{stat.unit && ` ${stat.unit}`}</span>
                      </p>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(stat.current / stat.limit) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>Past invoices and payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { date: "Dec 15, 2025", desc: "Pro Plan - Monthly", amount: "$99.00", status: "Paid" },
                    { date: "Nov 15, 2025", desc: "Pro Plan - Monthly", amount: "$99.00", status: "Paid" },
                    { date: "Oct 15, 2025", desc: "Pro Plan - Monthly", amount: "$99.00", status: "Paid" },
                  ].map((invoice, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div>
                        <p className="font-medium">{invoice.desc}</p>
                        <p className="text-sm text-muted-foreground">{invoice.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-medium">{invoice.amount}</span>
                        <Badge variant="outline" className="text-green-600 border-green-600">{invoice.status}</Badge>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Manage your payment information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-14 rounded bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white text-xs font-bold">
                      VISA
                    </div>
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/2027</p>
                    </div>
                  </div>
                  <Button variant="outline">Update</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <DashboardHeader />
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Company Settings</h1>
                <p className="text-muted-foreground">Manage your organization's configuration and preferences</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>

            <div className="flex gap-6">
              {/* Settings Sidebar Navigation */}
              <aside className="w-64 shrink-0">
                <nav className="sticky top-6 space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={cn(
                          "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors",
                          isActive
                            ? "bg-primary/10 text-foreground border-l-2 border-primary"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        )}
                      >
                        <Icon className={cn("h-5 w-5 mt-0.5 shrink-0", isActive && "text-primary")} />
                        <div>
                          <p className={cn("font-medium text-sm", isActive && "text-foreground")}>
                            {item.label}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </aside>

              {/* Content Area */}
              <div className="flex-1 min-w-0">
                {renderContent()}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    </SidebarProvider>
  );
};

export default CompanySettings;
