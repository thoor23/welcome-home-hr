import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { Column } from "@/components/ui/data-table";

interface ExpenseCategory {
  id: string;
  name: string;
  description: string;
  perTransactionLimit: number;
  monthlyLimit: number;
  requiresReceipt: boolean;
  autoApproveBelow: number;
  totalSpent: number;
  status: "Active" | "Inactive";
}

const sampleCategories: ExpenseCategory[] = [
  {
    id: "CAT001",
    name: "Travel",
    description: "Flight, train, bus, cab expenses for business travel",
    perTransactionLimit: 50000,
    monthlyLimit: 100000,
    requiresReceipt: true,
    autoApproveBelow: 2000,
    totalSpent: 45600,
    status: "Active",
  },
  {
    id: "CAT002",
    name: "Food & Meals",
    description: "Business meals and team lunches",
    perTransactionLimit: 5000,
    monthlyLimit: 15000,
    requiresReceipt: true,
    autoApproveBelow: 500,
    totalSpent: 12300,
    status: "Active",
  },
  {
    id: "CAT003",
    name: "Accommodation",
    description: "Hotel and guest house stays",
    perTransactionLimit: 15000,
    monthlyLimit: 50000,
    requiresReceipt: true,
    autoApproveBelow: 0,
    totalSpent: 24000,
    status: "Active",
  },
  {
    id: "CAT004",
    name: "Office Supplies",
    description: "Stationery and office equipment",
    perTransactionLimit: 5000,
    monthlyLimit: 10000,
    requiresReceipt: true,
    autoApproveBelow: 1000,
    totalSpent: 3500,
    status: "Active",
  },
  {
    id: "CAT005",
    name: "Client Entertainment",
    description: "Client meetings and entertainment",
    perTransactionLimit: 10000,
    monthlyLimit: 30000,
    requiresReceipt: true,
    autoApproveBelow: 0,
    totalSpent: 18500,
    status: "Active",
  },
  {
    id: "CAT006",
    name: "Training & Education",
    description: "Courses, certifications, and workshops",
    perTransactionLimit: 25000,
    monthlyLimit: 50000,
    requiresReceipt: true,
    autoApproveBelow: 5000,
    totalSpent: 15000,
    status: "Active",
  },
  {
    id: "CAT007",
    name: "Communication",
    description: "Phone and internet expenses",
    perTransactionLimit: 2000,
    monthlyLimit: 5000,
    requiresReceipt: false,
    autoApproveBelow: 1000,
    totalSpent: 2800,
    status: "Active",
  },
  {
    id: "CAT008",
    name: "Fuel & Vehicle",
    description: "Fuel and vehicle maintenance",
    perTransactionLimit: 5000,
    monthlyLimit: 15000,
    requiresReceipt: true,
    autoApproveBelow: 1500,
    totalSpent: 8900,
    status: "Active",
  },
  {
    id: "CAT009",
    name: "Medical & Health",
    description: "Medical expenses not covered by insurance",
    perTransactionLimit: 10000,
    monthlyLimit: 20000,
    requiresReceipt: true,
    autoApproveBelow: 0,
    totalSpent: 0,
    status: "Inactive",
  },
  {
    id: "CAT010",
    name: "Miscellaneous",
    description: "Other business expenses",
    perTransactionLimit: 3000,
    monthlyLimit: 10000,
    requiresReceipt: true,
    autoApproveBelow: 500,
    totalSpent: 1200,
    status: "Active",
  },
];

