import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { DataTable, Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit,
  Trash2,
  Building2,
  Users
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Department {
  id: string;
  name: string;
  code: string;
  head: string;
  employees: number;
  description: string;
  status: "active" | "inactive";
  createdAt: string;
}

const Departments = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);

  const departments: Department[] = [
    {
      id: "1",
      name: "Engineering",
      code: "ENG",
      head: "Vikram Singh",
      employees: 25,
      description: "Software development and technical operations",
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Human Resources",
      code: "HR",
      head: "Sneha Gupta",
      employees: 8,
      description: "Employee management and recruitment",
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: "3",
      name: "Marketing",
      code: "MKT",
      head: "Amit Kumar",
      employees: 12,
      description: "Brand management and marketing campaigns",
      status: "active",
      createdAt: "2024-02-01",
    },
    {
      id: "4",
      name: "Finance",
      code: "FIN",
      head: "Priya Patel",
      employees: 6,
      description: "Financial planning and accounting",
      status: "active",
      createdAt: "2024-02-10",
    },
    {
      id: "5",
      name: "Design",
      code: "DES",
      head: "Rahul Sharma",
      employees: 10,
      description: "UI/UX and graphic design",
      status: "inactive",
      createdAt: "2024-03-01",
    },
  ];

  const columns: Column<Department>[] = [
    {
      key: "name",
      header: "Department Name",
      sortable: true,
      searchable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">{row.name}</p>
            <p className="text-xs text-muted-foreground">{row.code}</p>
          </div>
        </div>
      ),
    },
    {
      key: "head",
      header: "Department Head",
      sortable: true,
      searchable: true,
    },
    {
      key: "employees",
      header: "Employees",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>{row.employees}</span>
        </div>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (row) => (
        <span className="text-sm text-muted-foreground line-clamp-1 max-w-[200px]">
          {row.description}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <Badge variant={row.status === "active" ? "default" : "secondary"}>
          {row.status}
        </Badge>
      ),
    },
    {
      key: "id",
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => {
              setEditingDepartment(row);
              setDialogOpen(true);
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const filters = [
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
  ];

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Departments</h1>
          <p className="text-muted-foreground mt-1">Manage organization departments</p>
        </div>
        <Button onClick={() => { setEditingDepartment(null); setDialogOpen(true); }} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Department
        </Button>
      </div>

      <DataTable
        data={departments}
        columns={columns}
        filters={filters}
        searchPlaceholder="Search departments..."
      />

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingDepartment ? "Edit Department" : "Add Department"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Department Name</Label>
              <Input id="name" placeholder="Enter department name" defaultValue={editingDepartment?.name} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="code">Department Code</Label>
              <Input id="code" placeholder="e.g., ENG, HR, MKT" defaultValue={editingDepartment?.code} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="head">Department Head</Label>
              <Input id="head" placeholder="Select department head" defaultValue={editingDepartment?.head} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter description" defaultValue={editingDepartment?.description} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue={editingDepartment?.status || "active"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setDialogOpen(false)}>
              {editingDepartment ? "Update" : "Add"} Department
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Departments;
