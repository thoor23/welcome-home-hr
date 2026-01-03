import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DataTable, Column } from "@/components/ui/data-table";
import { Plus, Pencil, Trash2, Tags } from "lucide-react";
import { toast } from "sonner";

interface BillingCategory {
  id: string;
  name: string;
  description: string;
  perRequestLimit: number;
  monthlyLimit: number;
  autoApproveBelow: number;
  isActive: boolean;
}

const mockCategories: BillingCategory[] = [
  { id: "1", name: "Salary Budget", description: "Monthly salary allocations", perRequestLimit: 5000000, monthlyLimit: 10000000, autoApproveBelow: 100000, isActive: true },
  { id: "2", name: "Operational Expenses", description: "Day-to-day costs", perRequestLimit: 500000, monthlyLimit: 2000000, autoApproveBelow: 25000, isActive: true },
  { id: "3", name: "IT Equipment", description: "Computers and software", perRequestLimit: 1000000, monthlyLimit: 3000000, autoApproveBelow: 50000, isActive: true },
];

const BillingCategories = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categories, setCategories] = useState(mockCategories);

  const handleToggleStatus = (id: string) => {
    setCategories(categories.map(cat => cat.id === id ? { ...cat, isActive: !cat.isActive } : cat));
    toast.success("Category status updated");
  };

  const columns: Column<BillingCategory>[] = [
    { key: "name", header: "Category Name", render: (row) => <div className="flex items-center gap-2"><Tags className="h-4 w-4 text-muted-foreground" /><span className="font-medium">{row.name}</span></div> },
    { key: "description", header: "Description", render: (row) => <p className="max-w-[250px] text-sm text-muted-foreground">{row.description}</p> },
    { key: "perRequestLimit", header: "Per Request Limit", render: (row) => `₹${(row.perRequestLimit / 100000).toFixed(1)}L` },
    { key: "monthlyLimit", header: "Monthly Limit", render: (row) => `₹${(row.monthlyLimit / 100000).toFixed(1)}L` },
    { key: "autoApproveBelow", header: "Auto-Approve Below", render: (row) => `₹${row.autoApproveBelow.toLocaleString("en-IN")}` },
    { key: "isActive", header: "Status", render: (row) => <div className="flex items-center gap-2"><Switch checked={row.isActive} onCheckedChange={() => handleToggleStatus(row.id)} /><Badge variant={row.isActive ? "default" : "secondary"}>{row.isActive ? "Active" : "Inactive"}</Badge></div> },
    { key: "actions", header: "Actions", render: () => <div className="flex items-center gap-2"><Button variant="ghost" size="sm"><Pencil className="h-4 w-4" /></Button><Button variant="ghost" size="sm" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button></div> }
  ];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div><h1 className="text-2xl font-bold text-foreground">Billing Categories</h1><p className="text-muted-foreground">Manage request categories and budget limits</p></div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}><DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" />Add Category</Button></DialogTrigger><DialogContent className="max-w-lg"><DialogHeader><DialogTitle>Add Billing Category</DialogTitle></DialogHeader><div className="space-y-4 py-4"><div className="space-y-2"><Label>Category Name</Label><Input placeholder="e.g., Equipment Purchase" /></div><div className="space-y-2"><Label>Description</Label><Textarea placeholder="Describe what this category covers..." /></div><div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label>Per Request Limit (₹)</Label><Input type="number" placeholder="0" /></div><div className="space-y-2"><Label>Monthly Limit (₹)</Label><Input type="number" placeholder="0" /></div></div><div className="space-y-2"><Label>Auto-Approve Below (₹)</Label><Input type="number" placeholder="0" /></div><div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button><Button onClick={() => setIsDialogOpen(false)}>Add Category</Button></div></div></DialogContent></Dialog>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Categories</CardTitle><Tags className="h-4 w-4 text-primary" /></CardHeader><CardContent><div className="text-2xl font-bold">{categories.length}</div></CardContent></Card>
                <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Active Categories</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-emerald-600">{categories.filter(c => c.isActive).length}</div></CardContent></Card>
                <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Inactive Categories</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-muted-foreground">{categories.filter(c => !c.isActive).length}</div></CardContent></Card>
              </div>
              <Card><CardHeader><CardTitle>All Categories</CardTitle></CardHeader><CardContent><DataTable columns={columns} data={categories} /></CardContent></Card>
      </div>
    </AdminLayout>
  );
};

export default BillingCategories;
