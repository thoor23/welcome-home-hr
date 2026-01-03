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
  FileText,
  Plus,
  Mail,
  CheckCircle,
  Edit,
  Copy,
  Eye,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

interface EmailTemplate {
  id: string;
  name: string;
  category: string;
  type: "Email" | "Letter";
  subject: string;
  body: string;
  variables: string[];
  status: "Active" | "Inactive";
  lastModified: string;
}

const sampleTemplates: EmailTemplate[] = [
  {
    id: "1",
    name: "Offer Letter",
    category: "Recruitment",
    type: "Letter",
    subject: "Job Offer - {{position}} Position at {{company_name}}",
    body: "Dear {{candidate_name}},\n\nWe are pleased to offer you the position of {{position}} at {{company_name}}...\n\nSalary: {{salary}}\nJoining Date: {{joining_date}}\n\nBest regards,\n{{hr_name}}",
    variables: ["candidate_name", "position", "company_name", "salary", "joining_date", "hr_name"],
    status: "Active",
    lastModified: "20 Jan 2026",
  },
  {
    id: "2",
    name: "Welcome Email",
    category: "Onboarding",
    type: "Email",
    subject: "Welcome to {{company_name}}, {{employee_name}}!",
    body: "Dear {{employee_name}},\n\nWelcome to {{company_name}}! We are excited to have you on board...\n\nYour manager {{manager_name}} will guide you through the onboarding process.\n\nJoining Date: {{joining_date}}",
    variables: ["employee_name", "company_name", "manager_name", "joining_date"],
    status: "Active",
    lastModified: "18 Jan 2026",
  },
  {
    id: "3",
    name: "Relieving Letter",
    category: "Offboarding",
    type: "Letter",
    subject: "Relieving Letter - {{employee_name}}",
    body: "To Whom It May Concern,\n\nThis is to certify that {{employee_name}} (Employee ID: {{employee_id}}) was employed with {{company_name}} as {{designation}} from {{joining_date}} to {{lwd}}...",
    variables: ["employee_name", "employee_id", "company_name", "designation", "joining_date", "lwd"],
    status: "Active",
    lastModified: "15 Jan 2026",
  },
  {
    id: "4",
    name: "Experience Letter",
    category: "Offboarding",
    type: "Letter",
    subject: "Experience Certificate - {{employee_name}}",
    body: "To Whom It May Concern,\n\nThis is to certify that {{employee_name}} worked with {{company_name}} as {{designation}} for {{experience_years}} years...",
    variables: ["employee_name", "company_name", "designation", "experience_years"],
    status: "Active",
    lastModified: "15 Jan 2026",
  },
  {
    id: "5",
    name: "Interview Invitation",
    category: "Recruitment",
    type: "Email",
    subject: "Interview Invitation - {{position}} at {{company_name}}",
    body: "Dear {{candidate_name}},\n\nWe would like to invite you for an interview for the {{position}} position.\n\nDate: {{interview_date}}\nTime: {{interview_time}}\nLocation: {{interview_location}}\n\nBest regards,\n{{hr_name}}",
    variables: ["candidate_name", "position", "company_name", "interview_date", "interview_time", "interview_location", "hr_name"],
    status: "Active",
    lastModified: "22 Jan 2026",
  },
  {
    id: "6",
    name: "Salary Revision Letter",
    category: "Payroll",
    type: "Letter",
    subject: "Salary Revision - {{employee_name}}",
    body: "Dear {{employee_name}},\n\nWe are pleased to inform you about your salary revision...\n\nNew Salary: {{new_salary}}\nEffective Date: {{effective_date}}",
    variables: ["employee_name", "new_salary", "effective_date"],
    status: "Active",
    lastModified: "10 Jan 2026",
  },
  {
    id: "7",
    name: "Warning Letter",
    category: "HR",
    type: "Letter",
    subject: "Warning Notice - {{employee_name}}",
    body: "Dear {{employee_name}},\n\nThis letter serves as a formal warning regarding {{warning_reason}}...",
    variables: ["employee_name", "warning_reason", "date"],
    status: "Inactive",
    lastModified: "05 Jan 2026",
  },
];

const categories = ["Recruitment", "Onboarding", "Offboarding", "Payroll", "HR", "General"];
const availableVariables = [
  "employee_name", "employee_id", "designation", "department", "company_name",
  "date", "joining_date", "lwd", "salary", "manager_name", "hr_name",
  "candidate_name", "position", "experience_years", "effective_date"
];

