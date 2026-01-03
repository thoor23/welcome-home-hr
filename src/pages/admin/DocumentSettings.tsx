import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  HardDrive,
  Upload,
  Shield,
  Clock,
  FileText,
  Save,
} from "lucide-react";
import { toast } from "sonner";

const fileTypes = [
  { id: "pdf", label: "PDF Documents (.pdf)" },
  { id: "docx", label: "Word Documents (.docx)" },
  { id: "xlsx", label: "Excel Spreadsheets (.xlsx)" },
  { id: "jpg", label: "JPEG Images (.jpg)" },
  { id: "png", label: "PNG Images (.png)" },
  { id: "gif", label: "GIF Images (.gif)" },
  { id: "txt", label: "Text Files (.txt)" },
  { id: "csv", label: "CSV Files (.csv)" },
];

export default function DocumentSettings() {
  const [storageLimit, setStorageLimit] = useState("10");
  const [warningThreshold, setWarningThreshold] = useState("80");
  const [autoArchiveDays, setAutoArchiveDays] = useState("365");
  const [maxFileSize, setMaxFileSize] = useState("10");
  const [enableDragDrop, setEnableDragDrop] = useState(true);
  const [autoThumbnails, setAutoThumbnails] = useState(true);
  const [virusScan, setVirusScan] = useState(true);
  const [defaultAccess, setDefaultAccess] = useState("private");
  const [allowSelfUpload, setAllowSelfUpload] = useState(true);
  const [requireApproval, setRequireApproval] = useState(false);
  const [keepPayslips, setKeepPayslips] = useState("7");
  const [keepContracts, setKeepContracts] = useState("10");
  const [deleteAfterTermination, setDeleteAfterTermination] = useState("90");
  const [archiveInsteadDelete, setArchiveInsteadDelete] = useState(true);
  const [autoRename, setAutoRename] = useState(true);
  const [namingPattern, setNamingPattern] = useState("{EmployeeID}_{DocumentType}_{Date}");
  const [preserveNames, setPreserveNames] = useState(false);
  const [allowedTypes, setAllowedTypes] = useState(["pdf", "docx", "xlsx", "jpg", "png"]);

  const storageUsed = 4.8;
  const storageTotal = parseInt(storageLimit);
  const usagePercentage = (storageUsed / storageTotal) * 100;

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  const toggleFileType = (typeId: string) => {
    if (allowedTypes.includes(typeId)) {
      setAllowedTypes(allowedTypes.filter((t) => t !== typeId));
    } else {
      setAllowedTypes([...allowedTypes, typeId]);
    }
  };

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Document Settings</h1>
          <p className="text-muted-foreground">
            Configure document management preferences
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Storage Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-primary" />
              Storage Settings
            </CardTitle>
            <CardDescription>Configure storage limits and usage alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Storage Used</span>
                <span className="text-sm font-medium">{storageUsed} GB / {storageTotal} GB</span>
              </div>
              <Progress value={usagePercentage} className="h-2" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Total Storage Limit (GB)</Label>
                <Select value={storageLimit} onValueChange={setStorageLimit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 GB</SelectItem>
                    <SelectItem value="10">10 GB</SelectItem>
                    <SelectItem value="25">25 GB</SelectItem>
                    <SelectItem value="50">50 GB</SelectItem>
                    <SelectItem value="100">100 GB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Warning Threshold (%)</Label>
                <Input
                  type="number"
                  value={warningThreshold}
                  onChange={(e) => setWarningThreshold(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Auto-archive after (days)</Label>
              <Input
                type="number"
                value={autoArchiveDays}
                onChange={(e) => setAutoArchiveDays(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Documents will be archived after this many days of inactivity
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Upload Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Upload Settings
            </CardTitle>
            <CardDescription>Configure file upload preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Default Max File Size (MB)</Label>
              <Select value={maxFileSize} onValueChange={setMaxFileSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 MB</SelectItem>
                  <SelectItem value="10">10 MB</SelectItem>
                  <SelectItem value="20">20 MB</SelectItem>
                  <SelectItem value="50">50 MB</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label>Allowed File Types</Label>
              <div className="grid grid-cols-2 gap-2">
                {fileTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={type.id}
                      checked={allowedTypes.includes(type.id)}
                      onCheckedChange={() => toggleFileType(type.id)}
                    />
                    <label
                      htmlFor={type.id}
                      className="text-sm text-muted-foreground cursor-pointer"
                    >
                      {type.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Drag & Drop</Label>
                  <p className="text-xs text-muted-foreground">Allow drag and drop uploads</p>
                </div>
                <Switch checked={enableDragDrop} onCheckedChange={setEnableDragDrop} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-generate Thumbnails</Label>
                  <p className="text-xs text-muted-foreground">Create previews for images</p>
                </div>
                <Switch checked={autoThumbnails} onCheckedChange={setAutoThumbnails} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Virus Scan Before Upload</Label>
                  <p className="text-xs text-muted-foreground">Scan files for malware</p>
                </div>
                <Switch checked={virusScan} onCheckedChange={setVirusScan} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Access Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Access Control
            </CardTitle>
            <CardDescription>Configure document access permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Default Access Level</Label>
              <Select value={defaultAccess} onValueChange={setDefaultAccess}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">Private - Only uploader</SelectItem>
                  <SelectItem value="department">Department - Team members</SelectItem>
                  <SelectItem value="public">Public - All employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Allow Employee Self-Upload</Label>
                  <p className="text-xs text-muted-foreground">Employees can upload documents</p>
                </div>
                <Switch checked={allowSelfUpload} onCheckedChange={setAllowSelfUpload} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Require Approval for Uploads</Label>
                  <p className="text-xs text-muted-foreground">Admin approval before publish</p>
                </div>
                <Switch checked={requireApproval} onCheckedChange={setRequireApproval} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Retention Policy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Retention Policy
            </CardTitle>
            <CardDescription>Configure document retention rules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Keep Payslips (years)</Label>
                <Input
                  type="number"
                  value={keepPayslips}
                  onChange={(e) => setKeepPayslips(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Keep Contracts (years)</Label>
                <Input
                  type="number"
                  value={keepContracts}
                  onChange={(e) => setKeepContracts(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Delete After Termination (days)</Label>
              <Input
                type="number"
                value={deleteAfterTermination}
                onChange={(e) => setDeleteAfterTermination(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Days after employee exit to retain documents
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Archive Instead of Delete</Label>
                <p className="text-xs text-muted-foreground">Move to archive instead of permanent delete</p>
              </div>
              <Switch checked={archiveInsteadDelete} onCheckedChange={setArchiveInsteadDelete} />
            </div>
          </CardContent>
        </Card>

        {/* Naming Convention */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Naming Convention
            </CardTitle>
            <CardDescription>Configure automatic file naming rules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-rename Files</Label>
                <p className="text-xs text-muted-foreground">Automatically rename files on upload</p>
              </div>
              <Switch checked={autoRename} onCheckedChange={setAutoRename} />
            </div>
            {autoRename && (
              <div className="space-y-2">
                <Label>Naming Pattern</Label>
                <Input
                  value={namingPattern}
                  onChange={(e) => setNamingPattern(e.target.value)}
                  placeholder="{EmployeeID}_{DocumentType}_{Date}"
                />
                <p className="text-xs text-muted-foreground">
                  Available variables: {"{EmployeeID}"}, {"{EmployeeName}"}, {"{DocumentType}"}, {"{Date}"}, {"{Time}"}
                </p>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div>
                <Label>Preserve Original Names</Label>
                <p className="text-xs text-muted-foreground">Keep original filename as metadata</p>
              </div>
              <Switch checked={preserveNames} onCheckedChange={setPreserveNames} />
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}