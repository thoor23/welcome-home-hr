import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DataTable, Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  FileSignature,
  Plus,
  CheckCircle,
  TrendingUp,
  Calendar,
  Edit,
  Copy,
  Eye,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

interface LetterTemplate {
  id: string;
  name: string;
  letterType: string;
  format: "PDF" | "Word";
  hasHeader: boolean;
  hasFooter: boolean;
  hasSignature: boolean;
  body: string;
  status: "Active" | "Inactive";
  usageCount: number;
  lastModified: string;
}

const letterTypes = [
  "Offer Letter",
  "Appointment Letter",
  "Confirmation Letter",
  "Promotion Letter",
  "Transfer Letter",
  "Salary Revision Letter",
  "Warning Letter",
  "Show Cause Notice",
  "Termination Letter",
  "Relieving Letter",
  "Experience Letter",
  "Internship Certificate",
  "Bonus Letter",
  "Increment Letter",
  "No Objection Certificate",
];

const sampleTemplates: LetterTemplate[] = [
  {
    id: "1",
    name: "Standard Offer Letter",
    letterType: "Offer Letter",
    format: "PDF",
    hasHeader: true,
    hasFooter: true,
    hasSignature: true,
    body: "Dear {{candidate_name}},\n\nWe are pleased to offer you the position of {{position}} at {{company_name}}.\n\nDetails:\n- Designation: {{position}}\n- Department: {{department}}\n- CTC: {{salary}} per annum\n- Joining Date: {{joining_date}}\n\nPlease confirm your acceptance within 7 days.\n\nBest regards,\n{{hr_name}}\nHuman Resources",
    status: "Active",
    usageCount: 45,
    lastModified: "20 Jan 2026",
  },
  {
    id: "2",
    name: "Standard Relieving Letter",
    letterType: "Relieving Letter",
    format: "PDF",
    hasHeader: true,
    hasFooter: true,
    hasSignature: true,
    body: "To Whom It May Concern,\n\nThis is to certify that {{employee_name}} (Employee ID: {{employee_id}}) was employed with {{company_name}} as {{designation}} from {{joining_date}} to {{lwd}}.\n\nAll dues have been settled and {{he_she}} has been relieved from duties effective {{lwd}}.\n\nWe wish {{him_her}} all the best for future endeavors.\n\nFor {{company_name}}\n{{hr_name}}\nHR Manager",
    status: "Active",
    usageCount: 32,
    lastModified: "18 Jan 2026",
  },
  {
    id: "3",
    name: "Experience Certificate",
    letterType: "Experience Letter",
    format: "PDF",
    hasHeader: true,
    hasFooter: true,
    hasSignature: true,
    body: "To Whom It May Concern,\n\nThis is to certify that {{employee_name}} was employed with {{company_name}} as {{designation}} from {{joining_date}} to {{lwd}}.\n\nDuring the tenure, {{he_she}} demonstrated excellent skills and contributed significantly to the organization.\n\nWe recommend {{him_her}} for any suitable position.\n\nFor {{company_name}}\n{{hr_name}}",
    status: "Active",
    usageCount: 28,
    lastModified: "15 Jan 2026",
  },
  {
    id: "4",
    name: "Appointment Letter",
    letterType: "Appointment Letter",
    format: "PDF",
    hasHeader: true,
    hasFooter: true,
    hasSignature: true,
    body: "Dear {{employee_name}},\n\nWelcome to {{company_name}}! This letter confirms your appointment as {{designation}} in the {{department}} department.\n\nTerms:\n- Probation: 6 months\n- CTC: {{salary}}\n- Reporting To: {{manager_name}}\n\nPlease sign the enclosed copy as acceptance.\n\nBest regards,\n{{hr_name}}",
    status: "Active",
    usageCount: 38,
    lastModified: "22 Jan 2026",
  },
  {
    id: "5",
    name: "Warning Letter Template",
    letterType: "Warning Letter",
    format: "Word",
    hasHeader: true,
    hasFooter: false,
    hasSignature: true,
    body: "Dear {{employee_name}},\n\nThis letter serves as a formal warning regarding {{warning_reason}}.\n\nDetails of the incident:\n{{incident_details}}\n\nThis is a {{warning_level}} warning. Please ensure this does not repeat.\n\nFor {{company_name}}\n{{hr_name}}",
    status: "Active",
    usageCount: 12,
    lastModified: "10 Jan 2026",
  },
  {
    id: "6",
    name: "Promotion Letter",
    letterType: "Promotion Letter",
    format: "PDF",
    hasHeader: true,
    hasFooter: true,
    hasSignature: true,
    body: "Dear {{employee_name}},\n\nCongratulations! We are pleased to inform you that you have been promoted to {{new_designation}} effective {{effective_date}}.\n\nNew CTC: {{new_salary}}\n\nWe appreciate your dedication and look forward to your continued success.\n\nBest regards,\n{{hr_name}}",
    status: "Active",
    usageCount: 15,
    lastModified: "08 Jan 2026",
  },
];

