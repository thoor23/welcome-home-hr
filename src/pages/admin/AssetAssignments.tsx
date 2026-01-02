import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UserCheck2, Plus, Eye, RotateCcw, Clock } from "lucide-react";
import { toast } from "sonner";

interface AssetAssignment {
  id: string;
  employeeName: string;
  employeeId: string;
  employeeAvatar?: string;
  department: string;
  assetName: string;
  assetId: string;
  category: string;
  assignedDate: string;
  expectedReturnDate: string | null;
  status: "Active" | "Returned" | "Overdue";
}

const sampleAssignments: AssetAssignment[] = [
  { id: "1", employeeName: "John Doe", employeeId: "EMP001", department: "Engineering", assetName: "MacBook Pro 14\"", assetId: "AST-001", category: "Laptop", assignedDate: "2024-01-15", expectedReturnDate: null, status: "Active" },
  { id: "2", employeeName: "Jane Smith", employeeId: "EMP002", department: "Marketing", assetName: "iPhone 15 Pro", assetId: "AST-003", category: "Mobile Phone", assignedDate: "2024-02-10", expectedReturnDate: null, status: "Active" },
  { id: "3", employeeName: "Mike Johnson", employeeId: "EMP003", department: "Design", assetName: "LG UltraWide Monitor", assetId: "AST-004", category: "Monitor", assignedDate: "2023-03-05", expectedReturnDate: null, status: "Active" },
  { id: "4", employeeName: "Sarah Wilson", employeeId: "EMP004", department: "Engineering", assetName: "ThinkPad X1 Carbon", assetId: "AST-008", category: "Laptop", assignedDate: "2024-03-01", expectedReturnDate: null, status: "Active" },
  { id: "5", employeeName: "David Brown", employeeId: "EMP005", department: "Sales", assetName: "iPad Pro 12.9\"", assetId: "AST-010", category: "Tablet", assignedDate: "2024-01-20", expectedReturnDate: "2024-06-20", status: "Overdue" },
  { id: "6", employeeName: "Emily Davis", employeeId: "EMP006", department: "HR", assetName: "Dell Monitor 27\"", assetId: "AST-011", category: "Monitor", assignedDate: "2023-08-15", expectedReturnDate: "2024-08-15", status: "Active" },
  { id: "7", employeeName: "Robert Taylor", employeeId: "EMP007", department: "Finance", assetName: "HP EliteBook 840", assetId: "AST-012", category: "Laptop", assignedDate: "2023-06-01", expectedReturnDate: "2024-05-31", status: "Returned" },
  { id: "8", employeeName: "Lisa Anderson", employeeId: "EMP008", department: "Operations", assetName: "Samsung Galaxy S24", assetId: "AST-013", category: "Mobile Phone", assignedDate: "2024-04-01", expectedReturnDate: null, status: "Active" },
];

