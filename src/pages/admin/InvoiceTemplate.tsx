import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
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
  { id: "1", name: "Standard Invoice", description: "Default invoice template with all standard sections for branch billing", isDefault: true, createdAt: "2024-01-15", lastModified: "2024-12-01" },
  { id: "2", name: "Detailed Invoice", description: "Comprehensive template with category breakdown and approval signatures", isDefault: false, createdAt: "2024-03-20", lastModified: "2024-11-15" },
  { id: "3", name: "Simple Invoice", description: "Minimal template with basic billing information", isDefault: false, createdAt: "2024-06-10", lastModified: "2024-10-20" },
];

const InvoiceTemplate = () => {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSetDefault = (id: string) => {
    setTemplates(templates.map(t => ({
      ...t,
      isDefault: t.id === id
    })));
  };
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Invoice Templates</h1>
          <p className="text-muted-foreground mt-1">Manage and customize invoice templates for internal billing</p>
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
                        <Input placeholder="e.g., Corporate Invoice" />
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
                            <Label>Branch Details</Label>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <Label>Head Office Details</Label>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <Label>Invoice Number</Label>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <Label>Category Breakdown</Label>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <Label>Amount in Words</Label>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <Label>GST/Tax Section</Label>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <Label>Bank Details</Label>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <Label>Terms & Conditions</Label>
                            <Switch defaultChecked />
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
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
          <CardTitle>Invoice Preview</CardTitle>
          <CardDescription>Preview of the currently selected default template</CardDescription>
        </CardHeader>
        <CardContent>
                  <div className="bg-muted/50 rounded-lg p-8 min-h-[500px]">
                    <div className="bg-background rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
                      {/* Invoice Header */}
                      <div className="border-b pb-4 mb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold text-primary">NexHR Solutions</h3>
                            <p className="text-sm text-muted-foreground">Head Office - Mumbai</p>
                            <p className="text-sm text-muted-foreground">GSTIN: 27AABCU9603R1ZM</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">INTERNAL INVOICE</p>
                            <p className="text-sm text-muted-foreground">Invoice No: INV-2026-001</p>
                            <p className="text-sm text-muted-foreground">Date: 02 Jan 2026</p>
                            <p className="text-sm text-muted-foreground">Due: 15 Jan 2026</p>
                          </div>
                        </div>
                      </div>

                      {/* Bill From/To */}
                      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="font-medium text-muted-foreground mb-1">BILL FROM:</p>
                          <p className="font-medium">Delhi Branch</p>
                          <p className="text-muted-foreground">Branch Code: DEL-001</p>
                          <p className="text-muted-foreground">Manager: Rajesh Kumar</p>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="font-medium text-muted-foreground mb-1">BILL TO:</p>
                          <p className="font-medium">Head Office - Finance Dept</p>
                          <p className="text-muted-foreground">123 Business Park, Mumbai</p>
                          <p className="text-muted-foreground">Maharashtra - 400001</p>
                        </div>
                      </div>

                      {/* Items Table */}
                      <div className="mb-6">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">#</th>
                              <th className="text-left py-2">Description</th>
                              <th className="text-left py-2">Category</th>
                              <th className="text-right py-2">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-2">1</td>
                              <td className="py-2">January Salary Budget</td>
                              <td className="py-2">Salary</td>
                              <td className="py-2 text-right">₹15,00,000</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2">2</td>
                              <td className="py-2">Office Rent Q1</td>
                              <td className="py-2">Expense</td>
                              <td className="py-2 text-right">₹2,50,000</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2">3</td>
                              <td className="py-2">IT Equipment - Laptops (5)</td>
                              <td className="py-2">IT</td>
                              <td className="py-2 text-right">₹4,50,000</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2">4</td>
                              <td className="py-2">Utility Bills</td>
                              <td className="py-2">Expense</td>
                              <td className="py-2 text-right">₹45,000</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Totals */}
                      <div className="flex justify-end mb-6">
                        <div className="w-64 space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>₹22,45,000</span>
                          </div>
                          <div className="flex justify-between text-muted-foreground">
                            <span>GST (0%):</span>
                            <span>₹0</span>
                          </div>
                          <Separator className="my-2" />
                          <div className="flex justify-between font-bold text-lg">
                            <span>Total:</span>
                            <span className="text-primary">₹22,45,000</span>
                          </div>
                          <p className="text-xs text-muted-foreground italic">
                            (Twenty-Two Lakh Forty-Five Thousand Only)
                          </p>
                        </div>
                      </div>

                      {/* Bank Details */}
                      <div className="bg-muted/50 p-3 rounded-lg mb-6 text-sm">
                        <p className="font-medium mb-1">Bank Details for Transfer:</p>
                        <p className="text-muted-foreground">
                          Bank: State Bank of India | A/C: XXXXXXXXXXXX | IFSC: SBIN0001234
                        </p>
                      </div>

                      {/* Signatures */}
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t text-sm">
                        <div className="text-center">
                          <div className="h-12 border-b border-dashed mb-2"></div>
                          <p className="font-medium">Branch Manager</p>
                          <p className="text-muted-foreground">(Authorized Signatory)</p>
                        </div>
                        <div className="text-center">
                          <div className="h-12 border-b border-dashed mb-2"></div>
                          <p className="font-medium">Finance Head</p>
                          <p className="text-muted-foreground">(Approval)</p>
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
    </AdminLayout>
  );
};

export default InvoiceTemplate;
