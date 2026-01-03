import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { DataTable, Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit,
  Trash2,
  Briefcase,
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

interface Designation {
  id: string;
  title: string;
  department: string;
  level: string;
  employees: number;
  description: string;
  status: "active" | "inactive";
}

const Designations = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDesignation, setEditingDesignation] = useState<Designation | null>(null);

  const designations: Designation[] = [
    {
      id: "1",
      title: "Senior Software Engineer",
      department: "Engineering",
      level: "Senior",
      employees: 8,
      description: "Lead development of complex software systems",
      status: "active",
    },
    {
      id: "2",
      title: "Software Engineer",
      department: "Engineering",
      level: "Mid",
      employees: 12,
      description: "Develop and maintain software applications",
      status: "active",
    },
    {
      id: "3",
      title: "Junior Developer",
      department: "Engineering",
      level: "Junior",
      employees: 5,
      description: "Entry-level software development role",
      status: "active",
    },
    {
      id: "4",
      title: "UI/UX Designer",
      department: "Design",
      level: "Mid",
      employees: 6,
      description: "Design user interfaces and experiences",
      status: "active",
    },
    {
      id: "5",
      title: "Marketing Manager",
      department: "Marketing",
      level: "Manager",
      employees: 3,
      description: "Manage marketing campaigns and strategies",
      status: "active",
    },
    {
      id: "6",
      title: "HR Executive",
      department: "Human Resources",
      level: "Mid",
      employees: 4,
      description: "Handle HR operations and employee relations",
      status: "active",
    },
    {
      id: "7",
      title: "Tech Lead",
      department: "Engineering",
      level: "Lead",
      employees: 3,
      description: "Lead technical teams and architecture decisions",
      status: "active",
    },
    {
      id: "8",
      title: "Product Manager",
      department: "Product",
      level: "Manager",
      employees: 2,
      description: "Manage product development lifecycle",
      status: "inactive",
    },
  ];

  const columns: Column<Designation>[] = [
    {
      key: "title",
      header: "Designation",
      sortable: true,
      searchable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Briefcase className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">{row.title}</p>
            <p className="text-xs text-muted-foreground">{row.department}</p>
          </div>
        </div>
      ),
    },
    {
      key: "level",
      header: "Level",
      sortable: true,
      render: (row) => (
        <Badge variant="outline">{row.level}</Badge>
      ),
    },
    {
      key: "department",
      header: "Department",
      sortable: true,
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
              setEditingDesignation(row);
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
      key: "department",
      label: "Department",
      options: [
        { label: "Engineering", value: "Engineering" },
        { label: "Design", value: "Design" },
        { label: "Marketing", value: "Marketing" },
        { label: "Human Resources", value: "Human Resources" },
        { label: "Product", value: "Product" },
      ],
    },
    {
      key: "level",
      label: "Level",
      options: [
        { label: "Junior", value: "Junior" },
        { label: "Mid", value: "Mid" },
        { label: "Senior", value: "Senior" },
        { label: "Lead", value: "Lead" },
        { label: "Manager", value: "Manager" },
      ],
    },
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
          <h1 className="text-3xl font-bold text-foreground font-display">Designations</h1>
          <p className="text-muted-foreground mt-1">Manage job titles and designations</p>
        </div>
        <Button onClick={() => { setEditingDesignation(null); setDialogOpen(true); }} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Designation
        </Button>
      </div>

      <DataTable
        data={designations}
        columns={columns}
        filters={filters}
        searchPlaceholder="Search designations..."
      />

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingDesignation ? "Edit Designation" : "Add Designation"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Designation Title</Label>
              <Input id="title" placeholder="Enter designation title" defaultValue={editingDesignation?.title} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="department">Department</Label>
              <Select defaultValue={editingDesignation?.department}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Human Resources">Human Resources</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="level">Level</Label>
              <Select defaultValue={editingDesignation?.level}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Junior">Junior</SelectItem>
                  <SelectItem value="Mid">Mid</SelectItem>
                  <SelectItem value="Senior">Senior</SelectItem>
                  <SelectItem value="Lead">Lead</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Director">Director</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter description" defaultValue={editingDesignation?.description} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue={editingDesignation?.status || "active"}>
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
              {editingDesignation ? "Update" : "Add"} Designation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Designations;