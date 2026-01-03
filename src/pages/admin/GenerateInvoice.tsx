import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, FileText, Eye, Download, Receipt, Clock, CheckCircle, Wallet } from "lucide-react";
import { toast } from "sonner";

interface LineItem {
  id: string;
  description: string;
  category: string;
  quantity: number;
  rate: number;
  amount: number;
}

const GenerateInvoice = () => {
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: "1", description: "", category: "", quantity: 1, rate: 0, amount: 0 }
  ]);

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      { id: Date.now().toString(), description: "", category: "", quantity: 1, rate: 0, amount: 0 }
    ]);
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id));
    }
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    setLineItems(lineItems.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === "quantity" || field === "rate") {
          updated.amount = updated.quantity * updated.rate;
        }
        return updated;
      }
      return item;
    }));
  };

  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
  const gst = 0; // Can be made configurable
  const total = subtotal + gst;

  const handleGenerate = () => {
    toast.success("Invoice generated successfully!");
  };
  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Generate Invoice</h1>
          <p className="text-muted-foreground">Create invoices for approved budget requests</p>
        </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Invoices Generated</CardTitle>
                    <Receipt className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Pending Invoices</CardTitle>
                    <Clock className="h-4 w-4 text-yellow-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">Awaiting payment</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Invoice Amount</CardTitle>
                    <Wallet className="h-4 w-4 text-emerald-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹45.2L</div>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Paid Invoices</CardTitle>
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">19</div>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </CardContent>
                </Card>
              </div>

              {/* Invoice Form */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Invoice Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Branch/Location</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select branch" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="del">Delhi Branch (DEL-001)</SelectItem>
                              <SelectItem value="blr">Bangalore Hub (BLR-001)</SelectItem>
                              <SelectItem value="mum">Mumbai Store (MUM-002)</SelectItem>
                              <SelectItem value="pun">Pune Warehouse (PUN-001)</SelectItem>
                              <SelectItem value="chn">Chennai Factory (CHN-001)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Invoice Template</Label>
                          <Select defaultValue="standard">
                            <SelectTrigger>
                              <SelectValue placeholder="Select template" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="standard">Standard Invoice</SelectItem>
                              <SelectItem value="detailed">Detailed Invoice</SelectItem>
                              <SelectItem value="simple">Simple Invoice</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Invoice Date</Label>
                          <Input type="date" defaultValue="2026-01-02" />
                        </div>
                        <div className="space-y-2">
                          <Label>Due Date</Label>
                          <Input type="date" defaultValue="2026-01-15" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Link Approved Requests (Optional)</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select approved requests to include" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="br001">BR-2026-001 - Salary Budget (₹15L)</SelectItem>
                            <SelectItem value="br002">BR-2026-002 - IT Equipment (₹3.5L)</SelectItem>
                            <SelectItem value="br003">BR-2026-003 - Maintenance (₹75K)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Line Items</CardTitle>
                      <Button variant="outline" size="sm" onClick={addLineItem}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add Item
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {lineItems.map((item, index) => (
                          <div key={item.id} className="grid grid-cols-12 gap-2 items-end">
                            <div className="col-span-4 space-y-1">
                              {index === 0 && <Label className="text-xs">Description</Label>}
                              <Input 
                                placeholder="Item description" 
                                value={item.description}
                                onChange={(e) => updateLineItem(item.id, "description", e.target.value)}
                              />
                            </div>
                            <div className="col-span-2 space-y-1">
                              {index === 0 && <Label className="text-xs">Category</Label>}
                              <Select 
                                value={item.category}
                                onValueChange={(value) => updateLineItem(item.id, "category", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="salary">Salary</SelectItem>
                                  <SelectItem value="expense">Expense</SelectItem>
                                  <SelectItem value="it">IT</SelectItem>
                                  <SelectItem value="resource">Resource</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="col-span-1 space-y-1">
                              {index === 0 && <Label className="text-xs">Qty</Label>}
                              <Input 
                                type="number" 
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updateLineItem(item.id, "quantity", parseInt(e.target.value) || 0)}
                              />
                            </div>
                            <div className="col-span-2 space-y-1">
                              {index === 0 && <Label className="text-xs">Rate (₹)</Label>}
                              <Input 
                                type="number" 
                                min="0"
                                value={item.rate}
                                onChange={(e) => updateLineItem(item.id, "rate", parseFloat(e.target.value) || 0)}
                              />
                            </div>
                            <div className="col-span-2 space-y-1">
                              {index === 0 && <Label className="text-xs">Amount (₹)</Label>}
                              <Input 
                                type="number" 
                                value={item.amount}
                                disabled
                                className="bg-muted"
                              />
                            </div>
                            <div className="col-span-1">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => removeLineItem(item.id)}
                                disabled={lineItems.length === 1}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Separator className="my-4" />

                      <div className="flex justify-end">
                        <div className="w-64 space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal:</span>
                            <span>₹{subtotal.toLocaleString("en-IN")}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">GST (0%):</span>
                            <span>₹{gst.toLocaleString("en-IN")}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-bold text-lg">
                            <span>Total:</span>
                            <span className="text-primary">₹{total.toLocaleString("en-IN")}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Additional Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Notes/Remarks</Label>
                        <Textarea placeholder="Add any notes for this invoice..." />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Preview & Actions */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Invoice Preview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <FileText className="h-12 w-12 mx-auto mb-2" />
                          <p>Invoice Preview</p>
                          <p className="text-sm">Fill in details to see preview</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full">
                          <Eye className="h-4 w-4 mr-2" />
                          Full Preview
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Download Draft
                        </Button>
                        <Separator />
                        <Button className="w-full" onClick={handleGenerate}>
                          <Receipt className="h-4 w-4 mr-2" />
                          Generate Invoice
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Info</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p><span className="text-muted-foreground">Invoice No:</span> INV-2026-025</p>
                      <p><span className="text-muted-foreground">Created By:</span> Admin User</p>
                      <p><span className="text-muted-foreground">Status:</span> Draft</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </AdminLayout>
      );
};

export default GenerateInvoice;
