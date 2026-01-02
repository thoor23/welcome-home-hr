import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Layers, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface AssetCategory {
  id: string;
  name: string;
  description: string;
  depreciationRate: number;
  usefulLife: number;
  totalAssets: number;
  activeAssets: number;
  status: "Active" | "Inactive";
}

const sampleCategories: AssetCategory[] = [
  { id: "1", name: "Laptops", description: "Portable computers including notebooks and ultrabooks", depreciationRate: 25, usefulLife: 4, totalAssets: 45, activeAssets: 42, status: "Active" },
  { id: "2", name: "Desktops", description: "Desktop computers and workstations", depreciationRate: 20, usefulLife: 5, totalAssets: 30, activeAssets: 28, status: "Active" },
  { id: "3", name: "Monitors", description: "Computer monitors and display screens", depreciationRate: 15, usefulLife: 6, totalAssets: 60, activeAssets: 58, status: "Active" },
  { id: "4", name: "Mobile Phones", description: "Smartphones and mobile devices", depreciationRate: 30, usefulLife: 3, totalAssets: 85, activeAssets: 80, status: "Active" },
  { id: "5", name: "Tablets", description: "Tablet computers and iPads", depreciationRate: 30, usefulLife: 3, totalAssets: 20, activeAssets: 18, status: "Active" },
  { id: "6", name: "Printers", description: "Printers, scanners, and multifunction devices", depreciationRate: 20, usefulLife: 5, totalAssets: 15, activeAssets: 12, status: "Active" },
  { id: "7", name: "Furniture", description: "Office furniture including desks, chairs, and cabinets", depreciationRate: 10, usefulLife: 10, totalAssets: 200, activeAssets: 195, status: "Active" },
  { id: "8", name: "Vehicles", description: "Company vehicles for official use", depreciationRate: 15, usefulLife: 7, totalAssets: 10, activeAssets: 10, status: "Active" },
  { id: "9", name: "Software Licenses", description: "Software and application licenses", depreciationRate: 33, usefulLife: 3, totalAssets: 150, activeAssets: 145, status: "Active" },
  { id: "10", name: "Networking Equipment", description: "Routers, switches, and network devices", depreciationRate: 20, usefulLife: 5, totalAssets: 25, activeAssets: 24, status: "Active" },
];

export default function AssetCategories() {
  const [categories, setCategories] = useState<AssetCategory[]>(sampleCategories);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AssetCategory | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    depreciationRate: "",
    usefulLife: "",
    status: "Active" as "Active" | "Inactive",
  });

  const columns: Column<AssetCategory>[] = [
    {
      key: "name",
      header: "Category Name",
      sortable: true,
      searchable: true,
      render: (cat) => (
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{cat.name}</span>
        </div>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (cat) => <span className="text-sm text-muted-foreground">{cat.description}</span>,
    },
    {
      key: "depreciationRate",
      header: "Depreciation Rate",
      sortable: true,
      render: (cat) => `${cat.depreciationRate}% / year`,
    },
    {
      key: "usefulLife",
      header: "Useful Life",
      sortable: true,
      render: (cat) => `${cat.usefulLife} years`,
    },
    {
      key: "totalAssets",
      header: "Total Assets",
      sortable: true,
    },
    {
      key: "activeAssets",
      header: "Active Assets",
      sortable: true,
    },
    {
      key: "status",
      header: "Status",
      render: (cat) => (
        <Badge variant={cat.status === "Active" ? "default" : "secondary"}>
          {cat.status}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (cat) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(cat)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(cat.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const filters: Filter[] = [
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
    },
  ];

  const handleEdit = (category: AssetCategory) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      depreciationRate: category.depreciationRate.toString(),
      usefulLife: category.usefulLife.toString(),
      status: category.status,
    });
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
    toast.success("Category deleted successfully");
  };

  const handleSubmit = () => {
    if (editingCategory) {
      setCategories(categories.map(c => c.id === editingCategory.id ? {
        ...c,
        name: formData.name,
        description: formData.description,
        depreciationRate: parseInt(formData.depreciationRate),
        usefulLife: parseInt(formData.usefulLife),
        status: formData.status,
      } : c));
      toast.success("Category updated successfully");
    } else {
      const newCategory: AssetCategory = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        depreciationRate: parseInt(formData.depreciationRate),
        usefulLife: parseInt(formData.usefulLife),
        totalAssets: 0,
        activeAssets: 0,
        status: formData.status,
      };
      setCategories([...categories, newCategory]);
      toast.success("Category added successfully");
    }
    setDialogOpen(false);
    setEditingCategory(null);
    setFormData({ name: "", description: "", depreciationRate: "", usefulLife: "", status: "Active" });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">Asset Categories</h1>
                <p className="text-muted-foreground">Manage asset categories and depreciation settings</p>
              </div>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => { setEditingCategory(null); setFormData({ name: "", description: "", depreciationRate: "", usefulLife: "", status: "Active" }); }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Category Name</Label>
                      <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g., Laptops" />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Brief description of the category" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Depreciation Rate (%/year)</Label>
                        <Input type="number" value={formData.depreciationRate} onChange={(e) => setFormData({ ...formData, depreciationRate: e.target.value })} placeholder="e.g., 25" />
                      </div>
                      <div className="space-y-2">
                        <Label>Useful Life (years)</Label>
                        <Input type="number" value={formData.usefulLife} onChange={(e) => setFormData({ ...formData, usefulLife: e.target.value })} placeholder="e.g., 4" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as "Active" | "Inactive" })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit}>{editingCategory ? "Update" : "Add"} Category</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <DataTable data={categories} columns={columns} filters={filters} searchPlaceholder="Search categories..." />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}