import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Save } from "lucide-react";
import { toast } from "sonner";

export default function AuditSettings() {
  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Audit Settings</h1>
                <p className="text-muted-foreground">
                  Configure audit log retention, alerts, and compliance settings
                </p>
              </div>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Retention Settings */}
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold">Retention Settings</h2>
                <p className="text-sm text-muted-foreground">
                  Configure how long logs are retained before automatic deletion
                </p>
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Activity Logs</Label>
                    <div className="flex items-center gap-2">
                      <Input type="number" defaultValue="90" className="w-20" />
                      <span className="text-sm text-muted-foreground">days</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Data Change Logs</Label>
                    <div className="flex items-center gap-2">
                      <Input type="number" defaultValue="365" className="w-20" />
                      <span className="text-sm text-muted-foreground">days</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Security Logs</Label>
                    <div className="flex items-center gap-2">
                      <Input type="number" defaultValue="365" className="w-20" />
                      <span className="text-sm text-muted-foreground">days</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>System Logs</Label>
                    <div className="flex items-center gap-2">
                      <Input type="number" defaultValue="30" className="w-20" />
                      <span className="text-sm text-muted-foreground">days</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>API Logs</Label>
                    <div className="flex items-center gap-2">
                      <Input type="number" defaultValue="30" className="w-20" />
                      <span className="text-sm text-muted-foreground">days</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label>Auto-archive after</Label>
                    <div className="flex items-center gap-2">
                      <Input type="number" defaultValue="180" className="w-20" />
                      <span className="text-sm text-muted-foreground">days</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Logging Configuration */}
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold">Logging Configuration</h2>
                <p className="text-sm text-muted-foreground">
                  Enable or disable specific log types and detail levels
                </p>
                <Separator />
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Log Type</TableHead>
                      <TableHead>Enabled</TableHead>
                      <TableHead>Detail Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Page Views</TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell>
                        <Select defaultValue="minimal">
                          <SelectTrigger className="w-28">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="minimal">Minimal</SelectItem>
                            <SelectItem value="full">Full</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Data Changes</TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell>
                        <Select defaultValue="full">
                          <SelectTrigger className="w-28">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="minimal">Minimal</SelectItem>
                            <SelectItem value="full">Full</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Login Events</TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell>
                        <Select defaultValue="full">
                          <SelectTrigger className="w-28">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="minimal">Minimal</SelectItem>
                            <SelectItem value="full">Full</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>API Calls</TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell>
                        <Select defaultValue="minimal">
                          <SelectTrigger className="w-28">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="minimal">Minimal</SelectItem>
                            <SelectItem value="full">Full</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>System Errors</TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell>
                        <Select defaultValue="full">
                          <SelectTrigger className="w-28">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="minimal">Minimal</SelectItem>
                            <SelectItem value="full">Full</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* Export Settings */}
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold">Export Settings</h2>
                <p className="text-sm text-muted-foreground">
                  Configure default export options for audit logs
                </p>
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Default Export Format</Label>
                    <Select defaultValue="csv">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Include Sensitive Data</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Compress Large Exports</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Email Exports to Admin</Label>
                    <Switch />
                  </div>
                </div>
              </div>

              {/* Alert Configuration */}
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold">Alert Configuration</h2>
                <p className="text-sm text-muted-foreground">
                  Set up alerts for security and critical events
                </p>
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Failed Login Attempts</Label>
                      <p className="text-xs text-muted-foreground">
                        Alert after X failed attempts
                      </p>
                    </div>
                    <Input type="number" defaultValue="5" className="w-20" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Bulk Delete Operations</Label>
                      <p className="text-xs text-muted-foreground">
                        Alert on bulk deletions
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Permission Changes</Label>
                      <p className="text-xs text-muted-foreground">
                        Alert on role/permission updates
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>System Errors</Label>
                      <p className="text-xs text-muted-foreground">
                        Alert on critical system errors
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div>
                    <Label>Notification Recipients</Label>
                    <Input
                      className="mt-2"
                      placeholder="admin@company.com, security@company.com"
                      defaultValue="admin@company.com"
                    />
                  </div>
                </div>
              </div>

              {/* Compliance Settings */}
              <div className="bg-card border border-border rounded-xl p-6 space-y-4 lg:col-span-2">
                <h2 className="text-lg font-semibold">Compliance Settings</h2>
                <p className="text-sm text-muted-foreground">
                  Configure GDPR and data privacy compliance options
                </p>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>GDPR Compliance Mode</Label>
                        <p className="text-xs text-muted-foreground">
                          Enable enhanced privacy controls
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Mask PII in Logs</Label>
                        <p className="text-xs text-muted-foreground">
                          Automatically mask personal data
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>IP Anonymization</Label>
                        <p className="text-xs text-muted-foreground">
                          Truncate IP addresses in logs
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Right to be Forgotten</Label>
                        <p className="text-xs text-muted-foreground">
                          Enable user log purge requests
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </div>
    </AdminLayout>
  );
}