const ExpenseCategories = () => {
  const [categories, setCategories] = useState<ExpenseCategory[]>(sampleCategories);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ExpenseCategory | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    perTransactionLimit: "",
    monthlyLimit: "",
    requiresReceipt: true,
    autoApproveBelow: "",
    status: "Active" as "Active" | "Inactive",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      perTransactionLimit: "",
      monthlyLimit: "",
      requiresReceipt: true,
      autoApproveBelow: "",
      status: "Active",
    });
    setEditingCategory(null);
  };

  const handleEdit = (category: ExpenseCategory) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      perTransactionLimit: category.perTransactionLimit.toString(),
      monthlyLimit: category.monthlyLimit.toString(),
      requiresReceipt: category.requiresReceipt,
      autoApproveBelow: category.autoApproveBelow.toString(),
      status: category.status,
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id));
    toast.success("Category deleted successfully");
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.perTransactionLimit || !formData.monthlyLimit) {
      toast.error("Please fill all required fields");
      return;
    }

    if (editingCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id
            ? {
                ...cat,
                name: formData.name,
                description: formData.description,
                perTransactionLimit: parseFloat(formData.perTransactionLimit),
                monthlyLimit: parseFloat(formData.monthlyLimit),
                requiresReceipt: formData.requiresReceipt,
                autoApproveBelow: parseFloat(formData.autoApproveBelow) || 0,
                status: formData.status,
              }
            : cat
        )
      );
      toast.success("Category updated successfully");
    } else {
      const newCategory: ExpenseCategory = {
        id: `CAT${String(categories.length + 1).padStart(3, "0")}`,
        name: formData.name,
        description: formData.description,
        perTransactionLimit: parseFloat(formData.perTransactionLimit),
        monthlyLimit: parseFloat(formData.monthlyLimit),
        requiresReceipt: formData.requiresReceipt,
        autoApproveBelow: parseFloat(formData.autoApproveBelow) || 0,
        totalSpent: 0,
        status: formData.status,
      };
      setCategories([...categories, newCategory]);
      toast.success("Category added successfully");
    }

    resetForm();
    setIsAddDialogOpen(false);
  };

  const columns: Column<ExpenseCategory>[] = [
    { key: "name", header: "Category Name", sortable: true },
    { key: "description", header: "Description" },
    {
      key: "perTransactionLimit",
      header: "Per Transaction Limit",
      sortable: true,
      render: (cat) => `₹${cat.perTransactionLimit.toLocaleString()}`,
    },
    {
      key: "monthlyLimit",
      header: "Monthly Limit",
      sortable: true,
      render: (cat) => `₹${cat.monthlyLimit.toLocaleString()}`,
    },
    {
      key: "autoApproveBelow",
      header: "Auto-approve Below",
      render: (cat) =>
        cat.autoApproveBelow > 0
          ? `₹${cat.autoApproveBelow.toLocaleString()}`
          : "Manual only",
    },
    {
      key: "requiresReceipt",
      header: "Receipt Required",
      render: (cat) => (
        <Badge variant={cat.requiresReceipt ? "default" : "secondary"}>
          {cat.requiresReceipt ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      key: "totalSpent",
      header: "Total Spent (Month)",
      sortable: true,
      render: (cat) => (
        <span className={cat.totalSpent > cat.monthlyLimit * 0.8 ? "text-orange-500" : ""}>
          ₹{cat.totalSpent.toLocaleString()}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (cat) => (
        <Badge
          variant="outline"
          className={
            cat.status === "Active"
              ? "bg-green-500/10 text-green-500 border-green-500/20"
              : "bg-gray-500/10 text-gray-500 border-gray-500/20"
          }
        >
          {cat.status}
        </Badge>
      ),
    },
    {
      key: "actions" as keyof ExpenseCategory,
      header: "Actions",
      render: (cat) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleEdit(cat)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500 hover:text-red-600"
            onClick={() => handleDelete(cat.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Expense Categories</h1>
                <p className="text-muted-foreground">
                  Manage expense categories and spending limits
                </p>
              </div>
              <Dialog
                open={isAddDialogOpen}
                onOpenChange={(open) => {
                  setIsAddDialogOpen(open);
                  if (!open) resetForm();
                }}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {editingCategory ? "Edit Category" : "Add New Category"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingCategory
                        ? "Update expense category details"
                        : "Create a new expense category with spending limits"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label>Category Name *</Label>
                      <Input
                        placeholder="e.g., Travel"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Description</Label>
                      <Textarea
                        placeholder="Category description"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Per Transaction Limit (₹) *</Label>
                        <Input
                          type="number"
                          placeholder="50000"
                          value={formData.perTransactionLimit}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              perTransactionLimit: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Monthly Limit (₹) *</Label>
                        <Input
                          type="number"
                          placeholder="100000"
                          value={formData.monthlyLimit}
                          onChange={(e) =>
                            setFormData({ ...formData, monthlyLimit: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label>Auto-approve Below (₹)</Label>
                      <Input
                        type="number"
                        placeholder="2000"
                        value={formData.autoApproveBelow}
                        onChange={(e) =>
                          setFormData({ ...formData, autoApproveBelow: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Requires Receipt</Label>
                      <Switch
                        checked={formData.requiresReceipt}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, requiresReceipt: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Active Status</Label>
                      <Switch
                        checked={formData.status === "Active"}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            status: checked ? "Active" : "Inactive",
                          })
                        }
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => {
                        resetForm();
                        setIsAddDialogOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit}>
                      {editingCategory ? "Update" : "Add"} Category
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <DataTable
              data={categories}
              columns={columns}
              searchPlaceholder="Search categories..."
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ExpenseCategories;