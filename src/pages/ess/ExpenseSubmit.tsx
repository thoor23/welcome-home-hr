import { useState } from "react";
import { ESSLayout } from "@/components/layout/ESSLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Receipt, 
  Upload, 
  Plus, 
  X, 
  Calendar,
  IndianRupee,
  FileText,
  Info,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

interface ExpenseItem {
  id: string;
  category: string;
  description: string;
  amount: string;
  date: string;
  receipt: File | null;
}

const expenseCategories = [
  { value: "travel", label: "Travel & Transport" },
  { value: "food", label: "Food & Meals" },
  { value: "accommodation", label: "Accommodation" },
  { value: "office", label: "Office Supplies" },
  { value: "communication", label: "Communication" },
  { value: "training", label: "Training & Development" },
  { value: "entertainment", label: "Client Entertainment" },
  { value: "other", label: "Other" },
];

const recentClaims = [
  { id: "EXP-2024-045", date: "Dec 28, 2024", amount: 3500, status: "Approved" },
  { id: "EXP-2024-042", date: "Dec 20, 2024", amount: 1200, status: "Pending" },
  { id: "EXP-2024-038", date: "Dec 15, 2024", amount: 5800, status: "Approved" },
];

export default function ExpenseSubmit() {
  const [expenseItems, setExpenseItems] = useState<ExpenseItem[]>([
    { id: "1", category: "", description: "", amount: "", date: "", receipt: null }
  ]);
  const [claimTitle, setClaimTitle] = useState("");
  const [notes, setNotes] = useState("");

  const addExpenseItem = () => {
    setExpenseItems([
      ...expenseItems,
      { id: Date.now().toString(), category: "", description: "", amount: "", date: "", receipt: null }
    ]);
  };

  const removeExpenseItem = (id: string) => {
    if (expenseItems.length > 1) {
      setExpenseItems(expenseItems.filter(item => item.id !== id));
    }
  };

  const updateExpenseItem = (id: string, field: keyof ExpenseItem, value: string | File | null) => {
    setExpenseItems(expenseItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const totalAmount = expenseItems.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  const handleSubmit = () => {
    if (!claimTitle.trim()) {
      toast.error("Please enter a claim title");
      return;
    }
    
    const hasValidItems = expenseItems.some(item => 
      item.category && item.description && item.amount && item.date
    );
    
    if (!hasValidItems) {
      toast.error("Please add at least one valid expense item");
      return;
    }
    
    toast.success("Expense claim submitted successfully!");
    // Reset form
    setClaimTitle("");
    setNotes("");
    setExpenseItems([{ id: "1", category: "", description: "", amount: "", date: "", receipt: null }]);
  };

  const handleSaveDraft = () => {
    toast.success("Draft saved successfully!");
  };

  return (
    <ESSLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Submit Expense Claim</h1>
            <p className="text-muted-foreground mt-1">Create and submit your expense reimbursement requests</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleSaveDraft}>
              <FileText className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button onClick={handleSubmit}>
              <Receipt className="h-4 w-4 mr-2" />
              Submit Claim
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Claim Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Claim Details</CardTitle>
                <CardDescription>Enter the basic information for your expense claim</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Claim Title *</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g., December Business Travel Expenses" 
                    value={claimTitle}
                    onChange={(e) => setClaimTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Any additional information about this claim..." 
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Expense Items */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle className="text-lg">Expense Items</CardTitle>
                  <CardDescription>Add all expenses you want to claim</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={addExpenseItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {expenseItems.map((item, index) => (
                  <div key={item.id} className="relative p-4 border border-border rounded-lg bg-muted/30">
                    {expenseItems.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={() => removeExpenseItem(item.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                    
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">{index + 1}</span>
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">Expense Item</span>
                    </div>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Category *</Label>
                        <Select 
                          value={item.category} 
                          onValueChange={(value) => updateExpenseItem(item.id, "category", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {expenseCategories.map(cat => (
                              <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Date *</Label>
                        <div className="relative">
                          <Input 
                            type="date" 
                            value={item.date}
                            onChange={(e) => updateExpenseItem(item.id, "date", e.target.value)}
                            className="pl-10"
                          />
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      
                      <div className="space-y-2 sm:col-span-2">
                        <Label>Description *</Label>
                        <Input 
                          placeholder="Brief description of the expense" 
                          value={item.description}
                          onChange={(e) => updateExpenseItem(item.id, "description", e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Amount (₹) *</Label>
                        <div className="relative">
                          <Input 
                            type="number" 
                            placeholder="0.00" 
                            value={item.amount}
                            onChange={(e) => updateExpenseItem(item.id, "amount", e.target.value)}
                            className="pl-10"
                          />
                          <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Receipt</Label>
                        <div className="relative">
                          <Input 
                            type="file" 
                            accept="image/*,.pdf"
                            onChange={(e) => updateExpenseItem(item.id, "receipt", e.target.files?.[0] || null)}
                            className="cursor-pointer"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">Upload receipt (PDF, JPG, PNG)</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Summary */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-primary" />
                  Claim Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Items</span>
                  <span className="font-medium">{expenseItems.filter(i => i.amount).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Amount</span>
                  <span className="text-2xl font-bold text-primary">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-500" />
                  Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Submit claims within 30 days of expense</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Attach original receipts for all expenses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Food expenses limited to ₹500/day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Travel bookings require prior approval</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Recent Claims */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Claims</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentClaims.map((claim) => (
                  <div key={claim.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium text-sm">{claim.id}</p>
                      <p className="text-xs text-muted-foreground">{claim.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{claim.amount.toLocaleString('en-IN')}</p>
                      <Badge 
                        variant={claim.status === "Approved" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {claim.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ESSLayout>
  );
}