export default function AssetAssignments() {
  const [assignments, setAssignments] = useState<AssetAssignment[]>(sampleAssignments);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: "",
    assetId: "",
    expectedReturnDate: "",
  });

  const activeAssignments = assignments.filter(a => a.status === "Active").length;
  const overdueAssignments = assignments.filter(a => a.status === "Overdue").length;

  const columns: Column<AssetAssignment>[] = [
    {
      key: "employeeName",
      header: "Employee",
      sortable: true,
      searchable: true,
      render: (assignment) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={assignment.employeeAvatar} />
            <AvatarFallback>{assignment.employeeName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{assignment.employeeName}</p>
            <p className="text-xs text-muted-foreground">{assignment.employeeId}</p>
          </div>
        </div>
      ),
    },
    { key: "department", header: "Department", sortable: true },
    {
      key: "assetName",
      header: "Asset",
      sortable: true,
      searchable: true,
      render: (assignment) => (
        <div>
          <p className="font-medium">{assignment.assetName}</p>
          <p className="text-xs text-muted-foreground">{assignment.assetId}</p>
        </div>
      ),
    },
    { key: "category", header: "Category" },
    { key: "assignedDate", header: "Assigned Date", sortable: true },
    {
      key: "expectedReturnDate",
      header: "Expected Return",
      render: (assignment) => assignment.expectedReturnDate || <span className="text-muted-foreground">Permanent</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (assignment) => {
        const variants: Record<string, "default" | "secondary" | "destructive"> = {
          Active: "default",
          Returned: "secondary",
          Overdue: "destructive",
        };
        return <Badge variant={variants[assignment.status]}>{assignment.status}</Badge>;
      },
    },
    {
      key: "actions",
      header: "Actions",
      render: (assignment) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Eye className="h-4 w-4" />
          </Button>
          {assignment.status === "Active" && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleReturn(assignment.id)}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
          {assignment.status === "Active" && (
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Clock className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  const filters: Filter[] = [
    {
      key: "department",
      label: "Department",
      options: [
        { label: "Engineering", value: "Engineering" },
        { label: "Marketing", value: "Marketing" },
        { label: "Design", value: "Design" },
        { label: "Sales", value: "Sales" },
        { label: "HR", value: "HR" },
        { label: "Finance", value: "Finance" },
        { label: "Operations", value: "Operations" },
      ],
    },
    {
      key: "category",
      label: "Category",
      options: [
        { label: "Laptop", value: "Laptop" },
        { label: "Mobile Phone", value: "Mobile Phone" },
        { label: "Monitor", value: "Monitor" },
        { label: "Tablet", value: "Tablet" },
      ],
    },
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Active", value: "Active" },
        { label: "Returned", value: "Returned" },
        { label: "Overdue", value: "Overdue" },
      ],
    },
  ];

  const handleReturn = (id: string) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, status: "Returned" as const } : a));
    toast.success("Asset returned successfully");
  };

  const handleSubmit = () => {
    const newAssignment: AssetAssignment = {
      id: Date.now().toString(),
      employeeName: "New Employee",
      employeeId: formData.employeeId,
      department: "Engineering",
      assetName: "Asset Name",
      assetId: formData.assetId,
      category: "Laptop",
      assignedDate: new Date().toISOString().split("T")[0],
      expectedReturnDate: formData.expectedReturnDate || null,
      status: "Active",
    };
    setAssignments([...assignments, newAssignment]);
    toast.success("Asset assigned successfully");
    setDialogOpen(false);
    setFormData({ employeeId: "", assetId: "", expectedReturnDate: "" });
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
                <h1 className="text-2xl font-bold">Asset Assignments</h1>
                <p className="text-muted-foreground">Track assets assigned to employees</p>
              </div>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Assign Asset
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Assign Asset to Employee</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Employee</Label>
                      <Select value={formData.employeeId} onValueChange={(v) => setFormData({ ...formData, employeeId: v })}>
                        <SelectTrigger><SelectValue placeholder="Select employee" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EMP001">John Doe (EMP001)</SelectItem>
                          <SelectItem value="EMP002">Jane Smith (EMP002)</SelectItem>
                          <SelectItem value="EMP003">Mike Johnson (EMP003)</SelectItem>
                          <SelectItem value="EMP009">Alex Kumar (EMP009)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Asset</Label>
                      <Select value={formData.assetId} onValueChange={(v) => setFormData({ ...formData, assetId: v })}>
                        <SelectTrigger><SelectValue placeholder="Select available asset" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AST-002">Dell OptiPlex 7090 (AST-002)</SelectItem>
                          <SelectItem value="AST-006">Ergonomic Office Chair (AST-006)</SelectItem>
                          <SelectItem value="AST-014">HP Monitor 24\" (AST-014)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Expected Return Date (Optional)</Label>
                      <Input type="date" value={formData.expectedReturnDate} onChange={(e) => setFormData({ ...formData, expectedReturnDate: e.target.value })} />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit}>Assign Asset</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <UserCheck2 className="h-4 w-4" />
                  <span className="text-sm">Active Assignments</span>
                </div>
                <p className="text-2xl font-bold">{activeAssignments}</p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Overdue</span>
                </div>
                <p className="text-2xl font-bold text-destructive">{overdueAssignments}</p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <RotateCcw className="h-4 w-4" />
                  <span className="text-sm">Returned This Month</span>
                </div>
                <p className="text-2xl font-bold">{assignments.filter(a => a.status === "Returned").length}</p>
              </div>
            </div>

            <DataTable data={assignments} columns={columns} filters={filters} searchPlaceholder="Search assignments..." />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}