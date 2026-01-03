import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable, Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Tags, 
  Plus,
  Pencil,
  Trash2,
  TicketCheck,
  Monitor,
  Users,
  Building,
  Wallet,
  Calendar,
  HelpCircle,
} from "lucide-react";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  defaultAssignee: string;
  slaResponse: string;
  slaResolution: string;
  ticketsCount: number;
  status: string;
  color: string;
}

const sampleCategories: Category[] = [
  {
    id: "1",
    name: "IT Support",
    icon: "Monitor",
    description: "Technical issues, software, hardware requests",
    defaultAssignee: "IT Team",
    slaResponse: "2 hours",
    slaResolution: "24 hours",
    ticketsCount: 45,
    status: "Active",
    color: "#3B82F6",
  },
  {
    id: "2",
    name: "HR Query",
    icon: "Users",
    description: "HR policies, benefits, personal information",
    defaultAssignee: "HR Team",
    slaResponse: "4 hours",
    slaResolution: "48 hours",
    ticketsCount: 32,
    status: "Active",
    color: "#8B5CF6",
  },
  {
    id: "3",
    name: "Facilities",
    icon: "Building",
    description: "Office maintenance, AC, furniture, parking",
    defaultAssignee: "Facilities Team",
    slaResponse: "4 hours",
    slaResolution: "72 hours",
    ticketsCount: 18,
    status: "Active",
    color: "#10B981",
  },
  {
    id: "4",
    name: "Payroll",
    icon: "Wallet",
    description: "Salary queries, tax, reimbursements",
    defaultAssignee: "Payroll Team",
    slaResponse: "4 hours",
    slaResolution: "48 hours",
    ticketsCount: 28,
    status: "Active",
    color: "#F59E0B",
  },
  {
    id: "5",
    name: "Leave Related",
    icon: "Calendar",
    description: "Leave balance, leave applications, policies",
    defaultAssignee: "HR Team",
    slaResponse: "2 hours",
    slaResolution: "24 hours",
    ticketsCount: 56,
    status: "Active",
    color: "#EC4899",
  },
  {
    id: "6",
    name: "General",
    icon: "HelpCircle",
    description: "General queries and miscellaneous requests",
    defaultAssignee: "Admin Team",
    slaResponse: "8 hours",
    slaResolution: "72 hours",
    ticketsCount: 12,
    status: "Active",
    color: "#6B7280",
  },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  Users,
  Building,
  Wallet,
  Calendar,
  HelpCircle,
};

export default function TicketCategories() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const stats = {
    total: sampleCategories.length,
    active: sampleCategories.filter(c => c.status === "Active").length,
    mostUsed: "Leave Related",
    ticketsMonth: 191,
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setDialogOpen(true);
  };

  const handleDelete = (category: Category) => {
    toast.success(`Category "${category.name}" deleted`);
  };

  const columns: Column<Category>[] = [
    {
      key: "name",
      header: "Category Name",
      render: (item) => {
        const IconComponent = iconMap[item.icon] || HelpCircle;
        return (
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${item.color}20` }}
            >
              <IconComponent className="h-4 w-4" style={{ color: item.color }} />
            </div>
            <span className="font-medium">{item.name}</span>
          </div>
        );
      },
    },
    {
      key: "description",
      header: "Description",
      render: (item) => (
        <span className="text-muted-foreground text-sm">{item.description}</span>
      ),
    },
    {
      key: "defaultAssignee",
      header: "Default Assignee",
    },
    {
      key: "slaResponse",
      header: "SLA Response",
    },
    {
      key: "slaResolution",
      header: "SLA Resolution",
    },
    {
      key: "ticketsCount",
      header: "Tickets",
      render: (item) => <Badge variant="secondary">{item.ticketsCount}</Badge>,
    },
    {
      key: "status",
      header: "Status",
      render: (item) => (
        <Badge variant={item.status === "Active" ? "default" : "secondary"}>
          {item.status}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      sortable: false,
      render: (item) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleDelete(item)}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Ticket Categories</h1>
              <p className="text-muted-foreground">Manage support ticket categories and SLA settings</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Tags className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Categories</p>
                      <p className="text-2xl font-bold">{stats.total}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-green-500/10">
                      <Tags className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active Categories</p>
                      <p className="text-2xl font-bold">{stats.active}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-purple-500/10">
                      <TicketCheck className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Most Used</p>
                      <p className="text-2xl font-bold">{stats.mostUsed}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-blue-500/10">
                      <TicketCheck className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tickets This Month</p>
                      <p className="text-2xl font-bold">{stats.ticketsMonth}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Table */}
            <DataTable
              columns={columns}
              data={sampleCategories}
              searchPlaceholder="Search categories..."
              toolbarActions={
                <Button onClick={() => {
                  setEditingCategory(null);
                  setDialogOpen(true);
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              }
            />

      {/* Add/Edit Category Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCategory ? "Edit Category" : "Add Category"}</DialogTitle>
            <DialogDescription>
              {editingCategory ? "Update the category details below." : "Create a new ticket category."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Category Name</Label>
              <Input placeholder="e.g., IT Support" defaultValue={editingCategory?.name} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Brief description of the category" defaultValue={editingCategory?.description} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Default Assignee</Label>
                <Input placeholder="e.g., IT Team" defaultValue={editingCategory?.defaultAssignee} />
              </div>
              <div className="space-y-2">
                <Label>Color</Label>
                <Input type="color" defaultValue={editingCategory?.color || "#3B82F6"} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>SLA Response Time</Label>
                <Input placeholder="e.g., 2 hours" defaultValue={editingCategory?.slaResponse} />
              </div>
              <div className="space-y-2">
                <Label>SLA Resolution Time</Label>
                <Input placeholder="e.g., 24 hours" defaultValue={editingCategory?.slaResolution} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label>Active</Label>
              <Switch defaultChecked={editingCategory?.status === "Active"} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              toast.success(editingCategory ? "Category updated" : "Category created");
              setDialogOpen(false);
            }}>
              {editingCategory ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