const LetterTemplates = () => {
  const [templates, setTemplates] = useState<LetterTemplate[]>(sampleTemplates);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<LetterTemplate | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    letterType: "",
    format: "PDF" as "PDF" | "Word",
    hasHeader: true,
    hasFooter: true,
    hasSignature: true,
    body: "",
    status: true,
  });

  const resetForm = () => {
    setFormData({
      name: "",
      letterType: "",
      format: "PDF",
      hasHeader: true,
      hasFooter: true,
      hasSignature: true,
      body: "",
      status: true,
    });
    setEditingTemplate(null);
  };

  const handleEdit = (template: LetterTemplate) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      letterType: template.letterType,
      format: template.format,
      hasHeader: template.hasHeader,
      hasFooter: template.hasFooter,
      hasSignature: template.hasSignature,
      body: template.body,
      status: template.status === "Active",
    });
    setDialogOpen(true);
  };

  const handleView = (template: LetterTemplate) => {
    setEditingTemplate(template);
    setViewDialogOpen(true);
  };

  const handleDuplicate = (template: LetterTemplate) => {
    const newTemplate: LetterTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
      usageCount: 0,
      lastModified: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    };
    setTemplates([...templates, newTemplate]);
    toast.success("Template duplicated successfully");
  };

  const handleDelete = (template: LetterTemplate) => {
    setTemplates(templates.filter((t) => t.id !== template.id));
    toast.success("Template deleted successfully");
  };

  const handleSubmit = () => {
    if (editingTemplate) {
      setTemplates(templates.map((t) =>
        t.id === editingTemplate.id
          ? {
              ...t,
              ...formData,
              status: formData.status ? "Active" : "Inactive",
              lastModified: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
            }
          : t
      ));
      toast.success("Template updated successfully");
    } else {
      const newTemplate: LetterTemplate = {
        id: Date.now().toString(),
        ...formData,
        status: formData.status ? "Active" : "Inactive",
        usageCount: 0,
        lastModified: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      };
      setTemplates([...templates, newTemplate]);
      toast.success("Template created successfully");
    }
    setDialogOpen(false);
    resetForm();
  };

  const columns: Column<LetterTemplate>[] = [
    {
      key: "name",
      header: "Template Name",
      render: (item) => <span className="font-medium">{item.name}</span>,
    },
    {
      key: "letterType",
      header: "Letter Type",
      render: (item) => <Badge variant="outline">{item.letterType}</Badge>,
    },
    {
      key: "format",
      header: "Format",
      render: (item) => (
        <Badge className={item.format === "PDF" ? "bg-red-500/10 text-red-500" : "bg-blue-500/10 text-blue-500"}>
          {item.format}
        </Badge>
      ),
    },
    {
      key: "hasHeader",
      header: "Header",
      render: (item) => (
        <span className={item.hasHeader ? "text-emerald-500" : "text-muted-foreground"}>
          {item.hasHeader ? "Yes" : "No"}
        </span>
      ),
    },
    {
      key: "hasFooter",
      header: "Footer",
      render: (item) => (
        <span className={item.hasFooter ? "text-emerald-500" : "text-muted-foreground"}>
          {item.hasFooter ? "Yes" : "No"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item) => (
        <Badge className={item.status === "Active" ? "bg-emerald-500/10 text-emerald-500" : "bg-muted text-muted-foreground"}>
          {item.status}
        </Badge>
      ),
    },
    {
      key: "usageCount",
      header: "Usage",
      render: (item) => <span className="text-muted-foreground">{item.usageCount} times</span>,
    },
    {
      key: "actions",
      header: "Actions",
      sortable: false,
      render: (item) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => handleView(item)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleDuplicate(item)}>
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleDelete(item)}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];

  const stats = {
    total: templates.length,
    active: templates.filter((t) => t.status === "Active").length,
    mostUsed: templates.reduce((a, b) => a.usageCount > b.usageCount ? a : b).name,
    thisMonth: templates.filter((t) => t.lastModified.includes("Jan 2026")).length,
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Letter Templates</h1>
            <p className="text-muted-foreground">Manage formal letter templates with headers and footers</p>
          </div>
          <Button onClick={() => { resetForm(); setDialogOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Template
          </Button>
        </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <StatsCard
                title="Total Templates"
                value={stats.total.toString()}
                icon={FileSignature}
              />
              <StatsCard
                title="Active Templates"
                value={stats.active.toString()}
                icon={CheckCircle}
              />
              <StatsCard
                title="Most Used"
                value={stats.mostUsed}
                icon={TrendingUp}
              />
              <StatsCard
                title="Created This Month"
                value={stats.thisMonth.toString()}
                icon={Calendar}
              />
            </div>

            {/* Data Table */}
            <DataTable columns={columns} data={templates} />

            {/* Add/Edit Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingTemplate ? "Edit Letter Template" : "Create Letter Template"}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Template Name</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Standard Offer Letter"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Letter Type</Label>
                      <Select value={formData.letterType} onValueChange={(v) => setFormData({ ...formData, letterType: v })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {letterTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Format</Label>
                      <Select value={formData.format} onValueChange={(v: "PDF" | "Word") => setFormData({ ...formData, format: v })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PDF">PDF</SelectItem>
                          <SelectItem value="Word">Word</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 flex items-end">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={formData.status}
                          onCheckedChange={(checked) => setFormData({ ...formData, status: checked })}
                        />
                        <Label>Active</Label>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={formData.hasHeader}
                        onCheckedChange={(checked) => setFormData({ ...formData, hasHeader: checked })}
                      />
                      <Label>Include Company Header</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={formData.hasFooter}
                        onCheckedChange={(checked) => setFormData({ ...formData, hasFooter: checked })}
                      />
                      <Label>Include Footer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={formData.hasSignature}
                        onCheckedChange={(checked) => setFormData({ ...formData, hasSignature: checked })}
                      />
                      <Label>Digital Signature</Label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Letter Body Content</Label>
                    <Textarea
                      value={formData.body}
                      onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                      placeholder="Enter letter content with variables like {{employee_name}}..."
                      className="min-h-[250px]"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleSubmit}>
                    {editingTemplate ? "Update Template" : "Create Template"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* View Dialog */}
            <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingTemplate?.name}</DialogTitle>
                </DialogHeader>
                {editingTemplate && (
                  <div className="space-y-4">
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline">{editingTemplate.letterType}</Badge>
                      <Badge className={editingTemplate.format === "PDF" ? "bg-red-500/10 text-red-500" : "bg-blue-500/10 text-blue-500"}>
                        {editingTemplate.format}
                      </Badge>
                      <Badge className={editingTemplate.status === "Active" ? "bg-emerald-500/10 text-emerald-500" : "bg-muted text-muted-foreground"}>
                        {editingTemplate.status}
                      </Badge>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <span>Header: <span className={editingTemplate.hasHeader ? "text-emerald-500" : "text-muted-foreground"}>{editingTemplate.hasHeader ? "Yes" : "No"}</span></span>
                      <span>Footer: <span className={editingTemplate.hasFooter ? "text-emerald-500" : "text-muted-foreground"}>{editingTemplate.hasFooter ? "Yes" : "No"}</span></span>
                      <span>Signature: <span className={editingTemplate.hasSignature ? "text-emerald-500" : "text-muted-foreground"}>{editingTemplate.hasSignature ? "Yes" : "No"}</span></span>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Letter Content:</p>
                      <div className="bg-muted/50 rounded-lg p-4 whitespace-pre-wrap text-sm border">
                        {editingTemplate.body}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Used {editingTemplate.usageCount} times • Last modified: {editingTemplate.lastModified}
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </AdminLayout>
      );
};

export default LetterTemplates;
