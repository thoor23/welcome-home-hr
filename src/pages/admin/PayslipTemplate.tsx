import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, FileText, Check, Pencil, Trash2, Eye, Download } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  createdAt: string;
  lastModified: string;
}

const mockTemplates: Template[] = [
  { id: "1", name: "Standard Payslip", description: "Default payslip template with all standard components", isDefault: true, createdAt: "2024-01-15", lastModified: "2024-12-01" },
  { id: "2", name: "Detailed Payslip", description: "Detailed breakdown with tax calculations and YTD totals", isDefault: false, createdAt: "2024-03-20", lastModified: "2024-11-15" },
  { id: "3", name: "Simple Payslip", description: "Minimal template with basic salary information", isDefault: false, createdAt: "2024-06-10", lastModified: "2024-10-20" },
];

const PayslipTemplate = () => {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const handleSetDefault = (id: string) => {
    setTemplates(templates.map(t => ({
      ...t,
      isDefault: t.id === id
    })));
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Payslip Templates</h1>
                  <p className="text-muted-foreground">Manage and customize payslip templates</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Template
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create New Template</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Template Name</Label>
                        <Input placeholder="e.g., Corporate Payslip" />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea placeholder="Describe this template..." />
                      </div>
                      <Separator />
                      <div className="space-y-4">
                        <h4 className="font-medium">Template Sections</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <Label>Company Logo</Label>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <Label>Employee Photo</Label>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <Label>Bank Details</Label>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <Label>YTD Summary</Label>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <Label>Tax Breakdown</Label>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <Label>Leave Balance</Label>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <Label>Attendance Summary</Label>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <Label>Digital Signature</Label>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setIsDialogOpen(false)}>
                          Create Template
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Templates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <Card key={template.id} className={template.isDefault ? "border-primary" : ""}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{template.name}</CardTitle>
                            {template.isDefault && (
                              <Badge variant="default" className="mt-1">
                                <Check className="h-3 w-3 mr-1" />
                                Default
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <CardDescription className="mt-2">{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Created: {new Date(template.createdAt).toLocaleDateString("en-IN")}</span>
                        <span>Modified: {new Date(template.lastModified).toLocaleDateString("en-IN")}</span>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        {!template.isDefault && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSetDefault(template.id)}
                          >
                            Set Default
                          </Button>
                        )}
                      </div>
                      {!template.isDefault && (
                        <Button variant="ghost" size="sm" className="w-full text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete Template
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Preview Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Template Preview</CardTitle>
                  <CardDescription>Preview of the currently selected default template</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 rounded-lg p-8 min-h-[400px]">
                    <div className="bg-background rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
                      {/* Mock Payslip Preview */}
                      <div className="border-b pb-4 mb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold text-primary">NexHR Solutions</h3>
                            <p className="text-sm text-muted-foreground">123 Business Park, Mumbai - 400001</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">PAYSLIP</p>
                            <p className="text-sm text-muted-foreground">December 2024</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                        <div>
                          <p className="text-muted-foreground">Employee Name</p>
                          <p className="font-medium">Rahul Sharma</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Employee ID</p>
                          <p className="font-medium">EMP001</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Department</p>
                          <p className="font-medium">Engineering</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Designation</p>
                          <p className="font-medium">Senior Developer</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-medium mb-2 text-emerald-600">Earnings</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between"><span>Basic Salary</span><span>₹42,500</span></div>
                            <div className="flex justify-between"><span>HRA</span><span>₹17,000</span></div>
                            <div className="flex justify-between"><span>DA</span><span>₹8,500</span></div>
                            <div className="flex justify-between"><span>Conveyance</span><span>₹1,600</span></div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2 text-rose-600">Deductions</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between"><span>Provident Fund</span><span>₹5,100</span></div>
                            <div className="flex justify-between"><span>Professional Tax</span><span>₹200</span></div>
                            <div className="flex justify-between"><span>TDS</span><span>₹7,200</span></div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-4 flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Gross Salary: ₹85,000</p>
                          <p className="text-sm text-muted-foreground">Total Deductions: ₹12,500</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Net Payable</p>
                          <p className="text-2xl font-bold text-primary">₹72,500</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <Button>
                      <Download className="h-4 w-4 mr-2" />
                      Download Sample PDF
                    </Button>
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

export default PayslipTemplate;