const EmailTemplates = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>(sampleTemplates);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    type: "Email" as "Email" | "Letter",
    subject: "",
    body: "",
    status: true,
  });

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      type: "Email",
      subject: "",
      body: "",
      status: true,
    });
    setEditingTemplate(null);
  };

  const handleEdit = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      category: template.category,
      type: template.type,
      subject: template.subject,
      body: template.body,
      status: template.status === "Active",
    });
    setDialogOpen(true);
  };

  const handleView = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setViewDialogOpen(true);
  };

  const handleDuplicate = (template: EmailTemplate) => {
    const newTemplate: EmailTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
      lastModified: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    };
    setTemplates([...templates, newTemplate]);
    toast.success("Template duplicated successfully");
  };

  const handleDelete = (template: EmailTemplate) => {
    setTemplates(templates.filter((t) => t.id !== template.id));
    toast.success("Template deleted successfully");
  };

  const extractVariables = (text: string): string[] => {
    const matches = text.match(/\{\{(\w+)\}\}/g);
    if (!matches) return [];
    return [...new Set(matches.map((m) => m.replace(/\{\{|\}\}/g, "")))];
  };

  const handleSubmit = () => {
    const variables = extractVariables(formData.subject + formData.body);
    
    if (editingTemplate) {
      setTemplates(templates.map((t) =>
        t.id === editingTemplate.id
          ? {
              ...t,
              ...formData,
              variables,
              status: formData.status ? "Active" : "Inactive",
              lastModified: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
            }
          : t
      ));
      toast.success("Template updated successfully");
    } else {
      const newTemplate: EmailTemplate = {
        id: Date.now().toString(),
        ...formData,
        variables,
        status: formData.status ? "Active" : "Inactive",
        lastModified: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      };
      setTemplates([...templates, newTemplate]);
      toast.success("Template created successfully");
    }
    setDialogOpen(false);
    resetForm();
  };

  const columns: Column<EmailTemplate>[] = [
    {
      key: "name",
      header: "Template Name",
      render: (item) => <span className="font-medium">{item.name}</span>,
    },
    {
      key: "category",
      header: "Category",
      render: (item) => <Badge variant="outline">{item.category}</Badge>,
    },
    {
      key: "type",
      header: "Type",
      render: (item) => (
        <Badge className={item.type === "Email" ? "bg-blue-500/10 text-blue-500" : "bg-purple-500/10 text-purple-500"}>
          {item.type}
        </Badge>
      ),
    },
    {
      key: "subject",
      header: "Subject",
      render: (item) => (
        <span className="max-w-[200px] truncate block text-sm">{item.subject}</span>
      ),
    },
    {
      key: "variables",
      header: "Variables",
      render: (item) => (
        <span className="text-sm text-muted-foreground">
          {item.variables.length} variables
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
      key: "lastModified",
      header: "Last Modified",
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
    emails: templates.filter((t) => t.type === "Email").length,
    letters: templates.filter((t) => t.type === "Letter").length,
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Email Templates</h1>
            <p className="text-muted-foreground">Create and manage reusable email & letter templates</p>
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
            icon={FileText}
          />
          <StatsCard
            title="Active Templates"
            value={stats.active.toString()}
            icon={CheckCircle}
          />
          <StatsCard
            title="Email Templates"
            value={stats.emails.toString()}
            icon={Mail}
          />
          <StatsCard
            title="Letter Templates"
            value={stats.letters.toString()}
            icon={FileText}
          />
        </div>

        {/* Data Table */}
        <DataTable columns={columns} data={templates} />

        {/* Add/Edit Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingTemplate ? "Edit Template" : "Create New Template"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Template Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Offer Letter"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={formData.type} onValueChange={(v: "Email" | "Letter") => setFormData({ ...formData, type: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Email">Email</SelectItem>
                      <SelectItem value="Letter">Letter</SelectItem>
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
              <div className="space-y-2">
                <Label>Subject Line</Label>
                <Input
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g., Job Offer - {{position}} at {{company_name}}"
                />
              </div>
              <div className="space-y-2">
                <Label>Body Content</Label>
                <Textarea
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  placeholder="Enter template body with variables like {{employee_name}}..."
                  className="min-h-[200px]"
                />
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-2">Available Variables:</p>
                <div className="flex flex-wrap gap-2">
                  {availableVariables.map((v) => (
                    <Badge key={v} variant="outline" className="cursor-pointer" onClick={() => setFormData({ ...formData, body: formData.body + `{{${v}}}` })}>
                      {`{{${v}}}`}
                    </Badge>
                  ))}
                </div>
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
                <div className="flex gap-2">
                  <Badge variant="outline">{editingTemplate.category}</Badge>
                  <Badge className={editingTemplate.type === "Email" ? "bg-blue-500/10 text-blue-500" : "bg-purple-500/10 text-purple-500"}>
                    {editingTemplate.type}
                  </Badge>
                  <Badge className={editingTemplate.status === "Active" ? "bg-emerald-500/10 text-emerald-500" : "bg-muted text-muted-foreground"}>
                    {editingTemplate.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Subject:</p>
                  <p className="font-medium">{editingTemplate.subject}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Body:</p>
                  <div className="bg-muted/50 rounded-lg p-4 whitespace-pre-wrap text-sm">
                    {editingTemplate.body}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Variables Used:</p>
                  <div className="flex flex-wrap gap-2">
                    {editingTemplate.variables.map((v) => (
                      <Badge key={v} variant="outline">{`{{${v}}}`}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default EmailTemplates;
