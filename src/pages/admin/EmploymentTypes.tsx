import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DataTable, Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit,
  Trash2,
  UserCheck,
  Users,
  Clock
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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EmploymentType {
  id: string;
  name: string;
  code: string;
  workingHours: string;
  employees: number;
  description: string;
  benefits: boolean;
  paidLeave: boolean;
  status: "active" | "inactive";
}

const EmploymentTypes = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingType, setEditingType] = useState<EmploymentType | null>(null);

  const employmentTypes: EmploymentType[] = [
    {
      id: "1",
      name: "Full-Time",
      code: "FT",
      workingHours: "40 hrs/week",
      employees: 45,
      description: "Regular full-time employment with all benefits",
      benefits: true,
      paidLeave: true,
      status: "active",
    },
    {
      id: "2",
      name: "Part-Time",
      code: "PT",
      workingHours: "20 hrs/week",
      employees: 12,
      description: "Part-time employment with limited hours",
      benefits: false,
      paidLeave: true,
      status: "active",
    },
    {
      id: "3",
      name: "Contract",
      code: "CT",
      workingHours: "40 hrs/week",
      employees: 8,
      description: "Fixed-term contract employment",
      benefits: false,
      paidLeave: false,
      status: "active",
    },
    {
      id: "4",
      name: "Intern",
      code: "INT",
      workingHours: "30 hrs/week",
      employees: 6,
      description: "Internship program for students",
      benefits: false,
      paidLeave: false,
      status: "active",
    },
    {
      id: "5",
      name: "Freelance",
      code: "FL",
      workingHours: "Flexible",
      employees: 4,
      description: "Freelance/consultant basis",
      benefits: false,
      paidLeave: false,
      status: "active",
    },
    {
      id: "6",
      name: "Probation",
      code: "PRB",
      workingHours: "40 hrs/week",
      employees: 5,
      description: "Probationary period for new hires",
      benefits: true,
      paidLeave: true,
      status: "active",
    },
  ];

  const columns: Column<EmploymentType>[] = [
    {
      key: "name",
      header: "Employment Type",
      sortable: true,
      searchable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <UserCheck className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">{row.name}</p>
            <p className="text-xs text-muted-foreground">{row.code}</p>
          </div>
        </div>
      ),
    },
    {
      key: "workingHours",
      header: "Working Hours",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{row.workingHours}</span>
        </div>
      ),
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
      key: "benefits",
      header: "Benefits",
      render: (row) => (
        <Badge variant={row.benefits ? "default" : "outline"}>
          {row.benefits ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      key: "paidLeave",
      header: "Paid Leave",
      render: (row) => (
        <Badge variant={row.paidLeave ? "default" : "outline"}>
          {row.paidLeave ? "Yes" : "No"}
        </Badge>
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
              setEditingType(row);
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
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-6">
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">Employment Types</h1>
                  <p className="text-muted-foreground">
                    Manage employment types and categories
                  </p>
                </div>
                <Button onClick={() => { setEditingType(null); setDialogOpen(true); }} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Employment Type
                </Button>
              </div>

              {/* Stats */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <UserCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Types</p>
                      <p className="text-2xl font-bold">{employmentTypes.length}</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <UserCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active</p>
                      <p className="text-2xl font-bold">{employmentTypes.filter(t => t.status === "active").length}</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Employees</p>
                      <p className="text-2xl font-bold">{employmentTypes.reduce((sum, t) => sum + t.employees, 0)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <div className="rounded-lg border bg-card">
                <DataTable
                  data={employmentTypes}
                  columns={columns}
                  filters={filters}
                  searchPlaceholder="Search employment types..."
                />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingType ? "Edit Employment Type" : "Add Employment Type"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Type Name</Label>
              <Input id="name" placeholder="e.g., Full-Time, Part-Time" defaultValue={editingType?.name} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="code">Code</Label>
              <Input id="code" placeholder="e.g., FT, PT, CT" defaultValue={editingType?.code} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="workingHours">Working Hours</Label>
              <Input id="workingHours" placeholder="e.g., 40 hrs/week" defaultValue={editingType?.workingHours} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter description" defaultValue={editingType?.description} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="benefits">Benefits Included</Label>
              <Switch id="benefits" defaultChecked={editingType?.benefits} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="paidLeave">Paid Leave</Label>
              <Switch id="paidLeave" defaultChecked={editingType?.paidLeave} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue={editingType?.status || "active"}>
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
              {editingType ? "Update" : "Add"} Type
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default EmploymentTypes;
